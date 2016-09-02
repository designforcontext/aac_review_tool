import React from 'react';


export default function(props){
  let buttons = false;
  if (props.buttons) {
    buttons = (
      <div className="nav navbar-nav navbar-right">
        <div className="btn-toolbar" role="toolbar" aria-label="...">
          {props.buttons}
        </div>
      </div>
    )
  }

  return (
    <nav className="navbar navbar-default navbar-static-top main_nav">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="navbar-brand">{props.title}</div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          {buttons}
        </div>
      </div>
    </nav>
  )
};