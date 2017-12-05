import {loadQuery, checkIfAdmin} from '../api';

export var isUserAdmin;
export var userObj;
export var userGroups;
export var userOrgUnits;

export const prepUserInfo = async () => {
  userObj = await loadQuery('me.json');
  isUserAdmin = await checkIfAdmin();
  let ids = ''.concat(userObj.userGroups.map((obj)=>{return obj.id}));
  userGroups = await loadQuery(`/userGroups.json?paging=false&filter=id:in:[${ids}]&fields=id,displayName`);
  userGroups = userGroups.userGroups;
  ids = ''.concat(userObj.organisationUnits.map((obj)=>{return obj.id}));
  userOrgUnits = await loadQuery(`/organisationUnits.json?paging=false&filter=id:in:[${ids}]&fields=id,displayName`);
  userOrgUnits = userOrgUnits.organisationUnits;
}

//https://play.dhis2.org/dev/api/userGroups.json?filter=id:in:[vAvEltyXGbD,eqwl5cDMuUhmF]