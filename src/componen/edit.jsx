import back from '../images/back.svg'
import '../css/Chat.css'

const Edit = ({update, handleBack, handleEdit,insertFile,insertUpdate,submitUpdate}) => {
    return(
        <div className="setting">
        <div className="mSetting" >
            <img className="pointer" onClick={handleBack} src={back} alt="" /> 
            <div className="nameSetting">@{update.username}</div>   
            <div className="edit" onClick={handleEdit}>Edit</div>   
        </div>
        <div className="profile">
            <img src={update.imagePriview} />
        </div>

        <div className="settingH">
            <div className="account">   
                <form onSubmit={submitUpdate}>
                    <label className="mt-2 w-100">picture :</label>
                    <input className="mt-2 w-100"
                     type="file"
                     name="image"
                     onChange={insertFile}
                     id="file"
                    />
                    <label className="mt-2 w-100">phone_number :</label>
                    <input className="mt-2 w-100"
                    placeholder={update.phone_number}
                    onChange={insertUpdate}
                    name="phone_number"
                    type="number"
                    />
                    <label className="mt-2 w-100">username :</label>
                    <input className="mt-2 w-100"
                    placeholder={update.username}
                    onChange={insertUpdate}
                    name="username"
                    type="text"
                    />
                    <label className="mt-2 w-100">email :</label>
                    <input className="mt-2 w-100"
                    placeholder={update.email}
                    onChange={insertUpdate}
                    type="email"
                    name="email"
                    />
                    <button className="mt-5" type="submit">save</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit