import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import $ from "jquery";
import HeaderWrapper    from "./header_wrapper.jsx"
import SearchInputField from './widgets/search_input_field.jsx'

const Header = React.createClass({

  getInitialState: function() {
    return {modalLoading: false}
  },

  loadObjectData: function(e) {
    if (this.state.modalLoading) {return false;}
    this.setState({modalLoading: true});
    const type = $(e.target).data('type');
    const title = $(e.target).data('modal-title');
    let ajax = $.post("/full_graph",this.generateObjectData(type), "text");
    ajax.done((data) => this.handleDataReturn(data,title));
    ajax.fail((_,errorText,error) => {
      this.props.showObjectGraph(error);
      this.setState({modalLoading: false})
    })
  },

  handleDataReturn: function(data, title) {
    this.props.showObjectGraph(data, title);
    this.setState({modalLoading: false})
  },
  generateObjectData: function(type="ttl") {
    var objIndex = this.props.data.findIndex( (el)=> el.name == this.props.searchAgainst)  
    return {
      endpoint: this.props.data[objIndex].endpoint,
      crm: this.props.data[objIndex].predicate,
      values: {entity_uri: this.props.data[objIndex][ENTITY_TYPE].default},
      entity_type: ENTITY_TYPE,
      return_type: type
    }
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
        <ButtonGroup bsSize="small" role="group" className='download_buttons'>
          <Button
             data-type="ttl"
             data-modal-title="Entity as Linked Open Data (in Turtle)"
             disabled= {this.state.modalLoading}
             onClick={this.loadObjectData}>
            Turtle
          </Button>
          <Button
             data-type="nested_ttl"
             data-modal-title="Entity as Turtle (Nested Graph with Blank Nodes)"
             disabled={this.state.modalLoading}
             onClick={this.loadObjectData}>
            Turtle (Nested)
          </Button>
          <Button
             data-type="json"
             data-modal-title="JSON Representation of the Entity"
             disabled ={this.state.modalLoading}
             onClick={this.loadObjectData}>
            JSON
          </Button>
        </ButtonGroup>
    )

    return (
      <HeaderWrapper 
          title={title} 
          bottomButtonsLabel="Current SPARQL Endpoint:"
          bottomButtons={topButtons} 
          topButtonsLabel={this.state.modalLoading ? "Processing..." : "Export Entity As:"} 
          topButtons={bottomButtons}
      />
    )
  }
});

export default Header;