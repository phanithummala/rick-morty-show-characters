import {FETCH_CHARACTER_LIST, APPLY_SEARCHING_SORTING,FETCH_CHARACTER_LIST_SUCCESS,FETCH_CHARACTER_LIST_FAILED} from "../actions/ActionTypes";
import axios from 'axios'

export function fetchAsyncCharList(filters) {
	
	return dispatch => {
		
		dispatch(fetchCharList(filters));
		const queryString = getQueryString(filters);
		axios.get(`https://rickandmortyapi.com/api/character/?${queryString}`)
		.then(res => {	
			res=sanitizeData(res.data, filters);	
			res.filters=filters;		
			dispatch(charFetchSuccess(res));
		})
		.catch(err => {
			dispatch(charFetchFailure(err.message));
		});
	};
}	

const charFetchSuccess=(response)=>{
	return {
		type: FETCH_CHARACTER_LIST_SUCCESS,
		payload: {response},
	};
}

const charFetchFailure=(error)=>{
	return ({
		type: FETCH_CHARACTER_LIST_FAILED,
		payload: { error },
	});
}

export function fetchCharList(filters) {
	return {
		type: FETCH_CHARACTER_LIST,
		payload: { filters}
	}
}

export function applySortingAsync(filters) {
	
	return (dispatch) => {
		
		dispatch(applySorting(filters));
		const queryString = getQueryString(filters);
		axios.get(`https://rickandmortyapi.com/api/character/?${queryString}`)
		.then(res => {	
			res=sanitizeData(res.data, filters);	
			res.filters=filters;		
			dispatch(charFetchSuccess(res));
		})
		.catch(err => {
			dispatch(charFetchFailure(err.message));
		});
	};
}

export function applySorting(filters) {
	return {
		type: APPLY_SEARCHING_SORTING,
		payload: { filters }
	}
}


function getQueryString(filters){
	console.log('action creater',filters)
	let query = "";
	query = `page=${filters.currentPageNo}`;

	if(filters.filters.origin){
		query+=`&origin=${filters.filters.origin}`
	}

	if(filters.filters.species){
		query+=`&species=${filters.filters.species}`
	}

	if(filters.filters.gender){
		query+=`&gender=${filters.filters.gender}`
	}
	if(filters.filters.name){
		query+=`&name=${filters.filters.name}`
	}

	return query;
}

function sanitizeData(response, filters){
	
	response.results = response.results.map(({id, name, status, species, gender, image, created, origin, location})=>{
		return { id, name, status, species, gender, image, created, origin, location};
	});
	response.filters = filters;
	return response;
}