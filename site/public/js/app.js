webpackJsonp([0,2],{

/***/ 0:
/*!******************************!*\
  !*** ./site/react/index.jsx ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Import Libraries
	
	
	// Import Components
	
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 35);
	
	var _sidebar = __webpack_require__(/*! ./sidebar.jsx */ 173);
	
	var _sidebar2 = _interopRequireDefault(_sidebar);
	
	var _header = __webpack_require__(/*! ./header.jsx */ 175);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _item_display = __webpack_require__(/*! ./item/item_display.jsx */ 430);
	
	var _item_display2 = _interopRequireDefault(_item_display);
	
	var _content_modal = __webpack_require__(/*! ./content_modal.jsx */ 438);
	
	var _content_modal2 = _interopRequireDefault(_content_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//-----------------------------------------------------------------------------
	// This is the known set of RDF endpoints that we can search against.   
	//  
	var SEARCH_DATA = [{
	  name: "YCBA",
	  endpoint: "http://collection.britishart.yale.edu/openrdf-sesame/repositories/ycba",
	  predicate: "http://erlangen-crm.org/current/",
	  E39_Actor: {
	    default: null
	  },
	  "E22_Man-Made_Object": {
	    default: "http://collection.britishart.yale.edu/id/object/1000"
	  }
	}, {
	  name: "SAAM",
	  endpoint: "http://edan.si.edu/saam/sparql",
	  predicate: "http://www.cidoc-crm.org/cidoc-crm/",
	  E39_Actor: {
	    default: null
	  },
	  "E22_Man-Made_Object": {
	    default: "http://edan.si.edu/saam/id/object/1991.189"
	  }
	}, {
	  name: "British Museum",
	  endpoint: "http://collection.britishmuseum.org/sparql",
	  predicate: "http://erlangen-crm.org/current/",
	  E39_Actor: {
	    default: "http://collection.britishmuseum.org/id/person-institution/70240"
	  },
	  "E22_Man-Made_Object": {
	    default: "http://collection.britishmuseum.org/id/object/YCA62958"
	  }
	}];
	
	//-----------------------------------------------------------------------------
	// This is the "brains" of the application.  It controls the global state of
	// the system, which includes navigation and loading the data in.
	var App = _react2.default.createClass({
	  displayName: 'App',
	
	
	  // Lifecycle Events
	  getInitialState: function getInitialState() {
	    return {
	      loading: true, // Has the application gotten the main data?
	      modal: {
	        show: false },
	      fields: null // This will be filled in with the field list
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    var ajax = _jquery2.default.getJSON("/data?entity_type=" + ENTITY_TYPE);
	    ajax.done(this.initializeData);
	    ajax.fail(function (x, msg) {
	      return console.log('Error getting json: ' + msg);
	    });
	  },
	
	  //-------------------------------
	  // Handle initial field data load, 
	  // set up the hash navigation
	  initializeData: function initializeData(data) {
	
	    // Setup Hash Navigation
	    var defaultSectionId = 0;
	    if (window.location.hash) {
	      this.setHashValues(this.getHashValues());
	    } else {
	      this.setHashValues({ id: 0, search: SEARCH_DATA[0].name });
	    }
	    window.addEventListener('hashchange', this.handleNewHash, false);
	
	    // Update state with the field data
	    var fieldSortFunction = function fieldSortFunction(a, b) {
	      return (a.sort_order || 0) >= (b.sort_order || 0) ? 1 : -1;
	    };
	    this.setState({
	      loading: false,
	      fields: data.sort(fieldSortFunction)
	    });
	  },
	
	  setHashValues: function setHashValues(obj) {
	    if (obj.id == undefined) {
	      obj.id = this.state.currentItem;
	    } else {
	      this.setState({ currentItem: obj.id });
	    }
	
	    if (obj.search == undefined) {
	      obj.search = this.state.search;
	    } else {
	      this.setState({ search: obj.search });
	    }
	    var search_index = SEARCH_DATA.findIndex(function (v) {
	      return v.name == obj.search;
	    });
	    window.location.hash = 'field_' + obj.id + '-search_' + search_index;
	  },
	  getHashValues: function getHashValues() {
	    var bits = window.location.hash.replace("#", "").split("-");
	    var id = Number(bits[0].replace("field_", ""));
	    var search = SEARCH_DATA[Number(bits[1].replace("search_", ""))].name;
	    return { id: id, search: search };
	  },
	  //-------------------------------
	  // Handle hash changes (for back button)
	  handleNewHash: function handleNewHash() {
	    this.setHashValues(this.getHashValues());
	  },
	
	  //-------------------------------
	  // Handle showing the global modal.  
	  // TODO:  This is probably the wrong layer to keep this in.
	  showModal: function showModal(content) {
	    this.setState({ modal: { content: content, title: "", show: true } });
	  },
	
	  // Render function
	  render: function render() {
	    var _this = this;
	
	    if (this.state.loading) {
	      return false;
	    }
	
	    var currentSearchEndpoint = SEARCH_DATA.find(function (endpoint) {
	      return _this.state.search == endpoint.name;
	    });
	    var currentFields = this.state.fields[this.state.currentItem];
	
	    return _react2.default.createElement(
	      'main',
	      null,
	      _react2.default.createElement(_header2.default, {
	        searchAgainst: this.state.search,
	        data: SEARCH_DATA,
	        setSearch: function setSearch(val) {
	          return _this.setHashValues({ search: val });
	        },
	        showObjectGraph: this.showModal
	      }),
	      _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(_sidebar2.default, {
	            fields: this.state.fields,
	            gotoField: function gotoField(id) {
	              return _this.setHashValues({ id: id });
	            },
	            currentItem: this.state.currentItem
	          }),
	          _react2.default.createElement(_item_display2.default, _extends({}, currentFields, { search: currentSearchEndpoint, showModal: this.showModal
	          }))
	        )
	      ),
	      _react2.default.createElement(_content_modal2.default, _extends({}, this.state.modal, {
	        onHide: function onHide() {
	          return _this.setState({ modal: { show: false } });
	        } }))
	    );
	  }
	});
	
	//-----------------------------------------------------------------------------
	(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },

/***/ 173:
/*!********************************!*\
  !*** ./site/react/sidebar.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 174);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//-----------------------------------------------------------------------------
	var Sidebar = _react2.default.createClass({
	  displayName: 'Sidebar',
	
	  render: function render() {
	
	    var _this = this;
	
	    var items = this.props.fields.map(function (field, index) {
	      return _react2.default.createElement(SidebarListItem, {
	        id: index,
	        name: field.title,
	        desc: field.description,
	        key: field.category + '_' + field.title,
	        func: _this.props.gotoField,
	        applies_to: field.applies_to,
	        category: field.category,
	        prev_category: index == 0 ? "" : _this.props.fields[index - 1].category,
	        selected: index == _this.props.currentItem
	      });
	    });
	
	    return _react2.default.createElement(
	      'div',
	      { className: 'col-md-3 col-lg-2 sidebar' },
	      _react2.default.createElement(
	        'dl',
	        null,
	        items
	      )
	    );
	  }
	});
	
	//-----------------------------------------------------------------------------
	var SidebarListItem = _react2.default.createClass({
	  displayName: 'SidebarListItem',
	
	  handleClick: function handleClick() {
	    this.props.func(this.props.id);
	  },
	  render: function render() {
	
	    var classes = (0, _classnames2.default)("sidebar_item", { selected: this.props.selected });
	
	    var header = false;
	    if (this.props.category != this.props.prev_category) {
	      header = _react2.default.createElement(
	        'h5',
	        null,
	        ' ',
	        this.props.category,
	        ' '
	      );
	    }
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      header,
	      _react2.default.createElement(
	        'div',
	        { className: classes, onClick: this.handleClick },
	        _react2.default.createElement(
	          'dt',
	          null,
	          ' ',
	          this.props.name,
	          ' '
	        ),
	        _react2.default.createElement(
	          'dd',
	          null,
	          ' ',
	          this.props.desc,
	          ' '
	        )
	      )
	    );
	  }
	});
	
	//-----------------------------------------------------------------------------
	exports.default = Sidebar;

/***/ },

