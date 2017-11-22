import {baseUrl} from './BaseUrl';

export const loadOrgUnits = (query) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${query}`, {
      credentials: "include"
    })
    .then(response => response.json())
    .then(jsonData => {
      // console.log(jsonData);
      resolve(jsonData);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
  });
}