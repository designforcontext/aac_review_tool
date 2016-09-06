webpackJsonp([0,2],{

/***/ 0:
/*!******************************!*\
  !*** ./site/react/index.jsx ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _ref;
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 35);
	
	var _sidebar = __webpack_require__(/*! ./sidebar.jsx */ 173);
	
	var _sidebar2 = _interopRequireDefault(_sidebar);
	
	var _header = __webpack_require__(/*! ./header.jsx */ 175);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _footer = __webpack_require__(/*! ./footer.jsx */ 431);
	
	var _footer2 = _interopRequireDefault(_footer);
	
	var _item_display = __webpack_require__(/*! ./item/item_display.jsx */ 432);
	
	var _item_display2 = _interopRequireDefault(_item_display);
	
	var _content_modal = __webpack_require__(/*! ./widgets/content_modal.jsx */ 440);
	
	var _content_modal2 = _interopRequireDefault(_content_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Import Libraries
	
	
	// Import Components
	
	
	//-----------------------------------------------------------------------------
	// This is the known set of RDF endpoints that we can search against.   
	
	var SEARCH_DATA = [(_ref = {
	  name: "YCBA",
	  endpoint: "http://collection.britishart.yale.edu/openrdf-sesame/repositories/ycba",
	  predicate: "http://erlangen-crm.org/current/",
	  prefix: { "ycba": "http://collection.britishart.yale.edu/" },
	  E39_Actor: {
	    default: null
	  }
	}, _defineProperty(_ref, 'E39_Actor', {
	  default: "http://collection.britishart.yale.edu/id/page/person/institution/1281"
	}), _defineProperty(_ref, "E22_Man-Made_Object", {
	  default: "http://collection.britishart.yale.edu/id/object/1000"
	}), _ref), {
	  name: "SAAM",
	  endpoint: "http://edan.si.edu/saam/sparql",
	  predicate: "http://www.cidoc-crm.org/cidoc-crm/",
	  prefix: { "saam": "http://edan.si.edu/saam/" },
	
	  E39_Actor: {
	    default: "http://edan.si.edu/saam/id/person-institution/5880"
	  },
	  "E22_Man-Made_Object": {
	    default: "http://edan.si.edu/saam/id/object/1991.189"
	  }
	}, {
	  name: "British Museum",
	  endpoint: "http://collection.britishmuseum.org/sparql",
	  predicate: "http://erlangen-crm.org/current/",
	  prefix: { "bm": "http://collection.britishmuseum.org/" },
	
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
	      fields: null, // This will be filled in with the field list
	      entity_uri: null
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
	    var title = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	    var html = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	    this.setState({ modal: { content: content, title: title, show: true, html: html } });
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
	        showObjectGraph: this.showModal,
	        setEntityUri: function setEntityUri(val) {
	          return _this.setState({ entity_uri: val });
	        }
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
	          _react2.default.createElement(_item_display2.default, _extends({}, currentFields, {
	            search: currentSearchEndpoint,
	            showModal: this.showModal,
	            currentEntity: this.state.entity_uri
	          }))
	        )
	      ),
	      _react2.default.createElement(_content_modal2.default, _extends({}, this.state.modal, {
	        search: currentSearchEndpoint,
	        onHide: function onHide() {
	          return _this.setState({ modal: { show: false } });
	        } })),
	      _react2.default.createElement(_footer2.default, null)
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
	        mandatory: field.mandatory,
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
	      { className: 'col-md-3 col-lg-2 sidebar hidden-print' },
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
	
	    var badges = this.props.mandatory ? "🔹️" : "";
	
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
	          ' ',
	          _react2.default.createElement(
	            'span',
	            { className: '' },
	            badges
	          )
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
	
	var _constants = __webpack_require__(/*! ./lib/constants.jsx */ 430);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Header = _react2.default.createClass({
	  displayName: 'Header',
	
	
	  getInitialState: function getInitialState() {
	    return { modalLoading: false };
	  },
	  componentDidMount: function componentDidMount() {
	    this.props.setEntityUri(this.getCurrentEntityURI());
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    if (prevProps.searchAgainst != this.props.searchAgainst) {
	      this.props.setEntityUri(this.getCurrentEntityURI());
	    }
	  },
	
	  loadObjectData: function loadObjectData(e) {
	    var _this = this;
	
	    if (this.state.modalLoading) {
	      return false;
	    }
	    this.setState({ modalLoading: true });
	    var type = (0, _jquery2.default)(e.target).data('type');
	    var title = (0, _jquery2.default)(e.target).data('modal-title');
	    var html = type == "report";
	    var ajax = _jquery2.default.post("/full_graph", this.generateObjectData(type), "text");
	    ajax.done(function (data) {
	      return _this.handleDataReturn(data, title, html);
	    });
	    ajax.fail(function (_, errorText, error) {
	      _this.props.showObjectGraph(error);
	      _this.setState({ modalLoading: false });
	    });
	  },
	  getCurrentEntityURI: function getCurrentEntityURI() {
	    var _this2 = this;
	
	    return this.props.data.find(function (el) {
	      return el.name == _this2.props.searchAgainst;
	    })[ENTITY_TYPE].default;
	  },
	  handleDataReturn: function handleDataReturn(data, title, html) {
	    this.props.showObjectGraph(data, title, html);
	    this.setState({ modalLoading: false });
	  },
	  generateObjectData: function generateObjectData() {
	    var _this3 = this;
	
	    var type = arguments.length <= 0 || arguments[0] === undefined ? "ttl" : arguments[0];
	
	    var objIndex = this.props.data.findIndex(function (el) {
	      return el.name == _this3.props.searchAgainst;
	    });
	    return {
	      endpoint: this.props.data[objIndex].endpoint,
	      crm: this.props.data[objIndex].predicate,
	      values: { entity_uri: this.getCurrentEntityURI() },
	      entity_type: ENTITY_TYPE,
	      return_type: type
	    };
	  },
	
	  render: function render() {
	    var _this4 = this;
	
	    var title = ENTITY_TYPE;
	
	    var sourceButtons = this.props.data.map(function (source, index) {
	      return _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          active: _this4.props.searchAgainst == source.name,
	          onClick: function onClick() {
	            return _this4.props.setSearch(source.name);
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
	          'data-modal-title': 'Entity as Linked Open Data (in Turtle)',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'Turtle'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'nested_ttl',
	          'data-modal-title': 'Entity as Turtle (Nested Graph with Blank Nodes)',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'Turtle (Nested)'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'json',
	          'data-modal-title': 'JSON Representation of the Entity',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'JSON'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        {
	          'data-type': 'report',
	          'data-modal-title': 'Entity Validation Report',
	          disabled: this.state.modalLoading,
	          onClick: this.loadObjectData },
	        'Report'
	      )
	    );
	
	    return _react2.default.createElement(
	      _header_wrapper2.default,
	      {
	        title: title,
	        bottomButtonsLabel: 'Current SPARQL Endpoint:',
	        bottomButtons: topButtons,
	        topButtonsLabel: this.state.modalLoading ? "Processing..." : "Export Entity As:",
	        topButtons: bottomButtons
	      },
	      _react2.default.createElement(_search_input_field2.default, {
	        func: this.props.setEntityUri,
	        value: _constants2.default.ENTITY_FIELD_NAME,
	        'default': this.getCurrentEntityURI(),
	        title: 'Current Entity URI',
	        stacked: true })
	    );
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
	    { className: "container-fluid page_header hidden-print" },
	    _react2.default.createElement(
	      "div",
	      { className: "row" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-12" },
	        _react2.default.createElement(
	          "div",
	          { className: "pull-left logo" },
	          _react2.default.createElement(
	            "a",
	            { href: "/" },
	            _react2.default.createElement("img", { src: "/images/aac_logo.png" })
	          )
	        ),
	        _react2.default.createElement(
	          "h1",
	          null,
	          "AAC Mapping Validator"
	        ),
	        _react2.default.createElement(
	          "h2",
	          null,
	          props.title
	        )
	      )
	    ),
	    _react2.default.createElement(
	      "div",
	      { className: "row header_interface" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-6 col-lg-4 col-lg-offset-2 " },
	        props.children
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-5 col-lg-6" },
	        _react2.default.createElement(
	          "div",
	          { className: "pull-left" },
	          _react2.default.createElement(
	            "label",
	            { className: "btn_group_label" },
	            props.bottomButtonsLabel
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "btn-toolbar" },
	            props.bottomButtons
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "pull-right" },
	          _react2.default.createElement(
	            "label",
	            { className: "btn_group_label" },
	            props.topButtonsLabel
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "btn-toolbar" },
	            props.topButtons
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
	  handleKeyDown: function handleKeyDown(e) {
	    console.log(e.keyCode);
	    if (e.keyCode == 13 && this.props.func) {
	      this.props.func(this.state.value);
	      e.preventDefault();
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.default != this.props.default) {
	      this.setState({ value: nextProps.default || "" });
	    }
	  },
	  render: function render() {
	    var _this = this;
	
	    var id_val = "sparql_" + this.props.value;
	    var title = this.props.title || this.props.value.replace(/_/g, " ");
	    var placeholder = "Enter a " + title;
	    var default_value = this.props.default;
	
	    var the_input = _react2.default.createElement("input", {
	      type: "text",
	      className: "form-control",
	      name: this.props.value,
	      id: id_val,
	      placeholder: placeholder,
	      value: this.state.value,
	      onChange: this.handleChange,
	      onKeyDown: this.handleKeyDown
	    });
	
	    var the_link = _react2.default.createElement(
	      "a",
	      { className: "search_link", href: this.state.value, target: "_blank" },
	      "(link)"
	    );
	
	    var the_label = _react2.default.createElement(
	      "label",
	      { htmlFor: id_val, style: { "textTransform": "capitalize" } },
	      title,
	      ":"
	    );
	
	    if (this.props.stacked) {
	      return _react2.default.createElement(
	        "div",
	        { className: "form-group form-group-sm" },
	        the_label,
	        " ",
	        the_link,
	        _react2.default.createElement(
	          "div",
	          { className: "input-group" },
	          the_input,
	          _react2.default.createElement(
	            "span",
	            { className: "input-group-btn" },
	            _react2.default.createElement(
	              "button",
	              {
	                className: "btn btn-sm btn-default",
	                type: "button",
	                onClick: function onClick() {
	                  return _this.props.func(_this.state.value);
	                }
	              },
	              "Search"
	            )
	          )
	        )
	      );
	    }
	
	    return _react2.default.createElement(
	      "div",
	      { className: "form-group" },
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-3 col-md-offset-1 text-right" },
	        the_label
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-7" },
	        the_input
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: "col-sm-1 hidden-print" },
	        the_link
	      )
	    );
	  }
	});

/***/ },

/***/ 430:
/*!**************************************!*\
  !*** ./site/react/lib/constants.jsx ***!
  \**************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  ENTITY_FIELD_NAME: "entity_uri"
	};

/***/ },

/***/ 431:
/*!*******************************!*\
  !*** ./site/react/footer.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (props) {
	  var y = new Date().getFullYear();
	  var copyright_year = y == 2016 ? "2016" : "2016-" + y;
	  return _react2.default.createElement(
	    "footer",
	    null,
	    _react2.default.createElement(
	      "p",
	      null,
	      "Developed by ",
	      _react2.default.createElement(
	        "a",
	        { href: "http://www.designforcontext.com", target: "_blank" },
	        "Design for Context"
	      ),
	      ".  Copyright © ",
	      copyright_year,
	      "."
	    ),
	    _react2.default.createElement(
	      "p",
	      null,
	      "This is a project of the ",
	      _react2.default.createElement(
	        "a",
	        { href: "http://americanartcollaborative.org/", target: "_blank" },
	        "American Art Collaborative"
	      ),
	      ". Source code available on ",
	      _react2.default.createElement(
	        "a",
	        { href: "https://github.com/workergnome/aac_mappings", target: "_blank" },
	        "Github"
	      ),
	      "."
	    )
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 432:
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
	    _react2.default.createElement(_mapping2.default, { fieldTitle: props.title, construct: props.construct, extras: props.graph_extras, showModal: props.showModal })
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _title = __webpack_require__(/*! ./title.jsx */ 433);
	
	var _title2 = _interopRequireDefault(_title);
	
	var _sparql_search = __webpack_require__(/*! ./sparql_search.jsx */ 434);
	
	var _sparql_search2 = _interopRequireDefault(_sparql_search);
	
	var _mapping = __webpack_require__(/*! ./mapping.jsx */ 439);
	
	var _mapping2 = _interopRequireDefault(_mapping);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 433:
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
	          props.title
	        ),
	        _react2.default.createElement(
	          "p",
	          { className: "main_desc" },
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
	          ),
	          _react2.default.createElement(
	            "dt",
	            null,
	            "Sample Data: "
	          ),
	          _react2.default.createElement(
	            "dd",
	            null,
	            props.example
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

/***/ 434:
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
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 435);
	
	var _modal_trigger2 = _interopRequireDefault(_modal_trigger);
	
	var _sparql_results = __webpack_require__(/*! ./sparql_results.jsx */ 436);
	
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
	    if (prevProps.title != this.props.title || prevProps.search.endpoint != this.props.search.endpoint || prevProps.currentEntity != this.props.currentEntity) {
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
	    if (!this.props.currentEntity) {
	      return false;
	    }
	
	    var val = { entity_uri: this.props.currentEntity };
	
	    obj.forEach(function (v) {
	      val[v.name] = v.value;
	    });
	
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
	
	    if (!this.props.currentEntity) return false;
	
	    // Generate the list of needed parameters
	    var cols = this.props.values.split(" ").filter(function (val) {
	      return val != "?entity_uri";
	    });
	
	    // Generate the secondary input boxes
	    var input_boxes = "";
	    input_boxes = cols.map(function (value) {
	      var field_name = value.replace("?", "");
	      var default_value = _this.props['test_' + field_name];
	      return _react2.default.createElement(_search_input_field2.default, {
	        key: field_name,
	        value: field_name,
	        'default': default_value
	      });
	    });
	
	    // Wrap the secondary input boxes in boilerplate
	    var query_fields = cols.length == 0 ? "" : _react2.default.createElement(
	      'div',
	      { className: 'row' },
	      _react2.default.createElement(
	        'div',
	        { className: 'col-md-12 col-lg-10 col-lg-offset-1' },
	        _react2.default.createElement(
	          'h5',
	          null,
	          'Query-Specific Fields:'
	        ),
	        _react2.default.createElement(
	          'form',
	          { id: 'search_form', className: 'form-horizontal', onSubmit: this.state.isSearching ? null : this.autoSearch },
	          input_boxes
	        )
	      )
	    );
	
	    // Generate the title
	    var the_title = _react2.default.createElement(
	      'h4',
	      null,
	      this.props.title,
	      ' for ',
	      _react2.default.createElement(
	        'a',
	        { href: this.props.currentEntity, className: 'entity_uri_label', target: '_blank' },
	        this.props.currentEntity.replace(/https?:\/\//, "")
	      )
	    );
	
	    return _react2.default.createElement(
	      'section',
	      { className: 'search' },
	      _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-md-12' },
	          the_title
	        )
	      ),
	      _react2.default.createElement(_sparql_results2.default, { search: this.props.search, title: this.props.title, select: this.props.select, results: this.state.results, showModal: this.props.showModal }),
	      query_fields
	    );
	  }
	});
	
	//-----------------------------------------------------------------------------
	exports.default = SparqlSearch;