/***/ 175:
/*!*******************************!*\
  !*** ./site/react/header.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 176);
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _header_wrapper = __webpack_require__(/*! ./header_wrapper.jsx */ 428);
	
	var _header_wrapper2 = _interopRequireDefault(_header_wrapper);
	
	var _search_input_field = __webpack_require__(/*! ./widgets/search_input_field.jsx */ 429);
	
	var _search_input_field2 = _interopRequireDefault(_search_input_field);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Header = _react2.default.createClass({
	  displayName: 'Header',
	
	
	  getInitialState: function getInitialState() {
	    return { modalLoading: false };
	  },
	
	  loadObjectData: function loadObjectData(e) {
	    var _this = this;
	
	    if (this.state.modalLoading) {
	      return false;
	    }
	    this.setState({ modalLoading: true });
	    var type = (0, _jquery2.default)(e.target).data('type');
	    var ajax = _jquery2.default.post("/full_graph", this.generateObjectData(type), "text");
	    ajax.done(this.handleDataReturn);
	    ajax.fail(function (_, errorText, error) {
	      _this.props.showObjectGraph(error);
	      _this.setState({ modalLoading: false });
	    });
	  },
	
	  handleDataReturn: function handleDataReturn(data) {
	    this.props.showObjectGraph(data);
	    this.setState({ modalLoading: false });
	  },
	  generateObjectData: function generateObjectData() {
	    var _this2 = this;
	
	    var type = arguments.length <= 0 || arguments[0] === undefined ? "ttl" : arguments[0];
	
	    var objIndex = this.props.data.findIndex(function (el) {
	      return el.name == _this2.props.searchAgainst;
	    });
	    return {
	      endpoint: this.props.data[objIndex].endpoint,
	      crm: this.props.data[objIndex].predicate,
	      values: { entity_uri: this.props.data[objIndex][ENTITY_TYPE].default },
	      entity_type: ENTITY_TYPE,
	      return_type: type
	    };
	  },
	
	  render: function render() {
	    var _this3 = this;
	
	    var title = ENTITY_TYPE;
	
	    var sourceButtons = this.props.data.map(function (source, index) {
	      return _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          active: _this3.props.searchAgainst == source.name,
	          onClick: function onClick() {
	            return _this3.props.setSearch(source.name);
	          },
	          key: index
	        },
	        source.name
	      );
	    });
	
	    var topButtons = _react2.default.createElement(
	      _reactBootstrap.ButtonGroup,
	      { bsSize: 'small', role: 'group', className: 'search_buttons' },
	      sourceButtons
	    );
	
	    var bottomButtons = _react2.default.createElement(
	      _reactBootstrap.ButtonGroup,
	      { bsSize: 'small', role: 'group', className: 'download_buttons' },
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'ttl',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'Turtle'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'nested_ttl',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'Turtle (Nested)'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'json',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'JSON'
	      )
	    );
	
	    return _react2.default.createElement(_header_wrapper2.default, {
	      title: title,
	      bottomButtonsLabel: 'Search Against:',
	      bottomButtons: topButtons,
	      topButtonsLabel: this.state.modalLoading ? "Processing..." : "Export Entity As:",
	      topButtons: bottomButtons
	    });
	  }
	});
	
	exports.default = Header;

