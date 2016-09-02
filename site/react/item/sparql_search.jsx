import React from 'react';
import { Button } from 'react-bootstrap';
import $ from "jquery";

import ModalTrigger     from '../utilities/modal_trigger.jsx'
import SparqlResults    from './sparql_results.jsx'
import SearchInputField from './search_input_field.jsx'


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
    if (prevProps.title != this.props.title || prevProps.search.endpoint != this.props.search.endpoint) {
      this.autoSearch();  
    }
  },

  autoSearch: function(e=null){
    if (e) {e.preventDefault();}
    let obj = $("#search_form").serializeArray();
    this.doSearch(obj);
  },

  doSearch: function(obj) {
    let val = {};
    let blank_found = false;
    obj.forEach(v => {
      if (v.name == "entity_uri" && v.value == "") {blank_found = true};
      val[v.name] = v.value;
    });

    if(blank_found){ return false;}


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

    let input_boxes = this.props.values.split(" ").map((value) => {  

      let field_name = value.replace("?","");
      let default_value = this.props[`test_${field_name}`];
      if (field_name == "entity_uri") {
        default_value = this.props.search[ENTITY_TYPE].default
      }
      return (
        <SearchInputField 
            key={field_name} 
            value={field_name} 
            default={default_value}
        />
      )

    });



    return (  
      <section className="search">
        <div className="row">
          <div className="col-md-12">
            <h4>Test An Example</h4>
            <form id="search_form" className="form-horizontal" onSubmit={this.state.isSearching ? null :this.autoSearch}>
              {input_boxes}
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-6">
                  <Button
                    bsStyle="primary"
                    disabled={this.state.isSearching}
                    onClick={this.state.isSearching ? null :this.autoSearch}
                  >
                    {this.state.isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <SparqlResults title={this.props.title} select={this.props.select} results={this.state.results} showModal={this.props.showModal} />
      </section>
    );
  }
});


//-----------------------------------------------------------------------------
export default SparqlSearch;