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
  CLabel,
  CCol,
  CSelect,
  CTextarea,
} from "@coreui/react";

import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import ModalCheck from "../ModalCheck";

const ModalCompanyStatus = (props) => {
  const [checkModal, setCheckModal] = useState(false);
  const [data, setData] = useState({
    id: 1,
    status: 1,
    name: "",
    description: "",
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const updateStatus = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.setComReqStatusApi.url,
      Constant.setComReqStatusApi.method,
      {
        id: data.id,
        status: data.status,
        description: data.description,
      }
    );
    setGlobalToast({ message: "Амжилттай өөрчиллөө.", type: true });
    props.setModal(false);
    props.refresh();
  };

  const isInputValid = () => {
    if (data.status == 1 && data.description == "") return false;
    return true;
  };

  return (
    <>
      {data.id && (
        <CModal
          show={props.modal}
          onClose={() => props.setModal(false)}
          size="lg"
          centered
        >
          <CModalHeader closeButton>
            <CModalTitle>Хамтран ажиллаж буй төлөвийг өөрчлөх</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCard>
              <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      Нэр<strong style={{ color: "#e74c3c" }}>*</strong>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CLabel>
                      <strong>{data.name}</strong>
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="deliverCost3">
                    Шийдвэр<strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CSelect
                    id="deliverCost3"
                    onChange={(value) =>
                      setData({
                        ...data,
                        status: parseInt(value.target.value),
                      })
                    }
                  >
                    <option
                      color="danger"
                      value="1"
                      selected={data.status == 1}
                    >
                      Хамтран ажиллахаас татгалзах
                    </option>
                    <option value="2" selected={data.status == 2}>
                      Хамтран ажиллаж эхлэх
                    </option>
                  </CSelect>
                </CFormGroup>
                {data.status == 1 && (
                  <CFormGroup>
                    <CLabel htmlFor="desc3">
                      Тайлбар<strong style={{ color: "#e74c3c" }}>*</strong>
                    </CLabel>
                    <CTextarea
                      id="desc3"
                      placeholder="Цуцлах болсон шалтгаан"
                      value={data.description}
                      onChange={(value) =>
                        setData({ ...data, description: value.target.value })
                      }
                    />
                  </CFormGroup>
                )}
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => props.setModal(false)}>
              Болих
            </CButton>
            <CButton
              color="info"
              onClick={() => setCheckModal(true)}
              disabled={!isInputValid()}
            >
              Өөрчлөх
            </CButton>
          </CModalFooter>
        </CModal>
      )}
      <ModalCheck
        btnTitle="Тийм"
        desc="Шийдвэрээ гаргахдаа итгэлтэй байна уу?"
        handler={() => updateStatus()}
        modal={checkModal}
        setModal={(val) => setCheckModal(val)}
        btnColor="danger"
      />
    </>
  );
};
export default ModalCompanyStatus;
