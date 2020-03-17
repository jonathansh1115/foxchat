import React from 'react'
import './styles/navcol.css'

// libraries
import { Nav, NavItem } from 'reactstrap'

// utilities
import Socket from '../utils/socket'

export default () => {

    Socket.on('')

    return (
        <div>
            <Nav vertical style={{backgroundColor:'rgb(238, 238, 238)'}}>
                <NavItem>
                    <div className='absolute' style={{top:'0'}}>
                        <div id='logo' style={{display:'flex'}}>
                            <img src='../fox.svg' alt='' style={{height:'5vh'}} />
                            <h3>fox chat</h3>
                        </div>
                    </div>
                </NavItem>

                <NavItem>
                    <h1>Jonathan</h1>
                </NavItem>

                <NavItem>
                    <div id='divtobutton' className='absolute' style={{bottom:'0'}}>
                        <div id='logo' style={{display:'flex'}}>
                            <h3>Logout</h3>
                        </div>
                    </div>
                </NavItem>
            </Nav>
        </div>
    )
}