import React from 'react';
import {timeSince} from '../../utils/dateUtil';
import './Character.css'

function Character({char}) {
  return (
   
    <div className="col-lg-3 col-md-3 col-sm-3 col-6 cartDesignGrid">   
      <div className="card">
        <div className="imgContainer">
          <img src={char.image} alt="Character name"/>
          <div className="info-details">
              <h4 className="charName">{char.name}</h4>
              <div className="char-id">id: {char.id} - created at {timeSince(char.created)}</div>
          </div>

        </div>      
        <div className="description">
          <div className="description-item">
            <p className="item1">Species</p>
            <p className="item2">{char.species}</p>
          </div>
          <hr/>
          <div className="description-item">
            <p className="item1">Gender</p>
            <p className="item2">{char.gender}</p>
          </div>
          <hr/>
          <div className="description-item">
            <p className="item1">Origin</p>
            <p className="item2">{char.origin.name}</p>
          </div>
          <hr/>
          <div className="description-item">
            <p className="item1">Location</p>
            <p className="item2">{char.location.name}</p>
          </div>
        </div>
      </div>      
    </div>    
  )
}
export default Character;
