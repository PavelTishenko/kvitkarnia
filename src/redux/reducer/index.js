import {combineReducers} from 'redux';
import userReducer from '../User/user.reducer';

// const initState = {
//     imagesPath: []
// }

// export const reducer = (state = initState, action) => {
//     switch(action.type){
//         case "LOAD_IMAGES":
//             return {
//                 ...state,
//                 imagesPath: action.payload
//             }
//         default:
//             return state;
//     }
// };
const rootReducer = combineReducers ({
    user: userReducer
})

export default rootReducer;