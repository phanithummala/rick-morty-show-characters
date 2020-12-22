import React from 'react';
import './CharactersFilter.css';
import {connect} from 'react-redux';
import {applySortingAsync} from "../../redux/actions/actions";
import SelectedFilters from '../SelectedFilters';



export const FILTERS = {
	genders: ["male", "female", "unknown"],
	species: ["human",  "Mytholog", "Other Species"],
  origin: ["Unknown","Post apocalyptic Earth","Nuptia 4","Other Origins"],
  status: ["alive", "dead", "unknown"]
}
export const SORTING_ORDER = {
	DESC:"desc",
	ASC: "asc"
}
export const INITIAL_TOTAL_NO_OF_PAGES = 25;

function CharactersFilter(props) {


  function applyFilter(e,item){
    
    const newFilter = (item===undefined)? e.currentTarget.value: item;
    let newFilterParams = {};
    const {gender, origin, species} = props.filters.filters;
    if(FILTERS.genders.indexOf(newFilter) >= 0){
      newFilterParams = {gender: gender !== newFilter ? newFilter : ""}
    }else if(FILTERS.species.indexOf(newFilter) >= 0){
      newFilterParams = {species: species !== newFilter ? newFilter : ""}
    }else if(FILTERS.origin.indexOf(newFilter) >= 0){
      newFilterParams = {origin: origin !== newFilter ? newFilter : ""}
    } 
   
    const currentPageNo = 1;
    props.applySorting({
      ...props.filters,
      currentPageNo,
      filters: {
        ...props.filters.filters,
        ...newFilterParams
      }
    });
    selectedChips(newFilterParams);  

  }

  function selectedChips(newFilterParams){
    let data;
   
    data=newFilterParams!=='undefined'? Object.values(props.filters.filters) :newFilterParams;
       
    return (
      <div style={{padding:"1px",margin:"10px"}} className="selected-filters">
      <h5>Selected Filters</h5>
      {
       data.map((val) =>{   
          return (val!=="" && <SelectedFilters key={val} label={val} onDelete={handleDelete}/>)
        })
      }
      </div>
    );
    
  }
  
   function handleDelete(e,item){
      applyFilter(e,item)
   }

  function renderGenderFilters(){
    return(
        <div className="filters">
            <h6>Gender: </h6>
            {
              FILTERS.genders.map((gender)=>{
                return(
                  <label key={gender} className="container">{`${gender}`}
                    <input type="checkbox" value={gender} onChange={(e)=>applyFilter(e)} checked={props.filters.filters.gender === gender} />
                      <span className="checkmark" />
                  </label>
                )
              })
            }
        </div>
    )
  }

  function renderSpecies(){

    return(
          <div className="filters">
            <h6>Species: </h6>
            {FILTERS.species.map((spe)=>{
              return(
                  <label key={spe} className="container">{`${spe}`}
                    <input type="checkbox" value={spe} onChange={applyFilter} checked={props.filters.filters.species === spe}/>
                    <span className="checkmark" />
                  </label>
              )
            })}
          </div>
      )
  }

  function renderOrigin(){
    return(
        <div className="filters">
          <h6>Origin: </h6>
          {FILTERS.origin.map((ori)=>{
            return(
                <label key={ori} className="container">{`${ori}`}
                  <input type="checkbox" value={ori} onChange={(e)=>applyFilter(e)} checked={(props.filters.filters.origin).toLowerCase() === ori.toLowerCase()}/>
                  <span className="checkmark"/>
                </label>
            )
          })}
        </div>
    )
  }
  return (
    <div className="filters-wrapper">
      <>
        {selectedChips()}
      </>

      <h4>Filters</h4>
             
        {renderSpecies()}        
      <br/>
        {renderGenderFilters()}
      <br/>
        {renderOrigin()}
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
		applySorting: (filters) => dispatch(applySortingAsync(filters)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersFilter);

