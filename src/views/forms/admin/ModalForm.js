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
  CButtonGroup,
} from "@coreui/react";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";

const ModalForm = (props) => {
  const [data, setData] = useState({
    name: "",
    telnumber: "",
    username: "",
  });
  const [data2, setData2] = useState({
    curPassword: "",
    password1: "",
    password2: "",
  });
  const [analyze, setAnalyze] = useState(0);
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
    setGlobalName,
  } = useGlobal();

  const getData = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.ownDataApi.url,
      Constant.ownDataApi.method
    );
    setData(_data);
  };

  useEffect(() => {
    getData();
  }, []);

  const infoHandler = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.setOwnDataApi.url,
      Constant.setOwnDataApi.method,
      data
    );
    if (_data.name) {
      setGlobalName(_data.name);
      setGlobalToast({ message: "Амжилттай өөрчиллөө.", type: true });
    }
    setData({
      name: "",
      telnumber: "",
      username: "",
    });
    props.setModal(false);
  };

  const passHandler = async () => {
    if (data2.password1 === data2.password2) {
      const _data = await request(
        globalData.authorization.token,
        setGlobalLoading,
        setGlobalAuthorization,
        setGlobalToast,
        Constant.setOwnPassApi.url,
        Constant.setOwnPassApi.method,
        {
          curPassword: data2.curPassword,
          password: data2.password1,
        }
      );
      const success = _data ? _data.success : false;
      if (success) {
        setGlobalToast({ message: "Нууц үг амжилттай солигдлоо.", type: true });
      }
      setData2({
        curPassword: "",
        password1: "",
        password2: "",
      });
      props.setModal(false);
    } else {
      setGlobalToast({
        message: "Шинэ нууц үг хоорондоо таарахгүй байна.",
        type: false,
      });
    }
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Мэдээлэл өөрчлөх</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CButtonGroup className="mb-3">
            {["Ерөнхий мэдээлэл", "Нууц үг"].map((value, idx) => (
              <CButton
                color="outline-dark"
                key={idx}
                className="mx-0"
                active={idx === analyze}
                onClick={() => setAnalyze(idx)}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
          {analyze == 0 ? (
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
            </CCardBody>
          ) : (
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="curPassword">Өмнөх нууц үг</CLabel>
                <CInput
                  id="curPassword"
                  placeholder="Өмнөх нууц үг"
                  value={data2.curPassword}
                  type="password"
                  onChange={(value) =>
                    setData2({ ...data2, curPassword: value.target.value })
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="pass1">Шинэ нууц үг</CLabel>
                <CInput
                  id="pass1"
                  placeholder="Шинэ нууц үг"
                  value={data2.password1}
                  type="password"
                  onChange={(value) =>
                    setData2({
                      ...data2,
                      password1: value.target.value,
                    })
                  }
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="pass2">Нууц үг давтах</CLabel>
                <CInput
                  id="pass2"
                  placeholder="Нууц үг давтах"
                  value={data2.password2}
                  type="password"
                  onChange={(value) =>
                    setData2({ ...data2, password2: value.target.value })
                  }
                />
              </CFormGroup>
            </CCardBody>
          )}
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        {analyze == 0 ? (
          <CButton
            color="primary"
            onClick={() => infoHandler()}
            disabled={
              data.name == "" || data.telnumber == "" || data.username == ""
            }
          >
            Өөрчлөх
          </CButton>
        ) : (
          <CButton
            color="primary"
            onClick={() => passHandler()}
            disabled={
              data2.curPassword == "" ||
              data2.password1 == "" ||
              data2.password2 == ""
            }
          >
            Нууц үг солих
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
};
export default ModalForm;
