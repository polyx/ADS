import {loadQuery, checkIfAdmin} from '../api';

export var userObj;
export var isUserAdmin;

export const prepUserInfo = async () => {
  userObj = await loadQuery('me.json');
  isUserAdmin = await checkIfAdmin();
}