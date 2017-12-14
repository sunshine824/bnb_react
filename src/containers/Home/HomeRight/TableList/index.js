import React, {Component} from 'react'
import HomeTableTr from '@/components/HomeTableTr'

import './style.less'

class TableList extends Component {
    render(){
        return(
            <div className="content-box-grid">
                <table className="table-roomcell-grid">
                    <HomeTableTr/>
                </table>
            </div>
        )
    }
}

export default TableList