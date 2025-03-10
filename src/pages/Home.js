import React, {useState} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as userActions from '../reducers/user';
import _ from 'lodash';
const Home = () =>{
	const fn = (item, prevItem) =>{
		//In this case, useSelector will not rendered again.
		if(item.length === prevItem.length){
			return true;
		}
		else{
			return false;
		}
	}
	const dispatch = useDispatch();
	const {loginStatus} = useSelector(state => state.user,shallowEqual)
	const userInfo = useSelector(state => state.user,fn);
	const users = useSelector(state =>{
		let u = state.user;
		return u.users;
	}, _.isEqual)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const handleUser = (e) =>{
		setUsername(e.target.value);
	}
	const handlePassword = (e) =>{
		setPassword(e.target.value);
	}
	const handleLogin = (e) =>{
		e.preventDefault();
		//userActions.login({username:username, password: password})
		dispatch(userActions.login({username, password}));
	}
	const handleLogout = () =>{
		dispatch(userActions.logout());
	}
	const handleInfo = () =>{
		dispatch(userActions.getUsers());
	}
	return(
		<div>
			This is Home
			<form>
				<div>
					<input type="text" onChange = {handleUser}/>
				</div>
				<div>
					<input type="password" onChange = {handlePassword}/>
				</div>
				<div>
					<button type="submit" onClick = {handleLogin}>LOGIN</button>
				</div>
			</form>
			<button onClick={handleLogout}>LogOut</button>
			{JSON.stringify(userInfo)}
			<br/>
			loginStatus : {loginStatus===true ? "ISLOGINNED" : "NOTLOGINED"}
			
			<div style={{marginTop:'30px'}}>
				<button onClick={handleInfo}>getInfo</button>
			</div>
			<br/>
			users : {JSON.stringify(users)}
		</div>
	)
}
//connect함수와 달리 컴포넌트 리렌더링 시 해당 컴포넌트 props가 바뀌지 않았다면 리렌더링 방지 서능이 없다.
//이 경우엔 가장 상위 페이지라 의미없는 최적화에 해당.
export default React.memo(Home);