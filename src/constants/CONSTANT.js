const backendHost = "http://167.71.199.65/api";
// const vercelHost = "https://admin-backend-rho.vercel.app/api/v1";
const vercelHost = "https://alhay-admin-backend.herokuapp.com/api/v1";

export default {
  loginApi: {
    method: `post`,
    url: `${backendHost}/admin/login`,
  },
  dashboardApi: {
    method: `get`,
    url: `${backendHost}/admin/dashboard`,
  },
  ownDataApi: {
    method: `get`,
    url: `${backendHost}/admin/adminInfo`,
  },
  setOwnDataApi: {
    method: `post`,
    url: `${backendHost}/admin/setAdminInfo`,
  },
  setOwnPassApi: {
    method: `post`,
    url: `${backendHost}/admin/setAdminPass`,
  },
  getAdminListApi: {
    method: `get`,
    url: `${backendHost}/admin/adminList`,
  },
  deleteAdminApi: {
    method: `post`,
    url: `${backendHost}/admin/deleteAdmin`,
  },
  addAdminApi: {
    method: `post`,
    url: `${backendHost}/admin/addAdmin`,
  },
  getCompanyReqApi: {
    method: `get`,
    url: `${backendHost}/company/company/`,
  },
  setCompanyReqApi: {
    method: `post`,
    url: `${backendHost}/company/setCompany`,
  },
  postReportApi: {
    method: `post`,
    url: `${backendHost}/report/addReport`,
  },
  getAllReportApi: {
    method: `get`,
    url: `${backendHost}/report/report`,
  },
  setReportStatusApi: {
    method: `post`,
    url: `${backendHost}/report/setReportStatus`,
  },
  sendMailToReportApi: {
    method: `post`,
    url: `${backendHost}/report/sendMailToReport`,
  },
  getMissionReqApi: {
    method: `get`,
    url: `${vercelHost}/admin/mission`,
  },
  addMissionApi: {
    method: `post`,
    url: `${vercelHost}/admin/mission`,
  },
  deleteMissionApi: {
    method: `delete`,
    url: `${vercelHost}/admin/mission`,
  },
  getGalleryReqApi: {
    method: `get`,
    url: `${backendHost}/gallery`,
  },
  addGalleryApi: {
    method: `post`,
    url: `${backendHost}/gallery`,
  },
  getWebApi: {
    method: `get`,
    url: `${backendHost}/web`,
  },
  setWebApi: {
    method: `post`,
    url: `${backendHost}/web`,
  },
  getPrivacyApi: {
    method: `get`,
    url: `${backendHost}/privacy`,
  },
  setPrivacyApi: {
    method: `post`,
    url: `${backendHost}/privacy`,
  },
  addNotificationApi: {
    method: `post`,
    url: `${vercelHost}/admin/notification`,
  },
  getBannerReqApi: {
    method: `get`,
    url: `${vercelHost}/admin/banner`,
  },
  addBannerApi: {
    method: `post`,
    url: `${vercelHost}/admin/banner`,
  },
};