/***/ },

/***/ 435:
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
	      className: "btn btn-info btn-xs hidden-print",
	      onClick: function onClick(e) {
	        return props.func(props.text, props.title);
	      } },
	    props.children
	  );
	};
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 436:
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
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 435);
	
	var _modal_trigger2 = _interopRequireDefault(_modal_trigger);
	
	var _github_issue = __webpack_require__(/*! ../widgets/github_issue.jsx */ 437);
	
	var _github_issue2 = _interopRequireDefault(_github_issue);
	
	var _helpers = __webpack_require__(/*! ../lib/helpers.jsx */ 438);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/******************************************************************************
	*
	*  This builds the table of serach results.  
	*
	*  Assumes the following properties:
	*    results:   The results of the search.  Is an object.
	*    select:    The select portion of the sparql query.
	*    title:     The page title, used for the Github Issue submit
	*    showModal: The function to display a modal popup.
	* 
	******************************************************************************/
	
	exports.default = _react2.default.createClass({
	  displayName: 'sparql_results',
	
	  render: function render() {
	    var _this = this;
	
	    var content = ""; // This will hold the content.
	
	    if (this.props.results) {
	
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
	      // 
	
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
	                  (0, _helpers.truncate)(val, 50, _this.props.search)
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
	      content = _react2.default.createElement(
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
	      );
	    } else {
	      // No search results
	      content = _react2.default.createElement(
	        'table',
	        { className: 'table table-hover' },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              null,
	              'Searching'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'td',
	              null,
	              '...'
	            )
	          )
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
	          content,
	          _react2.default.createElement(
	            'div',
	            { className: 'panel-footer text-center hidden-printr' },
	            _react2.default.createElement(
	              'div',
	              { className: 'btn-group btn-group-xs ' },
	              _react2.default.createElement(
	                _modal_trigger2.default,
	                { func: this.props.showModal, text: this.props.results.select, title: 'SPARQL Query' },
	                'Show this Query'
	              ),
	              _react2.default.createElement(
	                _modal_trigger2.default,
	                { func: this.props.showModal, text: this.props.results.object, title: 'Results as Linked Open Data' },
	                'Show this as Turtle'
	              )
	            ),
	            _react2.default.createElement(_github_issue2.default, { title: this.props.title, query: this.props.results.select })
	          )
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 437:
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

/***/ 438:
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
	  var search = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  if (search) {
	    (function () {
	      var predicates = {};
	      Object.assign(predicates, search.prefix, { "crm": search.predicate, "aat": "http://vocab.getty.edu/aat/" });
	      Object.keys(predicates).forEach(function (key) {
	        var val = predicates[key];
	        if (str.includes(val)) {
	          str = str.replace(val, key + ":");
	        }
	      });
	    })();
	  }
	  if (str.length <= len) {
	    return str;
	  }
	
	  return str.substring(0, len - 3) + "...";
	}

/***/ },

/***/ 439:
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
	
	var _modal_trigger = __webpack_require__(/*! ../widgets/modal_trigger.jsx */ 435);
	
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
	            'AAC Target Mapping For ',
	            _react2.default.createElement(
	              'strong',
	              null,
	              this.props.fieldTitle
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-md-10 col-md-offset-1' },
	          _react2.default.createElement(
	            'div',
	            { className: 'illustration_wrapper' },
	            svgImage
	          )
	        )
	      ),
	      btn
	    );
	  }
	});
	
	exports.default = ItemMapping;