/***/ },

/***/ 428:
/*!***************************************!*\
  !*** ./site/react/header_wrapper.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	
	  return _react2.default.createElement(
	    "header",
	    { className: "container-fluid page_header" },
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-md-4" },
	        _react2.default.createElement(
	          "h1",
	          null,
	          _react2.default.createElement(
	            "a",
	            { href: "/" },
	            "AAC Entity Mappings"
	          ),
	          " "
	        ),
	        _react2.default.createElement(
	          "h2",
	          null,
	          props.title
	        )
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-md-8" },
	        _react2.default.createElement(
	          "div",
	          { className: "pull-right" },
	          _react2.default.createElement(
	            "h3",
	            { className: "btn_group_label" },
	            props.topButtonsLabel
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "btn-toolbar" },
	            props.topButtons
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "pull-right" },
	          _react2.default.createElement(
	            "h3",
	            { className: "btn_group_label" },
	            props.bottomButtonsLabel
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "btn-toolbar" },
	            props.bottomButtons
	          )
	        )
	      )
	    )
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },

/***/ 429:
/*!***************************************************!*\
  !*** ./site/react/widgets/search_input_field.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: "search_input_field",
	
	  getInitialState: function getInitialState() {
	    return { value: this.props.default || "" };
	  },
	  handleChange: function handleChange(e) {
	    this.setState({ value: e.target.value });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.default != this.props.default) {
	      this.setState({ value: nextProps.default || "" });
	    }
	  },
	  render: function render() {
	
	    var id_val = "sparql_" + this.props.value;
	    var title = this.props.value.replace(/_/g, " ");
	    var placeholder = "Enter a " + title;
	    var default_value = this.props.default;
	
	    return _react2.default.createElement(
	      "div",
	      { className: "form-group" },
	      _react2.default.createElement(
	        "label",
	        { className: "col-sm-3 text-right", htmlFor: id_val, style: { "textTransform": "capitalize" } },
	        title
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-6" },
	        _react2.default.createElement("input", {
	          type: "text",
	          className: "form-control",
	          name: this.props.value,
	          id: id_val,
	          placeholder: placeholder,
	          value: this.state.value,
	          onChange: this.handleChange
	        })
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-3" },
	        _react2.default.createElement(
	          "a",
	          { className: "search_link", href: this.state.value, target: "_blank" },
	          "(link)"
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 430:
/*!******************************************!*\
  !*** ./site/react/item/item_display.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	
	  return _react2.default.createElement(
	    'div',
	    { className: 'col-sm-9 col-lg-8 col-lg-offset-1 app' },
	    _react2.default.createElement(_title2.default, {
	      title: props.title,
	      mandatory: props.mandatory,
	      multiples: props.multiples,
	      description: props.long_description ? props.long_description : props.description,
	      example: props.example,
	      lod_type: props.lod_type
	    }),
	    _react2.default.createElement(_sparql_search2.default, props),
	    _react2.default.createElement(_mapping2.default, { construct: props.construct, extras: props.graph_extras, showModal: props.showModal })
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _title = __webpack_require__(/*! ./title.jsx */ 431);
	
	var _title2 = _interopRequireDefault(_title);
	
	var _sparql_search = __webpack_require__(/*! ./sparql_search.jsx */ 432);
	
	var _sparql_search2 = _interopRequireDefault(_sparql_search);
	
	var _mapping = __webpack_require__(/*! ./mapping.jsx */ 437);
	
	var _mapping2 = _interopRequireDefault(_mapping);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 431:
