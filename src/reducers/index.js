import postReducer from './postReducer';
import NavReducer from './NavReducer';
import viewReducer from './viewReducer';
import authReducer from './authReducer';


import { combineReducers } from 'redux';

export default combineReducers({
	postReducer,
	NavReducer,
	viewReducer,
	authReducer
})