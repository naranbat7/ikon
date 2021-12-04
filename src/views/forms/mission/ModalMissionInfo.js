import React from "react";
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
  CBadge,
  CImg,
} from "@coreui/react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const ModalMissionInfo = (props) => {
  const { data } = props;

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Дэлгэрэнгүй мэдээлэл</CModalTitle>
      </CModalHeader>
      {data && (
        <CModalBody>
          <CCard>
            <CCardBody>
              <InlineValue label="Тэмцээний нэр" value={data.title} />
              <ColValue label="Нэмэлт мэдээлэл" value={data.description} />
              <InlineValue
                label="Үүсгэсэн огноо"
                value={moment(data.dateCreated).format("YYYY/MM/DD HH:mm:ss")}
              />
              <InlineValue
                label="Эхэлсэн огноо"
                value={moment(data.startDate).format("YYYY/MM/DD HH:mm:ss")}
              />
              <InlineValue
                label="Дуусах огноо"
                value={moment(data.endDate).format("YYYY/MM/DD HH:mm:ss")}
              />
              <BadgeValue
                label="Төрөл"
                badge={data.type == "Public" ? "Нийтийн" : "Хувийн"}
                color={data.type == "Public" ? "success" : "info"}
              />
              <BadgeValue label="Хураамж" badge={data.taxPoint + " оноо"} />
              <BadgeValue
                label="Ялагчын байрлал"
                badge={data.winnerPosition}
                color="success"
              />
              <BadgeValue
                label="Даалгаврын код"
                badge={data.missionCode}
                color="secondary"
              />
              <BadgeValue
                label="Устгагдсан эсэх"
                badge={data.isDeleted == true ? "Устгагдсан" : "Идэвхтэй"}
                color={data.isDeleted == true ? "danger" : "success"}
              />
              <ImgValue
                portraitImg={data.imgPortraitLink}
                landscapeImg={data.imgLandscapeLink}
              />
              <TableValue data={data.involvedUsers} />
            </CCardBody>
          </CCard>
        </CModalBody>
      )}
      <CModalFooter>
        <CButton color="info" onClick={() => props.setModal(false)}>
          Ойлголоо
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalMissionInfo;

const InlineValue = ({ label, value }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CInput placeholder={label} value={value} />
      </CCol>
    </CFormGroup>
  );
};

const ColValue = ({ label, value }) => {
  return (
    <CFormGroup>
      <CLabel>{label}</CLabel>
      <CTextarea placeholder={label} value={value} />
    </CFormGroup>
  );
};

const BadgeValue = ({ label = "", badge = "", color = "info" }) => {
  return (
    <CFormGroup row>
      <CCol md="3">
        <CLabel>{label}</CLabel>
      </CCol>
      <CCol md="9">
        <CBadge className="px-3 py-2" color={color}>
          {badge}
        </CBadge>
      </CCol>
    </CFormGroup>
  );
};

const ImgValue = ({ portraitImg, landscapeImg }) => {
  return (
    <CFormGroup row>
      <CCol md="4">
        <CImg src={portraitImg} height="150" title="Portrait Img" />
      </CCol>
      <CCol md="8">
        <CImg src={landscapeImg} height="150" title="Landscape Img" />
      </CCol>
    </CFormGroup>
  );
};

const TableValue = ({ data = [] }) => {
  const fields = ["байр", "нэр", "алхалт", "оролцож эхэлсэн огноо"];
  return (
    <CFormGroup row>
      <table className="table table-hover table-outline mb-0 d-none d-sm-table">
        <thead className="thead-light">
          <tr>
            {fields.map((item, idx) => {
              return (
                <th key={idx} className="text-center">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr key={key}>
                <td className="text-center">{key + 1}</td>
                <td>
                  <img
                    src={
                      item.imgLink ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KDmFVx1f0yACxgdJAx8g8kqTqJWMP63PGA&usqp=CAU"
                    }
                    style={{ width: 30, height: 30 }}
                  />
                  <CLabel className="px-3">{item.name || "unnamed"}</CLabel>
                </td>
                <td className="text-center">
                  {item.totalStep - item.initialStep}
                </td>
                <td className="text-center">
                  {moment(item.date).format("YYYY/MM/DD HH:mm:ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CFormGroup>
  );
};
