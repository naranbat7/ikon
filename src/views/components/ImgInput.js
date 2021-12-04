import React from "react";
import { CFormGroup, CLabel, CCol, CInputFile } from "@coreui/react";

const InlineImgInput = ({ label = "", onChange }) => {
  const onLoad = (event) => {
    onChange(event.target.files[0]);
  };
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CInputFile
          id="custom-file-input"
          accept="image/png, image/jpeg"
          title="Зураг оруулах"
          onChange={onLoad}
        />
      </CCol>
    </CFormGroup>
  );
};

export default InlineImgInput;
