'use strict';

import React = require('react');

// enable inheritance
import __extends = require('./extensions/Extends').__extends();

class TestComp extends React.Component<{}, {}> {
    public render(): React.ReactElement<any> {
        console.log('render el');
        return React.DOM.div(null, 'React DIV component');
    }
}

function factory(props: any) {
    return React.createElement(TestComp, props);
}

export = factory