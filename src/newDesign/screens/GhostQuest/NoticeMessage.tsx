import React from "react";
import Modal from 'react-bootstrap/Modal'

const NoticeMessage = ({ noticeState, showNotice }) => {
  return (
    <Modal show={noticeState} onHide={() => showNotice(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Notice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ghost data in the ghostlist will have an update time every 20 seconds.
          If you did not see any data changes after a battle or summon please wait or reload the page.
        </p>
      </Modal.Body>
    </Modal>
  )
}

export default NoticeMessage;
