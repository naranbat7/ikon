import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Company = React.lazy(() => import("./views/layouts/Company"));
const Mission = React.lazy(() => import("./views/layouts/Mission"));
const Products = React.lazy(() => import("./views/layouts/Products"));
const User = React.lazy(() => import("./views/layouts/User"));
const Workout = React.lazy(() => import("./views/layouts/Workout"));
const Advice = React.lazy(() => import("./views/layouts/Advice"));
const Water = React.lazy(() => import("./views/layouts/Water"));
const Ads = React.lazy(() => import("./views/layouts/Ads"));
const Report = React.lazy(() => import("./views/layouts/Report"));
const Gallery = React.lazy(() => import("./views/layouts/Gallery"));
const Settings = React.lazy(() => import("./views/layouts/Settings"));
const Banner = React.lazy(() => import("./views/layouts/Banner"));
const Privacy = React.lazy(() => import("./views/layouts/Privacy"));
const Notification = React.lazy(() => import("./views/layouts/Nofitication"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/admin/company",
    name: "Dashboard",
    component: Company,
    exact: true,
  },
  {
    path: "/admin/mission",
    name: "Dashboard",
    component: Mission,
    exact: true,
  },
  {
    path: "/admin/products",
    name: "Dashboard",
    component: Products,
    exact: true,
  },
  { path: "/admin/user", name: "Dashboard", component: User, exact: true },
  {
    path: "/admin/workout",
    name: "Dashboard",
    component: Workout,
    exact: true,
  },
  {
    path: "/admin/advice",
    name: "Dashboard",
    component: Advice,
    exact: true,
  },
  {
    path: "/admin/water",
    name: "Dashboard",
    component: Water,
    exact: true,
  },
  {
    path: "/admin/ads",
    name: "Dashboard",
    component: Ads,
    exact: true,
  },
  {
    path: "/admin/report",
    name: "Dashboard",
    component: Report,
    exact: true,
  },
  {
    path: "/admin/gallery",
    name: "Dashboard",
    component: Gallery,
    exact: true,
  },
  {
    path: "/admin/settings",
    name: "Dashboard",
    component: Settings,
    exact: true,
  },
  {
    path: "/admin/banner",
    name: "Dashboard",
    component: Banner,
    exact: true,
  },
  {
    path: "/admin/privacy",
    name: "Dashboard",
    component: Privacy,
    exact: true,
  },
  {
    path: "/admin/notification",
    name: "Dashboard",
    component: Notification,
    exact: true,
  },
];

export default routes;
