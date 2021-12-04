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

const ModalMissionAdd = (props) => {
  const [data, setData] = useState({
    type: "Public",
    startDate: "",
    startTime: "",
    reward: "",
    description: "",
    taxPoint: 100,
    winnerPosition: 1,
    title: "",
    imgPortraitLink: "",
    imgLandscapeLink: "",
    endDate: "",
    endTime: "",
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
      Constant.addMissionApi.url,
      Constant.addMissionApi.method,
      data
    );
    if (_data && _data.success) {
      props.setModal(false);
      props.refresh();
    }
  };

  const getValidation = () => {
    return (
      data.title.length < 3 ||
      !data.title ||
      data.description.length < 3 ||
      !data.description ||
      !data.reward ||
      data.description.length < 3 ||
      !data.startDate ||
      !data.endDate ||
      !data.startTime ||
      !data.endTime ||
      !data.taxPoint ||
      !data.winnerPosition ||
      !data.imgPortraitLink ||
      !data.imgLandscapeLink
    );
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Даалгавар нэмэх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <InlineValue
              label="Тэмцээний нэр"
              value={data.title}
              onChange={(val) => setData({ ...data, title: val.target.value })}
            />
            <ColValue
              label="Нэмэлт мэдээлэл"
              value={data.description}
              onChange={(val) =>
                setData({ ...data, description: val.target.value })
              }
            />
            <InlineValue
              label="Тэмцээний шагнал"
              value={data.reward}
              onChange={(val) => setData({ ...data, reward: val.target.value })}
            />
            <InlineDateValue
              label="Эхлэх огноо"
              onChangeDate={(val) =>
                setData({ ...data, startDate: val.target.value })
              }
              onChangeTime={(val) =>
                setData({ ...data, startTime: val.target.value })
              }
            />
            <InlineDateValue
              label="Дуусах огноо"
              onChangeDate={(val) =>
                setData({ ...data, endDate: val.target.value })
              }
              onChangeTime={(val) =>
                setData({ ...data, endTime: val.target.value })
              }
            />
            <InlineRadiosValue
              label="Төрөл"
              checkedValue={data.type}
              onChange={(val) => setData({ ...data, type: val.target.value })}
              data={[
                { value: "Public", title: "Нийтийн" },
                { value: "Private", title: "Хувийн" },
              ]}
            />
            <InlineValue
              label="Хураамж"
              value={data.taxPoint}
              onChange={(val) =>
                setData({ ...data, taxPoint: parseInt(val.target.value) })
              }
              type="number"
            />
            <InlineDropdownValue
              label="Ялагчийн байрлал"
              checkedValue={data.winnerPosition}
              onChange={(val) =>
                setData({ ...data, winnerPosition: parseInt(val.target.value) })
              }
              data={winPos}
            />
            <InlineValue
              label="Portrait зураг"
              value={data.imgPortraitLink}
              onChange={(val) =>
                setData({ ...data, imgPortraitLink: val.target.value })
              }
            />
            <InlineValue
              label="Landscape зураг"
              value={data.imgLandscapeLink}
              onChange={(val) =>
                setData({ ...data, imgLandscapeLink: val.target.value })
              }
            />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={btnHandler} disabled={getValidation}>
          Нэмэх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalMissionAdd;

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

const InlineDateValue = ({ label, onChangeDate, onChangeTime }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CInput
          type="date"
          placeholder="он, сар, өдөр"
          onChange={onChangeDate}
        />
        <CInput type="time" placeholder="цаг, минут" onChange={onChangeTime} />
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

const InlineRadiosValue = ({
  label = "",
  data = [],
  checkedValue,
  onChange,
}) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        {data.map((item, key) => {
          return (
            <CFormGroup key={key} variant="custom-radio" inline>
              <CInputRadio
                id={"radio" + item.value}
                name="inline-radios"
                value={item.value}
                checked={checkedValue == item.value}
                onClick={onChange}
              />
              <CLabel variant="custom-radio">{item.title}</CLabel>
            </CFormGroup>
          );
        })}
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

const winPos = [
  { value: 1, title: "1" },
  { value: 2, title: "2" },
  { value: 3, title: "3" },
  { value: 4, title: "4" },
  { value: 5, title: "5" },
  { value: 6, title: "6" },
  { value: 7, title: "7" },
  { value: 8, title: "8" },
  { value: 9, title: "9" },
  { value: 10, title: "10" },
  { value: 11, title: "11" },
  { value: 12, title: "12" },
  { value: 13, title: "13" },
  { value: 14, title: "14" },
  { value: 15, title: "15" },
  { value: 16, title: "16" },
  { value: 17, title: "17" },
  { value: 18, title: "18" },
  { value: 19, title: "19" },
  { value: 20, title: "20" },
];
