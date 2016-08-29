import $           from "jquery";
import React       from 'react';
import {Modal, Button}     from 'react-bootstrap';

const TurtleModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Turtle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <pre>{this.props.turtle}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default TurtleModal;