import { Row, Col } from 'reactstrap';
import gembok from '../images/gembok.svg'
import pesan from '../images/pesn.svg'
import back from '../images/back.svg'
import '../css/Chat.css'

const SettingComponen = ({Datauser,handleBack,handleEdit,logout}) => {
    return(
    <div className="setting">
        <div className="mSetting" >
            <img className="pointer" onClick={handleBack} src={back} alt="" /> 
            <div className="nameSetting">@{Datauser.username}</div>   
            <div className="edit" onClick={handleEdit}>Edit</div>   
        </div>
        <div className="profile">
            <img src={`${process.env.REACT_APP_API_URL}/${Datauser.picture}`} />
            <div className="name mt-4">{Datauser.username}</div>
            <div className="mt-2">@{Datauser.username}</div>
        </div>

        <div className="settingH">
            <div className="account">   
                <b>Account</b>
                <div className="mt-2">(+62) {Datauser.phone_number}</div>
                <div className="mt-2">Tap to change phone number</div>                                
                <div className="mt-5">
                    <b>@{Datauser.username}</b>
                    <div className="mt-2">username</div>
                </div>
            </div>

            <div className="bio2">
                <b>
                    I’m Senior Frontend Developer from Microsoft
                </b>
                <div className="mt-2">
                    bio
                </div>
            </div>
            
            <div className="sbw">
                <b>Settings</b>

                <Row className="w-100 mt-3">
                    <Col lg="2">
                        <img src={gembok} alt="" />
                    </Col>
                    <Col lg="10" className="pointer"> Change Password</Col>       
                </Row>
                <Row className="w-100 mt-3">
                    <Col lg="2">
                        <img src={pesan} alt="" />
                    </Col>
                    <Col lg="10" className="pointer" onClick={logout}>Logout</Col>       
                </Row>
            </div>
        </div>
    </div>
    )
}

export default SettingComponen