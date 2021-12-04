import React, { lazy, useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";
import { useGlobal } from "../../context/GlobalContext/use-global";
import { request } from "../../utils/service";
import { maxNumber4Array, numberWithCommas } from "../../utils/util";
import Constant from "../../constants/CONSTANT";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [analyze, setAnalyze] = useState("Сараар");
  const [data, setData] = useState({});
  const {
    globalData,
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
  } = useGlobal();
  var date = new Date();
  var date2 = new Date();
  const limit =
    analyze == "7 хоног"
      ? 7
      : analyze == "Сараар"
      ? 30
      : analyze == "Улирлаар"
      ? 90
      : 365;
  date2.setDate(date2.getDate() - limit + 1);

  const getDashboard = async () => {
    const _data = await request(
      globalData.authorization.token,
      setGlobalLoading,
      setGlobalAuthorization,
      setGlobalToast,
      Constant.dashboardApi.url,
      Constant.dashboardApi.method
    );
    setData(_data);
  };

  const allProduct = data.summary
    ? data.summary.product.healthy +
      data.summary.product.fitness +
      data.summary.product.vitamin +
      data.summary.product.other
    : 1;
  const allAge = data.summary
    ? data.summary.age.u12 +
      data.summary.age.u18 +
      data.summary.age.u25 +
      data.summary.age.u40 +
      data.summary.age.p41
    : 1;

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      {data.header && <WidgetsDropdown data={data.header} />}
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Статистик
              </h4>
              <div className="small text-muted">
                {date2.getFullYear()}/{date2.getMonth() + 1}/{date2.getDate()} -{" "}
                {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
              </div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {["7 хоног", "Сараар", "Улирлаар", "Жилээр"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === analyze}
                    onClick={() => setAnalyze(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          {data.statistic && (
            <MainChartExample
              style={{ height: "350px", marginTop: "40px" }}
              limit={limit}
              data1={data.statistic.user}
              data2={data.statistic.product}
              data3={data.statistic.mission}
              data4={data.statistic.workout}
              max={maxNumber4Array(
                data.statistic.user,
                data.statistic.workout,
                data.statistic.product,
                data.statistic.mission
              )}
            />
          )}
        </CCardBody>
      </CCard>

      <WidgetsBrand />

      {data.summary && (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Хураангуй</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="6" xl="6">
                    <div className="progress-group mb-4">
                      <div className="progress-group-header">
                        <CIcon
                          className="progress-group-icon"
                          name="cil-user"
                        />
                        <span className="title">Эрэгтэй</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.gender.male)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.gender.male /
                                  (data.summary.gender.male +
                                    data.summary.gender.female)) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="warning"
                          value={(
                            (data.summary.gender.male /
                              (data.summary.gender.male +
                                data.summary.gender.female)) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <CIcon
                          className="progress-group-icon"
                          name="cil-user-female"
                        />
                        <span className="title">Эмэгтэй</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.gender.female)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.gender.female /
                                  (data.summary.gender.male +
                                    data.summary.gender.female)) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="warning"
                          value={(
                            (data.summary.gender.female /
                              (data.summary.gender.male +
                                data.summary.gender.female)) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">Эрүүл хүнс</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.product.healthy)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.product.healthy / allProduct) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="success"
                          value={(
                            (data.summary.product.healthy / allProduct) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>

                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">Фитнесс</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.product.fitness)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.product.fitness / allProduct) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="success"
                          value={(
                            (data.summary.product.fitness / allProduct) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">Амин дэм</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.product.vitamin)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.product.vitamin / allProduct) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="success"
                          value={(
                            (data.summary.product.vitamin / allProduct) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">Бусад</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.product.other)}
                          <span className="text-muted small">
                            {" (" +
                              (
                                (data.summary.product.other / allProduct) *
                                100
                              ).toFixed(1) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="success"
                          value={(
                            (data.summary.product.other / allProduct) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                  </CCol>
                  <CCol xs="12" md="6" xl="6">
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">12-</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.age.u12)}
                          <span className="text-muted small">
                            {" (" +
                              ((data.summary.age.u12 / allAge) * 100).toFixed(
                                1
                              ) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="info"
                          value={(
                            (data.summary.age.u12 / allAge) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>

                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">13-18</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.age.u18)}
                          <span className="text-muted small">
                            {" (" +
                              ((data.summary.age.u18 / allAge) * 100).toFixed(
                                1
                              ) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="info"
                          value={(
                            (data.summary.age.u18 / allAge) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">19-25</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.age.u25)}
                          <span className="text-muted small">
                            {" (" +
                              ((data.summary.age.u25 / allAge) * 100).toFixed(
                                1
                              ) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="info"
                          value={(
                            (data.summary.age.u25 / allAge) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">26-40</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.age.u40)}
                          <span className="text-muted small">
                            {" (" +
                              ((data.summary.age.u40 / allAge) * 100).toFixed(
                                1
                              ) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="info"
                          value={(
                            (data.summary.age.u40 / allAge) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <span className="title">41+</span>
                        <span className="ml-auto font-weight-bold">
                          {numberWithCommas(data.summary.age.p41)}
                          <span className="text-muted small">
                            {" (" +
                              ((data.summary.age.p41 / allAge) * 100).toFixed(
                                1
                              ) +
                              "%)"}
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress
                          className="progress-xs"
                          color="info"
                          value={(
                            (data.summary.age.p41 / allAge) *
                            100
                          ).toFixed(1)}
                        />
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Dashboard;
