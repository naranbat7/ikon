import React from "react";
import {
  CButton,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const ModalCheck = (props) => {
  return (
    <CModal show={props.modal} onClose={() => props.setModal(false)} size="sm">
      <CModalHeader>
        <CModalTitle style={{ textAlign: "center" }}>{props.desc}</CModalTitle>
      </CModalHeader>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color={props.btnColor}
          onClick={() => {
            props.handler();
            props.setModal(false);
          }}
        >
          {props.btnTitle}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalCheck;
