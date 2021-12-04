import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";

import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";

const ModalMissionDelete = (props) => {
  const { data } = props;
  const [value, setValue] = useState("");
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const btnHandler = async () => {
    const _data = await request(
      "Bearer " + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.deleteMissionApi.url + "/" + data._id,
      Constant.deleteMissionApi.method
    );
    if (_data && _data.success) {
          setGlobalToast({ message: "Амжилттай устгагдлаа.", type: true });
      props.refresh();
      props.setModal(false);
    }
  };

  return (
    <CModal
      show={props.modal}
      onClose={() => props.setModal(false)}
      centered
      size="lg"
      color="danger"
    >
      <CModalHeader closeButton>
        <CModalTitle>Устгах</CModalTitle>
      </CModalHeader>
      {data && (
        <CModalBody>
          <CCardBody>
            <ColValue name={data.title} value={value} setValue={setValue} />
          </CCardBody>
        </CModalBody>
      )}
      <CModalFooter>
        <CButton
          color="danger"
          onClick={btnHandler}
          disabled={value != data.title}
        >
          Устгах
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default ModalMissionDelete;

const ColValue = ({ name, value, setValue }) => {
  return (
    <CFormGroup>
      <CLabel>
        Та "<strong>{name}</strong>" даалгаврыг устгахын тулд даалгаврын нэрийг
        бичнэ үү.
      </CLabel>
      <CInput
        placeholder="Устгах даалгаврын нэр"
        value={value}
        onChange={(val) => setValue(val.target.value)}
      />
    </CFormGroup>
  );
};
