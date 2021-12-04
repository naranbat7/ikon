import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";

import Constant from "../../../constants/CONSTANT";
import { useGlobal } from "../../../context/GlobalContext/use-global";

const Login = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    globalData,
    setGlobalAuthorization,
    setGlobalToast,
    setGlobalAdmin,
    setGlobalName,
  } = useGlobal();

  const formHandler = () => {
    setLoading(true);
    axios({
      method: Constant.loginApi.method,
      url: Constant.loginApi.url,
      data: body,
    })
      .then((response) => {
        setAlert(false);
        setLoading(false);
        setGlobalAuthorization({
          isAuthorized: true,
          token: response.data.token,
          appToken: response.data.appToken,
        });
        setGlobalAdmin(response.data.isAdmin);
        setGlobalName(response.data.name);
        setGlobalToast({ message: "Амжилттай нэвтэрлээ.", type: true });
      })
      .catch((err) => {
        const code = err.response ? err.response.status : 0;
        if (code == 400) setMessage("Бүрэн гүйцэд бөглөнө үү.");
        else if (code == 401) setMessage("Нэвтрэх нэр эсвэл нууц үг буруу.");
        else if (code == 500) setMessage("Серверийн алдаа.");
        else setMessage("Интернэт холболтоо шалгана уу.");
        setAlert(true);
        setLoading(false);
        console.log("Error: " + err);
      });
  };

  const onChange = (value) => {
    console.log("Captcha value: ", value);
  };

  return globalData.authorization.isAuthorized ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        {alert ? (
          <CRow className="justify-content-center">
            <CCol md="8">
              <CAlert color="danger">{message}</CAlert>
            </CCol>
          </CRow>
        ) : null}
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Нэвтрэх</h1>
                    <p className="text-muted">Админ панел руу нэвтрэх</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Нэвтрэх нэр"
                        required={true}
                        value={body.username}
                        onChange={(value) =>
                          setBody({ ...body, username: value.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Нууц үг"
                        value={body.password}
                        onChange={(value) =>
                          setBody({ ...body, password: value.target.value })
                        }
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <ReCAPTCHA
                        size="invisible"
                        sitekey="6LeqZVUaAAAAAAnUPKH6Ca6ZIuWYnABBfg0d7Chw"
                        onChange={onChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          style={{ width: 120 }}
                          disabled={
                            body.username == "" ||
                            body.password == "" ||
                            loading
                          }
                          onClick={() => {
                            formHandler();
                          }}
                        >
                          {loading ? (
                            <Loader color="#fff" size={10} />
                          ) : (
                            "Нэвтрэх"
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
