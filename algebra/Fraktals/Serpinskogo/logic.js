let fractal = {
    el: undefined, // canvas DOM element
    elCtx: undefined, // canvas context
    canvasElDimension: undefined, // to draw fractal nicely in canvas
    steps: undefined,
    fillColor: '',
    oppositeColor: '',
    run: function(el, fillColor, oppositeColor, canvasElDimension, steps) {
        this.el = el;

        if(this.el.getContext) {
            this.canvasElDimension = canvasElDimension;
            this.el.setAttribute('width', this.canvasElDimension.width);
            this.el.setAttribute('height', this.canvasElDimension.height);
            this.steps = steps;
            this.fillColor = fillColor;
            this.oppositeColor = oppositeColor;

            this.elCtx = this.el.getContext('2d');

            this.draw();
        }
    },
    draw: function(){
        this.drawBaseTriangle();
    },
    drawBaseTriangle: function(){
        let Ax = 0;
        let Ay = this.canvasElDimension.height;
        let Bx = this.canvasElDimension.width;
        let By = this.canvasElDimension.height;
        let Cx = this.canvasElDimension.height / 2;
        let Cy = this.canvasElDimension.height - this.canvasElDimension.width;

        this.drawTriangle(Ax, Ay, Bx, By, Cx, Cy, this.fillColor);

        this.drawPoint(Ax, Ay);
        this.drawPoint(Bx, By);
        this.drawPoint(Cx, Cy);

        if(this.steps > 0) {
            this.removeTrianglePart(Ax, Ay, Bx, By, Cx, Cy, this.steps);
        }
    },
    removeTrianglePart: function(Ax, Ay, Bx, By, Cx, Cy, steps) {
        let A1x = ( Ax + Cx ) / 2;
        let A1y = ( Ay + Cy ) / 2;
        let B1x = ( Bx + Cx ) / 2;
        let B1y = ( By + Cy ) / 2;
        let C1x = ( Ax + Bx ) / 2;
        let C1y = ( Ay + By ) / 2;

        this.drawTriangle(A1x, A1y, B1x, B1y, C1x, C1y, this.oppositeColor);

        this.drawPoint(A1x, A1y);
        this.drawPoint(B1x, B1y);
        this.drawPoint(C1x, C1y);

        if (steps > 1) {
            let newStep = --steps;
            this.removeTrianglePart(A1x, A1y, B1x, B1y, Cx, Cy, newStep);
            this.removeTrianglePart(Ax, Ay, A1x, A1y, C1x, C1y, newStep);
            this.removeTrianglePart(C1x, C1y, B1x, B1y, Bx, By, newStep);
        }
    },
    drawPoint: function (x,y) {
        this.elCtx.fillStyle = '#c82124';
        this.elCtx.beginPath();
        this.elCtx.arc(x, y, 2, 0, 2*Math.PI);
        this.elCtx.closePath();
        this.elCtx.fill();
    },
    drawTriangle: function(Ax, Ay, Bx, By, Cx, Cy, color) {
        this.elCtx.fillStyle = color;
        this.elCtx.beginPath();
        this.elCtx.moveTo(Ax, Ay);
        this.elCtx.lineTo(Bx, By);
        this.elCtx.lineTo(Cx, Cy);
        this.elCtx.closePath();
        this.elCtx.fill();
    }
};

let canvasEl = document.getElementById('canvas');
let fillColor = '#000000';
let oppositeColor = '#ffffff';
let canvasElDimension = { width: 600, height: 600 };
let steps = 6;

fractal.run(canvasEl, fillColor, oppositeColor, canvasElDimension, steps);