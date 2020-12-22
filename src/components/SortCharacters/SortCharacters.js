import React from 'react';
import {connect} from 'react-redux';
import {applySortingAsync} from "../../redux/actions/actions";
import PropTypes from 'prop-types';


function SortCharacters(props) {

	function changeSorting(e){
		// fetch Last Page
		props.applySorting({
			...props.filters,
			currentPageNo: 1,
			order: e.target.value
		});
	}
  return (
        <div>			
			    <label>Sort by ID: </label>
				<select id="order-by" onChange={changeSorting} defaultValue={'asc'} className="form-select">
					<option value="asc"> Ascending </option>
					<option value= "desc"> Descending </option>
				</select>
		</div>
  )
}

const mapStateToProps = (state, props) => {
	return {
		...props,
		characters: state.characters,
		filters: state.filters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		applySorting: (filters) => dispatch(applySortingAsync(filters))
	};
};

SortCharacters.propTypes={
	filters:PropTypes.array,
	currentPageNo:PropTypes.number,
	order:PropTypes.string
}
export default connect(
		mapStateToProps,
		mapDispatchToProps,
)(SortCharacters);