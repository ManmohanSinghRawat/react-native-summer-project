import * as ActionTypes from '../shared/ActionType'; 

export const dishReducer = (state ={isloading: true, errMess:null, dishes:[]}, action) => {
    switch(action.type)
    {
        case ActionTypes.isLoading_Dish: return {...state, isloading:true, errMess:null, dishes:[] }
        case ActionTypes.Add_Dish: return {...state, isloading:false, dishes:action.payload, errMess:null }
        case ActionTypes.error_Dish: return {...state, isloading:false, errMess:action.payload }
        default: return state
    }
}

export const leaderReducer = (state ={isloading: true, errMess:null, leaders:[]}, action) => {
    switch(action.type)
    {
        case ActionTypes.isLoading_Leader: return {...state, isloading:true, errMess:null, leaders:[] }
        case ActionTypes.Add_Leader: return {...state, isloading:false, leaders:action.payload, errMess:null }
        case ActionTypes.error_Leader: return {...state, isloading: false, errMess: action.payload }
        default: return state
    }
}

export const promotionReducer = (state ={isloading: true, errMess:null, promos:[]}, action) => {
    switch(action.type)
    {
        case ActionTypes.isLoading_Promos: return {...state, isloading:true, errMess:null, promos:[] }
        case ActionTypes.Add_Promos: return {...state, isloading:false, promos:action.payload, errMess:null }
        case ActionTypes.error_Promos: return {...state, isloading: false, errMess: action.payload }
        default: return state
    }
}

export const commentReducer = (state ={errMess:null, comments:[]}, action) => {
    switch(action.type)
    {
        case ActionTypes.Add_Comment: return {...state, comments:action.payload, errMess:null }
        case ActionTypes.error_Comment: return {...state, errMess: action.payload }
        case ActionTypes.Add_New_Comment:  return {...state, comments: addComment(state.comments , action.payload)};
        default: return state
    }
}

export const favorites = (state =[], action) => {
    switch (action.type) {
        case ActionTypes.Add_Favorite:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        
        case ActionTypes.Delete_Favorites: 
            return state.filter((favorite) => favorite !== action.payload);
                
        default:
          return state;
      }
}

const addComment = (comments, comment) => {
    return comments.concat(comment);
}