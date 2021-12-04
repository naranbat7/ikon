import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Нүүр",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Бүрэлдэхүүн хэсэг"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Хамтран ажиллах хүсэлт",
    to: "/admin/report",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Тэмцээн",
    to: "/admin/mission",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Banner",
    to: "/admin/banner",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Мэдэгдэл",
    to: "/admin/notification",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Вэбсайт"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Зураг",
    to: "/admin/gallery",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Тохиргоо",
    to: "/admin/settings",
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Үйлчилгээний нөхцөл",
    to: "/admin/privacy",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Тун удахгүй"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Байгууллага",
    to: "/admin/company",
    icon: "cil-layers",
    badge: {
      color: "warning",
      text: "Тун удахгүй",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Бараа",
    to: "/admin/products",
    icon: "cil-basket",
    badge: {
      color: "warning",
      text: "Тун удахгүй",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Дасгал",
    to: "/admin/workout",
    icon: "cil-asterisk",
    badge: {
      color: "warning",
      text: "Тун удахгүй",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Хэрэглэгч",
    to: "/admin/user",
    icon: "cil-people",
    badge: {
      color: "warning",
      text: "Тун удахгүй",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Удахгүй шинээр нэмэгдэх"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Зөвлөгөө",
    to: "/admin/advice",
    icon: "cil-puzzle",
    badge: {
      color: "success",
      text: "Шинэ",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ус",
    to: "/admin/water",
    icon: "cil-puzzle",
    badge: {
      color: "success",
      text: "Шинэ",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Зар сурталчилгаа",
    to: "/admin/ads",
    icon: "cil-puzzle",
    badge: {
      color: "success",
      text: "Шинэ",
    },
  },
];

export default _nav;