/*!***********************************!*\
  !*** ./site/react/item/title.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	  return _react2.default.createElement(
	    "section",
	    { className: "field_info" },
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-md-12" },
	        _react2.default.createElement(
	          "h2",
	          { className: "field_name" },
	          props.title,
	          _react2.default.createElement(
	            "span",
	            { className: "badge" },
	            props.mandatory ? "Mandatory" : ""
	          ),
	          _react2.default.createElement(
	            "span",
	            { className: "badge" },
	            props.multiples ? "" : "Only One Allowed"
	          )
	        ),
	        _react2.default.createElement(
	          "p",
	          null,
	          props.description
	        )
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-md-12" },
	        _react2.default.createElement(
	          "dl",
	          { className: "dl-horizontal" },
	          _react2.default.createElement(
	            "dt",
	            null,
	            "Example: "
	          ),
	          _react2.default.createElement(
	            "dd",
	            null,
	            props.example
	          ),
	          _react2.default.createElement(
	            "dt",
	            null,
	            "Mandatory:"
	          ),
	          _react2.default.createElement(
	            "dd",
	            null,
	            props.mandatory ? "Yes" : "No"
	          ),
	          _react2.default.createElement(
	            "dt",
	            null,
	            "Multiples:"
	          ),
	          _react2.default.createElement(
	            "dd",
	            null,
	            props.multiples ? "Yes" : "No"
	          ),
	          _react2.default.createElement(
	            "dt",
	            null,
	            props.lod_type ? "Associated AAC ID:" : ""
	          ),
	          _react2.default.createElement(
	            "dd",
	            null,
	            _react2.default.createElement(
	              "a",
	              { href: props.lod_type, target: "_blank" },
	              props.lod_type
	            )
	          )
	        )
	      )
	    )
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/******************************************************************************
	*
	*  This is the Item Display title section, with the badges and the metadata.
	*  No functionality, just a display template.
	*  
	******************************************************************************/
	
	;

