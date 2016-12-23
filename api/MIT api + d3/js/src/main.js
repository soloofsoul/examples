// here is not important code quality, but snippet to get API data and visualize it
var data = {},
    width = window.innerWidth,
    height = window.innerHeight,

    //Based on code from https://bl.ocks.org/mbostock/6738109
    superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) {
        return (d + "").split("").map(function(c) {
            return superscript[c];
        }).join("");
    },

    xScale = d3.scaleLog().range([0, width]),
    yScale = d3.scaleLog().range([height, 0]),
    // xAxis = d3.axisTop()
    //     .scale(xScale)
    //     .tickFormat(function(d){ return d3.format('.2s')(d).replace('G', 'B'); }),
    xAxis = d3.axisTop()
        .scale(xScale)
        .ticks(10, function(d){
            return 10 + formatPower(Math.round(Math.log(d) / Math.LN10));
        }),
    // yAxis = d3.axisRight()
    //     .scale(yScale)
    //     .tickFormat(function(d){ return d3.format('.2s')(d).replace('G', 'B'); }),
    yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(10, function(d){
            return 10 + formatPower(Math.round(Math.log(d) / Math.LN10));
        }),
    svg = d3.select('#content').append('svg')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('width', width)
        .attr('height', height),

    countryAttrs = {};

d3.json('http://atlas.media.mit.edu/attr/country/', function(err, json){
    if(err) return console.log(err);
    json.data.forEach(function(d){
        countryAttrs[d.id] = d;
    });
});
d3.json('http://atlas.media.mit.edu/hs07/export/2011/show/all/all/', function(err_2010, json_2010){
    if(err_2010) return console.warn(err_2010);
    json_2010.data.forEach(function(d){
        data[d.origin_id] = {
            exportVal2011: d.export_val,
            id: d.origin_id
        };
    });

    d3.json('http://atlas.media.mit.edu/hs07/export/2012/show/all/all/', function(err_2011, json_2011){
        if(err_2011) return console.warn(err_2011);
        json_2011.data.forEach(function(d){
            if(data[d.origin_id]) {
                data[d.origin_id]['exportVal2012'] = d.export_val;
            }
        });

        var keys = Object.keys(data),
            newData = {};
        for(var i=0;i<keys.length;i++) {
            if(data[keys[i]]['exportVal2012'])
                newData[keys[i]] = {
                    exportVal2011: data[keys[i]]['exportVal2011'],
                    exportVal2012: data[keys[i]]['exportVal2012'],
                    id: data[keys[i]].id
                }
        }

        xScale.domain(d3.extent(d3.values(newData), function(d){
            return d.exportVal2011;
        }));
        yScale.domain(d3.extent(d3.values(newData), function(d){
            return d.exportVal2012;
        }));

        svg.append('g')
            .attr('transform', 'translate(0,' + (height-1) + ')')
            .attr('class', 'axis')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis);

        var countryG = svg.selectAll('g.country')
            .data(d3.values(data))
            .enter()
            .append('g')
            .attr('class', 'country');

        // svg.selectAll('circle')
        //     .data(d3.values(newData))
        //     .enter()
        //     .append('circle')
        countryG.append('circle')
            .attr('cx', function(d){ return xScale(d['exportVal2011']); })
            .attr('cy', function(d){
                if(d['exportVal2012'])
                    return yScale(d['exportVal2012']);

                return yScale.range()[0];
            })
            .attr('r', 15)
            .attr('fill', function(d){
                return countryAttrs[d.id]['color'];
            });

        countryG.append('text')
            .attr('x', function(d){ return xScale(d['exportVal2011']); })
            .attr('y', function(d){
                if(d['exportVal2012'])
                    return yScale(d['exportVal2012']);

                return yScale.range()[0];
            })
            .attr('r', 15)
            .attr('fill', function(d){
                return countryAttrs[d.id]['color'];
            })
            .text(function(d){
                if(countryAttrs[d.id]['display_id'])
                    return countryAttrs[d.id]['display_id'].toUpperCase();
            });
    });
});