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
} from "@coreui/react";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const ModalMissionEdit = (props) => {
  const [data, setData] = useState(props.data, {
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
    console.log(data)
    const _data = await request(
      "Bearer " + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.addMissionApi.url,
      Constant.addMissionApi.method,
      data
    );
    if(_data && _data.success) {
      props.setModal(false);
      props.refresh();
    }
  }

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Даалгавар өөрчлөх</CModalTitle>
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
            <InlineDropdownValue
              label="Хураамж"
              checkedValue={data.taxPoint}
              onChange={(val) =>
                setData({ ...data, taxPoint: parseInt(val.target.value) })
              }
              data={[
                { value: 100, title: "100 оноо" },
                { value: 200, title: "200 оноо" },
                { value: 300, title: "300 оноо" },
                { value: 500, title: "500 оноо" },
              ]}
            />
            <InlineDropdownValue
              label="Ялагчийн байрлал"
              checkedValue={data.winnerPosition}
              onChange={(val) =>
                setData({ ...data, winnerPosition: parseInt(val.target.value) })
              }
              data={winPos}
            />
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={btnHandler}>
          Өөрчлөх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalMissionEdit;

const InlineValue = ({ label, value, onChange }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CInput placeholder={label} value={value} onChange={onChange} />
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
