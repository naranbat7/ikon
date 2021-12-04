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

import ModalReportInfo from "../forms/report/ModalReportInfo";
import ModalReportMail from "../forms/report/ModalReportMail";
import ModalReportStatus from "../forms/report/ModalReportStatus";

import CIcon from "@coreui/icons-react";

import ReportItem from "../components/report/ReportItem";

const fields = [
  "№",
  "Нэр",
  "Дэлгэрэнгүй мэдээлэл",
  "Хүсэлт гаргасан",
  "Төлөв",
  "Үйлдэл",
];
const pageList = [10, 20, 30];

const Report = (props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [reportModal, setReportModal] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
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

  const getCompanyReq = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getAllReportApi.url,
      Constant.getAllReportApi.method
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
                      <ReportItem
                        item={item}
                        num={(page - 1) * perPage + key + 1}
                        reportModal={reportModal}
                        setReportModal={setReportModal}
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
      <ModalReportInfo
        setModal={(value) =>
          setReportModal({ ...reportModal, visible1: value })
        }
        modal={reportModal.visible1}
        data={reportModal.data1}
      />
      <ModalReportStatus
        setModal={(value) =>
          setReportModal({ ...reportModal, visible2: value })
        }
        modal={reportModal.visible2}
        data={reportModal.data2}
        refresh={getCompanyReq}
      />
      <ModalReportMail
        setModal={(value) =>
          setReportModal({ ...reportModal, visible3: value })
        }
        modal={reportModal.visible3}
        data={reportModal.data3}
        refresh={getCompanyReq}
      />
    </>
  );
};

export default React.memo(Report);
