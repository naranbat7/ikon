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
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "react-spinners/PulseLoader";
import { Redirect } from "react-router-dom";

import { useGlobal } from "../../../context/GlobalContext/use-global";
import {initializeApp} from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAxULjAJsgdEoGXPh476jSP6KyXiITbtMA",
  authDomain: "ikon-c7552.firebaseapp.com",
  projectId: "ikon-c7552",
  storageBucket: "ikon-c7552.appspot.com",
  messagingSenderId: "1040298841536",
  appId: "1:1040298841536:web:b55daa9bff5ca25e2f6425",
  measurementId: "G-GH1PZBR5E1"
};

const Login = () => {
  const [body, setBody] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    globalData,
    setGlobalAuthorization,
    setGlobalToast,
    setGlobalName,
    setGlobalId,
    setGlobalUrl
  } = useGlobal();

  const formHandler = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const col = collection(db, 'users');
      const snapshot = await getDocs(col);
      const list = snapshot.docs.map(doc => doc.data());
      let isLogged = false;
      list.forEach((e) => {
        if (e.email == body.email && e.password == body.password) {
          setAlert(false);
          setLoading(false);
          setGlobalAuthorization({isAuthorized: true});
          setGlobalName(e.name);
          setGlobalId(e.id);
          setGlobalUrl(e.profileUrl);
          setGlobalToast({ message: "Амжилттай нэвтэрлээ.", type: true });
          isLogged = true;
        } 
        isLogged = false;
      });
      alert(isLogged);
    } catch (err) {
      console.error(err);
      setMessage("Цахим шуудан эсвэл нууц үг буруу.");
      setAlert(true);
      setLoading(false);
    }
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
            <CCol md="4">
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
                        placeholder="Цахим шуудан"
                        required={true}
                        value={body.email}
                        onChange={(value) =>
                          setBody({ ...body, email: value.target.value })
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
