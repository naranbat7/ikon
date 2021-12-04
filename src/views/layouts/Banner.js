import React, { useState, useEffect } from "react";

import { CCol, CRow, CButton } from "@coreui/react";

import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";
import ModalBannerAdd from "../forms/banner/ModalBannerAdd";

import FormItem from "../components/banner/FormItem";

const fields = ["№", "", "Төрөл", "Үйлдэл"];

const Banner = (props) => {
  const [data, setData] = useState([]);
  const [bannerModal, setBannerModal] = useState({
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

  const getBannerReq = async () => {
    const _data = await request(
      'Bearer ' + globalData.authorization.appToken,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getBannerReqApi.url,
      Constant.getBannerReqApi.method
    );
    console.log(_data.data);
    setData(_data.data);
  };

  useEffect(() => {
    getBannerReq();
  }, []);

  return (
    <>
      <CRow alignVertical="center">
        {globalData.isAdmin ? (
          <CCol xs="1">
            <CButton
              color="success"
              onClick={() =>
                setBannerModal({
                  ...bannerModal,
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
                data.map((item, key) => {
                  return (
                    <FormItem
                      item={item}
                      num={key + 1}
                      bannerModal={bannerModal}
                      setBannerModal={setBannerModal}
                      globalData={globalData}
                      setGlobalToast={setGlobalToast}
                    />
                  );
                })}
            </tbody>
          </table>
        </CCol>
      </CRow>
      <ModalBannerAdd
        setModal={(value) =>
          setBannerModal({ ...bannerModal, visible2: value })
        }
        modal={bannerModal.visible2}
        refresh={getBannerReq}
      />
    </>
  );
};

export default React.memo(Banner);
