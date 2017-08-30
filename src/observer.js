import autorun from './autorun';
import React, {Component} from 'react';
import {beginCollect, endCollect} from './manager';

const observer = Target => {
    const {render, componentWillMount, componentDidMount} = Target.prototype;
    if (!render) {
        return class extends Component {
            componentWillMount() {
                beginCollect(() => {
                    this.forceUpdate();
                });
            }
            componentDidMount() {
                endCollect();
            }
            render() {
                return <Target {...this.props}/>;
            }
        }
    } else {
        Target.prototype.componentWillMount = function() {
            componentWillMount && componentWillMount();
            beginCollect(() => {
                this.forceUpdate();
            });
        };
        Target.prototype.componentDidMount = function() {
            componentDidMount && componentDidMount();
            endCollect();
        };
    }
    return Target;
};

export default observer;