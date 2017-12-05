export const local = true;
// export const local = false;
const demoUrl = "https://play.dhis2.org/demo/api";
// const demoUrl = 'https://inf5750.dhis2.org/demo/api';
// const demoUrl = 'https://inf5750.dhis2.org/training/api';




export var baseUrl;
export let url = local ? "" : process.env.PUBLIC_URL;
export const prepBaseUrl = () => {
  return new Promise((resolve, reject) => {
    console.log("URL:", url);
    console.log("PUBLIC URL:", process.env.PUBLIC_URL);
    fetch(url+ "/manifest.webapp", {
      credentials: "include"
    })
    .then((resp) => {
      console.log(resp);
      return resp.json();})
    .then((data) => {
      let url = data.activities.dhis.href;
      if (url === "*") {
        baseUrl = demoUrl;
      } else {
        baseUrl = url + "/api";
      }
      console.log("baseUrl is set to:" + baseUrl);
      resolve();
    })
    .catch((err) => {
      console.log(err);
      alert(err);
      reject(err);
    });
  });
};
