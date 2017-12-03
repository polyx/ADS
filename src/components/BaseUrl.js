const demoUrl = 'https://inf5750.dhis2.org/demo/api';//'https://play.dhis2.org/demo/api';
export var baseUrl;

export let getBaseUrl  = new Promise ((resolve, reject) => {
  fetch('./manifest.webapp', {
    credentials: "include"
  })
  .then((resp) => resp.json())
  .then((data) => {
    let url = data.activities.dhis.href;
    if (url === '*') {  
      baseUrl = demoUrl;      
    } else {
      baseUrl = url + '/api';
    }
    console.log('baseUrl is set to:' + baseUrl);
    resolve();
  })
  .catch((err) => {
    console.log(err);
    reject(err);
  });
});