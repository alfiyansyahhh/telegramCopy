/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import '../css/Chat.css'
import { Row, Col } from 'reactstrap';
import "animate.css"
import {useState} from 'react'
import socket from '../config/socket'
import { useEffect } from 'react'
import plus from '../images/plus.svg'
import foto from '../images/foto.svg'
import stiker from '../images/stiker.svg'
import info from '../images/info.svg'
import { Form, FormGroup, Input } from 'reactstrap';
import moment from "moment";
import {useHistory} from 'react-router-dom'
import users from '../redux/actions/users'
import { useSelector, useDispatch } from 'react-redux'
import MenuComponen  from '../componen/menu.jsx'


const Chat = () => {
    const username = localStorage.getItem('username')
    const id = localStorage.getItem('idUser')
    const dispatch = useDispatch()
    
    socket.emit('login', username);

    const [History, setHistory] = useState([])
    const [ListMsg, setListMsg] = useState([])
    const Datausers = useSelector((state) => state.users.Alluser)
    const Datauser = useSelector((state) => state.users.user)
       console.log(Datauser, "ini users")
  
    const [update, setUpdate] = useState({
        image : "",
        imagePriview: `${process.env.REACT_APP_API_URL}/${Datauser.picture}`,
        username: Datauser.username,
        email: Datauser.email,
        phone_number: Datauser.phone_number,
    })

    console.log(update)
    
    const [DataChats, setDataChats] = useState({
        sender: username,
        receiver:'',
        msg:''
    })

    const [search, setSearch] = useState("")


    const [Menu, setMenu] = useState(false)
    const [Setting, setSetting] = useState(false)
    const [HideInfo, setHideInfo] = useState(true)
    const [HideChat, setHideChat] = useState(true)

    console.log(Setting)
  

    const handleHide = () => {
        setMenu(!Menu)
    }
    const handleHideInfo = () => {
        setHideInfo(!HideInfo)
    }
    const handleProfile = () => {
        setHideChat(true)
    }
    const handleSetting = () => {
        setSetting(true)
        setMenu(!Menu)
    }
    const handleBack = () => {
        setSetting(false)
    }

    const history = useHistory()

    const logout = () => {
        localStorage.clear();
        history.push('/')
    }

    useEffect(() => {
        dispatch(users.ACTION_GET_ALL_USERS(search))
        dispatch(users.ACTION_GET_USER_DETAIL(id))
        setHideChat(true)
    }, [])
    
    useEffect(() => {
        setUpdate({
            picture : "",
            imagePriview: `${process.env.REACT_APP_API_URL}/${Datauser.picture}`,
            username: Datauser.username,
            email: Datauser.email,
            phone_number: Datauser.phone_number,
        })
   }, [Datauser])

    
    const timeLocal = (time) => {
        const local = moment(time).local("id");
        return local;
    };

    var time = new Date();

    useEffect(() => {
        socket.on("get-message-private", (payload) => {
            setListMsg([...ListMsg, payload])       
        })  
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

    const insertUpdate = (e) => {
        setUpdate({...update,
            [e.target.name]:e.target.value
        })
    }
    
    const insertFile = (e) => {
        setUpdate({
            ...update,
            picture: e.target.files[0],
            imagePriview: URL.createObjectURL(e.target.files[0])
        })
    }

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(users.ACTION_GET_ALL_USERS(search))
    }

    const submitUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", update.image)
        formData.append("username", update.username)
        formData.append("email", update.email)
        formData.append("phone_number", update.phone_number)
        users.ACTION_UPDATE(formData,id).then((response) => {
            console.log(response)
            dispatch(users.ACTION_GET_ALL_USERS())
            dispatch(users.ACTION_GET_USER_DETAIL(id))
        }).catch((err) => {
            console.log(err)
            alert(err)
        })
    }
    

    return(
            <Row className="roomChat" >
            <Col lg="3" className="chatList">
               <MenuComponen 
               Datausers={Datausers}
               Datauser={Datauser}
               handleSearch={handleSearch}
               search={search}
               changeSearch={changeSearch}
               plus={plus}
               username={username}
               chatting={chatting}
               logout={logout}
               handleProfile={handleProfile}
               update={update}
               insertFile={insertFile}
               insertUpdate={insertUpdate}
               submitUpdate={submitUpdate}
               />
            </Col>


            <Col className={HideChat === true? ("profilePage"):("profilePageHide")}>
                <div className="d-flex justify-content-center align-items-center h-100">
                <p>Please select a chat to start messaging</p>
                </div>
            </Col>
            <Col className={HideChat === true? ("pusatHide"):("pusat")}>                   
                  
                        {Datausers.map((e) => {
                            if(e.username === DataChats.receiver){
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
                                            <div className="date">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
                                        </div>
                                    </div>                                
                                ):( 
                                    <div className="chatReceiver">
                                    <div className="isiChatsReceiver">
                                        <div className="pesan2">{e.msg}</div>
                                        <div className="date2">{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>

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
                    {Datausers.map((e) => {
                        if (e.username === DataChats.receiver) {
                            return(
                                <div>
                                    <div className="ppR"><img src={`${process.env.REACT_APP_API_URL}/${e.picture}`} /></div>
                                    <div className="usR">{e.username}</div>
                                    <div className="emR">{e.email}</div>
                                    <div className="emR">(+ 62) {e.phone_number}</div>
                                </div>
                            )
                        }
                    })}
            </Col>
            </Row>
    )
}

export default Chat