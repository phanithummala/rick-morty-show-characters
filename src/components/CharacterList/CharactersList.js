import React from 'react';
import { connect }from 'react-redux';
import { fetchAsyncCharList } from '../../redux/actions/actions';
import Character from '../Character/Character';
import {SORTING_ORDER} from "../Filters/CharactersFilter";
import Loader from '../Loader';
import './CharacterList.css';

class  CharactersList extends React.Component {

    componentDidMount() {
		this.props.fetchCharList({...this.props.filters});
		this.fetchCharacterListOnScroll();
	}
    
    fetchCharacterListOnScroll(){
		window.onscroll = () => {
			const st = window.pageYOffset || document.documentElement.scrollTop;
			const currentPage =  this.props.filters.currentPageNo;
			const totalPages = this.props.characters.totalPages;
			let condition = currentPage < totalPages;
			let nextPageNo = this.props.filters.currentPageNo + 1;
			if (st > this.lastScrollTop && condition && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.props.characters.loading) {
				this.props.fetchCharList({
					...this.props.filters,
					currentPageNo: nextPageNo
				});
			}
			this.lastScrollTop = st <= 0 ? 0 : st;
		};
	}
    
    render(){

        let charList,loader;

        if(this.props.filters.order === SORTING_ORDER.DESC){
            charList = [...this.props.characters.charList].sort(((char1, char2) => char2.id - char1.id));
        }else{
            charList = [...this.props.characters.charList].sort(((char1, char2) => char1.id - char2.id));
		}
		if(this.props.characters.loading){
			loader=<Loader />
		} 
		else{
			loader=<></>
		}
        return (
            <div className="row active-with-click char-wrapper">
				{loader}

                {
                    charList && charList.map((character)=>{
					return  <Character key={character.id} char={character} sortBy={this.props.filters.order} loading={this.props.characters.loading}/>
                        
                            
                    }) 
                }
            </div>
        )
    }
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
		fetchCharList: (filters) => { 
            return dispatch(fetchAsyncCharList(filters));
        }
        
	};
};
export default connect(
		mapStateToProps,
		mapDispatchToProps,
)(CharactersList);

