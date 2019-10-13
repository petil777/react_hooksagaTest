import {createAction, handleActions} from 'redux-actions';

export const initialState={
	user: '',
	password: '',
	loginStatus: false,
	jwtToken: ''
};

//1) Action types (saga에서 가져다 쓰기 위해 export)
export const LOGIN = 'auth/login';
export const SUCCESS_LOGIN = 'auth/success_login';
export const FAILURE_LOGIN = 'auth/failure_login';
export const LOGOUT = 'auth/logout';
export const SUCCESS_LOGOUT = 'auth/success_logout';

//이 경우 actions.~~~ 를 saga쪽에서 switch하며 타입 검사를 하기 때문에 export
//export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
//export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
//export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';


//2) Action creators (실제 바깥 페이지에서 가져다 쓸 함수)
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
