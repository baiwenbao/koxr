import React, {Component} from 'react';
import shallowCompare from 'react/lib/shallowCompare';

class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log(shallowCompare(this, nextProps, nextState));
        shallowCompare(this, nextProps, nextState);
    }
}

export default React.PureComponent || PureComponent;