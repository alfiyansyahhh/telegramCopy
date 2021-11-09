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
            <div className="account mt-4">   
                <b>Account</b>
                <div className="mt-2">(+62) {Datauser.phone_number}</div>
                <div className="mt-2">Tap to change phone number</div>                                
                <div className="mt-4">
                    <b>@{Datauser.username}</b>
                    <div className="mt-2">username</div>
                </div>
            </div>

            <div className="bio2 mt-4">
                <b>
                    I’m Senior Frontend Developer from Microsoft
                </b>
                <div className="mt-2">
                    bio
                </div>
            </div>
            
            <div className="sbw mt-4">
                <b>Settings</b>

                <div className="d-flex w-100 mt-3">
                    <div className="pointer"><img src={gembok} alt="" /></div>
                    <div className="pointer ms-3 ">Change Password</div>
                </div>
                <div className="d-flex w-100 mt-3">
                    <div className="pointer"><img src={pesan} alt="" /></div>
                    <div className="pointer ms-3" onClick={logout}>Logout</div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default SettingComponen