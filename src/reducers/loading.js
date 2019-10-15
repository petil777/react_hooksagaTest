import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';
const initialState = {
	defaultProgress: 0
}

//Action Type (Use in saga)
export const START_LOADING = 'loading/START_LOADING';
export const IN_LOADING = 'loading/IN_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';

//Action Creator(Use in outside component)

export const startLoading = createAction(START_LOADING);
export const finishLoading = createAction(FINISH_LOADING);


//startLoading(certain action api)
export default handleActions({
	[START_LOADING] : (state, action) =>produce(state, draft=>{
		draft[action.payload] = {
			status:true,
			progress:0
		}
	}),
	[IN_LOADING] : (state, action) =>produce(state, draft=>{
		const {actionType, progress} = action.payload
		draft[actionType] = {
			status:true,
			progress
		}
	}),
	[FINISH_LOADING] : (state, action) =>produce(state, draft=>{
		draft[action.payload] = {
			status:false,
			progress:0
		}
	}),
}, initialState)