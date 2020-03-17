import React, { useState, useEffect, useRef } from 'react'
import './styles/chatplace.css'

// icons
import rightIcon from "../icons/align-right.svg"
import leftIcon from "../icons/align-left.svg"
import centerIcon from "../icons/align-center.svg"
import justifyIcon from "../icons/align-justify.svg"

// libraries
import { Button } from 'reactstrap'
import moment from 'moment'

// utilities
import Socket from '../utils/socket'

export default () => {
    const bottom = useRef()

    const [myusername, setMyusername] = useState('')
    const [value, setValue] = useState('')
    const [chats, setChats] = useState([])

    useEffect(() => {
        Socket.on('RECEIVE_BROADCAST', (data) => {
            setChats(oldChats => [...oldChats, data])
        })

        Socket.on("HAS_ERROR", e => {
            console.log(e)
        })

        Socket.on('GET_CURRENT_USER', (data) => {
            setMyusername(data.username)
        })
    }, [])

    useEffect(() => {
        bottom.current.scrollIntoView()
    }, [chats])

    const send = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== '') {
            console.log(trimmedValue)
            let ob = {
                username: myusername,
                message: value,
                timestamp: Date.now()
            }
    
            Socket.emit('BROADCAST_MESSAGE', ob)
        } else {
            console.log('nothing')
        }
        
        setValue('')
    }

    
    return (
        <div>
            <header></header>

            <main>

                {
                    chats.map((item) => (
                        <div className='chats'>
                            <div style={{width:'11%'}}>
                                <img className='profilepic' src='https://api.adorable.io/avatars/400/abott@adorable.io.png' alt='' />
                            </div>
                            <div className='inside'>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <h6 className='nomar'>{item.username}</h6>
                                    <p className='nomar' style={{color:'grey'}}>
                                        {moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                    </p>
                                </div>
                                <p>{item.message}</p>
                            </div>
                        </div>
                    ))
                }
                <span ref={bottom}></span>
            </main>

            <footer>
                <div className='top'>
                    <div className='left'>
                        <Button color="light" style={{marginRight:'1vw'}}>
                            <img src={leftIcon} alt='' />
                        </Button>

                        <Button color="light" style={{marginRight:'1vw'}}>
                            <img src={centerIcon} alt='' />
                        </Button>

                        <Button color="light" style={{marginRight:'1vw'}}>
                            <img src={rightIcon} alt='' />
                        </Button>

                        <Button color="light" style={{marginRight:'1vw'}}>
                            <img src={justifyIcon} alt='' />
                        </Button>
                    </div>

                    <div className='right'>
                        <Button color='success' onClick={send}>
                            Send
                        </Button>
                    </div>
                </div>

                <div id='input' className="form-group">
                    <textarea className="form-control" rows="5"
                    value={value} 
                    onInput={e => setValue(e.target.value)}
                    onKeyUp={e => {
                        if (e.keyCode == 13) {
                            send()
                        }
                    }}
                    />
                </div>
            </footer>
        </div>
    )
}