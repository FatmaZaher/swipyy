import React from "react";
import LinkButton from "./form/LinkButton";
import { Link } from "react-router-dom";

import Modal from "react-modal";

const LockModal = (props) => {
  const { modalIsOpen } = props;
  let subtitle;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    console.log("closeModal closeModal");
    props.onCloseLockModal();
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="text-center">
          {props.children}
          <img
            src="https://cdn-f.heylink.me/static/media/Banner.704fb761.svg"
            alt=""
          />
          <h4 className="mt-4">It's time to turn PRO</h4>
          <p className="mb-4">Cover Image is available on the PRO plan.</p>
          <Link to="/payments">
            <LinkButton type="" buttontext="Unlock PRO" />
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default LockModal;
