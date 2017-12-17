import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'

class Income extends Component{

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    render(){
        return(
            <div>合作收益</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        states: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_path
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Income)