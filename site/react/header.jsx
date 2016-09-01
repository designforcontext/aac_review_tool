import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import $ from "jquery";

const Header = React.createClass({
  generateTestData: function(type="ttl") {
    var testObjectIndex = this.props.data.findIndex( (el)=> el.name == this.props.searchAgainst)
    
    return {
      endpoint: this.props.data[testObjectIndex].endpoint,
      crm: this.props.data[testObjectIndex].predicate,
      values: {entity_uri: this.props.data[testObjectIndex][ENTITY_TYPE].default},
      entity_type: ENTITY_TYPE,
      return_type: type
    }
  },

  render: function() {
    let buttons = this.props.data.map((source, index) => {
      return (<Button 
        key={index}
        bsClass="btn navbar-btn btn-default" 
        active={this.props.searchAgainst == source.name} 
        onClick={() =>this.props.setSearch(source.name)}
      >
        {source.name}
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
            <div className="navbar-brand">AAC Mappings: {ENTITY_TYPE}</div>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <div className="nav navbar-nav navbar-right">
              <div className="btn-toolbar" role="toolbar" aria-label="...">
                <ButtonGroup bsSize="small" role="group" className='download_buttons'>
                  <Button
                     bsClass="btn navbar-btn btn-default" 
                     onClick={() => $.post("/full_graph",this.generateTestData("ttl"), this.props.showObjectGraph)}>
                    Show Turtle
                  </Button>
                  <Button
                     bsClass="btn navbar-btn btn-default" 
                     onClick={() => $.post("/full_graph",this.generateTestData("nested_ttl"), this.props.showObjectGraph)}>
                    Show Turtle (Nested)
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
});

export default Header;