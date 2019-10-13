import { all, fork, takeEvery, call, put, delay, spawn, takeLatest,take ,select} from 'redux-saga/effects';
import * as api from 'apis';
import * as actions from 'reducers/loading'

// LOGIN_REQUEST만 page쪽에서 사용하고 성공/실패 동작 로직을 state를 바라보고 판단하게 해야 한다.
// saga내부에선 call을 쓰든 await을 쓰든 기다려야 하고...

export default function* loginSaga(){
	yield spawn(handleLoading);
}
//takeEvery for GET
//takeLatest for POST, PUT, DELETE
function* handleLoading(){
	//Change here or flow with race and cancel....
	//If cancel, finish loading should be activated
	yield takeEvery(actions.START_LOADING, loadingFlow)
}

function* loadingFlow(action){
	// api.someApi(action.payload.type, {
	// 	onDownloadProgress:(e) =>{
	// 		let per= e.loaded/e.total;
	// 		yield put({type:actions.IN_LOADING, payload:{progress:per}});
	// 	}
	// })
	// yield put({type:actions.FINISH_LOADING});
	
}