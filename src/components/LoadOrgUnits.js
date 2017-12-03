import {baseUrl} from './BaseUrl';


export const loadOrgUnits = async () => {
  return await loadQuery('organisationUnits.json?paging=false&fields=id,displayName,children,featureType,coordinates');
}


export const loadQuery = (query) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${query}`, {
      credentials: "include"
    })
    .then(response => {
      if (response.redirected === true & response.url.includes('login.action')) {
        throw new Error('Please login to dhis2');
      }
      return response.json();
    })
    .then(jsonData => {
      resolve(jsonData);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
  });
}

