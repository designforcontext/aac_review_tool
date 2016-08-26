import $           from "jquery";
import React       from 'react';
import {render}    from 'react-dom';

import Sidebar     from './sidebar.jsx';
import Header      from "./header.jsx";
import ItemDisplay from "./item/display.jsx";

//-----------------------------------------------------------------------------
var App = React.createClass({
  
  // Lifecycle Events
  getInitialState: function() {
    return {loading: true}
  },
  componentDidMount: function() {
    let ajax = $.getJSON("/data");
    ajax.done(data => this.setState({loading: false, fields: data, currentItem: 0}));
    ajax.fail((x,msg)=> console.log(`Error getting json: ${msg}`));
  },

  // Custom Functions
  gotoField: function(id) {
    this.setState({currentItem: id});
  },
  
  // Render
  render: function() {
    if (this.state.loading) {return false;}

    return (
      <main>
        <Header />
        <div className='container-fluid'>
          <div className="row">
            <Sidebar 
              fields={this.state.fields} 
              gotoField={this.gotoField}
              currentItem={this.state.currentItem}
             />
            <ItemDisplay {...this.state.fields[this.state.currentItem]}/>
          </div>
        </div>
      </main>
    )
  }
});


//-----------------------------------------------------------------------------
render(
  <App />,
  document.getElementById('app')
);