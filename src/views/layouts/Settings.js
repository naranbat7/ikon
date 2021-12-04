import React, { useState, useEffect } from "react";
import {
  CRow,
  CFormGroup,
  CLabel,
  CTextarea,
  CCol,
  CContainer,
  CButton,
} from "@coreui/react";
import { useGlobal } from "../../context/GlobalContext/use-global";
import Constant from "../../constants/CONSTANT";
import { request } from "../../utils/service";

const Settings = () => {
  const [data, setData] = useState({});
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();

  useEffect(async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.getWebApi.url,
      Constant.getWebApi.method
    );
    setData(_data);
  }, []);

  const btnHandler = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.setWebApi.url,
      Constant.setWebApi.method,
      data
    );
    if (_data.success == true)
      setGlobalToast({ message: "Амжилттай өөрчиллөө", type: true });
  };

  return (
    <>
      {data && (
        <CContainer fluid>
          {globalData.isAdmin && (
            <CRow>
              <CButton
                className="py-2 px-4 my-2 mx-3"
                color="primary"
                onClick={btnHandler}
              >
                Хадгалах
              </CButton>
            </CRow>
          )}
          <CRow>
            <ColValue
              label="main_title"
              value={data.main_title}
              onChange={(val) =>
                setData({ ...data, main_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="main_desc"
              value={data.main_desc}
              onChange={(val) =>
                setData({ ...data, main_desc: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_title"
              value={data.about_title}
              onChange={(val) =>
                setData({ ...data, about_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_title_1"
              value={data.about_content_title_1}
              onChange={(val) =>
                setData({ ...data, about_content_title_1: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_desc_1"
              value={data.about_content_desc_1}
              onChange={(val) =>
                setData({ ...data, about_content_desc_1: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_title_2"
              value={data.about_content_title_2}
              onChange={(val) =>
                setData({ ...data, about_content_title_2: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_desc_2"
              value={data.about_content_desc_2}
              onChange={(val) =>
                setData({ ...data, about_content_desc_2: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_title_3"
              value={data.about_content_title_3}
              onChange={(val) =>
                setData({ ...data, about_content_title_3: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="about_content_desc_3"
              value={data.about_content_desc_3}
              onChange={(val) =>
                setData({ ...data, about_content_desc_3: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_title"
              value={data.feature_title}
              onChange={(val) =>
                setData({ ...data, feature_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_title_1"
              value={data.feature_content_title_1}
              onChange={(val) =>
                setData({ ...data, feature_content_title_1: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_desc_1"
              value={data.feature_content_desc_1}
              onChange={(val) =>
                setData({ ...data, feature_content_desc_1: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_title_2"
              value={data.feature_content_title_2}
              onChange={(val) =>
                setData({ ...data, feature_content_title_2: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_desc_2"
              value={data.feature_content_desc_2}
              onChange={(val) =>
                setData({ ...data, feature_content_desc_2: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_header_3"
              value={data.feature_content_header_3}
              onChange={(val) =>
                setData({ ...data, feature_content_header_3: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_title_3"
              value={data.feature_content_title_3}
              onChange={(val) =>
                setData({ ...data, feature_content_title_3: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_desc_3"
              value={data.feature_content_desc_3}
              onChange={(val) =>
                setData({ ...data, feature_content_desc_3: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_header_4"
              value={data.feature_content_header_4}
              onChange={(val) =>
                setData({ ...data, feature_content_header_4: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_title_4"
              value={data.feature_content_title_4}
              onChange={(val) =>
                setData({ ...data, feature_content_title_4: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_desc_4"
              value={data.feature_content_desc_4}
              onChange={(val) =>
                setData({ ...data, feature_content_desc_4: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_header_5"
              value={data.feature_content_header_5}
              onChange={(val) =>
                setData({ ...data, feature_content_header_5: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_title_5"
              value={data.feature_content_title_5}
              onChange={(val) =>
                setData({ ...data, feature_content_title_5: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="feature_content_desc_5"
              value={data.feature_content_desc_5}
              onChange={(val) =>
                setData({ ...data, feature_content_desc_5: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="tools_title"
              value={data.tools_title}
              onChange={(val) =>
                setData({ ...data, tools_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="application_title"
              value={data.application_title}
              onChange={(val) =>
                setData({ ...data, application_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="application_content_1"
              value={data.application_content_1}
              onChange={(val) =>
                setData({ ...data, application_content_1: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="application_content_2"
              value={data.application_content_2}
              onChange={(val) =>
                setData({ ...data, application_content_2: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="application_desc"
              value={data.application_desc}
              onChange={(val) =>
                setData({ ...data, application_desc: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="pricing_title"
              value={data.pricing_title}
              onChange={(val) =>
                setData({ ...data, pricing_title: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="video_link"
              value={data.video_link}
              onChange={(val) =>
                setData({ ...data, video_link: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="app_link_ios"
              value={data.app_link_ios}
              onChange={(val) =>
                setData({ ...data, app_link_ios: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="app_link_android"
              value={data.app_link_android}
              onChange={(val) =>
                setData({ ...data, app_link_android: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="social_facebook"
              value={data.social_facebook}
              onChange={(val) =>
                setData({ ...data, social_facebook: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="social_instagram"
              value={data.social_instagram}
              onChange={(val) =>
                setData({ ...data, social_instagram: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="social_youtube"
              value={data.social_youtube}
              onChange={(val) =>
                setData({ ...data, social_youtube: val.target.value })
              }
            />
          </CRow>
          <CRow>
            <ColValue
              label="social_twitter"
              value={data.social_twitter}
              onChange={(val) =>
                setData({ ...data, social_twitter: val.target.value })
              }
            />
          </CRow>
          {globalData.isAdmin && (
            <CRow>
              <CButton
                className="py-2 px-4 my-2 mx-3"
                color="primary"
                onClick={btnHandler}
              >
                Хадгалах
              </CButton>
            </CRow>
          )}
        </CContainer>
      )}
    </>
  );
};

export default React.memo(Settings);

const ColValue = ({ label, value, onChange }) => {
  return (
    <CCol>
      <CFormGroup>
        <CLabel>{label}</CLabel>
        <CTextarea placeholder={label} value={value} onChange={onChange} />
      </CFormGroup>
    </CCol>
  );
};
