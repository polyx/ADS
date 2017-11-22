import React from 'react';
import TreeArea from '../containers/TreeArea';
import {loadOrgUnits} from './LoadData';
///organisationUnits.json?paging=false&level=1
//jsonData.organisationUnits[0].displayName

export default class TreeListOrg extends React.Component {

  constructor() {
    super();
    this.state = {
      tree: '',
    };
    // loadOrgUnits('organisationUnits.json?paging=false&level=1');
  }

  async createTree(){    
    let levelOne = await loadOrgUnits('organisationUnits.json?paging=false&level=1');
    // let rootObj = await loadOrgUnits('organisationUnits/' + levelOne.organisationUnits[0].id);
    // console.log(rootObj);
    const{id, displayName, children} = await loadOrgUnits('organisationUnits/' + levelOne.organisationUnits[0].id + '?feilds=id,displaName,children');

    let rootNode = {
      text: displayName,
      id: id,
      nodes: children,
      // state: {
      //   expanded: false,
      // }
    }
    console.log(rootNode.nodes);

    await this.fetchTreeRecurs(rootNode);
    
    this.setState({
      tree: [rootNode]
    });
  }

  async fetchTreeRecurs(node){
    if (node.nodes.length === 0) {
      return;
    } else {
      // node.nodes = [];
      await Promise.all(node.nodes.map(async (el) => {
        //TODO: async/await
        const{displayName, children} = await loadOrgUnits('organisationUnits/' + el.id +'?feilds=displayName,children');
        el.text = displayName;
        el.nodes = children;
        
        // await this.fetchTreeRecurs(el);
        console.log(el)
      }));
      
    }
  }

  // async fetchTreeRecurs2(node){
  //   const {children} = await loadOrgUnits('organisationUnits/' + node.id + "?feilds=children");
  //   //console.log(children);

  //   if (children.length === 0) {
  //     return;
  //   } else {
  //     node.nodes = [];
  //     await Promise.all(children.map(async (el) => {
  //       //TODO: async/await
  //       const{id, displayName} = await loadOrgUnits('organisationUnits/' + el.id +'?feilds=id,displayName');
  //       let childNode = {
  //         text: displayName,
  //         id: id,
  //         state: {
  //           expanded: false,
  //         },
  //       };
  //       node.nodes.push(childNode);
  //       //console.log(node);
  //       //await this.fetchTreeRecurs(childNode);
  //     }));
  //   }
  // }

  async componentDidMount() {
    // console.log(this.state.tree);
    this.createTree();
    // console.log(this.state.tree);
  }


  render() {
    return(
      <TreeArea orgUnits={tree}/>
    );
  }
}


var tree = [
  {
    text: "Parent 1",
    state: {
      expanded: false,
    },
    nodes: [
      {
        text: "Child 1",
        state: {
          expanded: false,
        },
        nodes: [
          {
            text: "Grandchild 1"
          },
          {
            text: "Grandchild 2"
          }
        ]
      },
      {
        text: "Child 2"
      }
    ]
  },
  {
    text: "Parent 2"
  },
  {
    text: "Parent 3"
  },
  {
    text: "Parent 4"
  },
  {
    text: "Parent 5"
  }
];