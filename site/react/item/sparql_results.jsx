import React from 'react';

import ModalTrigger     from '../utilities/modal_trigger.jsx'
import GithubIssue      from '../utilities/github_issue.jsx'


export default  React.createClass({
  getInitialState: function() {
    return {showConstructed: false}
  },
  
  truncate: function(str,len) {
    if (str.length <=len) { return str;}
    return `${str.substring(0,len-3)}...`
  },

  render: function() {

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
                 <div className="btn-group btn-group-xs ">
                  <ModalTrigger func={this.props.showModal} text={this.props.results.select}>
                    Show this Query
                  </ModalTrigger>
                  <ModalTrigger func={this.props.showModal} text={this.props.results.object}>
                    Show as Turtle
                  </ModalTrigger>
                 </div>
             </div>
             <div className="panel-footer">
              <GithubIssue title={this.props.title} query={this.props.results.select}/>
             </div>
          </div>  
        </div>
      </div>
    )
  }
});
