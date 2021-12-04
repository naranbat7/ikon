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
  CInputRadio,
  CTextarea,
  CBadge,
} from "@coreui/react";

import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import ModalCheck from "../ModalCheck";

const ModalCompanyAdd = (props) => {
  const [data, setData] = useState({
    name: "",
    createdDate: "",
    email: "",
    telnumber: "",
    description: "",
    isCompany: 0,
    isShop: 1,
    companyStatus: 0,
  });
  const [checkModal, setCheckModal] = useState(false);

  const isInputValid = () => {
    if (
      data.name == "" ||
      data.imgLink == "" ||
      data.email == "" ||
      data.telnumber == "" ||
      data.description == ""
    )
      return false;
    return true;
  };

  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const updateCompany = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.setCompanyReqApi.url,
      Constant.setCompanyReqApi.method,
      data
    );
    setGlobalToast({ message: "Амжилттай өөрчиллөө.", type: true });
    props.setModal(false);
    props.refresh();
  };

  return (
    <>
      {data && (
        <CModal
          show={props.modal}
          onClose={() => props.setModal(false)}
          size="lg"
          centered
        >
          <CModalHeader closeButton>
            <CModalTitle>Нэмэх</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCard>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="name2">
                    Нэр<strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CInput
                    id="name2"
                    placeholder="Нэрээ оруулна уу"
                    value={data.name}
                    onChange={(value) =>
                      setData({ ...data, name: value.target.value })
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="desc2">
                    Нэмэлт мэдээлэл
                    <strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CTextarea
                    id="desc2"
                    placeholder="Нэмэлт мэдээлэл"
                    value={data.description}
                    onChange={(value) =>
                      setData({ ...data, description: value.target.value })
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="email2">
                    Цахим шуудан<strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CInput
                    id="email2"
                    placeholder="Цахим шуудан"
                    value={data.email}
                    onChange={(value) =>
                      setData({ ...data, email: value.target.value })
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="phone2">
                    Утасны дугаар<strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CInput
                    id="phone2"
                    placeholder="8888-8888"
                    type="number"
                    value={data.telnumber}
                    onChange={(value) =>
                      setData({ ...data, telnumber: value.target.value })
                    }
                  />
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      Үйлчилгээний чиглэл
                      <strong style={{ color: "#e74c3c" }}>*</strong>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="checkbox">
                      <CInputRadio
                        className="form-check-input"
                        id="radio3"
                        name="isShop2"
                        value={1}
                        checked={data.isShop === 1}
                        onChange={(value) =>
                          setData({
                            ...data,
                            isShop: parseInt(value.target.value),
                          })
                        }
                      />
                      <CLabel variant="checkbox" htmlFor="radio3">
                        <strong>Дэлгүүр</strong>
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio
                        className="form-check-input"
                        id="radio4"
                        name="isShop2"
                        value={0}
                        checked={data.isShop === 0}
                        onChange={(value) =>
                          setData({
                            ...data,
                            isShop: parseInt(value.target.value),
                          })
                        }
                      />
                      <CLabel variant="checkbox" htmlFor="radio4">
                        <strong>Дасгал</strong>
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      Байгууллага / Хувь хүн
                      <strong style={{ color: "#e74c3c" }}>*</strong>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="checkbox">
                      <CInputRadio
                        className="form-check-input"
                        id="radio5"
                        name="isCompany2"
                        value={1}
                        checked={data.isCompany === 1}
                        onChange={(value) =>
                          setData({
                            ...data,
                            isCompany: parseInt(value.target.value),
                          })
                        }
                      />
                      <CLabel variant="checkbox" htmlFor="radio5">
                        <strong>Байгууллага</strong>
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio
                        className="form-check-input"
                        id="radio6"
                        name="isCompany2"
                        value={0}
                        checked={data.isCompany === 0}
                        onChange={(value) =>
                          setData({
                            ...data,
                            isCompany: parseInt(value.target.value),
                          })
                        }
                      />
                      <CLabel variant="checkbox" htmlFor="radio6">
                        <strong>Хувь хүн</strong>
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Системд нэмэгдэх төлөв</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CBadge className="px-3 py-2" color="success">
                      Баталгаажсан
                    </CBadge>
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => props.setModal(false)}>
              Болих
            </CButton>
            <CButton
              color="success"
              onClick={() => setCheckModal(true)}
              disabled={!isInputValid()}
            >
              Нэмэх
            </CButton>
          </CModalFooter>
        </CModal>
      )}
      <ModalCheck
        btnTitle="Өөрчлөх"
        desc="Мэдээллийг өөрчлөхдөө итгэлтэй байна уу?"
        handler={() => updateCompany()}
        modal={checkModal}
        setModal={(val) => setCheckModal(val)}
        btnColor="warning"
      />
    </>
  );
};
export default ModalCompanyAdd;
