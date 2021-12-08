import React, { forwardRef } from "react";

import { CRow, CButton } from "@coreui/react";

import { useGlobal } from "../../../context/GlobalContext/use-global";
import Constant from "../../../constants/CONSTANT";
import { request } from "../../../utils/service";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const FormItem = forwardRef(
  ({ item, num, getReq}) => {

    const {
      setGlobalLoading,
      setGlobalToast,
    } = useGlobal();

    const deleteItem = async () => {
      await request(
        setGlobalLoading,
        setGlobalToast,
        Constant.deleteCategoryApi.url + "/" + item.id,
        Constant.deleteCategoryApi.method,
      );
      getReq();
    }

    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            <CButton
                className="ml-1"
                active
                title="Устгах"
                color="danger"
                aria-pressed="true"
                onClick={deleteItem}
              >
                <CIcon name="cil-trash" />
              </CButton>
          </CRow>
        </td>
      </tr>
    );
  }
);

export default FormItem;