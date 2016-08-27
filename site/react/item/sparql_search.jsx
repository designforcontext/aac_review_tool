import React from 'react';
import { Button } from 'react-bootstrap';

import $ from "jquery";

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
    obj.forEach(v => val[v.name] = v.value);
    // console.log("obj",obj,val)

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
    console.log(data.select);
  },

  render: function() {

    var _this = this;
    let input_boxes = this.props.values.split(" ").map(function(value) {  

      let field_name = value.replace("?","");
      let default_value = _this.props[`test_${field_name}`];
      if (field_name == "object_uri") {
        default_value = _this.props.search.default_object
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

        <SparqlResults select={this.props.select} results={this.state.results} />
      </section>
    );
  }
});

//-----------------------------------------------------------------------------
var SearchInputField = React.createClass({
  getInitialState: function() {
    return {value: (this.props.default || "")}
  },
  handleChange: function(e) {
    this.setState({value: event.target.value});
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.default != this.props.default) {
      this.setState({value: (nextProps.default || "")});
    }
  },
  render: function() {
   
    let id_val=`sparql_${this.props.value}`;
    let title = this.props.value.replace(/_/g, " ");
    let placeholder=`Enter a ${title}`;
    let default_value = this.props.default;

    return (
      <div className="form-group">
          <label className="col-sm-3 text-right" htmlFor={id_val} style={{"textTransform": "capitalize"}}>{title}</label>
          <div className="col-sm-6">
            <input 
              type="text" 
              className="form-control" 
              name={this.props.value} 
              id={id_val} 
              placeholder={placeholder} 
              value={this.state.value} 
              onChange={this.handleChange}
            />
          </div>
      </div>

    )
  }
});

//-----------------------------------------------------------------------------
var SparqlResults = React.createClass({
  getInitialState: function() {
    return {showConstructed: false}
  },
  render: function() {

    if (!this.props.results) {return false;}


    let table_headers = this.props.select.split(" ").map(function(select_item) {
      return ( <th key={select_item} >{select_item.replace("?","")}</th>)
    });

    let _this = this;
    let table_rows = this.props.results.values.map(function(result, i) {
      let cells = _this.props.select.split(" ").map(function (key) {
        let val = result[key.replace("?","")];
        if(/^https?:\/\//.test(val)) {
          val = <a href={val} target='_blank'>{val}</a>
        }

        return (<td key={`${i}_${key}`}> {val}</td>)
      });
      return ( <tr key={i}>{cells}</tr>)
    });

   var constructed_results;
   if (!this.state.showConstructed) {
      constructed_results = (
        <div className="panel-body">
          <button  className="btn btn-info btn-xs center-block" onClick={(e) => _this.setState({showConstructed: true})}>Show Turtle</button>
        </div>
      );
    }
    else {
      constructed_results = (
        <div className="panel-body">
          <pre className='pre-scrollable'>{_this.props.results.object}</pre>
          <button className="btn btn-info btn-xs center-block" onClick={(e) => _this.setState({showConstructed: false})}>Hide Turtle</button>
        </div>
      );
    }

    return (
      <div className="row results">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
             <table className="table table-hover">              
               <thead><tr>{table_headers}</tr></thead>
               <tbody>{table_rows}</tbody>
             </table>
             {constructed_results}
          </div>  
        </div>
      </div>
    )
  }
});

//-----------------------------------------------------------------------------
export default SparqlSearch;