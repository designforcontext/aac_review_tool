import React from 'react';
import $ from "jquery";


var ItemMapping = React.createClass({
    getInitialState: function() {
    return {svg: ""}
  },
  componentWillReceiveProps: function(nextProps){
    if (nextProps.construct != this.props.construct) {
      this.getSvg(nextProps.construct);
    }
  },
  componentDidMount: function() {
    this.getSvg(this.props.construct)
  },

  getSvg: function(construct) {
    if (!construct) return false;

    $.post("/graph", {ttl: construct}, this.handleSVG);
    this.setState({svg: ""})      

  },
  handleSVG: function(svg_url) {
    this.setState({svg: svg_url});
  },

  render: function() {


    var svgImage = this.state.svg ? <img className="img-responsive center-block" src={this.state.svg} /> : <p className='textCenter'>Loading Diagram...</p>

    return (
      <div>
      <section className="reference">
        <div className="row">
          <div className="col-md-12">
            <h4>Linked Open Data Reference Mapping</h4>
            <pre>
             {this.props.construct}
            </pre>
          </div>
        </div>
      </section>
      <section className="illustration">
        <div className="row">
          <div className="col-md-12">
            <h4>Object Model</h4>
            {svgImage} 
          </div> 
        </div>
      </section>
      </div>
    );
  }
});

export default ItemMapping;