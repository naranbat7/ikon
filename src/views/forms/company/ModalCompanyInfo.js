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
} from "@coreui/react";

import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";

const ModalCompanyInfo = (props) => {
  const [data, setData] = useState({
    id: 1,
    name: "",
    createdDate: "",
    email: "",
    telnumber: "",
    description: "",
    isCompany: 0,
    isShop: 1,
    companyStatus: 0,
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  useEffect(async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getCompanyReqApi.url + props.data,
      Constant.getCompanyReqApi.method
    );
    setData(_data);
  }, [props.data]);

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
                  readOnly
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="desc">Нэмэлт мэдээлэл</CLabel>
                <CTextarea
                  id="desc"
                  placeholder="Нэмэлт мэдээлэл"
                  value={data.description}
                  readOnly
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="createdDate">Хүсэлт гаргасан огноо</CLabel>
                <CInput
                  id="createdDate"
                  placeholder="Огноо"
                  value={data.createdDate}
                  readOnly
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Цахим шуудан</CLabel>
                <CInput
                  id="email"
                  placeholder="Цахим шуудан"
                  value={data.email}
                  readOnly
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="phone">Утасны дугаар</CLabel>
                <CInput
                  id="phone"
                  placeholder="8888-8888"
                  type="number"
                  value={data.telnumber}
                  readOnly
                />
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Үйлчилгээний чиглэл</CLabel>
                </CCol>
                <CCol md="9">
                  <CInput
                    id="isShop"
                    placeholder="Чиглэл"
                    value={data.isShop == 1 ? "Дэлгүүр" : "Дасгал"}
                    readOnly
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Байгууллага / Хувь хүн</CLabel>
                </CCol>
                <CCol md="9">
                  <CInput
                    id="isCompany"
                    placeholder="Байгууллага / Хувь хүн"
                    value={data.isCompany == 1 ? "Байгууллага" : "Хувь хүн"}
                    readOnly
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="companyStatus">Одоогийн төлөв</CLabel>
                <CInput
                  id="companyStatus"
                  placeholder="Одоогийн төлөв"
                  value={
                    data.companyStatus == 2
                      ? "Баталгаажсан"
                      : data.companyStatus == 1
                      ? "Цуцлагдсан"
                      : "Хүлээгдэж байгаа"
                  }
                  readOnly
                />
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
export default ModalCompanyInfo;
