import '../css/Chat.css'
import { Row, Col, Container } from 'reactstrap';
import "animate.css"
import {useState} from 'react'
import socket from '../config/socket'
import { useEffect } from 'react'
import axios from 'axios';
import plus from '../images/plus.svg'
import foto from '../images/foto.svg'
import stiker from '../images/stiker.svg'
import pp from '../images/pp.png'
import info from '../images/info.svg'
import garis from '../images/garis.svg'
import cari from '../images/cari.svg'
import { Form, FormGroup, Input } from 'reactstrap';
import moment from "moment";
import {useHistory} from 'react-router-dom'

const Chat = () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    socket.emit('login', username);

    const [users, setusers] = useState([])
    const [History, setHistory] = useState([])
    const [ListMsg, setListMsg] = useState([])
    const [Hide, setHide] = useState(false)
    const [HideInfo, setHideInfo] = useState(true)
    const [HideChat, setHideChat] = useState(true)

    const handleHide = () => {
        setHide(!Hide)
    }
    const handleHideInfo = () => {
        setHideInfo(!HideInfo)
    }
    const handleProfile = () => {
        setHideChat(true)
    }

    const [DataChats, setDataChats] = useState({
        sender: username,
        receiver:'',
        msg:''
    })

    const history = useHistory()
    const logout = () => {
        localStorage.clear();
        history.push('/')
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`, { headers: { token: token} })
        .then((response) => {
            setusers(
                response.data.data.users   
            )
        }).catch((err) => {
            console.log(err)
        })
        setHideChat(true)
    }, [])

    
    const timeLocal = (time) => {
        const local = moment(time).local("id");
        return local;
    };


    useEffect(() => {
        socket.on("get-message-private", (payload) => {
            setListMsg([...ListMsg, payload])       
        })  
        // setListMsg([])
        socket.on("get-history-chat", (payload) => {
            setHistory(payload)       
        })                 
    })

    const insertChat = (e) => {
        setDataChats({
            ...DataChats,
            msg:e.target.value
        })
    }

    const chatting = (receiver) => {
        setDataChats({
            ...DataChats,
            receiver
        })  
        const payload = {
            sender: username, receiver
        }
        socket.emit('get-chat-history', payload) 
        setListMsg([])
        socket.on("get-history-chat", (payload) => {
            setHistory(payload)       
        })  
        setHideChat(false)
    }    

    const sendChats = (e) => {
        e.preventDefault();
        setListMsg([...ListMsg, DataChats])
        socket.emit('send-message-private', DataChats)
        setDataChats({
            ...DataChats,
            msg: ""
        })
    }
    

    return(
            <Row className="roomChat" >
            <Col lg={Hide === false?(3):(1)} className={Hide === false? ("chatList"):("chatListMini")}>
                <div className="title">
                    <div className="tt">
                        Telegram
                    </div>
                    <div><img className="tt2" src={garis} onClick={handleHide}/></div>                 
                </div>
                <div className="profile">
                    {users.map((e) => {
                        if(e.username === username){
                            return(
                                <div className="profile">
                                    <img  src={`${process.env.REACT_APP_API_URL}/${e.picture}`} onClick={handleProfile}/>
                                    <div className="name">{e.username}</div>
                                    <div className="username">@{e.username}</div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="cari">
                    <img className="tcari" src={cari} />
                    <input 
                        placeholder="Type your message..."
                    />
                    <img className="tambahCari"src={plus} />
                </div>

                <div className="contactChat">
                {users.map((e) => {
                    if(e.username !== username){
                        return(
                            <div className="cardContact" onClick={() => chatting(e.username)}>
                                <div> <img src={`${process.env.REACT_APP_API_URL}/${e.picture}`} className="ppContact" /> </div>
                                <div className="nameContact">
                                    <div>{e.username}</div>
                                    <div className="jam">7:30</div>
                                </div>
                                
                            </div>
                        )
                    }                 
                })}
                </div>
            </Col>
            <Col className={HideChat === true? ("profilePage"):("profilePageHide")}>
                <div className="profileSender">
                    <div className="psp">
                    {users.map((e) => {
                        if(e.username === username) {
                            return(
                                <div>
                                    <img className='ps' src={`${process.env.REACT_APP_API_URL}/${e.picture}`}/>
                                    <div className="usernameP">{e.username}</div>
                                    <div className="emailP">{e.email}</div>
                                    <div className="phoneP">(+62) {e.phone_number}</div>
                                </div>                    
                            )
                        }               
                    })}
                    <div >
                        <Form >
                             <FormGroup>
                                <Input 
                                className="bio"
                                type="textarea" 
                                name="text" 
                                placeholder="bio"
                                id="exampleText" />
                            </FormGroup>
                        </Form>
                    </div>
                    <div>
                        <button onClick={logout} className="logout">Logout</button>
                    </div>
                    </div>
                    <div className="menu1">
                        <img onClick={handleHideInfo} className="info"src={info}/>
                    </div>
                </div> 
            </Col>
            <Col className={HideChat === true? ("pusatHide"):("pusat")}>
                   
                        {users.map((e) => {
                            if (e.username === DataChats.receiver) {
                                return(
                                    <div className="profileChats">
                                        <div className="tts">
                                        <img onClick={handleHideInfo} className="pp" src={`${process.env.REACT_APP_API_URL}/${e.picture}`}/> 
                                        <div className="uss">{e.username}</div>
                                        </div>
                                        <div>
                                            <img onClick={handleHideInfo} className="info"src={info}/>
                                        </div> 
                                    </div>
                                    
                                )
                            }                       
                        })}
                           
                     
                    <div className="bungkusChats">
                        {History.map((e) => {
                            if (e.receiver === DataChats.receiver || e.sender === DataChats.receiver) {
                                return(                
                                    <div className="chats">
                                    {e.sender === username?( 
                                        <div className="chatSender">
                                            <div className="isiChatsSender">
                                                <div className="pesan">{e.message}</div>
                                                <div className="date">{timeLocal(e.created_at).format("LT")}</div>
                                            </div>
                                        </div>                                
                                    ):( 
                                        <div className="chatReceiver">
                                        <div className="isiChatsReceiver">
                                            <div className="pesan2">{e.message}</div>
                                            <div className="date2">{timeLocal(e.created_at).format("LT")}</div>
                                        </div>
                                    </div>  
                                    )}
                                    </div>                       
                                )
                            }
                        })}
                    {ListMsg.map((e) => {
                        if(e.receiver === DataChats.receiver || e.sender === DataChats.receiver){
                            return(
                            
                                <div className="chats">
                                {e.sender === username?( 
                                    <div className="chatSender">
                                        <div className="isiChatsSender">
                                            <div className="pesan">{e.msg}</div>
                                        </div>
                                    </div>                                
                                ):( 
                                    <div className="chatReceiver">
                                    <div className="isiChatsReceiver">
                                        <div className="pesan2">{e.msg}</div>
                                    
                                    </div>
                                </div>  
                                )}
                                </div>                       
                            )
                        }                                   
                    })}
                    </div>
                    <div className="inputChats">         
                    <form className="formInput" onSubmit={sendChats}>
                        <input 
                        type="text"
                        value={DataChats.msg}
                        placeholder="Text Here"
                        onChange={insertChat}
                        />
                        <img src={plus}/>
                        <img src={stiker}/>
                        <img src={foto}/>
                    </form>
                    </div>
            </Col>
            <Col lg="3" className={HideInfo === false ? ("detailReceiver"):("detailReceiver2")}>
                    {users.map((e) => {
                        if (e.username === DataChats.receiver) {
                            return(
                                <div>
                                    <div className="ppR"><img src={`${process.env.REACT_APP_API_URL}/${e.picture}`} /></div>
                                    <div className="usR">{e.username}</div>
                                    <div className="emR">{e.email}</div>
                                </div>
                            )
                        }
                    })}
            </Col>
            </Row>
    )
}

export default Chat