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
import ModalCompanyInfo from "../forms/company/ModalCompanyInfo";
import ModalCompanyEdit from "../forms/company/ModalCompanyEdit";
import ModalCompanyStatus from "../forms/company/ModalCompanyStatus";
import ModalCompanyAdd from "../forms/company/ModalCompanyAdd";

import CIcon from "@coreui/icons-react";

import FormItem from "../components/company/FormItem";

const fields = [
  "№",
  "Нэр",
  "Нэмэлт мэдээлэл",
  "Чиглэл",
  "Хүсэлт гаргасан",
  "Төлөв",
  "Үйлдэл",
];
const pageList = [10, 20, 30];

const Company = (props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [companyModal, setCompanyModal] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    id1: 0,
    id2: 0,
    data3: {},
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const getCompanyReq = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getCompanyReqApi.url,
      Constant.getCompanyReqApi.method
    );
    setData(_data);
  };

  useEffect(() => {
    getCompanyReq();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, data]);

  return (
    <>
      <CRow alignVertical="center">
        <CCol xs="1">
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
        <CCol xs="1">
          <CButton
            color="success"
            onClick={() =>
              setCompanyModal({
                ...companyModal,
                visible4: true,
              })
            }
          >
            Нэмэх
          </CButton>
        </CCol>
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
                    value.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice((page - 1) * perPage, page * perPage)
                  .map((item, key) => {
                    return (
                      <FormItem
                        item={item}
                        num={(page - 1) * perPage + key + 1}
                        companyModal={companyModal}
                        setCompanyModal={setCompanyModal}
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
                data.filter((value) => value.name.includes(search)).length /
                  perPage
              )}
              onActivePageChange={setPage}
              className="mt-3"
            />
          )}
        </CCol>
      </CRow>
      <ModalCompanyInfo
        setModal={(value) =>
          setCompanyModal({ ...companyModal, visible1: value })
        }
        modal={companyModal.visible1}
        data={companyModal.id1}
      />
      <ModalCompanyEdit
        setModal={(value) =>
          setCompanyModal({ ...companyModal, visible2: value })
        }
        modal={companyModal.visible2}
        data={companyModal.id2}
        refresh={getCompanyReq}
      />
      <ModalCompanyStatus
        setModal={(value) =>
          setCompanyModal({ ...companyModal, visible3: value })
        }
        modal={companyModal.visible3}
        data={companyModal.data3}
        refresh={getCompanyReq}
      />
      <ModalCompanyAdd
        setModal={(value) =>
          setCompanyModal({ ...companyModal, visible4: value })
        }
        modal={companyModal.visible4}
        refresh={getCompanyReq}
      />
    </>
  );
};

export default React.memo(Company);
