import {baseUrl} from './BaseUrl';

export const loadOrgUnits = (query) => {
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

export const createMainTree = async () => {
  let levelOne = await loadOrgUnits('organisationUnits.json?paging=false&level=1&fields=id');
  let tree = levelOne.organisationUnits;
  await fetchChilderenRecurs(tree);
  return tree;
}

const fetchChilderenRecurs = async (nodes) => {
  await Promise.all(nodes.map(async(node) => {
    const{displayName, children} = await loadOrgUnits('organisationUnits/' + node.id +'?fields=displayName,children');    
    node.displayName = displayName;
    if (children.length !== 0) {
      node.children = children;
      //TODO: uncomment this when deploying
      await fetchChilderenRecurs(node.children);
    }
  }));

  let compare = (a, b) => {
    if (a.displayName > b.displayName) 
      return 1;
    if (b.displayName > a.displayName)
      return -1;
    return 0;
  }
  nodes.sort(compare);
}