import React from 'react';

var SparqlResults = React.createClass({

  render: function() {

    if (!this.props.results) {return false;}


    let table_headers = this.props.select.split(" ").map(function(select_item) {
      return ( <th key={select_item} >{select_item.replace("?","")}</th>)
    });
    let table_rows = this.props.results.values.map(function(result) {

      let cells = Object.keys(result).map(function (key) {
        console.log('result', result[key]);
        return (<td key={result[key]}> {result[key]}</td>)
      });
      return ( <tr key={Object.values(result).join()}>{cells}</tr>)
    });

    return (
      <div className="row results">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
             <table className="table table-hover">              
               <thead><tr>{table_headers}</tr></thead>
               <tbody>{table_rows}</tbody>
             </table>
             <div className="panel-body">
              <pre className='pre-scrollable'>
                {this.props.results.object}
              </pre>
            </div>
          </div>  
        </div>
      </div>
    )
  }
});

var SparqlSearch = React.createClass({

  getInitialState: function() {
    return {results: false}
  },

  doSearch: function(e) {
    e.preventDefault();

    let obj = $(e.target).serializeArray();
    let val = {};
    obj.forEach(v => val[v.name] = v.value);


    let submission = {
      fields: {
        select: this.props.select,
        construct: this.props.construct,
        where: this.props.where,
        values: this.props.values
      },
      values: val
    }
    $.post("/search", submission, this.handleResults);
  },
  handleResults: function (data) {
    this.setState({results: data});
  },

  render: function() {

    var _this = this;
    let input_boxes = this.props.values.split(" ").map(function(value) {  
      let field_name = value.replace("?","");
      let id_val=`sparql_${field_name}`;
      let title = field_name.replace(/_/g, " ");
      let placeholder=`Enter a ${title}`;
      let default_value = _this.props[`test_${field_name}`];

      return (
        <div className="form-group" key={id_val}>
            <label className="col-sm-3 text-right" htmlFor={id_val} style={{"textTransform": "capitalize"}}>{title}</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" name={field_name} id={id_val} placeholder={placeholder} defaultValue={default_value} />
            </div>
        </div>
      )

    });



    return (  
      <section className="search">
        <div className="row">
          <div className="col-md-12">
            <h4>Test An Example</h4>
            <form className="form-horizontal" onSubmit={this.doSearch}>
              {input_boxes}
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-6">
                  <button type="submit" className="btn btn-primary">Search</button>
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

export default SparqlSearch;