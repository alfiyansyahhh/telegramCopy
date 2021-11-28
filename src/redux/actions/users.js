import axios from 'axios'
import Get from '../helpers/env'
const token = localStorage.getItem('token')

const user = {
    
    LOGIN : (data) => {
        return new Promise ((resolve, reject) => {
            axios.post(`${Get.API_URL}/login`, data)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },

    REGISTER : (data) => {
        console.log("ini data", data)
        return new Promise ((resolve, reject) => {
            axios.post(`${Get.API_URL}/register`, data)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },

    ACTION_UPDATE : (data, id) => {
        const headers = {
            "Content-Type" : "multipart/from-data",
            token
        }
        console.log(data)
        return new Promise ((resolve, reject) => {
            axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data, { headers})
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })

    },

    ACTION_GET_USER_DETAIL : (id) => {
        const headers = {
            token
        }
        return (dispatch) => {
         axios.get(`${Get.API_URL}/user/${id}`, { headers })
            .then((response) => {
                dispatch({
                    type: `${Get.User_DetailFulfilled}`,
                    payload: response.data.data
                })
            }).catch((err) =>{
                dispatch({
                    type: `${Get.User_DetailRejected}`,
                    payload: "Terjadi Kesalahan". err
                })
            })
        }
    },

    ACTION_GET_ALL_USERS : (search) => {
        const headers = {
            token
        }
        return (dispatch) => {
            axios.get(`${Get.API_URL}/users?search=${search}`, { headers })
            .then((response) => {
                console.log(response)
                dispatch({
                    type: `${Get.Users_Fulfilled}`,
                    payload: response.data.data.users
                })
            }).catch((err) =>{
                dispatch({
                    type: `${Get.Users_Rejected}`,
                    payload: "Terjadi Kesalahan",err
                })
            })
        }
    },
    

}

export default user
