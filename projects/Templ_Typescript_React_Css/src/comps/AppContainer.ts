'use strict';

import React = require('react');

// enable inheritance
var __extends = require('../extensions/Extends').__extends;

class AppContainer extends React.Component<{}, {}> {

    public render(): React.ReactElement<any> {
        return React.DOM.div({ id: 'appContainer' }, 'React DIV component on Typescript');
    }
}

function factory(props: any) {
    return React.createElement(AppContainer, props);
}

export = factory