import '../css/Login.css'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import goggle from '../images/goggle.png'
import eye from '../images/eye.png'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import { useHistory } from 'react-router'
import users from '../redux/actions/users'

const Login = () => {
    const [eyes, seteyes] = useState(true)
    const [Data, setData] = useState({
        username:'',
        password:''
    })

    const [info, setInfo] = useState()
    const [validasi, setValidasi] = useState(false)

    const handleEyes = () => {
        seteyes(!eyes)
    }

 
    const handleLogin = (e) => {
        setData({
            ...Data,
            [e.target.name]:e.target.value
        })
    }

    const History = useHistory()
    const Login = (e) => {
        e.preventDefault();
        setValidasi(true)
        if (Data.password && Data.username) {
            setInfo("")
          users.LOGIN(Data).then((response) => {
            localStorage.setItem("token", response.data.token)
            const users = response.data.user
            const username = users.username
            const id = users.id
            localStorage.setItem("idUser", id)
            console.log(response)
            localStorage.setItem("username", username)
            History.push("/chat")
            // alert("hai")
        }).catch((err) => {
            setInfo("wrong password/username !!")
            console.log(err)
        })
        } else {
            if (!Data.password && Data.username) {
                setInfo("pliese insert password !!")
            } else if (Data.password && !Data.username) {
                setInfo("pliese insert username !!")
            } else{
                setInfo("pliese insert data !!")
            }
        }
       
    }


    return(
        <Row className="login">
        <Col lg="4" xs="11">
            <Card body className="cardLogin">
            <CardTitle className="title" tag="h5">Login</CardTitle>
            <form className="formLogin" onSubmit={Login}>
                <CardText>
                    Hi, Welcome back!
                </CardText>
                <CardText className="emailLogin">
                    <p className={validasi === true && Data.username === ''?('danger'):('')}>Email :</p>
                    <input
                    onChange={handleLogin}
                    type="email"
                    name="username"
                    />
                </CardText>
                <CardText className="passLogin">
                    <p className={validasi === true && Data.username === ''?('danger'):('')}>Password :</p>
                    <input 
                    type={eyes === true ? "password" : "text"}
                    onChange={handleLogin}
                    name="password"
                    />
                    <img onClick={handleEyes} className="eye" src={eye} alt="" />
                </CardText>
                <CardText className="forget">
                    <div className="infostatus">{info}</div>
                    <Link className="fg" to='/register'>Forgot password?</Link>
                </CardText>
            <button type="submit" className="tb">Login</button>
            <CardText className="with">Login With</CardText>
            <button className="tb2"> <img className="gg" src={goggle} alt="" />Google</button>
            <CardText className="an">Don’t have an account? <Link className="sg" to='/register'>Sign Up</Link></CardText>
            </form>
            </Card>
        </Col>
        </Row>
    )
}

export default Login