import {createAction, handleActions} from 'redux-actions';

const initialState = {
	progress: 0
}

//Action Type (Use in saga)
export const START_LOADING = 'loading/start_loading';
export const IN_LOADING = 'loading/in_loading';
export const FINISH_LOADING = 'loading/finish_loading';

//Action Creator(Use in outside component)

export const startLoading = createAction(START_LOADING);
export const finishLoading = createAction(FINISH_LOADING);


//startLoading(certain action api)
export default handleActions({
	[START_LOADING] : (state, action) =>{
		return {...state, [action.payload] : true}
	},
	[IN_LOADING] : (state, action) =>{
		const {progress} = action.payload;
		return {...state, progress}	
	},
	[FINISH_LOADING] : (state, action) =>{
		return {...state, [action.payload] : false, progress:0}
	}
}, initialState)