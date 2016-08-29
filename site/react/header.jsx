import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import $ from "jquery";


export default function(props) {
  let buttons = props.data.map((source, index) => {
    return (<Button 
      key={index}
      bsClass="btn navbar-btn btn-default" 
      active={props.searchAgainst == source.name} 
      onClick={() =>props.setSearch(source.name)}
    >
      {source.name}
    </Button>)
  })

  var testData = {
    endpoint: props.data[0].endpoint,
    crm: props.data[0].predicate,
    values: {object_uri: "http://collection.britishart.yale.edu/id/object/1000"}
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
          <div className="navbar-brand">AAC Object Mappings</div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <div className="nav navbar-nav navbar-right">
            <div className="btn-toolbar" role="toolbar" aria-label="...">
              <ButtonGroup bsSize="small" role="group" className='download_buttons'>
                <Button
                   bsClass="btn navbar-btn btn-default" 
                   onClick={() => $.post("/full_graph",testData,(results) => console.log(results))}>
                  Test Full Object
                </Button>
              </ButtonGroup>
              <ButtonGroup bsSize="small" role="group" className='search_buttons'>
                {buttons}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}