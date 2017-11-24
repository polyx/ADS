import React from 'react';
import TreeView from 'react-treeview/lib/react-treeview';
import "react-treeview/react-treeview.css";
import {loadOrgUnits} from './LoadData';

const dataSource = [
  ['Apple', 'Orange'],
  ['Facebook', 'Google'],
  ['Celery', 'Cheeseburger'],
];


export default class Lists extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tree: '',
      collapsedBookkeeping: '',
      // collapsedBookkeeping: dataSource.map(() => false),
    };
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  async componentDidMount() {
    // console.log(this.state.tree);
    
    this.createinit();
    // console.log(this.state.tree);
  }


  async createTree(){    
    //TODO: return
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

  handleClickArrow(i) {
    let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
    collapsedBookkeeping[i] = !collapsedBookkeeping[i];
    this.setState({collapsedBookkeeping: collapsedBookkeeping});
  }

  handleClickLabel(i) {
    let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
    collapsedBookkeeping[i] = !collapsedBookkeeping[i];
    this.setState({collapsedBookkeeping: collapsedBookkeeping});
  }

  collapseAll() {
    this.setState({
      collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
    });
  }

  render() {
    const collapsedBookkeeping = this.state.collapsedBookkeeping;
    return (
      <div>
        <button onClick={this.collapseAll}>Collapse all</button>
        {dataSource.map((node, i) => {
          // Let's make it so that the tree also toggles when we click the
          // label. Controlled components make this effortless.
          const label =
            <span className="node" onClick={this.handleClick1.bind(null, i)}>
              Type {i}
            </span>;
          return (
            <TreeView
              key={i}
              nodeLabel={label}
              collapsed={collapsedBookkeeping[i]}
              onClick={this.handleClick2.bind(null, i)}>
              {node.map(entry => <div className="info" key={entry}>{entry}</div>)}
            </TreeView>
          );
        })}
      </div>
    );
  }
}

