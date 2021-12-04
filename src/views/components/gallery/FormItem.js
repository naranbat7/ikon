import React, { forwardRef } from "react";

import { CRow, CButton } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import moment from "moment";
import "moment/locale/mn";
import { CopyToClipboard } from "react-copy-to-clipboard";
moment.locale("mn");

const FormItem = forwardRef(
  ({
    item,
    num,
    galleryModal,
    setGalleryModal,
    globalData,
    setGlobalToast,
  }) => {
    let tmpType = "byte";
    let tmpSize = item.size;
    if (tmpSize > 1024) {
      tmpSize /= 1024;
      tmpType = "KB";
    }
    if (tmpSize > 1024) {
      tmpSize /= 1024;
      tmpType = "MB";
    }
    return (
      <tr key={item.id}>
        <td className="text-center">{num}</td>
        <td className="text-center">
          <img src={item.url} style={{ width: 50, height: 50 }} />
        </td>
        <td className="text-center">{item.NAME}</td>
        <td className="text-center">{tmpSize.toFixed(2) + " " + tmpType}</td>
        <td className="text-center">{item.width + " : " + item.height}</td>
        <td className="text-center">{moment(item.createdDate).fromNow()}</td>
        <td className="text-center">
          <CRow alignHorizontal="center" className="xs-2">
            <a href={item.url} target="_blank">
              <CButton
                active
                title="Дэлгэрэнгүй харах"
                color="success"
                aria-pressed="true"
                onClick={() => {}}
              >
                <CIcon name="cil-fullscreen" />
              </CButton>
            </a>
            <CopyToClipboard
              text={item.url}
              onCopy={() =>
                setGlobalToast({ message: "Амжилттай хуулагдлаа", type: true })
              }
            >
              <CButton
                className="ml-1"
                active
                title="Холбоос хуулах"
                color="info"
                aria-pressed="true"
                onClick={() => {}}
              >
                <CIcon name="cil-bookmark" />
              </CButton>
            </CopyToClipboard>
            {globalData.isAdmin ? (
              <CButton
                className="ml-1"
                active
                title="Устгах"
                color="danger"
                aria-pressed="true"
                onClick={() => {
                  setGalleryModal({
                    ...galleryModal,
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
