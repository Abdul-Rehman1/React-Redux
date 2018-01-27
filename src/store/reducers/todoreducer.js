import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    todo: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.ADDTODO:
            return ({
                ...state,
                todo: action.payload
            })
        case ActionTypes.UPDATETODO:
            return ({
                ...state,
                todo: action.payload
            })   
        case ActionTypes.DELTODO:
            return ({
                ...state,
                todo: action.payload
            })
        default:
            return state;
    }

}