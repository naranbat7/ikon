import React, { useState, useEffect } from "react";

import {
  CCol,
  CRow,
  CButton,
  CInput,
} from "@coreui/react";

import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";

import FormItem from "../components/category/FormItem";

const fields = [
  "№",
  "Нэр",
  "Үйлдэл",
];

const Category = (props) => {
  const [addTitle, setAddTitle] = useState("");
  const [data, setData] = useState([]);
  const {
    setGlobalLoading,
    setGlobalToast,
  } = useGlobal();

  const getReq = async () => {
    const _data = await request(
      setGlobalLoading,
      setGlobalToast,
      Constant.getCategoryApi.url,
      Constant.getCategoryApi.method
    );
    setData(_data);
  };

  useEffect(() => {
    getReq();
  }, []);

  const addCategory = async () => {
    await request(
      setGlobalLoading,
      setGlobalToast,
      Constant.addCategoryApi.url,
      Constant.addCategoryApi.method,
      {
        name: addTitle
      }
    );
    setAddTitle("");
    getReq();
  }

  return (
    <>
      <CRow alignVertical="center">
        <CCol>
          <CInput
            placeholder="Категорын нэр"
            value={addTitle}
            onChange={(val) =>
                setAddTitle(val.target.value)
              }
        />
        </CCol>
          <CCol xs="1">
            <CButton
              color="success"
              onClick={addCategory}
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
                  .map((item, key) => {
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
    </>
  );
};

export default React.memo(Category);
