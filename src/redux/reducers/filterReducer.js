import {FETCH_CHARACTER_LIST_SUCCESS} from "../actions/ActionTypes";

const filterInitialState={
    order: "asc",
	currentPageNo: 1,
	filters: {
		gender: "",
		species: "",
		status: "",
		origin:""
	}
}

export default function filterReducer(state= filterInitialState, action) {
	switch (action.type) {
		case FETCH_CHARACTER_LIST_SUCCESS:{
			const filters = action.payload.response.filters;
			return {
				...state,
				currentPageNo: filters.currentPageNo,
				order: filters.order,
				filters: {
					gender: filters.filters.gender,
					species: filters.filters.species,
					status: filters.filters.status,
					origin: filters.filters.origin
				}
			};
		}
		default:
			return state
	}
}
