import React, { forwardRef } from "react";

import { CRow, CButton, CBadge } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const FormItem = forwardRef(
  ({ item, num, missionModal, setMissionModal, globalData }) => {
    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">
          <img src={item.imgPortraitLink} style={{ width: 50, height: 50 }} />
        </td>
        <td className="text-center">{item.title}</td>
        <td className="text-center">
          <CBadge
            color={item.type == "Public" ? "success" : "info"}
            className="px-3 py-2"
          >
            {item.type == "Public" ? "Нийтийн" : "Хувийн"}
          </CBadge>
        </td>
        <td className="text-center">{moment(item.startDate).fromNow()}</td>
        <td className="text-center">{moment(item.endDate).fromNow()}</td>
        <td className="text-center">{item.involvedUsers.length}</td>
        <td className="text-center"><CBadge className="px-3 py-2" color={item.isDeleted == true ? "danger" : "success"}>
          {item.isDeleted == true ? "устгагдсан" : "идэвхтэй"}
        </CBadge></td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            <CButton
              active
              title="Дэлгэрэнгүй харах"
              color="success"
              aria-pressed="true"
              onClick={() =>
                setMissionModal({
                  ...missionModal,
                  visible1: true,
                  data1: item,
                })
              }
            >
              <CIcon name="cil-fullscreen" />
            </CButton>
            {globalData.isAdmin ? (
              <CButton
                className="ml-1"
                active
                title="Өөрчлөх"
                color="info"
                aria-pressed="true"
                onClick={() =>
                  setMissionModal({
                    ...missionModal,
                    visible2: true,
                    data2: item,
                  })
                }
              >
                <CIcon name="cil-pencil" />
              </CButton>
            ) : null}
            {globalData.isAdmin ? (
              <CButton
                className="ml-1"
                active
                title="Устгах"
                color="danger"
                aria-pressed="true"
                onClick={() => {
                  setMissionModal({
                    ...missionModal,
                    visible3: true,
                    data3: item,
                  });
                }}
              >
                <CIcon name="cil-trash" />
              </CButton>
            ) : null}
          </CRow>
        </td>
      </tr>
    );
  }
);

export default FormItem;
