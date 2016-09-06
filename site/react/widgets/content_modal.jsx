import $           from "jquery";
import React       from 'react';
import {Modal, Button}     from 'react-bootstrap';
import {truncate}       from '../lib/helpers.jsx'


const ContentModal = React.createClass({
  render() {

    const modalProps = Object.assign({}, this.props);
    delete modalProps.content;
    delete modalProps.title;
    delete modalProps.html;
    delete modalProps.search;

    let content = this.props.content || "Nothing to see here..."
    if (this.props.html) {
    
      content = content.replace(/<a(.*?)>(.+?)<\/a>/gi,(_,m1,m2) => `<a${m1}>${truncate(m2,50,this.props.search)}</a>`)
      let contentObj = {__html: content};


      content = <div className="row"><div className="col-sm-12"><div dangerouslySetInnerHTML={contentObj}/></div></div>
    } else {
      content = <pre>{content}</pre>
    }

    return (
      <Modal {...modalProps} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton={true} >
          <h4>{this.props.title}</h4>
        </Modal.Header>
        <Modal.Body>
          {content}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default ContentModal;