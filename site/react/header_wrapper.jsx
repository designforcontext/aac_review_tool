import React from 'react';


export default function(props){

  return (
    <header className="container-fluid page_header hidden-print">
      <div className="row">
        <div className="col-sm-12">
          <div className="pull-left logo"><a href="/"><img src="/images/aac_logo.png"/></a></div>
          <h1>AAC Mapping Validator</h1>
          <h2>{props.title}</h2>
        </div>
      </div>
      <div className="row header_interface">
        <div className="col-sm-6 col-lg-4 col-lg-offset-2 ">
          {props.children}
        </div>
        <div className="col-sm-5 col-lg-6">
          <div className="pull-left">
            <label className="btn_group_label">{props.bottomButtonsLabel}</label>
            <div className="btn-toolbar">
              {props.bottomButtons}
            </div>
          </div>
          <div className="pull-right">
            <label className="btn_group_label">{props.topButtonsLabel}</label>
            <div className="btn-toolbar">
              {props.topButtons}
            </div>
          </div>
        </div>
      
      </div>
    </header>
  )
};