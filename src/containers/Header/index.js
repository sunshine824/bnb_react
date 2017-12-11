import React, {Component} from 'react'
import HeadLogo from '@/components/HeadLogo'
import HeadNav from '@/components/HeadNav'
//import HeadHandle from '@/components/HeadHandle'

import './style.less'

class Header extends Component{
    render(){
        return(
            <header className="header">
                <HeadLogo/>
                <HeadNav/>
                {/*<HeadHandle/>*/}
            </header>
        )
    }
}

export default Header