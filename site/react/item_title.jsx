import React from 'react';

var ItemTitle = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="field_name">
            {this.props.title}
            <span className='badge'>{this.props.mandatory ? "Mandatory" : null}</span>
            <span className='badge'>{this.props.multiples ? null : "Only One Allowed"}</span>
          </h2>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
});

export default ItemTitle;