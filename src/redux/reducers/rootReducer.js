import {combineReducers} from "redux";
import charactersReducer from "./characterReducer";
import filterReducer from "./filterReducer";


const appReducer = combineReducers({
	characters: charactersReducer,
	filters: filterReducer
});

export function rootReducer(state, action) {
	return appReducer(state, action);
}
