import $           from "jquery";
import React       from 'react';
import {render}    from 'react-dom';

import Sidebar     from './sidebar.jsx';
import Header      from "./header.jsx";
import ItemDisplay from "./item/display.jsx";
import TurtleModal from "./turtle_modal.jsx";


//-----------------------------------------------------------------------------
// This is the known set of RDF endpoints that we can search against.   
//  
const SEARCH_DATA = [
  {
    name:           "YCBA", 
    endpoint:       "http://collection.britishart.yale.edu/openrdf-sesame/repositories/ycba",
    predicate:      "http://erlangen-crm.org/current/",
    default_object: "http://collection.britishart.yale.edu/id/object/1000"
  },
  {
    name:           "SAAM", 
    endpoint:       "http://edan.si.edu/saam/sparql",
    predicate:      "http://www.cidoc-crm.org/cidoc-crm/",
    default_object: "http://edan.si.edu/saam/id/object/1991.189"
  },
  {
    name:           "British Museum", 
    endpoint:       "http://collection.britishmuseum.org/sparql",
    predicate:      "http://erlangen-crm.org/current/",
    default_object: "http://collection.britishmuseum.org/id/object/YCA62958"
  }
]

//-----------------------------------------------------------------------------
// This is the "brains" of the application.  It controls the global state of
// the system, which includes navigation and loading the data in.
var App = React.createClass({
  
  // Lifecycle Events
  getInitialState: function() {
    return {loading: true, search: "YCBA", showTurtleModal: false}
  },

  componentDidMount: function() {
    window.addEventListener('hashchange', this.handleNewHash, false);

    let ajax = $.getJSON("/data");

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
  showModal: function (turtle) {
    // console.log(sparql);
    this.setState({turtle: turtle, showTurtleModal: true});

  },
  
  // Render
  render: function() {
    if (this.state.loading) {return false;}

    let data = SEARCH_DATA.find((val)=>(this.state.search == val.name))
    return (
      <main>
        <Header 
          searchAgainst={this.state.search}
          data={SEARCH_DATA} 
          setSearch={(val) => this.setState({search: val})}
          showSparql={this.showModal}
        />
        <div className='container-fluid'>
          <div className="row">
            <Sidebar 
              fields={this.state.fields} 
              gotoField={this.gotoField}
              currentItem={this.state.currentItem}
             />
            <ItemDisplay {...this.state.fields[this.state.currentItem]} search={data}/>
          </div>
        </div>
        <TurtleModal turtle={this.state.turtle} show={this.state.showTurtleModal} onHide={() => this.setState({ showTurtleModal: false })} />
      </main>
    )
  }
});


//-----------------------------------------------------------------------------
render(
  <App />,
  document.getElementById('app')
);