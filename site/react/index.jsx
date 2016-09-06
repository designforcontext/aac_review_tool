// Import Libraries
import $           from "jquery";
import React       from 'react';
import {render}    from 'react-dom';

// Import Components
import Sidebar     from './sidebar.jsx';
import Header      from "./header.jsx";
import Footer      from "./footer.jsx";
import ItemDisplay from "./item/item_display.jsx";
import ContentModal from "./widgets/content_modal.jsx";


//-----------------------------------------------------------------------------
// This is the known set of RDF endpoints that we can search against.   

const SEARCH_DATA = [
  {
    name:           "YCBA", 
    endpoint:       "http://collection.britishart.yale.edu/openrdf-sesame/repositories/ycba",
    predicate:      "http://erlangen-crm.org/current/",
    prefix:         {"ycba": "http://collection.britishart.yale.edu/"},
    E39_Actor: {
      default:  null
    },
    E39_Actor: {
      default:  "http://collection.britishart.yale.edu/id/page/person/institution/1281"
    },
    "E22_Man-Made_Object": {
      default: "http://collection.britishart.yale.edu/id/object/1000"  
    },
    E5_Event: {
      default: "http://collection.britishart.yale.edu/id/exhibition/851"
    }
  },
  {
    name:           "SAAM", 
    endpoint:       "http://edan.si.edu/saam/sparql",
    predicate:      "http://www.cidoc-crm.org/cidoc-crm/",
    prefix:         {"saam": "http://edan.si.edu/saam/"},

    E39_Actor: {
      default:  "http://edan.si.edu/saam/id/person-institution/5880"
    },
    "E22_Man-Made_Object": {
      default: "http://edan.si.edu/saam/id/object/1991.189"  
    },
    E5_Event: {
      default: "http://edan.si.edu/saam/id/object/1991.189/production"
    }
  },
  {
    name:           "British Museum", 
    endpoint:       "http://collection.britishmuseum.org/sparql",
    predicate:      "http://erlangen-crm.org/current/",
    prefix:         {"bm": "http://collection.britishmuseum.org/"},

    E39_Actor: {
      default: "http://collection.britishmuseum.org/id/person-institution/70240"
    },
    "E22_Man-Made_Object": {
      default: "http://collection.britishmuseum.org/id/object/YCA62958"
    },
    E5_Event: {
      default: "http://collection.britishmuseum.org/id/object/PIC134418/production"
    }
  }
]

//-----------------------------------------------------------------------------
// This is the "brains" of the application.  It controls the global state of
// the system, which includes navigation and loading the data in.
var App = React.createClass({
  
  // Lifecycle Events
  getInitialState: function() {
    return {
      loading: true,           // Has the application gotten the main data?
      modal: {
        show:false,            // Is the modal visible?
      },
      fields: null,             // This will be filled in with the field list
      entity_uri: null
    }
  },

  componentDidMount: function() {
    let ajax = $.getJSON("/data?entity_type="+ENTITY_TYPE);
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
      this.setHashValues(this.getHashValues());
    }
    else {
      this.setHashValues({id: 0, search: SEARCH_DATA[0].name});
    }
    window.addEventListener('hashchange', this.handleNewHash, false);

    // Update state with the field data
    let fieldSortFunction = function(a,b) {
      return (a.sort_order || 0) >= (b.sort_order || 0) ? 1 : -1;
    }
    this.setState({
      loading: false, 
      fields: data.sort(fieldSortFunction)
    });
  },

  setHashValues: function(obj) {
    if (obj.id == undefined) {
      obj.id = this.state.currentItem;
    } else {
      this.setState({currentItem: obj.id});
    }

    if (obj.search == undefined) {
      obj.search = this.state.search;
    } else {
      this.setState({search: obj.search});
    }
    let search_index = SEARCH_DATA.findIndex((v) => v.name == obj.search);
    window.location.hash = `field_${obj.id}-search_${search_index}`;
  },
  getHashValues: function() {
    let bits = window.location.hash.replace("#","").split("-")
    let id   = Number(bits[0].replace("field_",""))
    let search  = SEARCH_DATA[Number(bits[1].replace("search_",""))].name;
    return {id: id, search: search}
  },
  //-------------------------------
  // Handle hash changes (for back button)
  handleNewHash: function() {
    this.setHashValues(this.getHashValues());
  },

  //-------------------------------
  // Handle showing the global modal.  
  // TODO:  This is probably the wrong layer to keep this in.
  showModal: function (content, title="", html=false) {
    this.setState({modal: {content: content, title: title, show: true, html: html}});
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
            setSearch=       {(val) => this.setHashValues({search: val})}
            showObjectGraph= {this.showModal}
            setEntityUri=    {(val) => this.setState({entity_uri: val})}
        />
        <div className='container-fluid'>
          <div className="row">
            <Sidebar 
                fields=      {this.state.fields} 
                gotoField=   {(id) => this.setHashValues({id: id})}
                currentItem= {this.state.currentItem}
             />
            <ItemDisplay   
                {...currentFields} 
                search={currentSearchEndpoint} 
                showModal={this.showModal}
                currentEntity={this.state.entity_uri}
            />
          </div>
        </div>
        <ContentModal 
            {...this.state.modal}
            search= {currentSearchEndpoint}
            onHide= {() => this.setState({ modal: {show: false }})} />
        <Footer/>
      </main>
    )
  }
});

//-----------------------------------------------------------------------------
render(
  <App />,
  document.getElementById('app')
);