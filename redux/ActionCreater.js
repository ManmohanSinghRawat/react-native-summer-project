import {baseUrl} from '../shared/BaseUrl';
import * as ActionTypes from '../shared/ActionType'; 

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok)
                return response;
            else {
                var error = new Error('Error '+ response.status+' : ' + response.statusText);
                error.response = response;
                return error;
            }
        },
        error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(comments => dispatch(commentAdd(comments)))
        .catch(error => dispatch(commentFailed(error.message)))
};

export const commentAdd = (comments) => {
    return {
        type: ActionTypes.Add_Comment,
        payload: comments
    }
};

export const commentFailed = (errMessage) => {
    return {
        type: ActionTypes.error_Comment,
        payload: errMessage
    }
};

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes', {mode:"cors"})
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                return error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => dispatch(dishesfailed(err.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.isLoading_Dish
});

export const addDishes = (dishes) => {
    return {
        type: ActionTypes.Add_Dish,
        payload: dishes
    }
};

export const dishesfailed = (err) => {
    return {
        type: ActionTypes.error_Dish,
        payload: err
    }
};

export const fetchLeaders = () => (dispatch) => {
    dispatch(leaderLoading());
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok)
                return response;
            else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                return error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(err => dispatch(leadersfailed(err.message)));
};

export const leaderLoading = () => ({
    type: ActionTypes.isLoading_Leader
});

export const addLeaders = (leaders) => {
    return {
        type: ActionTypes.Add_Leader,
        payload: leaders
    }
};

export const leadersfailed = (err) => {
    return {
        type: ActionTypes.error_Leader,
        payload: err
    }
};

export const fetchPromos = () => (dispatch) => {
    dispatch(promoLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok)
                return response;
            else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                return error;
            }
        }, error => {
            throw new Error(error.message);
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(err => dispatch(promosfailed(err.message)));
};

export const promoLoading = () => ({
    type: ActionTypes.isLoading_Promos
});

export const addPromos = (promos) => {
    return {
        type: ActionTypes.Add_Promos,
        payload: promos
    }
};

export const promosfailed = (err) => {
    return {
        type: ActionTypes.error_Promos,
        payload: err
    }
};

export const postFavorite = (dishId)  => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.Add_Favorite,
    payload: dishId
});

export const postComment = (comment)  => (dispatch) => {
    setTimeout(() => {
        dispatch(addComment(comment));
    }, 2000);
};

export const addComment = (comment) => ({
    type: ActionTypes.Add_New_Comment,
    payload: comment
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.Delete_Favorites,
    payload: dishId
});