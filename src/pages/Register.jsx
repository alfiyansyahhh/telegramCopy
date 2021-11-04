import '../css/Register.css'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { useState} from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import eye from '../images/eye.png'
import goggle from '../images/goggle.png'
import back from '../images/back.svg'
import users from '../redux/actions/users'

const Register = () => {
    const [eyes, seteyes] = useState(true)
    const handleEyes = () => {
        seteyes(!eyes)
    } 

    const [Data, setData] = useState({
        username:"",
        email:"",
        password:"",
        phone_number:""
    })

    const History = useHistory()
    const backG = () => {
        History.push('/')
    }

    console.log(Data)
    const insertData = (e) => {
        setData({ ...Data,
            [e.target.name]:e.target.value
        })
    }

    console.log(Data)

    const inputData =(e)=> {
        e.preventDefault();
        users.REGISTER(Data).then((response) => {
            console.log(response)
            History.push('/')
        }).catch((err) => {
            alert("terjadi kesalahan")
        })
    }
   

    return(
        <Row className="register">
        <Col lg="4" xs="11">
            <Card body className="cardRegister">
            <CardTitle className="titleRegsiter" tag="h5"> <img onClick={backG} className="backR" src={back} alt=""/>Register</CardTitle>
            <form className="formRegister" onSubmit={inputData}>
                <CardText>Let’s create your account!</CardText>
                <CardText className="inputRegister">
                    <p>Name :</p>
                    <input
                    type="text"
                    name="username"
                    onChange={insertData}
                    />
                </CardText>
                <CardText className="inputRegister">
                    <p>Email :</p>
                    <input
                    type="email"
                    name="email"
                    onChange={insertData}
                    />
                </CardText>
                <CardText className="inputRegister">
                    <p>Phone Number :</p>
                    <input
                    type="number"
                    name="phone_number"
                    onChange={insertData}
                    />
                </CardText>
                <CardText className="inputRegister">
                    <p>Password :</p>
                    <input 
                    name="password"
                    type={eyes === true ? "password" : "text"}
                    onChange={insertData}
                    />
                    <img onClick={handleEyes} className="eye" src={eye} alt="" />
                </CardText>
                <CardText className="forget"><Link className="fg" to='/register'>Forgot password?</Link></CardText>
                <button type="submit" className="tb">Register</button>
                <CardText className="with">Register With</CardText>
                <button className="tb2"> <img className="gg" src={goggle} alt="" />Google</button>
                </form>
            </Card>
        </Col>
        </Row>
    )
}

export default Register