/***/ },

/***/ 432:
/*!*******************************************!*\
  !*** ./site/react/item/sparql_search.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 176);
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 433);
	
	var _modal_trigger2 = _interopRequireDefault(_modal_trigger);
	
	var _sparql_results = __webpack_require__(/*! ./sparql_results.jsx */ 434);
	
	var _sparql_results2 = _interopRequireDefault(_sparql_results);
	
	var _search_input_field = __webpack_require__(/*! ../widgets/search_input_field.jsx */ 429);
	
	var _search_input_field2 = _interopRequireDefault(_search_input_field);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SparqlSearch = _react2.default.createClass({
	  displayName: 'SparqlSearch',
	
	
	  getInitialState: function getInitialState() {
	    return { results: false, isSearching: false };
	  },
	  componentDidMount: function componentDidMount() {
	    this.autoSearch();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.title != this.props.title) {
	      this.setState({ results: false });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    if (prevProps.title != this.props.title || prevProps.search.endpoint != this.props.search.endpoint) {
	      this.autoSearch();
	    }
	  },
	
	  autoSearch: function autoSearch() {
	    var e = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	    if (e) {
	      e.preventDefault();
	    }
	    var obj = (0, _jquery2.default)("#search_form").serializeArray();
	    this.doSearch(obj);
	  },
	
	  doSearch: function doSearch(obj) {
	    var val = {};
	    var blank_found = false;
	    obj.forEach(function (v) {
	      if (v.name == "entity_uri" && v.value == "") {
	        blank_found = true;
	      };
	      val[v.name] = v.value;
	    });
	
	    if (blank_found) {
	      return false;
	    }
	
	    var submission = {
	      fields: {
	        select: this.props.select,
	        construct: this.props.construct,
	        where: this.props.where,
	        values: this.props.values
	      },
	      endpoint: this.props.search.endpoint,
	      crm: this.props.search.predicate,
	      values: val
	    };
	    _jquery2.default.post("/search", submission, this.handleResults);
	    this.setState({ isSearching: true });
	  },
	
	  handleResults: function handleResults(data) {
	    this.setState({ results: data, isSearching: false });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var input_boxes = this.props.values.split(" ").map(function (value) {
	
	      var field_name = value.replace("?", "");
	      var default_value = _this.props['test_' + field_name];
	      if (field_name == "entity_uri") {
	        default_value = _this.props.search[ENTITY_TYPE].default;
	      }
	      return _react2.default.createElement(_search_input_field2.default, {
	        key: field_name,
	        value: field_name,
	        'default': default_value
	      });
	    });
	
	    return _react2.default.createElement(
	      'section',
	      { className: 'search' },
	      _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-md-12' },
	          _react2.default.createElement(
	            'h4',
	            null,
	            'Test An Example'
	          ),
	          _react2.default.createElement(
	            'form',
	            { id: 'search_form', className: 'form-horizontal', onSubmit: this.state.isSearching ? null : this.autoSearch },
	            input_boxes,
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-sm-offset-3 col-sm-6' },
	                _react2.default.createElement(
	                  _reactBootstrap.Button,
	                  {
	                    bsStyle: 'primary',
	                    disabled: this.state.isSearching,
	                    onClick: this.state.isSearching ? null : this.autoSearch
	                  },
	                  this.state.isSearching ? 'Searching...' : 'Search'
	                )
	              )
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(_sparql_results2.default, { title: this.props.title, select: this.props.select, results: this.state.results, showModal: this.props.showModal })
	    );
	  }
	});
	
	//-----------------------------------------------------------------------------
	exports.default = SparqlSearch;

