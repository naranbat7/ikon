import React, { useState } from "react";

import {CCol,  CRow, CButton} from "@coreui/react";

import { useGlobal } from "../../context/GlobalContext/use-global";
import ModalNotificationAdd from "../forms/notification/ModalNotificationAdd";

const Notification = (props) => {
  const [notificationModal, setNotificationModal] = useState({visible: false});
  const {globalData} = useGlobal();

  return (
    <>
      <CRow alignVertical="center">
        {globalData.isAdmin ? (
          <CCol xs="3">
            <CButton
              color="success"
              onClick={() =>
                setNotificationModal({
                  ...notificationModal,
                  visible: true,
                })
              }
            >
              Шинэ мэдэгдэл илгээх
            </CButton>
          </CCol>
        ) : <CCol>Мэдэгдэл илгээх эрхгүй байна</CCol>}
      </CRow>
      <ModalNotificationAdd
        setModal={(value) =>
          setNotificationModal({ ...notificationModal, visible: value })
        }
        modal={notificationModal.visible}
      />
    </>
  );
};

export default React.memo(Notification);
