import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CLabel,
  CInput,
  CSelect,
} from "@coreui/react";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";

const ModalBannerAdd = (props) => {
  const [data, setData] = useState({
    url: "",
    type: "typical",
    connectId: ""
  });

  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const btnHandler = async () => {
    console.log(data);
    const _data = await request(
      "Bearer " + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.addBannerApi.url,
      Constant.addBannerApi.method,
      data
    );
    console.log(_data);
    if (_data) {
      props.setModal(false);
      props.refresh();
    }
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Banner нэмэх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <InlineValue
              label="Зурагны холбоос"
              value={data.url}
              onChange={(val) => setData({ ...data, url: val.target.value })}
            />
            <InlineDropdownValue
              label="Төрөл"
              checkedValue={data.type}
              onChange={(val) =>
                setData({ ...data, type: val.target.value})
              }
              data={bannerType}
            />
            <InlineValue
              label="Үсрэх холбоос"
              value={data.connectId}
              onChange={(val) => setData({ ...data, connectId: val.target.value })}
            />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          onClick={btnHandler}
          disabled={!data.url || data.url.length < 4}
        >
          Нэмэх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalBannerAdd;

const InlineValue = ({ label, value, onChange, type = "text" }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CInput
          placeholder={label}
          value={value}
          onChange={onChange}
          type={type}
        />
      </CCol>
    </CFormGroup>
  );
};

const InlineDropdownValue = ({ label = "", data = [], onChange }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CSelect custom name="select" id="select" onChange={onChange}>
          {data.map((item, key) => {
            return (
              <option key={key} value={item.value}>
                {item.title}
              </option>
            );
          })}
        </CSelect>
      </CCol>
    </CFormGroup>
  );
};

const bannerType = [
  { value: "typical", title: "typical" },
  { value: "mission", title: "mission" },
];