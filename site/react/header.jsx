import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import $ from "jquery";
import HeaderWrapper    from "./header_wrapper.jsx"
import SearchInputField from './widgets/search_input_field.jsx'

const Header = React.createClass({

  getInitialState: function() {
    return {modalLoading: false}
  },
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

  loadObjectData: function(e) {
    if (this.state.modalLoading) {return false;}
    this.setState({modalLoading: true});
    const type = $(e.target).data('type');
    $.post("/full_graph",this.generateTestData(type), (data) => {
        this.props.showObjectGraph(data);
        this.setState({modalLoading: false})
      }, "text")
  },

  render: function() {
    let title = ENTITY_TYPE;

    let sourceButtons = this.props.data.map((source, index) => {
      return (<Button 
        active={this.props.searchAgainst == source.name} 
        onClick={() =>this.props.setSearch(source.name)}
        key={index}
      >
        {source.name}
      </Button>)
    });

    let topButtons = (
      <ButtonGroup bsSize="small" role="group" className='search_buttons'>
        {sourceButtons}
      </ButtonGroup>
    )

    let bottomButtons = (
      <div className="btn-toolbar">
        <ButtonGroup bsSize="small" role="group" className='download_buttons'>
          <Button
             data-type="ttl"
             disabled= {this.state.modalLoading}
             onClick={this.loadObjectData}>
            Turtle
          </Button>
          <Button
             data-type="nested_ttl"
             disabled={this.state.modalLoading}
             onClick={this.loadObjectData}>
            Turtle (Nested)
          </Button>
          <Button
             data-type="json"
             disabled ={this.state.modalLoading}
             onClick={this.loadObjectData}>
            JSON
          </Button>
        </ButtonGroup>
      </div>
    )

    return (
      <HeaderWrapper 
          title={title} 
          topButtonsLabel="Search Against:"
          topButtons={topButtons} 
          bottomButtonsLabel={this.state.modalLoading ? "Processing..." : "Export Entity As:"} 
          bottomButtons={bottomButtons}
      />
    )
  }
});

export default Header;