// Import Libraries
import $           from "jquery";
import React       from 'react';
import {render}    from 'react-dom';

// Import Components
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
    return {
      loading: true,          // Has the application gotten the main data?
      search: "YCBA",         // Which endpoint to we default to searching against?
      showTurtleModal: false, // Is the modal visible?
      fields: null            // This will be filled in with the field list
    }
  },

  componentDidMount: function() {
    let ajax = $.getJSON("/data");
    ajax.done(this.initializeData);
    ajax.fail((x,msg)=> console.log(`Error getting json: ${msg}`));
  },

  //-------------------------------
  // Handle initial field data load, 
  // set up the hash navigation
  initializeData: function(data) { 
 
     // Setup Hash Navigation
    let defaultSectionId = 0;
    if (window.location.hash) {
      defaultSectionId = window.location.hash.replace("#section_","")
    }
    else {
      window.location.hash = `section_${defaultSectionId}`
    }
    window.addEventListener('hashchange', this.handleNewHash, false);

    // Update state with the field data
    let fieldSortFunction = function(a,b) {
      return (a.sort_order || 0) >= (b.sort_order || 0) ? 1 : -1;
    }
    this.setState({
      loading: false, 
      fields: data.sort(fieldSortFunction), 
      currentItem: defaultSectionId
    });
  },

  //-------------------------------
  // Handle hash changes (for back button)
  handleNewHash: function() {
    let id = window.location.hash.replace("#section_","")
    this.gotoField(id); 
  },

  //-------------------------------
  // Handle going to a new field,
  // updating the navigation and the state
  gotoField: function(id) {
    this.setState({currentItem: id});
    window.location.hash = `section_${id}`
  },

  //-------------------------------
  // Handle showing the global modal.  
  // TODO:  This is probably the wrong layer to keep this in.
  showModal: function (turtle) {
    this.setState({turtle: turtle, showTurtleModal: true});
  },
  
  // Render function
  render: function() {
    if (this.state.loading) {return false;}

    let currentSearchEndpoint = SEARCH_DATA.find((endpoint)=>(this.state.search == endpoint.name))
    let currentFields = this.state.fields[this.state.currentItem]
    
    return (
      <main>
        <Header 
            searchAgainst=   {this.state.search}
            data=            {SEARCH_DATA} 
            setSearch=       {(val) => this.setState({search: val})}
            showSparql=      {this.showModal}
        />
        <div className='container-fluid'>
          <div className="row">
            <Sidebar 
                fields=      {this.state.fields} 
                gotoField=   {this.gotoField}
                currentItem= {this.state.currentItem}
             />
            <ItemDisplay   {...currentFields} search={currentSearchEndpoint} />
          </div>
        </div>
        <TurtleModal 
            turtle=          {this.state.turtle} 
            show=            {this.state.showTurtleModal} 
            onHide=          {() => this.setState({ showTurtleModal: false })} />
      </main>
    )
  }
});


//-----------------------------------------------------------------------------
render(
  <App />,
  document.getElementById('app')
);