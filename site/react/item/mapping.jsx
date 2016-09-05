import React from 'react';
import $ from "jquery";
import ModalTrigger from '../widgets/modal_trigger.jsx'


var ItemMapping = React.createClass({

  getInitialState: function() {
    return {svg: ""}
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

    let svgImage = this.state.svg ? <img className="img-responsive center-block" src={this.state.svg} /> : <p className='textCenter'>Loading Diagram...</p>

    let btn = "";
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
            <h4>AAC Target Mapping For <strong>{this.props.fieldTitle}</strong></h4>
          </div>
          <div className="col-md-10 col-md-offset-1">
            <div className="illustration_wrapper">
              {svgImage} 
            </div>
          </div> 
        </div>
        {btn}
      </section>
    );
  }
});

export default ItemMapping;