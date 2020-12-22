import React, {useState } from "react";
import {applySortingAsync} from '../redux/actions/actions';
import {connect} from 'react-redux';

const minSearchInputValueLength = 3;

function SearchBar(props) {
    const [value,setValue]=useState("");
   

    const searchCharacter = ({ target }) => {
        if (target.value.length >= minSearchInputValueLength) {
            setValue(target.value);
        }
    };
    const handleSearch=(e)=>{
        const currentPageNo = 1;
        props.applySorting({
          ...props.filters,
          currentPageNo,
          filters: {
            ...props.filters.filters,
            name:value
          }
        })
    }
    
  
        return (
            <div className="search-wrap">
                <div>Search by Name</div>
                <input
                    type="text"
                    className="search-input"
                    onChange={searchCharacter}
                    name="search"
                />
                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        );
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
export default connect(
		mapStateToProps,
		mapDispatchToProps,
)(SearchBar);