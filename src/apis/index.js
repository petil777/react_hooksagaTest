import axios from 'axios';
import {END} from 'redux-saga';
var client = axios.create({withCredentials:true});

export const login = async (payload) =>{
	let username = payload.username;
	let password = payload.password;
	
	return client.post('/login', {username, password})
}	

export const getUser = async(payload, emit) =>{
	return client.post('/info', {}, {
		onDownloadProgress : (e) =>{
			let per = 100* e.loaded/e.total;
			// console.log('loaded : ', e.loaded);
			// console.log('total ; ', e.total)
			if(e.loaded == e.total){
				emit(per);//to check in_loading working
				emit(END);
			}
			emit(per);
		}
	})
}