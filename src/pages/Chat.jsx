/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import '../css/Chat.css'
import { Row, Col, FormGroup, Label, Input, Container } from 'reactstrap';
import "animate.css"
import {useState} from 'react'
import socket from '../config/socket'
import { useRef,useEffect } from 'react'
import plus from '../images/plus.svg'
import foto from '../images/foto.svg'
import stiker from '../images/stiker.svg'
import info from '../images/info.svg'
import moment from "moment";
import {useHistory} from 'react-router-dom'
import users from '../redux/actions/users'
import chats from '../redux/actions/chats'
import { useSelector, useDispatch } from 'react-redux'
import MenuComponen  from '../componen/menu.jsx'
import { GrClose, GrFormPreviousLink } from "react-icons/gr";
import { BiCheckDouble, BiCheck } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Chat = () => {
    const username = localStorage.getItem('username')
    const id = localStorage.getItem('idUser')
    const dispatch = useDispatch()
    
    socket.emit('login', username);

    const [History, setHistory] = useState([])
    const [ListMsg, setListMsg] = useState([])
    const [select, setSelect] = useState([])
    const Datausers = useSelector((state) => state.users.Alluser)
    const Datauser = useSelector((state) => state.users.user)

    console.log(ListMsg)
    const [DataChats, setDataChats] = useState({
        sender: username,
        receiver:'',
        msg:''
    })

    const [search, setSearch] = useState("")
    const [HideInfo, setHideInfo] = useState(true)
    const [HideChat, setHideChat] = useState(true)
    const [Checked, setChecked] = useState(false)
    const [display, setDisplay] = useState(true)


    const handleHideInfo = () => {
        setHideInfo(!HideInfo)
    }
    const handleProfile = () => {
        setHideChat(true)
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
   
    const timeLocal = (time) => {
        const local = moment(time).local("id");
        return local;
    };

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
        socket.emit('send-message-private', DataChats)
        if (DataChats) {
            chatting(DataChats.receiver)
            setListMsg([])
            setDataChats({
                ...DataChats,
                msg: ""
            })
        }
       
    }

    const changeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(users.ACTION_GET_ALL_USERS(search))
    }

    const [update, setUpdate] = useState({
        picture : "",
        imagePriview: `${process.env.REACT_APP_API_URL}/${Datauser.picture}`,
        username: Datauser.username,
        email: Datauser.email,
        phone_number: Datauser.phone_number,
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

    const submitUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", update.picture)
        formData.append("username", update.username)
        formData.append("email", update.email)
        formData.append("phone_number", update.phone_number)
        console.log(formData, " ini data di page")
        users.ACTION_UPDATE(formData,id).then((response) => {
            alert("succes")
            dispatch(users.ACTION_GET_ALL_USERS())
            dispatch(users.ACTION_GET_USER_DETAIL(id))
        }).catch((err) => {
            console.log(err)
            alert(err)
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

    const handleClick = () => {
        setDisplay(false)
        chatting(DataChats.receiver)
        setChecked(false)
        setSelect([])
    }

    const handleCancelMs = () => {
        setDisplay(true)
        setChecked(true)
        setSelect([])
    }

    const [chatList, setchatList] = useState(false)
    const handleChatlist = () => {
        setchatList(!chatList)
    }

    const handlebackHideChat = () => {
        setchatList(!chatList)
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
                <div className={HideChat === false? (HideInfo === false ? ("col-12 col-lg-6"):("col-12 col-lg-9")):("d-none")} >
                    <div className="pusat">
                        <div className="profileCol">
                            {Datausers.map((e) => {
                                if(e.username === DataChats.receiver){
                                    return(
                                    <div >
                                        {display===true?(
                                            <div className="profileChats">
                                                <div className="tts">
                                                    < GrFormPreviousLink size={30} onClick={handlebackHideChat} className="me-3 d-block d-sm-none"/>
                                                    <img onClick={handleHideInfo} className="pp" src={`${process.env.REACT_APP_API_URL}/${e.picture}`}/> 
                                                    <div className="uss">{e.username}</div>
                                                </div>

                                                <div>
                                                <img onClick={handleHideInfo} className="info"src={info}/>
                                                </div>
                                            </div>
                                        ):(
                                            <div className="profileChats">
                                                <div className="w-10 pointer d-flex justify-content-start align-items-center">
                                                    < GrClose onClick={handleCancelMs} />
                                                </div>

                                                <form onSubmit={handleDeleteChat} className="pointer w-75 d-flex justify-content-end align-items-center">
                                                   
                                                    <button className="buttonsubmitd" type="submit"> < MdDelete className="w-20" size={30} /></button>
                                                </form>
                                            </div>
                                        )}
                                        
                                    </div>
                                    )
                                }
                            })}
                        </div>
                
                        <div className="chatCol">                                                 
                            <div className="bungkusChats">
                                {History.map((e) => {
                                    if (e.receiver === DataChats.receiver || e.sender === DataChats.receiver) {
                                        return(                
                                            <div className="chats"  >
                                            {e.sender === username?( 
                                                <div className="chatSender" >
                                                     <form className="formi" onSubmit={handleDeleteChat}>
                                                        <label
                                                            check
                                                            for={e.id}
                                                            >
                                                            <div className="isiChatsSender" onDoubleClick={handleClick}>
                                                            
                                                                <div className="pesan">{e.message}</div>
                                                                <div className="date">{timeLocal(e.created_at).format("hh:mm")}</div> 
                                                                <BiCheck className="mt-1 me-2"/>
                                                            </div>
                                                        </label>
                                                        
                                                        {Checked===true?( 
                                                            <input 
                                                            id={e.id}
                                                            type="checkbox"
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            className={display===true?("d-none"):("d-flex")}
                                                            checked={false}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        ):(
                                                            <input
                                                            id={e.id}
                                                            type="checkbox"
                                                            className={display===true?("d-none"):("d-flex")}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        )}                                               
                                                     </form>
                                                </div>                                
                                            ):( 
                                                <div className="chatReceiver"  >
                                                    <form className="formR">
                                                        {Checked===true?(
                                                            <input 
                                                            id={e.id}
                                                            type="checkbox"
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            className={display===true?("d-none"):("d-flex")}
                                                            checked={false}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        ):(
                                                            <input
                                                            id={e.id}
                                                            type="checkbox"
                                                            className={display===true?("d-none"):("d-flex")}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        )}     
                                                        <label
                                                        check
                                                        for={e.id}
                                                        >             
                                                        <div className="isiChatsReceiver ms-2" onDoubleClick={handleClick}>
                                                            <div className="pesan2">{e.message}</div>
                                                            <div className="date2">{timeLocal(e.created_at).format("hh:mm")}</div>
                                                        </div>
                                                        </label> 
                                                        
                                                    </form>
                                                    
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
                                            <div className="chatSender" >
                                                <form className="formi">
                                                    <label 
                                                    check
                                                    for={e.id}>
                                                    <div className="isiChatsSender" onDoubleClick={handleClick}>
                                                        <div className="pesan">{e.msg}</div>
                                                        <div className="date">{moment().format('hh:mm')}</div>
                                                        <BiCheck className="mt-1 me-2"/>
                                                    </div>
                                                    </label>
                                                    {Checked===true?(
                                                            <input 
                                                            id={e.id}
                                                            type="checkbox"
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            className={display===true?("d-none"):("d-flex")}
                                                            checked={false}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        ):(
                                                            <input
                                                            id={e.id}
                                                            type="checkbox"
                                                            className={display===true?("d-none"):("d-flex")}
                                                            name={`cek${e.id}`}                                                   
                                                            onChange={(evnt) => handleSelect (evnt,e.id)}
                                                            onDoubleClick={ (evnt) => handleSelect (evnt,e.id)}
                                                            />
                                                        )}     
                                                </form>
                                             
                                            </div>                                
                                        ):( 
                                        <div className="chatReceiver">
                                             <form className="formR">
                                            <div className="isiChatsReceiver  ms-2" onDoubleClick={handleClick}>
                                                <div className="pesan2">{e.msg}</div>
                                                <div className="date2">{moment().format('hh:mm')}</div>
                                            </div>
                                            </form>
                                        </div>  
                                        )}
                                        </div>                       
                                    )
                                }                                   
                            })}
                            </div>
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
                    </div>
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