/***/ },

/***/ 440:
/*!**********************************************!*\
  !*** ./site/react/widgets/content_modal.jsx ***!
  \**********************************************/
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
	
	var _helpers = __webpack_require__(/*! ../lib/helpers.jsx */ 438);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ContentModal = _react2.default.createClass({
	  displayName: 'ContentModal',
	  render: function render() {
	    var _this = this;
	
	    var modalProps = Object.assign({}, this.props);
	    delete modalProps.content;
	    delete modalProps.title;
	    delete modalProps.html;
	    delete modalProps.search;
	
	    var content = this.props.content || "Nothing to see here...";
	    if (this.props.html) {
	
	      content = content.replace(/<a(.*?)>(.+?)<\/a>/gi, function (_, m1, m2) {
	        return '<a' + m1 + '>' + (0, _helpers.truncate)(m2, 50, _this.props.search) + '</a>';
	      });
	      var contentObj = { __html: content };
	
	      content = _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-12' },
	          _react2.default.createElement('div', { dangerouslySetInnerHTML: contentObj })
	        )
	      );
	    } else {
	      content = _react2.default.createElement(
	        'pre',
	        null,
	        content
	      );
	    }
	
	    return _react2.default.createElement(
	      _reactBootstrap.Modal,
	      _extends({}, modalProps, { bsSize: 'large', 'aria-labelledby': 'contained-modal-title-lg' }),
	      _react2.default.createElement(
	        _reactBootstrap.Modal.Header,
	        { closeButton: true },
	        _react2.default.createElement(
	          'h4',
	          null,
	          this.props.title
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Modal.Body,
	        null,
	        content
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