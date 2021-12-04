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
  CInput,
  CLabel,
  CCol,
  CTextarea,
  CInputRadio,
  CSelect,
} from "@coreui/react";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const ModalNotificationAdd = (props) => {
  const [data, setData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const btnHandler = async () => {
    const _data = await request(
      "Bearer " + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.addNotificationApi.url,
      Constant.addNotificationApi.method,
      data
    );
    console.log(_data);
    if (_data) {
      setGlobalToast({ message: "Амжилттай илгээлээ", type: true });
      props.setModal(false);
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
        <CModalTitle>Мэдэгдэл илгээх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <InlineValue
              label="Гарчиг"
              value={data.title}
              onChange={(val) => setData({ ...data, title: val.target.value })}
            />
            <ColValue
              label="Нэмэлт мэдээлэл"
              value={data.body}
              onChange={(val) =>
                setData({ ...data, body: val.target.value })
              }
            />
            <InlineValue
              label="Зураг"
              value={data.image}
              onChange={(val) =>
                setData({ ...data, image: val.target.value })
              }
            />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={btnHandler} disabled={data.title.length < 3 || !data.title ||  data.body.length < 3 || !data.body}>
          Илгээх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalNotificationAdd;

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

const ColValue = ({ label, value, onChange }) => {
  return (
    <CFormGroup>
      <CLabel>{label}</CLabel>
      <CTextarea placeholder={label} value={value} onChange={onChange} />
    </CFormGroup>
  );
};