import {call, put, fork, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga'
import * as actions from 'reducers/loading';

//https://stackoverflow.com/questions/40402744/redux-saga-axios-and-progress-event
export default function createRequestSaga(actionType, requestApi){
	
	const SUCCESS = `${actionType}_SUCCESS`;
	const FAILURE = `${actionType}_FAILURE`;
	
	return function*(action){
		let emit;
		const chan = eventChannel(emitter => {
			emit = emitter;
			return () => {}; 
		});
		yield fork(watchOnProgress, chan);
	
		yield put({type:actions.START_LOADING, payload:actionType});
		try{
			const res = yield call(requestApi, action.payload, emit);
			//as res value
			yield put({type:SUCCESS, payload:res.data})
		}
		catch(e){
			yield put({type:FAILURE, payload:e, error:true})
		}
		yield put({type:actions.FINISH_LOADING, payload:actionType});
		
	}
}


function* watchOnProgress(chan) {
  while (true) {
    const data = yield take(chan);
    yield put({ type: actions.IN_LOADING, payload: {progress: data} });
  }
}


/*
#################################
In reducer file ... 

const initialState={
	users: null,
}

1)ACTION TYPE
const GET_USERS = 'user/get_user';

2)ACTION CREATOR
export const getUsers = createAction(GET_USERS);


export default handleActions({
	[GET_USERS_SUCCESS]: (state, action) =>{
		...state, user: action.payload
	}
}, initialState)

###################################
In Saga File...


import createRequestSaga from 'lib/createRequestSaga';
const getUserSaga = createRequestSaga(GET_USERS, api.getUser)

export default function* sampleSaga(){
	yield spawn(infoFlow)
}
function* infoFlow(action){
	yield takeEvery(GET_USERS, getUsersSaga)
}

*/