import React, {Component} from 'react';
import shallowCompare from 'react/lib/shallowCompare';

export class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}
