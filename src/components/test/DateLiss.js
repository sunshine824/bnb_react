import React, {Component} from 'react'

export default class DateLis extends Component{
    constructor(props){
        super()
    }

    render(){
        return(
            <li>{this.props.item}</li>
        )
    }
}