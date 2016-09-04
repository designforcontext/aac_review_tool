import React from 'react';


export default function(props){

  return (
    <header className="container-fluid page_header">
      <div className="row">
        <div className="col-md-4">
          <h1><a href="/">AAC Entity Mappings</a> </h1>
          <h2>{props.title}</h2>
        </div>
        <div className="col-md-8">
          <div className="pull-right">
            <h3 className="btn_group_label">{props.topButtonsLabel}</h3>
            <div className="btn-toolbar">
              {props.topButtons}
            </div>
          </div>
          <div className="pull-right">
            <h3 className="btn_group_label">{props.bottomButtonsLabel}</h3>
            <div className="btn-toolbar">
              {props.bottomButtons}
           </div>
          </div>
        </div>
      </div>
    </header>
  )
};