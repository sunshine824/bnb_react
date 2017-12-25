import React, {Component} from 'react'
import moment from 'moment'

import './style.less'

class HoverBox extends Component {
    render() {
        const {hoverData} = this.props
        let className = ''
        className = this.props.isShow ? 'show' : 'hide'
        return (
            <div className={"hover-box " + className}
                 style={{left: this.props.left, top: this.props.top}}>
                <div className="channel-name">
                    <span>
                        {
                            hoverData ?
                                hoverData[0].source_name !== null
                                    ? hoverData[0].source_name
                                    : ''
                                : ''
                        }
                    </span>
                </div>
                <h4 className="user-name">
                    {
                        hoverData ?
                            hoverData[0].name !== null ?
                                hoverData[0].name
                                : ''
                            : ''
                    }
                    &nbsp;&nbsp;
                    {
                        hoverData ?
                            hoverData[0].phone !== null ?
                                '(' + hoverData[0].phone + ')'
                                : ''
                            : ''
                    }
                </h4>
                <div className="data-info">
                    <span>
                        <em>
                            {
                                moment.unix(hoverData ?
                                    hoverData[0].sta_time
                                    : '')
                                    .format('MM-DD')
                            }
                        </em>
                    </span>
                    &nbsp;入住&nbsp;
                    <em>
                        {
                            moment.unix(hoverData ?
                                hoverData[0].com_time
                                : '')
                                .format('MM-DD')
                        }
                    </em>
                    &nbsp;退房&nbsp;
                    <strong>
                        {
                            hoverData ?
                                hoverData[0].dates
                                : ''
                        }
                    </strong>
                    &nbsp;天&nbsp;
                    <div className="tip-line"></div>
                    <div className="book-money">
                        <span>订单金额：<span className="c-red">￥{
                            hoverData ?
                                hoverData[0].revenue
                                : ''
                        }</span>
                        </span>
                    </div>
                    {
                        hoverData ?
                            hoverData[0].remark !== null ?
                                <div className="tip-line"></div>
                                : ''
                            : ''
                    }
                    <div className="remark">
                        <span>
                            {
                                hoverData ?
                                    hoverData[0].remark !== null ?
                                        '备注：' + hoverData[0].remark
                                        : ''
                                    : ''
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default HoverBox