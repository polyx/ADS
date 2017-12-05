import {baseUrl} from './globals/BaseUrl';


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
      reject(err);
    });
  });
}


export const loadOrgUnits = async () => {
  return await loadQuery('organisationUnits.json?paging=false&fields=id,name,children,featureType,coordinates');
}


export const checkIfAdmin = async () => {
  let extraUserInfo = await loadQuery('me.json?fields=userCredentials[userRoles[authorities]]');
  let userRoles = extraUserInfo.userCredentials.userRoles;
  let isAdmin = (userRoles.find((el)=>{
    return el.authorities.includes('F_INDICATOR_PUBLIC_ADD')
  })) ? true : false;
  return isAdmin;
}
