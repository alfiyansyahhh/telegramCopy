import axios from 'axios'
import Get from '../helpers/env'

const chats = {
    
    ACTION_DELETE_CHATS : (id) => {
        console.log(id)
        return new Promise ((resolve, reject) => {
            const ids ={"data":id}
            axios.delete(`${Get.API_URL}/chats`, {data: ids })
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }    

}

export default chats
