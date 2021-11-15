/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import foto from '../images/foto.svg'
import stiker from '../images/stiker.svg'
import info from '../images/info.svg'
import { GrClose, GrFormPreviousLink } from "react-icons/gr";
import { BiCheck } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import plus from '../images/plus.svg'
import moment from "moment";

const roomChat = ({
    sendChats,
    History,
    Checked,
    handleHideInfo,
    handleSelect,
    handleDeleteChat,
    handleClick,
    handleCancelMs,
    handlebackHideChat,
    insertChat,
    display,
    timeLocal,
    HideChat,
    HideInfo,
    Datausers,
    DataChats,
    username,
    ListMsg,
}) => {

    console.log(ListMsg)
    return(
    <div>
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
    )
}

export default roomChat