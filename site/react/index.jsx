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
    window.addEventListener('hashchange', this.handleNewHash, false);
    ajax.done(data => {
      var sortFunction = function(a,b) {
        return (a.sort_order || 0) >= (b.sort_order || 0) ? 1 : -1;
      }

      let id = 0;
      if (window.location.hash) {
        id = window.location.hash.replace("#section_","")
      }
      else {
        window.location.hash = `section_${id}`
      }

      this.setState({loading: false, fields: data.sort(sortFunction), currentItem: id})
    });
    ajax.fail((x,msg)=> console.log(`Error getting json: ${msg}`));
  },

  // Custom Functions
  handleNewHash: function() {
    let id = window.location.hash.replace("#section_","")
    this.gotoField(id); 
  },
  gotoField: function(id) {
    this.setState({currentItem: id});
    window.location.hash = `section_${id}`
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