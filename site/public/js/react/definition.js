var Demo = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>
              Preferred Title 
              <span className='label label-info'>Mandatory</span>
              <span className='label label-info'>Only One Allowed</span>
            </h2>


            <p>This is the primary display title of the work.</p>

            <dl className="dl-horizontal">
              <dt>Example</dt>
              <dd>Young Women Picking Fruit</dd>
              <dt>LOD Type</dt>
              <dd> http://vocab.americanartcollaborative.org/titles#primary_title_type </dd>
            </dl>
          </div>
        </div>
        <hr className='----------------------------------------------------------------' />

        <div className="row">
          <div className="col-md-12">
            <h3>Reference Mapping</h3>

            <div className="col-md-6">
              <pre className='pre-scrollable'>
                sample mapping goes here
              </pre>
            </div>
            <div className="col-md-6">
              <svg className='puml-diagram' />
            </div> 
          </div>
        </div>

        <hr className='----------------------------------------------------------------' />

        <div className="row">
          <div className="col-md-12">
            <input type="text" placeholder="Enter a object URI" defaultValue=""  />
            <input type="text" placeholder="Enter an institutional type URI" defaultValue=""  />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h4>SELECT query</h4>
            <pre className='pre-scrollable hidden'>
              SPARQL goes here
            </pre>
          </div>
          <div className="col-md-6">
            <h4>CONSTRUCT query</h4>
            <pre className='pre-scrollable hidden'>
              SPARQL goes here
            </pre>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>Sparql Results</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <table className="table table-condensed table-hover">
              <thead>
                <tr>
                  <th>
                    ?value
                  </th>
                  <th>
                    ?source
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Young Women Picking Fruit
                  </td>
                  <td>
                    http://yale.edu/title/1aa
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-9">
            <pre className='pre-scrollable'>
              Constructed Object goes here
            </pre>
          </div>
        </div>
      </div>
    )
  }
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);