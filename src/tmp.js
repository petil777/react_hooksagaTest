//reducer -- user.js


//modules/auth.js에 해당하는 것으로 initialState의 속성에 맞게 user로 이름을 넣는게 적절하다.
//리듀서는 데이터를 받아 saga에 넘겨주는 역할만 한다.
import {createAction, handleActions} from 'redux-actions';

export const initialState={
	user: '',
	password: '',
	loginStatus: false,
	jwtToken: ''
};

1) Action types
const LOGIN = 'auth/login';
const SUCCESS_LOGIN = 'auth/success_login';
const FAILURE_LOGIN = 'auth/failure_login';
const LOGOUT = 'auth/logout';
const SUCCESS_LOGOUT = 'auth/success_logout';

//이 경우 actions.~~~ 를 saga쪽에서 switch하며 타입 검사를 하기 때문에 export
//export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
//export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
//export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';


2) Action creators (실제 바깥 페이지에서 가져다 쓸 함수)
export const login = createAction(LOGIN);
export const success_login = createAction(SUCCESS_LOGIN);
export const failure_login = createAction(FAILURE_LOGIN);
export const logout = createAction(LOGOUT);
export const success_logout = createAction(SUCCESS_LOGOUT);

/*

export const loginRequestAction = data => ({
  type: LOG_IN_REQUEST,
  payload: {
    loginData: data,
  },
});

*/

//3) reducers
export default handleActions({
	[SUCCESS_LOGIN] : (state, action) =>{
		window.sessionStorage.setItem('user' , action.payload.user);
		return {...state, user: action.payload.user, password: action.payload.password, loginStatus: true};
	},
	
	[FAILURE_LOGIN]: (state, action)=>{
		return {...state, loginStatus: false};
	},
	[SUCCESS_LOGOUT] : (state, action) =>{
		window.sessionStorage.clear();
		return {...state, user: '', password: '', loginStatus: false};
	}
}, initialState);


/*
export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: '',
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
      };
    }
    default:
      return state;

*/



###########################################################
reducers/index.js
import { combineReducers } from 'redux';

import user from './user';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;




####################################################

sagas/user.js

//saga를 작성하기 전에 reducer부터 정의해야 한다.
//reducer의 user와 1대1 대응이라 이름이 같지만 여러 리듀서를 사용

import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';
import api from 'apis';
//import * as actions from '../reducers/user'
// -> yield put({type:actions.LOG_IN_SUCCESS, payload:{data}, error})이런식으로 사용
// handleAction으로 export 했었으면 yield put(actions.LOG_IN_SUCCESS(data)) 이렇게 하면 될듯
// LOGIN_REQUEST만 page쪽에서 사용하고 성공/실패 동작 로직을 state를 바라보고 판단하게 해야 한다.
// 그러면 axios쓰면 비동기인데 dispatch가 끝난 걸 보장해주나?

export default function* loginSaga(){
	yield spawn(handleLogin);
	yield spawn(pageFlow);
}
//takeEvery for GET
//takeLatest for POST, PUT, DELETE
function* handleLogin(){
	yield takeLatest(LOGIN, loginFlow);
	yield takeLatest(LOGOUT, logoutFlow);
}

function* loginFlow(action){
	const res = yield call(api.login, {user: action.payload.user, password: action.payload.password});
	
	if(res.data.loginResult){
		yield put(success_login({user: action.payload.user, password: action.payload.password, history: action.payload.history}));
		action.payload.history.replace('/dashboard');
	}
	else{
		yield put(failure_login());
	}
}
function* logoutFlow(action){
	yield put(success_logout({history: action.payload.history}));
	action.payload.history.replace('/');
}

function* pageFlow(){
	while(true){
		yield take(SUCCESS_LOGIN);
		//'history' context may be different...so not working
		// yield put(replace('/dashboard'));
		// suc.payload.history.replace('/dashboard');
		
		//destroy token or something
		
		yield take(SUCCESS_LOGOUT);
		// yield put(push('/'));
		// out.payload.history.replace('/');
	}
}

##########################################################
sagas/index.js

import { all, fork } from 'redux-saga/effects';

import user from './user';

export default function* rootSaga() {
  yield all([
    fork(user),
  ]);
}