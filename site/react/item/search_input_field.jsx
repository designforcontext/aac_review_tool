import React from 'react';

export default React.createClass({
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
