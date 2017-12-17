import React, {Component} from 'react'
import ChooseDate from '../../components/test/ChooseDate'
import DateList from './DateList'
import {getHouseListData} from '@/fetch/HouseList'

export default class Test extends Component {

    componentDidMount() {
        this.getHouseList()
    }

    getHouseList() {
        const result = getHouseListData('123456')

        result.then((res)=>{
            return res.json()
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                <ChooseDate/>
                <DateList/>
            </div>
        )
    }
}