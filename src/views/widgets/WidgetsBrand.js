import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CWidgetBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import thousandify from "thousandify";

import ChartLineSimple from "../charts/ChartLineSimple";
import axios from "axios";

const WidgetsBrand = (props) => {
  // render

  const { withCharts } = props;

  const [fb, setFb] = useState({ like: 0, follower: 0 });
  const [ins, setIns] = useState({ post: 0, follower: 0 });

  useEffect(() => {
    axios
      .get("https://www.facebook.com/Alhay.mongolia/likes")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return withCharts ? (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightHeader={thousandify(fb.like) || 0}
          rightFooter="лайк"
          leftHeader={thousandify(fb.follower) || 0}
          leftFooter="дагагч"
        >
          <CIcon name="cib-facebook" height="52" className="my-4" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
            label="Friends"
            labels="months"
          />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="gradient-warning"
          rightHeader={thousandify(ins.post) || 0}
          rightFooter="нийтлэл"
          leftHeader={thousandify(ins.follower) || 0}
          leftFooter="дагагч"
        >
          <CIcon name="cib-instagram" height="52" className="my-4" />
          <ChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[1, 13, 9, 17, 34, 41, 38]}
            label="Followers"
            labels="months"
          />
        </CWidgetBrand>
      </CCol>
    </CRow>
  ) : (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          rightHeader={thousandify(fb.like) || 0}
          rightFooter="лайк"
          leftHeader={thousandify(fb.follower) || 0}
          leftFooter="дагагч"
        >
          <CIcon name="cib-facebook" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="gradient-warning"
          rightHeader={thousandify(ins.post) || 0}
          rightFooter="нийтлэл"
          leftHeader={thousandify(ins.follower) || 0}
          leftFooter="дагагч"
        >
          <CIcon name="cib-instagram" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
