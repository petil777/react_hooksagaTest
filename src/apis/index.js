import axios from 'axios';

var client = axios.create({withCredentials:true});

export const login = async (payload) =>{
	let user = payload.user;
	let password = payload.password;
	
	return client.post('/login', {user, password})
}	
