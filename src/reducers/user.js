import {createAction, handleActions} from 'redux-actions';

export const initialState={
	username: '',
	password: '',
	loginStatus: false,
	jwtToken: '',
	users:'',
};



//1) Action types (saga에서 가져다 쓰기 위해 export)
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';
export const GET_USERS = 'user/GET_USERS';
const GET_USERS_SUCCESS = 'user/GET_USERS_SUCCESS';//createRequestSaga로 생성되어 export할 필요가 없다.
//_SUCCESS붙이느라 액션 타입 모두를 대문자로 통일함

//2) Action creators (실제 바깥 페이지에서 가져다 쓰기 위해 생성하는 함수)
export const login = createAction(LOGIN_REQUEST);
export const getUsers = createAction(GET_USERS);

//3) reducers (원칙상 각 Action Type에 대해 모두 있어야 함)
export default handleActions({
	[LOGIN_SUCCESS] : (state, action) =>{
		return {...state, username: action.payload.username, password: action.payload.password, loginStatus: true};
	},
	
	[LOGIN_FAILURE]: (state, action)=>{
		return {...state, loginStatus: false};
	},
	[LOGOUT_SUCCESS] : (state, action) =>{
		return {...state, username: '', password: '', loginStatus: false};
	},
	[GET_USERS_SUCCESS] : (state, action) =>{
		return {...state, users : action.payload}
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
