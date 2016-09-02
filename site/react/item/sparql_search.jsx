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

    var _this = this;
    let input_boxes = this.props.values.split(" ").map(function(value) {  

      let field_name = value.replace("?","");
      let default_value = _this.props[`test_${field_name}`];
      if (field_name == "entity_uri") {
        default_value = _this.props.search[ENTITY_TYPE].default
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
var SearchInputField = React.createClass({
  getInitialState: function() {
    return {value: (this.props.default || "")}
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
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
          <div className="col-sm-2">
            <a className="search_link" href={this.state.value} target="_blank">
              (link)
            </a>
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
  
  truncate: function(str,len) {
    if (str.length <=len) { return str;}
    return `${str.substring(0,len-3)}...`
  },

  render: function() {


    let issueTitle = encodeURIComponent("Problem with mapping of " + this.props.title)
    let issueBody = encodeURIComponent("I expected to see:\n\n*[WHAT I EXPECTED]*\n\nbut instead I saw:\n\n*[WHAT I SAW]*\n\nThe current query was:\n\n```ttl\n"+this.props.results.select+"\n```")
    let issueLinkUrl = `https://github.com/workergnome/aac_mappings/issues/new?title=${issueTitle}&body=${issueBody}`
    

    if (!this.props.results) {return false;}

    let columns = this.props.select.split(" ");

    let table_headers = columns.map(function(select_item) {
      return ( <th key={select_item} >{select_item.replace("?","")}</th>)
    });

    let table_rows = (
      <tr><td colSpan={columns.length} className='no_results'>No results found.</td></tr>
    )
    if (this.props.results.values.length > 0) {
        table_rows= this.props.results.values.map((result, i) => {
        let cells = this.props.select.split(" ").map((key) => {
          let val = result[key.replace("?","")];
          if(/^https?:\/\//.test(val)) {
            if(/\.(?:jpg|png|tif|tiff|svg)$/.test(val)) {
              val = <a href={val} target='_blank'><img className='img-responsive' src={val} /></a>
            }else {
              val = <a href={val} target='_blank'>{this.truncate(val,40)}</a>
            }
          }
          return (<td key={`${i}_${key}`}> {val}</td>)
        });
        return ( <tr key={i}>{cells}</tr>)
      })
    }

    return (
      <div className="row results">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
             <table className="table table-hover">              
               <thead><tr>{table_headers}</tr></thead>
               <tbody>{table_rows}</tbody>
             </table>
             <div className="panel-body text-center">
                 {this.state.showConstructed ? <pre className='pre-scrollable text-left'>{this.props.results.object}</pre> : ""}
                  <div className="btn-group btn-group-xs ">
                 <button 
                       id="copy-sparql"
                       className="btn btn-info"
                       onClick={(e) => this.props.showModal(this.props.results.select)}>
                       Show Query
                  </button>
                  <button  
                       className="btn btn-info" 
                       onClick={(e) => this.setState({showConstructed: !this.state.showConstructed})}>
                       { this.state.showConstructed ? "Hide Turtle" : "Show Turtle"}
                  </button>
                 </div>
                 <div className="github_issue_link">
                   <a href={issueLinkUrl}>Do you see a problem with this?  Submit an issue.</a>
                 </div>
             </div>
          </div>  
        </div>
      </div>
    )
  }
});

//-----------------------------------------------------------------------------
export default SparqlSearch;