import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Category = React.lazy(() => import("./views/layouts/Category"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/admin/category",
    name: "Dashboard",
    component: Category,
    exact: true,
  },
];

export default routes;
