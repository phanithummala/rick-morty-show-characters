import './App.css';
import CharactersList from './components/CharacterList/CharactersList';
import CharactersFilter from './components/Filters/CharactersFilter';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar';
import SortCharacters from './components/SortCharacters/SortCharacters';


function App() {
  return (
    <section className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <Header/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-md-12 col-sm-12 col-12">
              <CharactersFilter/>
            </div>
            <div className="col-lg-10 col-md-12 col-sm-12 col-12">
            <div className="filter-sort-wrapper">              
              <SearchBar/>
              <SortCharacters/>
            </div>
            <CharactersList />              
            </div>
          </div>
        </section>
  );
}

export default App;
