import React, { useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import thousandify from "thousandify";

const WidgetsDropdown = (props) => {
  const [data, setData] = useState({
    user: "нийт",
    product: "нийт",
    mission: "нийт",
    workout: "нийт",
    stock: "нийт",
    sales: "нийт",
  });

  const userdata =
    data.user == "нийт"
      ? props.data.user.total
      : data.user == "энэ улиралд"
      ? props.data.user.season
      : data.user == "энэ сард"
      ? props.data.user.month
      : data.user == "энэ долоо хоногт"
      ? props.data.user.week
      : props.data.user.today;

  const productdata =
    data.product == "нийт"
      ? props.data.product.total
      : data.product == "энэ улиралд"
      ? props.data.product.season
      : data.product == "энэ сард"
      ? props.data.product.month
      : data.product == "энэ долоо хоногт"
      ? props.data.product.week
      : props.data.product.today;

  const missiondata =
    data.mission == "нийт"
      ? props.data.mission.total
      : data.mission == "энэ улиралд"
      ? props.data.mission.season
      : data.mission == "энэ сард"
      ? props.data.mission.month
      : data.mission == "энэ долоо хоногт"
      ? props.data.mission.week
      : props.data.mission.today;

  const workoutdata =
    data.workout == "нийт"
      ? props.data.workout.total
      : data.workout == "энэ улиралд"
      ? props.data.workout.season
      : data.workout == "энэ сард"
      ? props.data.workout.month
      : data.workout == "энэ долоо хоногт"
      ? props.data.workout.week
      : props.data.workout.today;

  const stockdata =
    data.stock == "нийт"
      ? props.data.stock.product + props.data.stock.workout
      : data.stock == "зөвхөн бараа"
      ? props.data.stock.product
      : props.data.stock.workout;

  const salesdata =
    data.sales == "нийт"
      ? props.data.sales.product + props.data.sales.workout
      : data.sales == "зөвхөн бараа"
      ? props.data.sales.product
      : props.data.sales.workout;

  return (
    <CRow>
      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-primary"
          header={`+${thousandify(userdata)}`}
          text={`Хэрэглэгч (${data.user})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.user == "нийт"}
                onClick={() => setData({ ...data, user: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.user == "энэ улиралд"}
                onClick={() => setData({ ...data, user: "энэ улиралд" })}
              >
                Энэ улиралд
              </CDropdownItem>
              <CDropdownItem
                disabled={data.user == "энэ сард"}
                onClick={() => setData({ ...data, user: "энэ сард" })}
              >
                Энэ сард
              </CDropdownItem>
              <CDropdownItem
                disabled={data.user == "энэ долоо хоногт"}
                onClick={() => setData({ ...data, user: "энэ долоо хоногт" })}
              >
                Энэ долоо хоногт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.user == "өнөөдөр"}
                onClick={() => setData({ ...data, user: "өнөөдөр" })}
              >
                Өнөөдөр
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-info"
          header={`+${thousandify(productdata)}`}
          text={`Бараа (${data.product})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.product == "нийт"}
                onClick={() => setData({ ...data, product: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.product == "энэ улиралд"}
                onClick={() => setData({ ...data, product: "энэ улиралд" })}
              >
                Энэ улиралд
              </CDropdownItem>
              <CDropdownItem
                disabled={data.product == "энэ сард"}
                onClick={() => setData({ ...data, product: "энэ сард" })}
              >
                Энэ сард
              </CDropdownItem>
              <CDropdownItem
                disabled={data.product == "энэ долоо хоногт"}
                onClick={() =>
                  setData({ ...data, product: "энэ долоо хоногт" })
                }
              >
                Энэ долоо хоногт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.product == "өнөөдөр"}
                onClick={() => setData({ ...data, product: "өнөөдөр" })}
              >
                Өнөөдөр
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-warning"
          header={`+${thousandify(missiondata)}`}
          text={`Тэмцээн (${data.mission})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.mission == "нийт"}
                onClick={() => setData({ ...data, mission: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.mission == "энэ улиралд"}
                onClick={() => setData({ ...data, mission: "энэ улиралд" })}
              >
                Энэ улиралд
              </CDropdownItem>
              <CDropdownItem
                disabled={data.mission == "энэ сард"}
                onClick={() => setData({ ...data, mission: "энэ сард" })}
              >
                Энэ сард
              </CDropdownItem>
              <CDropdownItem
                disabled={data.mission == "энэ долоо хоногт"}
                onClick={() =>
                  setData({ ...data, mission: "энэ долоо хоногт" })
                }
              >
                Энэ долоо хоногт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.mission == "өнөөдөр"}
                onClick={() => setData({ ...data, mission: "өнөөдөр" })}
              >
                Өнөөдөр
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-danger"
          header={`+${thousandify(workoutdata)}`}
          text={`Дасгал (${data.workout})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.workout == "нийт"}
                onClick={() => setData({ ...data, workout: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.workout == "энэ улиралд"}
                onClick={() => setData({ ...data, workout: "энэ улиралд" })}
              >
                Энэ улиралд
              </CDropdownItem>
              <CDropdownItem
                disabled={data.workout == "энэ сард"}
                onClick={() => setData({ ...data, workout: "энэ сард" })}
              >
                Энэ сард
              </CDropdownItem>
              <CDropdownItem
                disabled={data.workout == "энэ долоо хоногт"}
                onClick={() =>
                  setData({ ...data, workout: "энэ долоо хоногт" })
                }
              >
                Энэ долоо хоногт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.workout == "өнөөдөр"}
                onClick={() => setData({ ...data, workout: "өнөөдөр" })}
              >
                Өнөөдөр
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-primary"
          header={`+${thousandify(stockdata)} ₮`}
          text={`Хөрөнгө (${data.stock})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.stock == "нийт"}
                onClick={() => setData({ ...data, stock: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.stock == "зөвхөн бараа"}
                onClick={() => setData({ ...data, stock: "зөвхөн бараа" })}
              >
                Зөвхөн бараа
              </CDropdownItem>
              <CDropdownItem
                disabled={data.stock == "зөвхөн дасгал"}
                onClick={() => setData({ ...data, stock: "зөвхөн дасгал" })}
              >
                Зөвхөн дасгал
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="2">
        <CWidgetDropdown
          color="gradient-info"
          header={`+${thousandify(salesdata)} ₮`}
          text={`Борлуулалт (${data.sales})`}
          className="py-3"
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem
                disabled={data.sales == "нийт"}
                onClick={() => setData({ ...data, sales: "нийт" })}
              >
                Нийт
              </CDropdownItem>
              <CDropdownItem
                disabled={data.sales == "зөвхөн бараа"}
                onClick={() => setData({ ...data, sales: "зөвхөн бараа" })}
              >
                Зөвхөн бараа
              </CDropdownItem>
              <CDropdownItem
                disabled={data.sales == "зөвхөн дасгал"}
                onClick={() => setData({ ...data, sales: "зөвхөн дасгал" })}
              >
                Зөвхөн дасгал
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
