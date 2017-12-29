import React, {Component} from 'react'

/**
 * 异步加载组件
 * @param importComponent
 * @returns {AsyncComponent}
 */
export function asyncComponent(importComponent){
    class AsyncComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                component: null
            }
        }
        async componentDidMount() {
            const {default: component} = await importComponent()
            this.setState({component})
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent
}


/**
 * 原生js实现hasClass
 * @param obj  dom
 * @param cls   class
 * @returns {Array|{index: number, input: string}}
 */
export function hasClass (obj,cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 原生js实现添加class
 * @param obj
 */
export function addClass(obj,cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}

/**
 * 原生js实现移除class
 * @param obj
 * @param cls
 */
export function removeClass(obj,cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}