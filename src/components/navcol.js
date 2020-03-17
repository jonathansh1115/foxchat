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

            <div id='top'>
                <div>
                    <div id='logo' style={{display:'flex'}}>
                        <img src='../fox.svg' alt='' style={{height:'5vh'}} />
                        <h3>fox chat</h3>
                    </div>
                </div>
            </div>

            <div id='me'>
                <div style={{paddingLeft:'2vw'}}>
                    <h5>{myusername} (you)</h5>
                </div>
            </div>

            <div id='onlineusers'>
                {
                    onlineuser.map((item) => {
                        if (item.username !== myusername) {
                            return (
                                    <div style={{paddingLeft:'2vw', display:'flex', alignItems:'center', marginBottom:'1vh'}}>
                                        <div id='onlinedot'></div>
                                        &nbsp;&nbsp;
                                        <h5 style={{margin:'0'}}>{item.username}</h5>
                                    </div>
                            )
                        }
                        
                    })
                }
            </div>
           
        </div>
    )
}