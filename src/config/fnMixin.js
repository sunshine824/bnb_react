import React, {Component} from 'react'

/**
 * 异步加载组件
 * @param importComponent
 * @returns {AsyncComponent}
 */
export function asyncComponent(importComponent) {
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
export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 原生js实现添加class
 * @param obj
 */
export function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}

/**
 * 原生js实现移除class
 * @param obj
 * @param cls
 */
export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

/**
 * 检查是否有时间冲突
 * @param moment  时间集合
 * @param calendarObj  日历列表
 * @param obj  当前选择时间
 * @param id   房间id
 * @returns {boolean}
 */
export function checkClash(moment, calendarObj, obj, id) {
    if (calendarObj[id]) {  //当前房间中有订单
        const arrOrderDate = []
        calendarObj[id].map((item, index) => {
            const sta_time = moment.unix(item.sta_time).format('YYYY-MM-DD')
            const end_time = moment.unix(item.com_time).format('YYYY-MM-DD')
            arrOrderDate.push([
                sta_time,
                end_time
            ])
        })
        for (let i = 0; i < arrOrderDate.length; i++) {
            obj.sort()
            const begin = [obj[0], arrOrderDate[i][0]].sort()
            const over = [obj[1], arrOrderDate[i][1]].sort()
            if (begin[1] < over[0]) {  //时间段有重叠
                return true
            }
        }
    } else {  //若当前房间没订单

    }
}
