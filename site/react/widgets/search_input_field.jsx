import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {value: (this.props.default || "")}
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  handleKeyDown: function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 13 && this.props.func){
      this.props.func(this.state.value);
      e.preventDefault();
    }
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.default != this.props.default) {
      this.setState({value: (nextProps.default || "")});
    }
  },
  render: function() {
   
    let id_val=`sparql_${this.props.value}`;
    let title = this.props.title || this.props.value.replace(/_/g, " ");
    let placeholder=`Enter a ${title}`;
    let default_value = this.props.default;

    let the_input = (
      <input 
        type="text" 
        className="form-control" 
        name={this.props.value} 
        id={id_val} 
        placeholder={placeholder} 
        value={this.state.value} 
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )

    let the_link = <a className="search_link" href={this.state.value} target="_blank">(link)</a>
 
    let the_label = <label htmlFor={id_val} style={{"textTransform": "capitalize"}}>{title}:</label>


    if(this.props.stacked) {
      return (
      <div className="form-group form-group-sm">
        {the_label} {the_link}
        <div className="input-group">
          {the_input}
          <span className="input-group-btn">
            <button 
              className="btn btn-sm btn-default" 
              type="button"
              onClick={()=>(this.props.func(this.state.value))}
              >
              Search</button>
          </span>
        </div>
      </div>
      )
    }

    return (
      <div className="form-group">
          <div className="col-sm-3 col-md-offset-1 text-right">
            {the_label}
          </div>
          <div className="col-sm-7">
            {the_input}
          </div>
          <div className="col-sm-1 hidden-print">
            {the_link}
          </div>
      </div>
    )
  }
});
