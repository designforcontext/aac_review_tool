import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function(props) {
  let buttons = props.data.map((source, index) => {
    return (<Button 
      key={index}
      bsClass="btn navbar-btn btn-default" 
      active={props.searchAgainst == source.name} 
      onClick={() =>props.setSearch(source.name)}
    >
      Search {source.name}
    </Button>)
  })

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
          <div className="navbar-brand">AAC Object Mappings</div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <div className="nav navbar-nav navbar-right">
            <ButtonGroup bsSize="small" role="group" className='search_buttons'>
              {buttons}
            </ButtonGroup>
          </div>
        </div>
      </div>
    </nav>
  )
}