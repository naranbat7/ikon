const axios = require("axios");

module.exports = {
  request: (
    token = "",
    setGlobalLoading,
    setGlobalAuthorization,
    setGlobalToast,
    url,
    method,
    body = {}
  ) => {
    setGlobalLoading(true);
    return axios({
      method: method,
      url: url,
      headers: {
        Authorization: token,
      },
      data: body,
    })
      .then((response) => {
        // setTimeout(() => setGlobalLoading(false), 3000);
        setGlobalLoading(false);
        return response.data;
      })
      .catch((err) => {
        setGlobalLoading(false);
        const code = err.response ? err.response.status : 0;
        if (code == 400)
          setGlobalToast({ message: "Бүрэн гүйцэд бөглөнө үү.", type: false });
        else if (code == 401) {
          setGlobalToast({ message: "Нэвтрэх шаардлагатай.", type: false });
          setGlobalAuthorization({
            isAuthorized: false,
            token: "",
          });
        } else if (code == 403)
          setGlobalToast({ message: "Нууц үг буруу байна.", type: false });
        else if (code == 406)
          setGlobalToast({ message: "Эрх байхгүй байна.", type: false });
        else if (code == 409)
          setGlobalToast({
            message: "Утасны дугаар эсвэл нэвтрэх нэр бүртгэлтэй байна.",
            type: false,
          });
        else if (code == 500)
          setGlobalToast({ message: "Серверийн алдаа.", type: false });
        else {
          setGlobalToast({
            message: "Интернэт холболтоо шалгана уу.",
            type: false,
          });
        }
        console.log("Error: " + err);
      });
  },
};
