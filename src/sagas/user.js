import { all, fork, takeEvery, call, put, delay, spawn, takeLatest,take ,select} from 'redux-saga/effects';
import * as api from 'apis';
import * as actions from 'reducers/user'


import createRequestSaga from 'lib/createRequestSaga';
function* infoFlow(action){
	//TODO: have to add cancel logic here
	const getUsersSaga = createRequestSaga(actions.GET_USERS_REQUEST, api.getUser)
	yield takeLatest(actions.GET_USERS_REQUEST, getUsersSaga)
}

export default function* loginSaga(){
	yield spawn(infoFlow);
	yield spawn(handleLogin);
	yield spawn(pageFlow);
}
//takeEvery for GET
//takeLatest for POST, PUT, DELETE
function* handleLogin(){
	yield takeLatest(actions.LOGIN_REQUEST, loginFlow);
	yield takeLatest(actions.LOGOUT_REQUEST, logoutFlow);
}

function* loginFlow(action){
	const res = yield call(api.login, {username: action.payload.username, password: action.payload.password});
	console.log('res is ', res)
	//select를 활용해 중간에 state확인 가능
	// const prev =yield select(state => state.user);
	if(res.data.loginStatus){
		// yield put(actions.success_login({user: action.payload.user, password: action.payload.password, history: action.payload.history}));
		yield put({type:actions.LOGIN_SUCCESS, payload: {username: action.payload.username, password: action.payload.password, history: action.payload.history}})
		// const afters =yield select(state => state.user);
	
	}
	else{
		// yield put(actions.failure_login());
		yield put({type:actions.LOGIN_FAILURE})
	}
}
function* logoutFlow(action){
	// yield put(actions.success_logout({history: action.payload.history}));
	yield put({type:actions.LOGOUT_SUCCESS})
}

function* pageFlow(){
	while(true){
		yield take(actions.LOGIN_SUCCESS);
		//'history' context may be different...so not working
		// yield put(replace('/dashboard'));
		// suc.payload.history.replace('/dashboard');
		
		//destroy token or something
		
		yield take(actions.LOGOUT_SUCCESS);
		// yield put(push('/'));
		// out.payload.history.replace('/');
	}
}