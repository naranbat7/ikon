import React, { forwardRef } from "react";

import { CRow, CButton, CBadge } from "@coreui/react";

import CIcon from "@coreui/icons-react";

const FormItem = forwardRef(
  ({ item, num, bannerModal, setBannerModal, globalData, setGlobalToast }) => {
    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">
          <img src={item.url} style={{ width: 150, height: 80 }} />
        </td>
        <td className="text-center">
          <CBadge
            color={item.type.toLowerCase() == "typical" ? "success" : "info"}
            className="px-3 py-2"
          >
            {item.type.toUpperCase()}
          </CBadge>
        </td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            {globalData.isAdmin ? (
              <CButton
                className="ml-1"
                active
                title="Устгах"
                color="danger"
                aria-pressed="true"
                onClick={() => {
                  setBannerModal({
                    ...bannerModal,
                    visible1: true,
                    data1: item,
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
