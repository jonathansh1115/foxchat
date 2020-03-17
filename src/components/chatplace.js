import React, { useState, useEffect } from 'react'
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

    const [value, setValue] = useState('')
    const [chats, setChats] = useState([{username: 'Edwind', message: 'What did the ocean say to another ocean?', timestamp: 1544532325758},
    {username: 'Liren', message: 'sea you later?', timestamp: 1544532341078},
    {username: 'Edwind', message: 'Nothing. It just waved', timestamp: 1544532347412},
    {username: 'Josh', message: "I'm leaving this chatroom", timestamp: 1544532402998},
])

    const send = () => {
        const trimmedValue = value.trim()
        if (trimmedValue !== '') {
            console.log(trimmedValue)
            setValue('')
        } else {
            console.log('nothing')
        }
    }

    useEffect(() => {
        Socket.emit('NEW_USER')

        Socket.on('GET_CURRENT_USER', newUser => {
            
        })
    }, [])
    
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

                {/* <div className='chats'>
                    <div style={{width:'11%', backgroundColor:'blue'}}>
                        <img className='profilepic' src='https://api.adorable.io/avatars/400/abott@adorable.io.png' alt='' />
                    </div>
                    <div className='inside'>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h6 className='nomar'>Name</h6>
                            <p className='nomar'>18:00</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis soluta, dolore recusandae unde et neque saepe possimus labore iste modi nostrum sit facilis eum a beatae aspernatur provident repellendus explicabo!</p>
                    </div>
                </div> */}
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
                    />
                </div>
            </footer>
        </div>
    )
}