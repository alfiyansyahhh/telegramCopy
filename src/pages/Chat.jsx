/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import '../css/Chat.css'
import "animate.css"
import {useState} from 'react'
import socket from '../config/socket'
import { useEffect } from 'react'
import plus from '../images/plus.svg'
import moment from "moment";
import {useHistory} from 'react-router-dom'
import users from '../redux/actions/users'
import { useSelector, useDispatch } from 'react-redux'
import MenuComponen  from '../componen/menu.jsx'
import RoomChat from '../componen/Roomchat'

const Chat = () => {

    const username = localStorage.getItem('username')
    const id = localStorage.getItem('idUser')
    const dispatch = useDispatch()
    const history = useHistory()
    const timeLocal = (time) => {
        const local = moment(time).local("id");
        return local;
    };

    const [History, setHistory] = useState([])
    const [ListMsg, setListMsg] = useState([])
    const [select, setSelect] = useState([])
    const Datausers = useSelector((state) => state.users.Alluser)
    const Datauser = useSelector((state) => state.users.user)
    const [search, setSearch] = useState("")
    const [HideInfo, setHideInfo] = useState(true)
    const [HideChat, setHideChat] = useState(true)
    const [Checked, setChecked] = useState(false)
    const [display, setDisplay] = useState(true)
    const [chatList, setchatList] = useState(false)
    const [DataChats, setDataChats] = useState({
        sender: username,
        receiver:'',
        msg:''
    })

    
    socket.emit('login', username);

    useEffect(() => {
        dispatch(users.ACTION_GET_ALL_USERS(search))
        dispatch(users.ACTION_GET_USER_DETAIL(id))
        setHideChat(true)
        socket.emit('login', username);
    }, [])

    useEffect(() => {
        socket.on("get-message-private", (payload) => {
            setListMsg([...ListMsg, payload])       
        })  
        socket.on("get-history-chat", (payload) => {
            setHistory(payload)       
        })      
        socket.on('get-delete-message', (payload) => { 
            setHistory(payload)  
            setListMsg([])     
        })          
    })

    useEffect(() => {
        setUpdate({
            picture : "",
            imagePriview: `${process.env.REACT_APP_API_URL}/${Datauser.picture}`,
            username: Datauser.username,
            email: Datauser.email,
            phone_number: Datauser.phone_number,
        })
    }, [Datauser])

    const handleHideInfo = () => {
        setHideInfo(!HideInfo)
    }

    const handleProfile = () => {
        setHideChat(true)
    }

    const logout = () => {
        localStorage.clear();
        history.push('/')
    }

    const handleSelect =(e,id)=> {
       if (e.target.checked === true) {
            setSelect([...select, id])
       } else {
            const x = select.findIndex((e)=> e === id)
            select.splice([x],1)
       }
    }

    const handleDeleteChat = (e) => {
       e.preventDefault()
       if (select.length !== 0){
            setChecked(true)
            setDisplay(true)
            const payload = {
                data: select.toString(),
                sender: username, receiver: DataChats.receiver
            }
            socket.emit("delete-message", payload) 
            socket.on('get-delete-message', (payload) => {
                setListMsg(payload)   
            })   
            chatting(DataChats.receiver)
       } else {
           alert("pliese select")
       }
    }
  
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(users.ACTION_GET_ALL_USERS(search))
    }

    const handleClick = () => {
        chatting(DataChats.receiver)
        setDisplay(false)
        setChecked(false)
        setSelect([])
    }

    const handleCancelMs = () => {
        setDisplay(true)
        setChecked(true)
        setSelect([])
    }

    const handleChatlist = () => {
        setchatList(!chatList)
    }

    const handlebackHideChat = () => {
        setchatList(!chatList)
    }

    const insertChat = (e) => {
        setDataChats({
            ...DataChats,
            msg:e.target.value
        })
    }

    const insertFile = (e) => {
        setUpdate({
            ...update,
            picture: e.target.files[0],
            imagePriview: URL.createObjectURL(e.target.files[0])
        })
    }
 
    const insertUpdate = (e) => {
        setUpdate({...update,
            [e.target.name]:e.target.value
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
        socket.emit('send-message-private', DataChats)
        if (DataChats) {
            setListMsg([...ListMsg, DataChats])
            setDataChats({
                ...DataChats,
                msg: ""
            })
        }
       
    }

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const [update, setUpdate] = useState({
        picture : "",
        imagePriview: `${process.env.REACT_APP_API_URL}/${Datauser.picture}`,
        username: Datauser.username,
        email: Datauser.email,
        phone_number: Datauser.phone_number,
    })

    const submitUpdate = (e) => {
        
        e.preventDefault();

        const formData = new FormData()
        formData.append("image", update.picture)
        formData.append("username", update.username)
        formData.append("email", update.email)
        formData.append("phone_number", update.phone_number)
        console.log(formData, " ini data di page")
        users.ACTION_UPDATE(formData,id).then((response) => {
            dispatch(users.ACTION_GET_ALL_USERS(search))
            alert("succes")
            dispatch(users.ACTION_GET_ALL_USERS())
            dispatch(users.ACTION_GET_USER_DETAIL(id))
        }).catch((err) => {
            console.log(err)
            alert(err)
        })
    }

    return(
            <div className="roomChat w-100" >
                <div className={ chatList === false?("chatList col-12 col-lg-3"):("chatList d-none")}>
                <MenuComponen 
                handleChatlist={handleChatlist}
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
                submitUpdate={submitUpdate} 
                insertFile={insertFile}
                insertUpdate ={insertUpdate}
                update={update}
                id={id}
                />
                </div>
                <div  className={HideChat === true? ("d-none d-sm-block col"):("d-none")}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <p>Please select a chat to start messaging</p>
                    </div>          
                </div>

                <div className={ chatList === true?("RoomChatMobile col-12 col-lg-3 w-100"):("RoomChatMobile d-none test")}>
                    <RoomChat 
                    sendChats={sendChats}
                    History={History}
                    Checked={Checked}
                    handleHideInfo={handleHideInfo}
                    handleSelect={handleSelect}
                    handleDeleteChat={handleDeleteChat}
                    handleClick={handleClick}
                    handleCancelMs={handleCancelMs}
                    handlebackHideChat={handlebackHideChat}
                    insertChat={insertChat}
                    display={display}
                    timeLocal={timeLocal}                
                    HideChat={HideChat}
                    HideInfo={HideInfo}
                    Datausers={Datausers}
                    DataChats={DataChats}
                    username={username}
                    ListMsg={ListMsg}
                    />
                </div>
                
                <div className={HideChat === false? (HideInfo === false ? ("web col-12 col-lg-6"):("web col-12 col-lg-9")):("web d-none")}>
                    <RoomChat 
                        sendChats={sendChats}
                        History={History}
                        Checked={Checked}
                        handleHideInfo={handleHideInfo}
                        handleSelect={handleSelect}
                        handleDeleteChat={handleDeleteChat}
                        handleClick={handleClick}
                        handleCancelMs={handleCancelMs}
                        handlebackHideChat={handlebackHideChat}
                        insertChat={insertChat}
                        display={display}
                        timeLocal={timeLocal}
                        HideChat={HideChat}
                        HideInfo={HideInfo}
                        Datausers={Datausers}
                        DataChats={DataChats}
                        username={username}
                        ListMsg={ListMsg}
                    />
                </div>

                <div className={HideInfo === false ? ("detailReceiver col-12 col-lg-3 "):("detailReceiver2")}>
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
                </div>                
            </div>
         
    )
}

export default Chat