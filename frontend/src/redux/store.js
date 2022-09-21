import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'

import {getVideosListReducer} from './reducers/getVideosListReducer'
import { getVideoByIdReducer } from './reducers/getVideoByIdReducer'
import { UploadFormReducer } from './reducers/UploadFormReducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const rootReducer = combineReducers({
    videos:getVideosListReducer,
    Singlevideo:  getVideoByIdReducer,
    uploadForm: UploadFormReducer
})

export const store = createStore(rootReducer, composedEnhancer )