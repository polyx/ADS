import {baseUrl} from './globals/BaseUrl';


export const loadQuery = (query) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${query}`, {
      credentials: "include"
    })
    .then(response => {
      if (response.redirected === true & response.url.includes('login.action')) {
        throw new Error('Please login to dhis2');
      } else if (response.status === 404) {
        console.log(response);
        resolve(null);
      }
      return response.json();
    })
    .then(jsonData => {
      resolve(jsonData);
    })
    .catch(err => {
      console.log(err);
      alert(err);
      resolve(null);
      // reject(err);
    });
  });
};

export const loadDataElements = async (dataElements) => {
  console.log("URL:","dataElements.json?paging=false&filter=id:in:"+"["+ dataElements+"]");
  return await loadQuery("dataElements.json?paging=false&filter=id:in:"+"["+dataElements+"]");
};

export const getOrgUnit = async (orgID) => {
  return await loadQuery("organisationUnits/"+orgID);
};
//
export const getDataSet = async (dataSetID) => {
  return await loadQuery("dataSets/"+dataSetID);
};

export const loadOrgUnits = async () => {
  return await loadQuery('organisationUnits.json?paging=false&fields=id,name,children,featureType,coordinates');
};


export const checkIfAdmin = async () => {
  let extraUserInfo = await loadQuery('me.json?fields=userCredentials[userRoles[authorities]]');
  let userRoles = extraUserInfo.userCredentials.userRoles;
  let isAdmin = (userRoles.find((el)=>{
    return el.authorities.includes('F_INDICATOR_PUBLIC_ADD')
  })) ? true : false;
  return isAdmin;
};
