import React, {Component} from 'react'

import './style.less'

class HoverBox extends Component {
    render() {
        let className = ''
        className = this.props.isShow ? 'show' : 'hide'
        return (
            <div className={"hover-box " + className}
                 style={{left: this.props.left, top: this.props.top}}>
                <div className="channel-name">
                    <span>上门客</span>
                </div>
                <h4 className="user-name">陈鑫 (18040431885)</h4>
                <div className="data-info">
                    <span>
                        <em>12-19</em>
                    </span>
                    &nbsp;入住&nbsp;
                    <em>12-20</em>
                    &nbsp;退房&nbsp;
                    <strong>1</strong>
                    &nbsp;天&nbsp;
                    <div className="tip-line"></div>
                    <div className="book-money">
                        <span>订单金额：<span className="c-red">￥744</span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default HoverBox