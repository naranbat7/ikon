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

const ModalReportMail = (props) => {
  const [checkModal, setCheckModal] = useState(false);
  const [data, setData] = useState({
    id: 0,
    type: 0,
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
      Constant.sendMailToReportApi.url,
      Constant.sendMailToReportApi.method,
      {
        id: data.id,
        type: data.type || 0,
      }
    );
    setGlobalToast({ message: "Амжилттай илгээлээ.", type: true });
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
            <CModalTitle>Хүсэлт гаргагч руу мэйл илгээх</CModalTitle>
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
                    Төрөл<strong style={{ color: "#e74c3c" }}>*</strong>
                  </CLabel>
                  <CSelect
                    id="deliverCost3"
                    onChange={(value) =>
                      setData({
                        ...data,
                        type: parseInt(value.target.value),
                      })
                    }
                  >
                    <option value="0" selected={data.type == 0}>
                      Тэмцээний тухай дэлгэрэнгүйлэн хүссэн мэйл
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
              Илгээх
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
export default ModalReportMail;
