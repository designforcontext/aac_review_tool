import React from 'react';
import classNames from 'classnames';

//-----------------------------------------------------------------------------
var Sidebar = React.createClass({
  render: function() {

    var _this = this;

    var items = this.props.fields.map(function(field, index) {
       return <SidebarListItem  
          id={index} 
          name={field.title} 
          mandatory={field.mandatory}
          desc={field.description}
          key={`${field.category}_${field.title}`} 
          func={_this.props.gotoField}
          applies_to={field.applies_to}
          category={field.category}
          prev_category={index == 0 ? "" : _this.props.fields[index-1].category}
          selected={index == _this.props.currentItem}
        />
    });

    return (
      <div className="col-md-3 col-lg-2 sidebar hidden-print">
        <dl>
          {items}
        </dl>
      </div>
    )
  }
})

//-----------------------------------------------------------------------------
var SidebarListItem = React.createClass({
  handleClick: function() {
    this.props.func(this.props.id);
  },
  render: function() {

    let classes = classNames(
      "sidebar_item",
      {selected: this.props.selected}
    );

    let header = false
    if (this.props.category != this.props.prev_category) {
      header = (<h5> {this.props.category} </h5>)
    }

    let badges = this.props.mandatory ? "❗️" : ""

    return ( 
        <div>
          {header}
          <div className={classes} onClick={this.handleClick}>
            <dt> {this.props.name} <span className="">{badges}</span></dt>
            <dd> {this.props.desc} </dd> 
          </div>
        </div>
    );
  }
})

//-----------------------------------------------------------------------------
export default Sidebar;