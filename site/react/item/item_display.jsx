/******************************************************************************
*
*  This is a wrapper class for the main item display screen.  
*  No functionality, no state.  Just sending properties where they belong.
*  
******************************************************************************/

import React from 'react';

import ItemTitle    from './title.jsx';
import SparqlSearch from './sparql_search.jsx';
import ItemMapping  from './mapping.jsx';

export default function(props) {

  return (
    <div className="col-sm-9 col-lg-8 col-lg-offset-1 app">

      <ItemTitle 
        title={props.title}
        mandatory={props.mandatory}
        multiples={props.multiples}
        description={props.long_description ? props.long_description : props.description}
        example={props.example}
        lod_type={props.lod_type}
      />

      <SparqlSearch {...props}/>

      <ItemMapping fieldTitle={props.title} construct={props.construct} extras={props.graph_extras} showModal={props.showModal}/>
    </div>
  )
}
