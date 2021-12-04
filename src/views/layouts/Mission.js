import React, { useState, useEffect } from "react";

import {
  CCol,
  CRow,
  CButton,
  CPagination,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CInputGroup,
  CInput,
  CInputGroupAppend,
} from "@coreui/react";

import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";
import ModalMissionInfo from "../forms/mission/ModalMissionInfo";
import ModalMissionEdit from "../forms/mission/ModalMissionEdit";
import ModalMissionAdd from "../forms/mission/ModalMissionAdd";
import ModalMissionDelete from "../forms/mission/ModalMissionDelete";

import CIcon from "@coreui/icons-react";

import FormItem from "../components/mission/FormItem";

const fields = [
  "№",
  "Зураг",
  "Нэр",
  "Ангилал",
  "Эхлэсэн огноо",
  "Дуусах огноо",
  "Оролцогчдын тоо",
  "Төлөв",
  "Үйлдэл",
];
const pageList = [10, 20, 30];

const Mission = (props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [missionModal, setMissionModal] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    data1: {},
    data2: {},
    data3: {},
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const getMissionReq = async () => {
    const _data = await request(
      "Bearer " + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getMissionReqApi.url,
      Constant.getMissionReqApi.method
    );
    setData(_data);
  };

  useEffect(() => {
    getMissionReq();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, data]);

  return (
    <>
      <CRow alignVertical="center">
        <CCol xs="2">
          <CDropdown className="m-1">
            <CDropdownToggle color="info">{perPage}-ийг харуул</CDropdownToggle>
            <CDropdownMenu>
              {pageList.map((item, key) => {
                return (
                  <CDropdownItem
                    key={key}
                    disabled={item == perPage}
                    onClick={() => setPerPage(item)}
                  >
                    {item}-ийг харуул
                  </CDropdownItem>
                );
              })}
            </CDropdownMenu>
          </CDropdown>
        </CCol>
        <CCol>
          <CInputGroup>
            <CInput
              id="input1-group2"
              name="input1-group2"
              placeholder="Хайлтын утга"
              value={search}
              onChange={(value) => setSearch(value.target.value)}
            />
            <CInputGroupAppend>
              <CButton type="button" color="primary">
                <CIcon name="cil-magnifying-glass" /> Хайх
              </CButton>
            </CInputGroupAppend>
          </CInputGroup>
        </CCol>
        {globalData.isAdmin ? (
          <CCol xs="1">
            <CButton
              color="success"
              onClick={() =>
                setMissionModal({
                  ...missionModal,
                  visible4: true,
                })
              }
            >
              Нэмэх
            </CButton>
          </CCol>
        ) : null}
      </CRow>
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
              {data &&
                data
                  .filter((value) =>
                    value.description
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .slice((page - 1) * perPage, page * perPage)
                  .map((item, key) => {
                    return (
                      <FormItem
                        item={item}
                        num={(page - 1) * perPage + key + 1}
                        missionModal={missionModal}
                        setMissionModal={setMissionModal}
                        globalData={globalData}
                      />
                    );
                  })}
            </tbody>
          </table>
          {data && (
            <CPagination
              activePage={page}
              pages={Math.ceil(
                data.filter((value) => value.description.includes(search))
                  .length / perPage
              )}
              onActivePageChange={setPage}
              className="mt-3"
            />
          )}
        </CCol>
      </CRow>
      <ModalMissionInfo
        setModal={(value) =>
          setMissionModal({ ...missionModal, visible1: value })
        }
        modal={missionModal.visible1}
        data={missionModal.data1}
      />
      <ModalMissionEdit
        setModal={(value) =>
          setMissionModal({ ...missionModal, visible2: value })
        }
        modal={missionModal.visible2}
        data={missionModal.data2}
        refresh={getMissionReq}
      />
      <ModalMissionDelete
        setModal={(value) =>
          setMissionModal({ ...missionModal, visible3: value })
        }
        modal={missionModal.visible3}
        data={missionModal.data3}
        refresh={getMissionReq}
      />
      <ModalMissionAdd
        setModal={(value) =>
          setMissionModal({ ...missionModal, visible4: value })
        }
        modal={missionModal.visible4}
        refresh={getMissionReq}
      />
    </>
  );
};

export default React.memo(Mission);
