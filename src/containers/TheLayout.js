import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Lottie from "react-lottie-player";

import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { CToast, CToaster, CToastBody, CToastHeader } from "@coreui/react";

import { useGlobal } from "../context/GlobalContext/use-global";
import lottieJson from "../constants/LoadingLottie.json";

const TheLayout = () => {
  const [toasts, setToasts] = useState([]);
  const { globalData } = useGlobal();
  const [form, setForm] = useState({
    visible1: false,
    visible2: false,
  });

  const addToast = (body, value) => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: 3000,
        closeButton: true,
        fade: true,
        title: value ? "Амжилттай" : "Алдаа",
        body: body,
        color: value ? "#18603a" : "#772b35",
        backgroundColor: value ? "#d5f1de" : "fadddd",
      },
    ]);
  };

  useEffect(() => {
    globalData.toast.message &&
      addToast(globalData.toast.message, globalData.toast.type);
  }, [globalData.toastCount]);

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  return globalData.authorization.isAuthorized ? (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader
          showInfo={() => setForm({ ...form, visible1: true })}
          showAdminList={() => setForm({ ...form, visible2: true })}
        />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={"toaster" + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={"toast" + key}
                show={true}
                autohide={toast.autohide}
                fade={toast.fade}
                style={{ backgroundColor: toast.backgroundColor }}
              >
                <CToastHeader
                  style={{ color: toast.color }}
                  closeButton={toast.closeButton}
                >
                  {toast.title}
                </CToastHeader>
                <CToastBody style={{ color: toast.color }}>
                  {toast.body}
                </CToastBody>
              </CToast>
            );
          })}
        </CToaster>
      ))}
      {globalData.isLoading && <Loader />}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default TheLayout;

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(255,255,255,0.7)",
        width: "100%",
        height: "100%",
        zIndex: 10000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: "25%", height: "25%" }}
      />
    </div>
  );
};
