// Taks is to find minimum path for defined cell in matrix.
// As input we have matrix, count of rows and cols, cell where is needed to finish the path.
// Matrix consist of 0 and 1. Where 1 is wall - cell which could not be used for moving, route are using 0 cells only.
// If there is no possibility to find path then function should return -1 else the smallest path

function calculateMin (maze, rows, cols, exitRow, exitCol){
    var params = {
            row: 0,
            col: 0,
            maze: maze,
            rows: rows,
            cols: cols,
            exitRow: exitRow,
            exitCol: exitCol,
            routes: [],
            visitedCells: []
        };

    // here I'm starting to call recursion
    processCell(params);

    // processCell function will update params.routes property will all accessible routes
    // and if no routes was found then function will return -1
    // in other case - the smallest route size
    return params.routes.length === 0 ? -1 : Math.min(...params.routes.map(function(a){ return a.length-1 }));
}

function processCell(p){
    // N - means neighbor
    var topNValue,
        rightNValue,
        bottomNValue,
        leftNValue,
        isValidCell = p.maze[p.row][p.col] !== 1,
        cellStrKey,
        params,
        isValidTopN,
        isValidRightN,
        isValidBottomN,
        isValidLeftN;

    // this is check if cell is not Wall (1)
    if(isValidCell) {
        // I'll save cells in route as string of combination of row and col number.
        // for example cell from 1 row and 2 col will be saved in route as "12"
        cellStrKey = getCellPositionKey(p.row, p.col);


        // if this is first cell then we are adding it as starting point for routes
        if(p.row === 0 && p.col === 0) {
            p.routes.push(['00']);
        }

        // if this is not exit cell then we are calculating neighbors and routes
        if(!(p.row === p.exitRow && p.col === p.exitCol)) {

            // marking current cell as visited
            p.visitedCells.push(cellStrKey);

            // checking if I can move to directions (I can if 0)
            topNValue    = p.row === 0        ? 1 : p.maze[p.row-1][p.col];
            rightNValue  = p.col === p.cols-1 ? 1 : p.maze[p.row][p.col+1];
            bottomNValue = p.row === p.rows-1 ? 1 : p.maze[p.row+1][p.col];
            leftNValue   = p.col === 0        ? 1 : p.maze[p.row][p.col-1];

            // here I'm checking if next cell is valid to continue and if it was not used previously
            // (to avoid infinite loops)
            isValidTopN    = topNValue    === 0 && p.visitedCells.indexOf(getCellPositionKey(p.row-1, p.col)) === -1;
            isValidRightN  = rightNValue  === 0 && p.visitedCells.indexOf(getCellPositionKey(p.row, p.col+1)) === -1;
            isValidBottomN = bottomNValue === 0 && p.visitedCells.indexOf(getCellPositionKey(p.row+1, p.col)) === -1;
            isValidLeftN   = leftNValue   === 0 && p.visitedCells.indexOf(getCellPositionKey(p.row, p.col-1)) === -1;

            // here I'm processing route for current cell and its neighbors
            p.routes = processRoute(
                p.routes,
                p.row,
                p.col,
                {
                    isValidTopN: isValidTopN,
                    isValidRightN: isValidRightN,
                    isValidBottomN: isValidBottomN,
                    isValidLeftN: isValidLeftN
                }
            );

            // and these are params for next recursion step
            params = {
                row: p.row,
                col: p.col,
                maze: p.maze,
                rows: p.rows,
                cols: p.cols,
                exitRow: p.exitRow,
                exitCol: p.exitCol,
                routes: p.routes,
                visitedCells: p.visitedCells
            };

            // if next cells is valid then I'm continue recursion

            if(isValidTopN) {
                params.row = p.row-1;
                params.col = p.col;
                processCell(params);
            }

            if(isValidRightN) {
                params.col = p.col+1;
                params.row = p.row;
                processCell(params);
            }

            if(isValidBottomN) {
                params.row = p.row+1;
                params.col = p.col;
                processCell(params);
            }

            if(isValidLeftN) {
                params.col = p.col-1;
                params.row = p.row;
                processCell(params);
            }
        }
    }
}

// this function is used to create Key for Cell which I'm using to save it in route
function getCellPositionKey(row, col) {
    return row.toString() + col.toString();
}

function processRoute(routes, row, col, neighbors) {
    var i,
        routesCount = routes.length,
        route,
        routeLastCellKey,
        tempRoute;

    // we have data in route in any case, because for (0,0) cell processing its position is adding as beginning of routes
    // that's why I do not need to check if routes are not empty
    for(i=0; i<routesCount;i++) {
        // assigning indexed route to variable in order to save some memory
        route = routes[i];
        // here I'm looking for last route cell to check if I need to continue route
        routeLastCellKey = route[route.length-1];

        // if current Cell is the last cell in row then I need to modify routes according to neighbors
        if(routeLastCellKey === getCellPositionKey(row,col)) {
            // here I'm removing existing route to add later new one and its branches (if they exist)
            routes.splice(i, 1);

            if(neighbors.isValidTopN) {
                // creating copy of route which was removed from routes list
                tempRoute = route.slice();
                // and adding to it next cell as next point in route
                tempRoute.push(getCellPositionKey(row-1, col));
                routes.push(tempRoute);
            }

            if(neighbors.isValidRightN) {
                tempRoute = route.slice();
                tempRoute.push(getCellPositionKey(row, col+1));
                routes.push(tempRoute);
            }

            if(neighbors.isValidBottomN) {
                tempRoute = route.slice();
                tempRoute.push(getCellPositionKey(row+1, col));
                routes.push(tempRoute);
            }

            if(neighbors.isValidLeftN) {
                tempRoute = route.slice();
                tempRoute.push(getCellPositionKey(row, col-1));
                routes.push(tempRoute);
            }
        }
    }

    return routes;
}

var maze1 = [
        [0,0,0],
        [1,1,0],
        [0,0,0]
    ],
    rowsCount = 3,
    colsCount = 3,
    exitRow = 1,
    exitCol = 2;

console.log(calculateMin(maze1, rowsCount, colsCount, exitRow, exitCol));