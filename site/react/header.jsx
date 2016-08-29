import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
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

  var testObjectIndex = props.data.findIndex( (el)=> el.name == props.searchAgainst)
  var testData = {
    endpoint: props.data[testObjectIndex].endpoint,
    crm: props.data[testObjectIndex].predicate,
    values: {object_uri: props.data[testObjectIndex].default_object}
  }
  let nested_testData = Object.create(testData)
  nested_testData.nested = true
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
                   onClick={() => $.post("/full_graph",testData, props.showSparql)}>
                  Test Full Object
                </Button>
                <Button
                   bsClass="btn navbar-btn btn-default" 
                   onClick={() => $.post("/full_graph",nested_testData, props.showSparql)}>
                  Test Full Object (Nested)
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