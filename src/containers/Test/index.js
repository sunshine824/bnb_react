import React, {Component} from 'react'
import ChooseDate from '../../components/ChooseDate'
import DateList from './DateList'

export default class Test extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <ChooseDate/>
                <DateList/>
            </div>
        )
    }
}