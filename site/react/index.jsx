import React from 'react';
import {render} from 'react-dom';
import ItemTitle from './item_title.jsx';
import ItemProps from './item_props.jsx';
import ItemMapping from './item_mapping.jsx';
import SparqlSearch from './item_sparql_search.jsx';
import classNames from 'classnames';

var App = React.createClass({
  
  getInitialState: function() {
    return {loading: true}
  },
  componentDidMount: function() {
    $.getJSON("/data", this.handleData);
  },
  
  handleData: function(data) {
    this.setState({loading: false, fields: data, currentItem: 0});
  },
  gotoField: function(id) {
    this.setState({currentItem: id});
  },
  
  render: function() {
    if (this.state.loading) {return false;}

    var _this = this;
    var items = this.state.fields.map(function(field, index) {
       return <SidebarListItem  
          id={index} 
          name={field.title} 
          desc={field.description}
          key={field.title} 
          func={_this.gotoField} 
          selected={index == _this.state.currentItem}
        />
    });

    return (
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar">
          <h4> Object Fields </h4>
          <dl>
            {items}
          </dl>
        </div>
        <div className="col-sm-9 col-lg-8 col-lg-offset-1">
            <Demo {...this.state.fields[this.state.currentItem]}/>
        </div>
      </div>
    )
  }
});

//----------------------------

var SidebarListItem = React.createClass({
  handleClick: function() {
    this.props.func(this.props.id);
  },
  render: function() {

    let classes = classNames(
      "sidebar_item",
      {selected: this.props.selected}
    );

    return ( 
        <div className={classes} onClick={this.handleClick}>
          <dt> {this.props.name} </dt>
          <dd> {this.props.desc} </dd> 
        </div>
    );
  }
})


//----------------------------

var Demo = React.createClass({

  render: function() {

    return (
      <div className='app'>

        <section className="field_info">
          <ItemTitle 
            title={this.props.title}
            mandatory={this.props.mandatory}
            multiples={this.props.multiples}
            description={this.props.long_description ? this.props.long_description : this.props.description}
          />

          <ItemProps
            example={this.props.example}
            lod_type={this.props.lod_type}
            mandatory={this.props.mandatory}
            multiples={this.props.multiples}
          />
        </section>


        <SparqlSearch {...this.props}/>

        <ItemMapping construct={this.props.construct} />

      </div>
    )
  }
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

render(
  <App />,
  document.getElementById('demo')
);