import { all, fork, takeEvery, call, put, delay, spawn, takeLatest,take } from 'redux-saga/effects';
import * as api from 'apis';
import * as actions from 'reducers/user'
//import * as actions from '../reducers/user'
// -> yield put({type:actions.LOG_IN_SUCCESS, payload:{data}, error})이런식으로 사용
// handleAction으로 export 했었으면 yield put(actions.LOG_IN_SUCCESS(data)) 이렇게 하면 될듯
// 아니면 import {LOG_IN_SUCCESS} from '../reducers/users'

// LOGIN_REQUEST만 page쪽에서 사용하고 성공/실패 동작 로직을 state를 바라보고 판단하게 해야 한다.
// saga내부에선 call을 쓰든 await을 쓰든 기다려야 하고...

export default function* loginSaga(){
	yield spawn(handleLogin);
	yield spawn(pageFlow);
}
//takeEvery for GET
//takeLatest for POST, PUT, DELETE
function* handleLogin(){
	yield takeLatest(actions.LOGIN, loginFlow);
	yield takeLatest(actions.LOGOUT, logoutFlow);
}

function* loginFlow(action){
	const res = yield call(api.login, {user: action.payload.user, password: action.payload.password});
	if(res.data.loginStatus){
		yield put(actions.success_login({user: action.payload.user, password: action.payload.password, history: action.payload.history}));
		// action.payload.history.replace('/dashboard');
	}
	else{
		yield put(actions.failure_login());
	}
}
function* logoutFlow(action){
	yield put(actions.success_logout({history: action.payload.history}));
	// action.payload.history.replace('/');
}

function* pageFlow(){
	while(true){
		yield take(actions.SUCCESS_LOGIN);
		//'history' context may be different...so not working
		// yield put(replace('/dashboard'));
		// suc.payload.history.replace('/dashboard');
		
		//destroy token or something
		
		yield take(actions.SUCCESS_LOGOUT);
		// yield put(push('/'));
		// out.payload.history.replace('/');
	}
}