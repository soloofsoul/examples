'use strict';

/*
 This function is provided to allow inheritance in TypeScript object.
 By default TypeScript is adding this method to each and every inheriting class
 so it is added plenty of times to project. What's more there is no way to test this
 function correctly when it is added during code generation.

 Function below is added just once to entire project, one require("extends") is needed.

 This function coresponds to ts (gulp-typescript) compiler option: noEmitHelpers.
 noEmitHelpers = true means that functions like __extends will not be auto generated and added to
 post compilation code, so we have control of the shape of that function.
 */

export var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) {
            //if (b.hasOwnProperty(p)) // unable to find a case when this check is required - commenting out
            d[p] = b[p];
        }
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };

