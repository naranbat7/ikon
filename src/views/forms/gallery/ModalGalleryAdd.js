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
} from "@coreui/react";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import ImgInput from "../../components/ImgInput";
import { request } from "../../../utils/service";
import axios from "axios";

const ModalGalleryAdd = (props) => {
  const [data, setData] = useState({
    name: "",
    url: "",
    deleteUrl: "",
    size: 0,
    height: 0,
    width: 0,
  });

  const [image, setImage] = useState({});

  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const btnHandler = async () => {
    setGlobalLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("image", image);
    axios({
      method: "POST",
      url: "https://api.imgbb.com/1/upload?key=c9d644f7d04fd013f4dbd6e7007eebed",
      data: bodyFormData,
    })
      .then(async (response) => {
        if (response.data.status == 200) {
          const res = response.data.data;
          const _data = await request(
            globalData.authorization.token,
            setGlobalLoading,
            setGlobalAuthorization,
            setGlobalToast,
            Constant.addGalleryApi.url,
            Constant.addGalleryApi.method,
            {
              name: data.name,
              url: res.display_url,
              deleteUrl: res.delete_url,
              size: res.size,
              height: 0,
              width: 0,
            }
          );
          if (_data && _data.success) {
            props.setModal(false);
            props.refresh();
          }
        }

        setGlobalLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGlobalLoading(false);
      });
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Зураг нэмэх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <InlineValue
              label="Зурагны нэр"
              value={data.name}
              onChange={(val) => setData({ ...data, name: val.target.value })}
            />
            <ImgInput label="Зураг" onChange={setImage} />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          onClick={btnHandler}
          disabled={!data.name || data.name.length < 4 || !image}
        >
          Нэмэх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalGalleryAdd;

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
