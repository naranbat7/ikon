import React, { useState, useEffect } from "react";
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
  CInputCheckbox,
} from "@coreui/react";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const NewsAdd = (props) => {
  const [data, setData] = useState({
    name: "",
    content: "",
    isCovid: false,
    isSponsored: false,
    imageUrl: "",
    categoryId: 0,
    adminId: 0,
    adminName: ""
  });
  const [category, setCategory] = useState([]);

  const {
    globalData,
    setGlobalLoading,
    setGlobalToast,
  } = useGlobal();

  const btnHandler = async () => {
    const _data = await request(
      setGlobalLoading,
      setGlobalToast,
      Constant.addNewsApi.url,
      Constant.addNewsApi.method,
      {
        name: data.name,
        content: data.content,
        isCovid: data.isCovid,
        isSponsored: data.isSponsored,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        adminId: globalData.id,
        adminName: globalData.name,
        adminUrl: globalData.url
      }
    );
    props.setModal(false);
    props.refresh();
  };

  const getReq = async () => {
    const _data = await request(
      setGlobalLoading,
      setGlobalToast,
      Constant.getCategoryApi.url,
      Constant.getCategoryApi.method
    );
    setCategory(_data);
  };

  useEffect(() => {
    getReq();
  }, []);

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Мэдээ нэмэх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <InlineValue
              label="Мэдээний нэр"
              value={data.name}
              onChange={(val) => setData({ ...data, name: val.target.value })}
            />
            <ColValue
              label="Дэлгэрэнгүй"
              value={data.content}
              onChange={(val) =>
                setData({ ...data, content: val.target.value })
              }
            />
            <InlineValue
              label="Cover зураг"
              value={data.imageUrl}
              onChange={(val) => setData({ ...data, imageUrl: val.target.value })}
            />
            <InlineRadiosValue
              label="Covid-той холбоотой юу?"
              checkedValue={data.isCovid}
              onChange={(val) =>
                setData({ ...data, isCovid: !data.isCovid})
              }
              idx={0}
            />
            <InlineRadiosValue
              label="Онцгой зар уу?"
              checkedValue={data.isSponsored}
              onChange={(val) => {
                setData({ ...data, isSponsored: !data.isSponsored });
              }}
              idx={1}
            />
            <CategoryInput
              label="Ангилал"
              checkedValue={data.categoryId}
              onChange={(val) =>
                setData({ ...data, categoryId: parseInt(val.target.value) })
              }
              data={category}
            />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={btnHandler} disabled={!data.name || !data.imageUrl || !data.content || data.categoryId == 0}>
          Нэмэх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default NewsAdd;

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
      <CTextarea placeholder={label} value={value} onChange={onChange} rows={16} />
    </CFormGroup>
  );
};

const InlineRadiosValue = ({
  label = "",
  checkedValue,
  onChange,
  idx
}) => {
  return (
    <CFormGroup row>
      <CCol md="6">
        <CInputCheckbox onChange={(val) => onChange(val.target.value)} />
      </CCol>
      <CCol md="9">
        <CLabel>{label}</CLabel>
      </CCol>
    </CFormGroup>
  );
};

const CategoryInput = ({ label = "", data = [], onChange }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CSelect custom name="select" id="select" onChange={onChange}>
          {data.map((item, key) => {
            return (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </CSelect>
      </CCol>
    </CFormGroup>
  );
};