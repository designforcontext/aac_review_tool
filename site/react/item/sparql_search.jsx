import React from 'react';
import { Button } from 'react-bootstrap';
import $ from "jquery";

import ModalTrigger     from '../widgets/modal_trigger.jsx'
import SparqlResults    from './sparql_results.jsx'
import SearchInputField from '../widgets/search_input_field.jsx'


var SparqlSearch = React.createClass({

  getInitialState: function() {
    return {results: false, isSearching: false}
  },
  componentDidMount: function() {
    this.autoSearch();
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.title != this.props.title) {
      this.setState({results: false});
    }
  },
  componentDidUpdate: function(prevProps) {
    if (prevProps.title != this.props.title || 
        prevProps.search.endpoint != this.props.search.endpoint ||
        prevProps.currentEntity != this.props.currentEntity) {
      this.autoSearch();  
    }
  },

  autoSearch: function(e=null){
    if (e) {e.preventDefault();}
    let obj = $("#search_form").serializeArray();
    this.doSearch(obj);
  },

  doSearch: function(obj) {
    if(!this.props.currentEntity){ return false;}
    
    let val = {entity_uri: this.props.currentEntity};

    obj.forEach(v => {
      val[v.name] = v.value;
    });

    let submission = {
      fields: {
        select: this.props.select,
        construct: this.props.construct,
        where: this.props.where,
        values: this.props.values
      },
      endpoint: this.props.search.endpoint,
      crm: this.props.search.predicate,
      values: val
    }
    $.post("/search", submission, this.handleResults);
    this.setState({isSearching: true});
  },

  handleResults: function (data) {
    this.setState({results: data, isSearching: false});
  },

  render: function() {
    if (!this.props.currentEntity) return false;

    // Generate the list of needed parameters
    let cols = this.props.values.split(" ").filter((val) => val != "?entity_uri")

    // Generate the secondary input boxes
    let input_boxes = cols.map((value) => {  
      let field_name = value.replace("?","");
      let default_value = this.props[`test_${field_name}`];
      return (
        <SearchInputField 
            key={field_name} 
            value={field_name} 
            default={default_value}
        />
      )
    });

    // Wrap the secondary input boxes in boilerplate
    let query_fields = cols.length == 0 ? "" : (
      <div className="row">
        <div className="col-md-12 col-lg-10 col-lg-offset-1">
          <h5>Query-Specific Fields:</h5>
          <form id="search_form" className="form-horizontal" onSubmit={this.state.isSearching ? null :this.autoSearch}>
            {input_boxes}
          </form>
        </div>
      </div>
    )

    // Generate the title
    let the_title = <h4>{this.props.title} for <a href={this.props.currentEntity} className="entity_uri_label" target="_blank">{this.props.currentEntity.replace(/https?:\/\//,"")}</a></h4>;

    return (  
      <section className="search">
        <div className="row">
          <div className="col-md-12">
            {the_title}
          </div>
        </div>
        <SparqlResults search={this.props.search}  title={this.props.title} select={this.props.select} results={this.state.results} showModal={this.props.showModal} />
        {query_fields}    
      </section>
    );
  }
});


//-----------------------------------------------------------------------------
export default SparqlSearch;