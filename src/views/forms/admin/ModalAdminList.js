import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
  CBadge,
} from "@coreui/react";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";
import { useGlobal } from "../../../context/GlobalContext/use-global";
import ModalCheck from "../ModalCheck";
import ModalAddAdmin from "./ModalAddAdmin";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const ModalAdminList = (props) => {
  const [admins, setAdmins] = useState([]);
  const [telMouse, setTelMouse] = useState(false);
  const [checkModal, setCheckModal] = useState({
    visible: false,
    id: 0,
    name: "",
    telnumber: "",
  });
  const [addModal, setAddModal] = useState(false);
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const fields = ["№", "Нэр", "Нэвтрэх нэр", "Утас", "Эрх", "Огноо", "Үйлдэл"];

  const getData = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getAdminListApi.url,
      Constant.getAdminListApi.method
    );
    setAdmins(_data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteAdmin = async (id) => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.deleteAdminApi.url,
      Constant.deleteAdminApi.method,
      {
        id: id,
      }
    );
    const success = _data ? _data.success : false;
    if (success) setGlobalToast({ message: "Амжилттай устгалаа.", type: true });
    getData();
  };

  return (
    <>
      <CModal
        show={props.modal}
        onClose={() => props.setModal(false)}
        size="lg"
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle>Админы жагсаалт</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CButton
            color="success"
            className="mb-2"
            onClick={() => setAddModal(true)}
          >
            Админ нэмэх
          </CButton>
          <CRow>
            <CCol>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    {fields.map((item, idx) => {
                      return (
                        <th key={idx} className="text-center">
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {admins &&
                    admins.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td className="text-center">{key + 1}</td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">{item.username}</td>
                          <td
                            className="text-center"
                            onMouseEnter={() => setTelMouse(true)}
                            onMouseLeave={() => setTelMouse(false)}
                          >
                            {item.telnumber
                              ? telMouse
                                ? item.telnumber.substring(0, 4) +
                                  "-" +
                                  item.telnumber.substring(4, 8)
                                : item.telnumber.charAt(0) +
                                  item.telnumber.charAt(1) +
                                  "**-" +
                                  item.telnumber.substring(4, 8)
                              : "-"}
                          </td>
                          <td className="text-center">
                            {item.isAdmin == 1 ? (
                              <CBadge color="primary" className="px-4 py-2">
                                Админ
                              </CBadge>
                            ) : (
                              <CBadge color="secondary" className="px-4 py-2">
                                Хянагч
                              </CBadge>
                            )}
                          </td>
                          <td className="text-center">
                            {moment(item.createdDate).format(
                              "YYYY-MM-Do, HH:mm:ss"
                            )}
                          </td>
                          <td className="text-center">
                            <CButton
                              active
                              color="danger"
                              aria-pressed="true"
                              className="px-2 py-1 ml-2"
                              title="Устгах"
                              onClick={() => {
                                setCheckModal({
                                  visible: true,
                                  id: item.id,
                                  name: item.name,
                                  telnumber: item.telnumber,
                                });
                              }}
                            >
                              <CIcon name="cil-trash" />
                            </CButton>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => props.setModal(false)}>
            Болих
          </CButton>{" "}
        </CModalFooter>
      </CModal>
      <ModalAddAdmin
        modal={addModal}
        setModal={setAddModal}
        nextFunction={getData}
      />
      <ModalCheck
        btnTitle="Устгах"
        desc={
          checkModal.name +
          " нэртэй, " +
          checkModal.telnumber.charAt(0) +
          checkModal.telnumber.charAt(1) +
          "**" +
          checkModal.telnumber.substring(4, 8) +
          " дугаартай хэрэглэгчийг устгах уу?"
        }
        handler={() => deleteAdmin(checkModal.id)}
        modal={checkModal.visible}
        setModal={(val) => setCheckModal({ ...checkModal, visible: val })}
        btnColor="danger"
      />
    </>
  );
};
export default ModalAdminList;
