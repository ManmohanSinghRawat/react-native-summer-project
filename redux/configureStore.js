import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishReducer, leaderReducer, promotionReducer, commentReducer, favorites } from './reducers';
import { persistStore , persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

export const configureStore = () => {
    
    const config = {
        key: 'root',
        storage,
        debug : true
    }

   const store = createStore(
        persistCombineReducers(config, {
            dishReducer,
            leaderReducer,
            promotionReducer,
            commentReducer,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const presistor = persistStore(store);

    return { presistor, store };
};