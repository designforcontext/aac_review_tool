import React from 'react';

import ItemTitle    from './title.jsx';
import ItemProps    from './props.jsx';
import SparqlSearch from './sparql_search.jsx';
import ItemMapping  from './mapping.jsx';


var ItemDisplay = React.createClass({

  render: function() {


    return (
      <div className="col-sm-9 col-lg-8 col-lg-offset-1 app">
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

        <ItemMapping construct={this.props.construct} extras={this.props.graph_extras} />

      </div>
    )
  }
});

export default ItemDisplay;