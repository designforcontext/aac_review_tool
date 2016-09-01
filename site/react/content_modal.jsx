import $           from "jquery";
import React       from 'react';
import {Modal, Button}     from 'react-bootstrap';

const ContentModal = React.createClass({
  render() {

    const modalProps = Object.assign({}, this.props);
    delete modalProps.content;
    delete modalProps.title;

    return (
      <Modal {...modalProps} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Body>
        <pre>{this.props.content}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default ContentModal;