import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import $ from "jquery";
import HeaderWrapper    from "./header_wrapper.jsx"
import SearchInputField from './widgets/search_input_field.jsx'
import Constants        from './lib/constants.jsx'

const Header = React.createClass({

  getInitialState: function() {
    return {modalLoading: false}
  },
  componentDidMount: function() {
    this.props.setEntityUri(this.getCurrentEntityURI()); 
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.searchAgainst != this.props.searchAgainst) {
      this.props.setEntityUri(this.getCurrentEntityURI()); 
    }
  },

  loadObjectData: function(e) {
    if (this.state.modalLoading) {return false;}
    this.setState({modalLoading: true});
    const type = $(e.target).data('type');
    const title = $(e.target).data('modal-title');
    const html = type == "report"
    let ajax = $.post("/full_graph",this.generateObjectData(type), "text");
    ajax.done((data) => this.handleDataReturn(data,title,html));
    ajax.fail((_,errorText,error) => {
      this.props.showObjectGraph(error);
      this.setState({modalLoading: false})
    })
  },
  getCurrentEntityURI: function() {
   return this.props.data.find( (el)=> el.name == this.props.searchAgainst)[ENTITY_TYPE].default; 
  },
  handleDataReturn: function(data, title,html) {
    this.props.showObjectGraph(data, title,html);
    this.setState({modalLoading: false})
  },
  generateObjectData: function(type="ttl") {
    var objIndex = this.props.data.findIndex( (el)=> el.name == this.props.searchAgainst)  
    return {
      endpoint: this.props.data[objIndex].endpoint,
      crm: this.props.data[objIndex].predicate,
      values: {entity_uri: this.getCurrentEntityURI()},
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
          <Button
             data-type="report"
             data-modal-title="Entity Validation Report"
             disabled ={this.state.modalLoading}
             onClick={this.loadObjectData}>
            Report
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
      >
        <SearchInputField 
          func={this.props.setEntityUri} 
          value={Constants.ENTITY_FIELD_NAME} 
          default={this.getCurrentEntityURI()} 
          title="Current Entity URI"
          stacked />
      </HeaderWrapper>
    )
  }
});

export default Header;