/***/ },

/***/ 433:
/*!**********************************************!*\
  !*** ./site/react/widgets/modal_trigger.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	  return _react2.default.createElement(
	    "button",
	    {
	      className: "btn btn-info btn-xs",
	      onClick: function onClick(e) {
	        return props.func(props.text);
	      } },
	    props.children
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 434:
/*!********************************************!*\
  !*** ./site/react/item/sparql_results.jsx ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 433);
	
	var _modal_trigger2 = _interopRequireDefault(_modal_trigger);
	
	var _github_issue = __webpack_require__(/*! ../widgets/github_issue.jsx */ 435);
	
	var _github_issue2 = _interopRequireDefault(_github_issue);
	
	var _helpers = __webpack_require__(/*! ../lib/helpers.jsx */ 436);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/******************************************************************************
	*
	*  This builds the table of serach results.  
	*
	*  Assumes the following properties:
	*    results:   The results of the search
	*    select:    The select portion of the sparql query
	*    title:     The page title, used for the Github Issue submit
	*    showModal: The function to display a modal popup.
	* 
	******************************************************************************/
	
	exports.default = _react2.default.createClass({
	  displayName: 'sparql_results',
	
	  render: function render() {
	    var _this = this;
	
	    if (!this.props.results) {
	      return false;
	    }
	
	    // Set up the table headers
	    var columns = this.props.select.split(" ");
	    var table_headers = columns.map(function (select_item) {
	      return _react2.default.createElement(
	        'th',
	        { key: select_item },
	        select_item.replace("?", "")
	      );
	    });
	
	    // Set up the table values
	    var table_rows = null;
	    if (this.props.results.values.length > 0) {
	      table_rows = this.props.results.values.map(function (result, i) {
	        var cells = _this.props.select.split(" ").map(function (key) {
	          var val = result[key.replace("?", "")];
	          if (/^https?:\/\//.test(val)) {
	            if (/\.(?:jpg|png|tif|tiff|svg)$/.test(val)) {
	              val = _react2.default.createElement(
	                'a',
	                { href: val, target: '_blank' },
	                _react2.default.createElement('img', { className: 'img-responsive', src: val })
	              );
	            } else {
	              val = _react2.default.createElement(
	                'a',
	                { href: val, target: '_blank' },
	                (0, _helpers.truncate)(val, 40)
	              );
	            }
	          }
	          return _react2.default.createElement(
	            'td',
	            { key: i + '_' + key },
	            ' ',
	            val
	          );
	        });
	        return _react2.default.createElement(
	          'tr',
	          { key: i },
	          cells
	        );
	      });
	    } else {
	      table_rows = _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'td',
	          { colSpan: columns.length, className: 'no_results' },
	          'No results found.'
	        )
	      );
	    }
	
	    return _react2.default.createElement(
	      'div',
	      { className: 'row results' },
	      _react2.default.createElement(
	        'div',
	        { className: 'col-md-10 col-md-offset-1' },
	        _react2.default.createElement(
	          'div',
	          { className: 'panel panel-default' },
	          _react2.default.createElement(
	            'table',
	            { className: 'table table-hover' },
	            _react2.default.createElement(
	              'thead',
	              null,
	              _react2.default.createElement(
	                'tr',
	                null,
	                table_headers
	              )
	            ),
	            _react2.default.createElement(
	              'tbody',
	              null,
	              table_rows
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'panel-body text-center' },
	            _react2.default.createElement(
	              'div',
	              { className: 'btn-group btn-group-xs ' },
	              _react2.default.createElement(
	                _modal_trigger2.default,
	                { func: this.props.showModal, text: this.props.results.select },
	                'Show this Query'
	              ),
	              _react2.default.createElement(
	                _modal_trigger2.default,
	                { func: this.props.showModal, text: this.props.results.object },
	                'Show as Turtle'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'panel-footer' },
	            _react2.default.createElement(_github_issue2.default, { title: this.props.title, query: this.props.results.select })
	          )
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 435:
/*!*********************************************!*\
  !*** ./site/react/widgets/github_issue.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	  var issueTitle = encodeURIComponent("Problem with mapping of " + props.title);
	  var issueBody = encodeURIComponent("I expected to see:\n\n*[WHAT I EXPECTED]*\n\nbut instead I saw:\n\n*[WHAT I SAW]*\n\nThe current query was:\n\n```ttl\n" + props.query + "\n```");
	  var issueLinkUrl = "https://github.com/workergnome/aac_mappings/issues/new?title=" + issueTitle + "&body=" + issueBody;
	
	  return _react2.default.createElement(
	    "div",
	    { className: "github_issue_link" },
	    _react2.default.createElement(
	      "a",
	      { href: issueLinkUrl },
	      "Do you see a problem with this?  Submit an issue."
	    )
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 436:
/*!************************************!*\
  !*** ./site/react/lib/helpers.jsx ***!
  \************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.truncate = truncate;
	function truncate(str, len) {
	  if (str.length <= len) {
	    return str;
	  }
	  return str.substring(0, len - 3) + "...";
	}

/***/ },

/***/ 437:
/*!*************************************!*\
  !*** ./site/react/item/mapping.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 433);
	
	var _modal_trigger2 = _interopRequireDefault(_modal_trigger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ItemMapping = _react2.default.createClass({
	  displayName: 'ItemMapping',
	
	
	  getInitialState: function getInitialState() {
	    return { svg: "" };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.construct != this.props.construct) {
	      this.getSvg(nextProps);
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    this.getSvg(this.props);
	  },
	
	  getSvg: function getSvg(data) {
	    var _this = this;
	
	    if (!data.construct) return false;
	    this.setState({ svg: "" });
	    _jquery2.default.post("/graph", { ttl: data.construct, extras: data.extras }, function (svg_url) {
	      return _this.setState({ svg: svg_url });
	    });
	  },
	
	  render: function render() {
	
	    var svgImage = this.state.svg ? _react2.default.createElement('img', { className: 'img-responsive center-block', src: this.state.svg }) : _react2.default.createElement(
	      'p',
	      { className: 'textCenter' },
	      'Loading Diagram...'
	    );
	
	    var btn = "";
	    if (this.state.svg) {
	      btn = _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-lg-10 col-lg-offset-1 text-center' },
	          _react2.default.createElement(
	            _modal_trigger2.default,
	            {
	              func: this.props.showModal,
	              text: this.props.construct
	            },
	            'Show Mapping as Turtle'
	          )
	        )
	      );
	    }
	
	    return _react2.default.createElement(
	      'section',
	      { className: 'illustration' },
	      _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-md-12' },
	          _react2.default.createElement(
	            'h4',
	            null,
	            'Standard Property Mapping'
	          ),
	          svgImage
	        )
	      ),
	      btn
	    );
	  }
	});
	
	exports.default = ItemMapping;

/***/ },

/***/ 438:
/*!**************************************!*\
  !*** ./site/react/content_modal.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ 176);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ContentModal = _react2.default.createClass({
	  displayName: 'ContentModal',
	  render: function render() {
	
	    var modalProps = Object.assign({}, this.props);
	    delete modalProps.content;
	    delete modalProps.title;
	
	    return _react2.default.createElement(
	      _reactBootstrap.Modal,
	      _extends({}, modalProps, { bsSize: 'large', 'aria-labelledby': 'contained-modal-title-lg' }),
	      _react2.default.createElement(
	        _reactBootstrap.Modal.Body,
	        null,
	        _react2.default.createElement(
	          'pre',
	          null,
	          this.props.content
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Modal.Footer,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Button,
	          { onClick: this.props.onHide },
	          'Close'
	        )
	      )
	    );
	  }
	});
	
	exports.default = ContentModal;

/***/ }

});
//# sourceMappingURL=app.js.map