import { Row, Col } from 'reactstrap';
import SettingComponen from '../componen/setting'
import garis from '../images/garis.svg'
import cari from '../images/cari.svg'
import '../css/Chat.css'
import {useState} from 'react'
import EditComponen from '../componen/edit'

const Menu = ({
    Datausers, 
    Datauser,
    handleSearch,
    search,
    changeSearch,
    plus,
    username,
    chatting,
    logout,
    handleProfile,
    update,
    insertFile,
    insertUpdate,
    submitUpdate
    }) => {
        const [Setting, setSetting] = useState(false)
        const [Menu, setMenu] = useState(false)
        const [Edit, setEdit] = useState(false)
        const handleHide = () => {
            setMenu(!Menu)
        }
        const handleSetting = () => {
            setSetting(true)
            setMenu(!Menu)
        }
        const handleBack = () => {
            setSetting(false)
        }
        const handleEdit = () => {
            setEdit(!Edit)
        }
    return(
        <div>
             <div className={Setting === true?("homeMenuHide"):("homeMenu")}>
                <div className="title">
                    <div className="tt">
                        Telegram
                    </div>
                    <div>
                        <img className="tt2" src={garis} onClick={handleHide}/>
                    </div>                 
                </div>
                <div className={Menu === false?("Menu2"):("Menu")}>
                 <Row className="cardMenu">
                     <Col lg="4">
                         {/* <img src={setting} alt=""/> */}
                     </Col>
                     <Col lg="8" className="menuT" onClick={handleSetting}>
                         Settings
                     </Col>
                     <Col lg="4">
                         {/* <img src={orang} alt=""/> */}
                     </Col>
                     <Col lg="8" className="menuT">Contacts</Col>
                     <Col lg="4">
                         {/* <img src={orangP} alt=""/> */}
                     </Col>
                     <Col lg="8" className="menuT">Invite Friends</Col>
                     <Col lg="4">
                         {/* <img src={infoM} alt=""/> */}
                     </Col>
                     <Col lg="8" className="menuT">Telegram FAQ</Col>
                 </Row>
                </div>

                <div className="profile">
                    <div className="profile">
                        <img  src={`${process.env.REACT_APP_API_URL}/${Datauser.picture}`} onClick={handleProfile}/>
                        <div className="name">{Datauser.username}</div>
                        <div className="username">@{Datauser.username}</div>
                    </div>
                </div>
                <div className="cari">
                    <form onSubmit={handleSearch}>
                    <img className="tcari" src={cari} />
                    <input 
                        placeholder="Type your message..."
                        value={search}
                        onChange={changeSearch}
                    />
                    <img className="tambahCari"src={plus} />
                    </form>
                </div>

                <div className="contactChat">
                    <div className="cardca">
                {Datausers.map((e) => {
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
                </div>
                
            </div>

 
            <div className={Setting === false?("settingHide"):("setting")}>
                <div className={Edit === true?("settingHide"):("setting")}>
                    <SettingComponen 
                    Datauser={Datauser}
                    handleEdit={handleEdit}
                    handleBack={handleBack}
                    logout={logout}
                    />
                </div>
                <div className={Edit === false?("editHide"):("edit")}>
                    <EditComponen 
                       Datauser={Datauser}
                       handleEdit={handleEdit}
                       handleBack={handleBack}
                       logout={logout}
                       update={update}
                       insertFile={insertFile}
                       insertUpdate={insertUpdate}
                       submitUpdate={submitUpdate}
                    />
                </div>
            </div>
        </div>
    )
}

export default Menu