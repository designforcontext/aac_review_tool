/******************************************************************************
*
*  This is the Item Display title section, with the badges and the metadata.
*  No functionality, just a display template.
*  
******************************************************************************/

import React from 'react';

export default  function(props) {
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
          <p>{props.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <dl className="dl-horizontal">
            <dt>Sample Data: </dt>
            <dd>{props.example}</dd>
            <dt>Mandatory:</dt>
            <dd>{props.mandatory ? "Yes" : "No"}</dd>
            <dt>Multiples:</dt>
            <dd>{props.multiples ? "Yes" : "No"}</dd>
            <dt>{props.lod_type ? "Associated AAC ID:" : ""}</dt>
            <dd><a href={props.lod_type} target="_blank">{props.lod_type}</a></dd>
          </dl>
        </div>
      </div>
    </section>
  );
};

