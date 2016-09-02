import React from 'react';
import $ from "jquery";
import ModalTrigger from '../utilities/modal_trigger.jsx'


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

    this.setState({svg: ""})      
    $.post("/graph", {ttl: data.construct, extras: data.extras}, (svg_url) => this.setState({svg: svg_url}) );
  },


  render: function() {


    var svgImage = this.state.svg ? <img className="img-responsive center-block" src={this.state.svg} /> : <p className='textCenter'>Loading Diagram...</p>

    var btn = "";
    if (this.state.svg) {
      btn = (
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1 text-center">
            <ModalTrigger 
              func={this.props.showModal} 
              text={this.props.construct} 
            >
              Show Mapping as Turtle
            </ModalTrigger>
          </div>
        </div>
        )
    }

    return (
      <section className="illustration">
        <div className="row">
          <div className="col-md-12">
            <h4>Standard Property Mapping</h4>
            {svgImage} 
          </div> 
        </div>
        {btn}
      </section>
    );
  }
});

export default ItemMapping;