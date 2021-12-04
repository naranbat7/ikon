import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#f9b115";

const MainChartExample = (attributes) => {
  const data = [];
  const defaultDatasets = (() => {
    for (let i = 0; i < attributes.limit; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      data.unshift(`${date.getMonth() + 1}/${date.getDate()}`);
    }
    return [
      {
        label: "Хэрэглэгч",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: attributes.data1.slice(
          Math.max(attributes.data1.length - attributes.limit, 0)
        ),
      },
      {
        label: "Бараа",
        backgroundColor: "transparent",
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: attributes.data2.slice(
          Math.max(attributes.data2.length - attributes.limit, 0)
        ),
      },
      {
        label: "Тэмцээн",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: attributes.data3.slice(
          Math.max(attributes.data3.length - attributes.limit, 0)
        ),
      },
      {
        label: "Дасгал",
        backgroundColor: "transparent",
        borderColor: brandWarning,
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 1,
        borderDash: [30, 5],
        data: attributes.data4.slice(
          Math.max(attributes.data4.length - attributes.limit, 0)
        ),
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: Math.ceil(attributes.max / 100) * 100,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 2,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={data}
    />
  );
};

export default MainChartExample;
