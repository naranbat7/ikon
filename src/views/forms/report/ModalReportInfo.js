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
  CBadge,
  CTextarea,
} from "@coreui/react";

const ModalReportInfo = (props) => {
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
              <CFormGroup>
                <CLabel htmlFor="name">Нэр</CLabel>
                <CInput
                  id="name"
                  placeholder="Нэрээ оруулна уу"
                  value={data.name}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="desc">Нэмэлт мэдээлэл</CLabel>
                <CTextarea
                  id="desc"
                  placeholder="Нэмэлт мэдээлэл"
                  value={data.description}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="createdDate">Хүсэлт гаргасан огноо</CLabel>
                <CInput
                  id="createdDate"
                  placeholder="Огноо"
                  value={data.createdDate}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Цахим шуудан</CLabel>
                <CInput
                  id="email"
                  placeholder="Цахим шуудан"
                  value={data.email}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="phone">Утасны дугаар</CLabel>
                <CInput
                  id="phone"
                  placeholder="8888-8888"
                  type="number"
                  value={data.telnumber}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="reportStatus">Одоогийн төлөв</CLabel>
                <CBadge
                  color={data.reportStatus == 1 ? "success" : "warning"}
                  className="ml-3 px-3 py-2"
                >
                  {data.reportStatus == 1 ? "Шийдвэрлэгдсэн" : "Шийдвэрлээгүй"}
                </CBadge>
              </CFormGroup>
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
export default ModalReportInfo;
