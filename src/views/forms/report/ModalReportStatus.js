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
} from "@coreui/react";

import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import ModalCheck from "../ModalCheck";

const ModalReportStatus = (props) => {
  const [checkModal, setCheckModal] = useState(false);
  const [data, setData] = useState({
    id: 1,
    status: 0,
    name: "",
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
      Constant.setReportStatusApi.url,
      Constant.setReportStatusApi.method,
      {
        id: data.id,
        status: data.status ? 1 : 0,
      }
    );
    setGlobalToast({ message: "Амжилттай өөрчиллөө.", type: true });
    props.setModal(false);
    props.refresh();
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
            <CModalTitle>Төлөв өөрчлөх</CModalTitle>
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
                    Төлөв<strong style={{ color: "#e74c3c" }}>*</strong>
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
                      value="0"
                      selected={data.status == 0}
                    >
                      Хүсэлтийг шийдвэрлээгүй
                    </option>
                    <option value="1" selected={data.status == 1}>
                      Хүсэлтийг шийдвэрлэсэн
                    </option>
                  </CSelect>
                </CFormGroup>
              </CCardBody>
            </CCard>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => props.setModal(false)}>
              Болих
            </CButton>
            <CButton color="info" onClick={() => setCheckModal(true)}>
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
export default ModalReportStatus;
