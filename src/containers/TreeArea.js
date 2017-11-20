import React from 'react';
import TreeView from 'treeview-react-bootstrap';

const data = [
  {
    text: "Parent 1",
    nodes: [
      {
        text: "Child 1",
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
  }
];

export default class TreeArea extends React.Component {

  render() {
    return(
      <TreeView data={data} selectable={false} showBorder={false}/>
    );
  }

}