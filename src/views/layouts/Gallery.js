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
import ModalGalleryStatus from "../forms/company/ModalCompanyStatus";
import ModalGalleryAdd from "../forms/gallery/ModalGalleryAdd";

import CIcon from "@coreui/icons-react";

import FormItem from "../components/gallery/FormItem";

const fields = ["№", "", "Нэр", "Хэмжээ", "Харьцаа", "Үүсгэсэн", "Үйлдэл"];
const pageList = [10, 20, 30];

const Gallery = (props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [galleryModal, setGalleryModal] = useState({
    visible1: false,
    visible2: false,
    data1: {},
  });
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const getGalleryReq = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getGalleryReqApi.url,
      Constant.getGalleryReqApi.method
    );
    console.log(_data);
    setData(_data);
  };

  useEffect(() => {
    getGalleryReq();
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
        {globalData.isAdmin ? (
          <CCol xs="1">
            <CButton
              color="success"
              onClick={() =>
                setGalleryModal({
                  ...galleryModal,
                  visible2: true,
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
                    value.NAME.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice((page - 1) * perPage, page * perPage)
                  .map((item, key) => {
                    return (
                      <FormItem
                        item={item}
                        num={(page - 1) * perPage + key + 1}
                        galleryModal={galleryModal}
                        setGalleryModal={setGalleryModal}
                        globalData={globalData}
                        setGlobalToast={setGlobalToast}
                      />
                    );
                  })}
            </tbody>
          </table>
          {data && (
            <CPagination
              activePage={page}
              pages={Math.ceil(
                data.filter((value) => value.NAME.includes(search)).length /
                  perPage
              )}
              onActivePageChange={setPage}
              className="mt-3"
            />
          )}
        </CCol>
      </CRow>
      <ModalGalleryStatus
        setModal={(value) =>
          setGalleryModal({ ...galleryModal, visible1: value })
        }
        modal={galleryModal.visible1}
        data={galleryModal.data1}
        refresh={getGalleryReq}
      />
      <ModalGalleryAdd
        setModal={(value) =>
          setGalleryModal({ ...galleryModal, visible2: value })
        }
        modal={galleryModal.visible2}
        refresh={getGalleryReq}
      />
    </>
  );
};

export default React.memo(Gallery);
