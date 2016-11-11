/******************************************************************************
*
*  This is the Item Display title section, with the badges and the metadata.
*  No functionality, just a display template.
*  
******************************************************************************/

import React from 'react';

export default  function(props) {

  let lod_terms = null;
  if (props.lod_type && props.lod_type.count){
    lod_terms = props.lod_type.map((obj,i) => (<a href={obj} key={i} target="_blank">{obj} </a>))
  } else {
    lod_terms = props.lod_type
  }

  return (
    <section className="field_info">

      <div className="row">
        <div className="col-md-12">
          <h2 className="field_name">
            {props.title}
            {/*
            <span className='badge'>{props.mandatory ? "Mandatory" : ""}</span>
            <span className='badge'>{props.multiples ? "" : "Only One Allowed"}</span>
            */}
          </h2>
          <p className="main_desc">{props.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <dl className="dl-horizontal">
            <dt>Mandatory:</dt>
            <dd>{props.mandatory ? "Yes" : "No"}</dd>
            <dt>Multiples:</dt>
            <dd>{props.multiples ? "Yes" : "No"}</dd>
            <dt>{props.lod_type ? "Associated LOD Term:" : ""}</dt>
            <dd>{lod_terms}</dd>
            <dt className="hidden">Sample Data: </dt>
            <dd className="hidden">{props.example}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
};

