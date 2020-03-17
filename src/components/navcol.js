import React, { useEffect, useState } from 'react'
import './styles/navcol.css'

// libraries
import { Nav, NavItem } from 'reactstrap'

// utilities
import Socket from '../utils/socket'

export default () => {

    const [myusername, setMyusername] = useState('')
    const [onlineuser, setOnlineuser] = useState([])

    useEffect(() => {
        Socket.emit('NEW_USER')

        Socket.on('GET_CURRENT_USER', (data) => {
            setMyusername(data.username)
        })

        Socket.on('UPDATE_USER_LIST', (data) => {
            setOnlineuser(data)
        })
    }, [])

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

                {
                    onlineuser.map((item) => {
                        if (item.username !== myusername) {
                            return (
                                <NavItem>
                                    <div className='absolute'>
                                        <h5>{item.username}</h5>
                                    </div>
                                </NavItem>
                            )
                        }
                        
                    })
                }

                <NavItem>
                    <div className='absolute'>
                        <h5>{myusername} (you)</h5>
                    </div>
                </NavItem>
                
            </Nav>
        </div>
    )
}