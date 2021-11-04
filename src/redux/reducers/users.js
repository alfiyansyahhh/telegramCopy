import Get from '../helpers/env'

const initialState = {
    Alluser: [],
    errorAll: false,
    errorAllMessage: 'err',
    user: [],
    error: false,
    errorMessage: 'err',
}

const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case `${Get.Users_Fulfilled}`:
            return { ...state, Alluser: action.payload}
        case `${Get.Users_Rejected}`:
            return { ...state, errorAll: true, errorAllMessage: action.payload}   

        case `${Get.User_DetailFulfilled}`:
            return { ...state, user: action.payload}
        case `${Get.User_DetailRejected}`:
            return { ...state, error: true, errorMessage: action.payload}    
        default:
            
        return state
    }
}

export default cartReducer