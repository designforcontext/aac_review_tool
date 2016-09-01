import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import $ from "jquery";
import HeaderWrapper from "./header_wrapper.jsx"

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
    let title = `AAC Mappings: ${ENTITY_TYPE}`

    let buttons = this.props.data.map((source, index) => {
      return (<Button 
        key={index}
        bsClass="btn navbar-btn btn-default" 
        active={this.props.searchAgainst == source.name} 
        onClick={() =>this.props.setSearch(source.name)}
      >
        {source.name}
      </Button>)
    });``

    let all_buttons = (
      <div className="btn-toolbar">
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
    )

    return (
      <HeaderWrapper title={title} buttons={all_buttons} />
    )
  }
});

export default Header;