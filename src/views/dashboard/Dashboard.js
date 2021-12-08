import React, { useState, useEffect } from "react";

import { CCol, CRow, CButton } from "@coreui/react";

import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";

import FormItem from "../components/news/FormItem";
import ModalNewsAdd from "../forms/mission/NewsAdd";

const fields = ["№", "", "Нэр", "Нийтэлсэн огноо", "Үзсэн", "Үйлдэл"];

const Dashboard = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const {
    setGlobalLoading,
    setGlobalToast,
  } = useGlobal();

  const getReq = async () => {
    const _data = await request(
      setGlobalLoading,
      setGlobalToast,
      Constant.getNewsApi.url,
      Constant.getNewsApi.method
    );
    console.log(_data);
    setData(_data);
  };

  useEffect(() => {
    getReq();
  }, []);

  return (
    <>
      <CRow alignVertical="center">
          <CCol xs="1">
            <CButton
              color="success"
              onClick={() => setModal(true)}
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
                data.map((item, key) => {
                  return (
                    <FormItem
                      item={item}
                      num={key + 1}
                      getReq={getReq}
                    />
                  );
                })}
            </tbody>
          </table>
        </CCol>
      </CRow>
      <ModalNewsAdd
        modal={modal}
        setModal={setModal}
        refresh={getReq}
      />
    </>
  );
};

export default React.memo(Dashboard);
