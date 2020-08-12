<script>
import md5 from "js-md5";

var info = {
  userId: "",
  orgNo: "",
  password: ""
};
var post = function(action, params) {
  let baseUrl = "";
  setSafeString(params);
  let url = baseUrl + action + "?";
  for (let key in params) {
    url += key + "=" + params[key] + "&";
  }

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(e => {
      console.log("error", e);
    });
};

var setSafeString = function(params) {
  let userId = info.userId;
  let password = info.password;
  let dbPwd = "";
  let ms = new Date().getTime();

  params["susrnam"] = userId;
  params["timestamp"] = ms;
  params["appkey"] = "luculent";
  params["sign"] = getSign(userId, password, dbPwd, ms);
  params["orgverno"] = "";
};

var getSign = function(userId, password, dbPwd, ms) {
  console.debug(dbPwd);
  if (password) {
    dbPwd = md5(userId + password);
  }
  let sign = md5("luculentsecure" + userId + dbPwd + ms);
  return sign;
};

export default {
  info,
  post
};
</script>