import React, { useState, useEffect } from "react";
import { CButton, CContainer, CRow } from "@coreui/react";
import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Privacy = () => {
  const [data, setData] = useState("");
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  const getPrivacyReq = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getPrivacyApi.url,
      Constant.getPrivacyApi.method
    );
    console.log(_data.terms_condition);
    setData(_data.terms_condition);
  };

  useEffect(() => {
    getPrivacyReq();
  }, []);

  const btnHandler = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.setPrivacyApi.url,
      Constant.setPrivacyApi.method,
      {
        privacy: data,
      }
    );
    if (_data && _data.success) {
      setGlobalToast({ message: "Амжилттай хадгаллаа.", type: true });
    }
  };

  return (
    <>
      <CRow className="mb-2 ml-1">
        <CButton color="primary" onClick={btnHandler}>
          Хадгалах
        </CButton>
      </CRow>
      <ReactQuill
        theme="snow"
        value={data}
        onChange={setData}
        modules={modules}
        formats={formats}
        style={{ height: 500 }}
      />
      <CRow className="mt-5 ml-1">
        <CButton color="primary" onClick={btnHandler}>
          Хадгалах
        </CButton>
      </CRow>
    </>
  );
};

export default React.memo(Privacy);

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["link", "image"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ],
};

const formats = [
  "font",
  "header",
  "background",
  "bold",
  "color",
  "italic",
  "size",
  "align",
  "direction",
  "underline",
  "strike",
  "script",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
  "code-block",
  "formula",
  "video",
];
