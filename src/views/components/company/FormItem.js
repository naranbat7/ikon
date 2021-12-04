import React, { forwardRef } from "react";

import { CRow, CButton, CBadge } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const FormItem = forwardRef(
  ({ item, num, companyModal, setCompanyModal, globalData }) => {
    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">{item.description.substring(0, 20)}...</td>
        <td className="text-center">
          <CBadge
            color={item.isShop ? "success" : "info"}
            className="px-3 py-2"
          >
            {item.isShop ? "Дэлгүүр" : "Дасгал"}
          </CBadge>
        </td>
        <td className="text-center">{moment(item.createdDate).fromNow()}</td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            <CButton
              active
              title="Дэлгэрэнгүй харах"
              color="success"
              aria-pressed="true"
              onClick={() =>
                setCompanyModal({
                  ...companyModal,
                  visible1: true,
                  id1: item.id,
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
                  setCompanyModal({
                    ...companyModal,
                    visible2: true,
                    id2: item.id,
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
                title="Хариу мэдэгдэх"
                color="warning"
                aria-pressed="true"
                onClick={() => {
                  setCompanyModal({
                    ...companyModal,
                    visible3: true,
                    data3: {
                      id: item.id,
                      name: item.name,
                      status: 1,
                      description: "",
                    },
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

export default FormItem;
