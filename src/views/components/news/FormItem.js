import React, { forwardRef } from "react";

import { CRow, CButton, CBadge } from "@coreui/react";

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
        Constant.deleteNewsApi.url + "/" + item.id,
        Constant.deleteNewsApi.method,
      );
      getReq();
    }

    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">
          <img src={item.imageUrl} style={{ width: 50, height: 50 }} />
        </td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">{moment(item.publishedDate).fromNow()}</td>
        <td className="text-center"><CBadge className="px-3 py-2" color="success">
          {item.views}
        </CBadge></td>
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
