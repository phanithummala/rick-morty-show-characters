import { Chip } from '@material-ui/core';
import React from 'react';

function SelectedFilters({id,label,onDelete}) {
  
  return (
    <> 
        <Chip label={label} key={id} category={id} onDelete={(e)=> onDelete(e,label)}/>
    </>
  )
}

export default SelectedFilters
