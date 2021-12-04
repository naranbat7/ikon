import React, { forwardRef } from "react";

import { CRow, CButton, CBadge } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const ReportItem = forwardRef(
  ({ item, num, reportModal, setReportModal, globalData }) => {
    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">{item.description.substring(0, 20)}...</td>
        <td className="text-center">{moment(item.createdDate).fromNow()}</td>
        <td className="text-center">
          <CBadge
            color={item.reportStatus == 1 ? "success" : "warning"}
            className="px-3 py-2"
          >
            {item.reportStatus == 1 ? "Шийдвэрлэгдсэн" : "Шийдвэрлээгүй"}
          </CBadge>
        </td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            <CButton
              active
              title="Дэлгэрэнгүй харах"
              color="success"
              aria-pressed="true"
              onClick={() =>
                setReportModal({
                  ...reportModal,
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
                title="Төлөв өөрчлөх"
                color="info"
                aria-pressed="true"
                onClick={() =>
                  setReportModal({
                    ...reportModal,
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
                title="Мэйл илгээх"
                color="warning"
                aria-pressed="true"
                onClick={() => {
                  setReportModal({
                    ...reportModal,
                    visible3: true,
                    data3: item,
                  });
                }}
              >
                <CIcon name="cil-paper-plane" />
              </CButton>
            ) : null}
          </CRow>
        </td>
      </tr>
    );
  }
);

export default ReportItem;
