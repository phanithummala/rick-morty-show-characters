import {
	FETCH_CHARACTER_LIST,
	FETCH_CHARACTER_LIST_FAILED,
    FETCH_CHARACTER_LIST_SUCCESS,
    APPLY_SEARCHING_SORTING
} from "../actions/ActionTypes";

const charListInitialState={
    totalPages: 0,
	charList: [],
	loading: false,
	error: null
}

export default function charactersReducer(state = charListInitialState, action) {
	switch (action.type) {
		case FETCH_CHARACTER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				totalPages: action.payload.response.info.pages,
				charList: [...state.charList, ...action.payload.response.results]
			};
		case FETCH_CHARACTER_LIST:
			return {
				...state,
				loading: true
			};
		case APPLY_SEARCHING_SORTING:
			return {
				...charListInitialState,
				loading: true
			};
		case FETCH_CHARACTER_LIST_FAILED:
			return {
				...state,
				error: action.payload.error,
				loading: false
			};
		
		default:
			return state
	}
}
