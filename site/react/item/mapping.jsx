import React from 'react';
import $ from "jquery";


var ItemMapping = React.createClass({
    getInitialState: function() {
    return {svg: "", show_ttl: false}
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.construct != this.props.construct) {
      this.getSvg(nextProps);
    }
  },
  componentDidMount: function() {
    this.getSvg(this.props)
  },

  getSvg: function(data) {
    if (!data.construct) return false;

    $.post("/graph", {ttl: data.construct, extras: data.extras}, this.handleSVG);
    this.setState({svg: ""})      

  },
  handleSVG: function(svg_url) {
    this.setState({svg: svg_url});
  },

  render: function() {


    var svgImage = this.state.svg ? <img className="img-responsive center-block" src={this.state.svg} /> : <p className='textCenter'>Loading Diagram...</p>


    var btn;
    var ttl;
    if (!this.state.showConstructed) {
      btn = <button  className="btn btn-info btn-xs center-block" onClick={(e) => this.setState({showConstructed: true})}>Show Turtle</button>
      ttl = false;
    }
    else {
      btn = <button className="btn btn-info btn-xs center-block" onClick={(e) => this.setState({showConstructed: false})}>Hide Turtle</button>
      ttl = <pre>{this.props.construct}</pre>
    }


    return (
      <section className="illustration">
        <div className="row">
          <div className="col-md-12">
            <h4>Standard Property Mapping</h4>
            {svgImage} 
          </div> 
        </div>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            {ttl}
            {btn}
          </div>
        </div>
      </section>
    );
  }
});

export default ItemMapping;