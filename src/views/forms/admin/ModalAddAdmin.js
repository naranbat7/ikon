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
  CInputRadio,
} from "@coreui/react";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";

const ModalForm = (props) => {
  const [data, setData] = useState({
    name: "",
    telnumber: "",
    username: "",
    isAdmin: 0,
    password: "",
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const infoHandler = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.addAdminApi.url,
      Constant.addAdminApi.method,
      data
    );
    const success = _data ? _data.success : false;
    if (success) setGlobalToast({ message: "Амжилттай нэмлээ.", type: true });
    setData({
      name: "",
      telnumber: "",
      username: "",
      isAdmin: 0,
      password: "",
    });
    props.nextFunction();
    props.setModal(false);
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Админ нэмэх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="name">Нэр</CLabel>
              <CInput
                id="name"
                placeholder="Нэрээ оруулна уу"
                value={data.name}
                onChange={(value) =>
                  setData({ ...data, name: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="username">Нэвтрэх нэр</CLabel>
              <CInput
                id="username"
                placeholder="Нэвтрэхдээ ашиглах нэр"
                value={data.username}
                onChange={(value) =>
                  setData({ ...data, username: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="password">Нууц үг</CLabel>
              <CInput
                id="password"
                placeholder="Нууц үг"
                value={data.password}
                onChange={(value) =>
                  setData({ ...data, password: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="phone">Утасны дугаар</CLabel>
              <CInput
                id="phone"
                placeholder="8888-8888"
                type="number"
                value={data.telnumber}
                onChange={(value) =>
                  setData({
                    ...data,
                    telnumber: value.target.value,
                  })
                }
              />
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Админы төрөл</CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio1"
                    name="isAdmin"
                    value={0}
                    checked={data.isAdmin === 0}
                    onClick={(value) =>
                      setData({
                        ...data,
                        isAdmin: parseInt(value.target.value),
                      })
                    }
                  />
                  <CLabel variant="checkbox" htmlFor="radio1">
                    <strong>Хянагч</strong> (Зөвхөн харах эрхтэй)
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio2"
                    name="isAdmin"
                    value={1}
                    checked={data.isAdmin === 1}
                    onClick={(value) =>
                      setData({
                        ...data,
                        isAdmin: parseInt(value.target.value),
                      })
                    }
                  />
                  <CLabel variant="checkbox" htmlFor="radio2">
                    <strong>Админ</strong> (Бүх боломжийг эзэмшинэ)
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color="primary"
          onClick={() => infoHandler()}
          disabled={
            data.name == "" || data.telnumber == "" || data.username == ""
          }
        >
          Нэмэх
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalForm;
