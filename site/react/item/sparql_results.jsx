/******************************************************************************
*
*  This builds the table of serach results.  
*
*  Assumes the following properties:
*    results:   The results of the search.  Is an object.
*    select:    The select portion of the sparql query.
*    title:     The page title, used for the Github Issue submit
*    showModal: The function to display a modal popup.
* 
******************************************************************************/

import React from 'react';

import ModalTrigger     from '../widgets/modal_trigger.jsx'
import GithubIssue      from '../widgets/github_issue.jsx'
import {truncate}       from '../lib/helpers.jsx'

export default  React.createClass({
  render: function() {
    
    let content = ""; // This will hold the content.

    if (this.props.results) {

      // Set up the table headers
      let columns = this.props.select.split(" ");
      let table_headers = columns.map(function(select_item) {
        return ( <th key={select_item} >{select_item.replace("?","")}</th>)
      });

      // Set up the table values
      // 
      let predicates = {};
      Object.assign(predicates, this.props.search.prefix, {"crm": this.props.search.predicate});
      let table_rows = null;
      if (this.props.results.values.length > 0) {
        table_rows = this.props.results.values.map((result, i) => {
          let cells = this.props.select.split(" ").map((key) => {
            let val = result[key.replace("?","")];
            if(/^https?:\/\//.test(val)) {
              if(/\.(?:jpg|png|tif|tiff|svg)$/.test(val)) {
                val = <a href={val} target='_blank'><img className='img-responsive' src={val} /></a>
              }else {
                val = <a href={val} target='_blank'>{truncate(val,50,predicates)}</a>
              }
            }
            return (<td key={`${i}_${key}`}> {val}</td>)
          });
          return ( <tr key={i}>{cells}</tr>)
        })
      }
      else {
        table_rows = <tr><td colSpan={columns.length} className='no_results'>No results found.</td></tr>
      }
      content = (
        <table className="table table-hover">              
          <thead><tr>{table_headers}</tr></thead>
          <tbody>{table_rows}</tbody>
        </table>
      )

    } else { // No search results
      content = (
        <table className="table table-hover">              
          <thead><tr><td>Searching</td></tr></thead>
          <tbody><tr><td>...</td></tr></tbody>
        </table>
      )
    }

    return (
      <div className="row results">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
             {content}
             <div className="panel-footer text-center hidden-printr">
               <div className="btn-group btn-group-xs ">
                <ModalTrigger func={this.props.showModal} text={this.props.results.select} title="SPARQL Query">
                  Show this Query
                </ModalTrigger>
                <ModalTrigger func={this.props.showModal} text={this.props.results.object} title="Results as Linked Open Data">
                  Show this as Turtle
                </ModalTrigger>
               </div>
               <GithubIssue title={this.props.title} query={this.props.results.select}/>
             </div>
          </div>  
        </div>
      </div>
    )
  }
});
