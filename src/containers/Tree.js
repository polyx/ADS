import React from 'react';
import TreeView from 'react-treeview/lib/react-treeview';
import "react-treeview/react-treeview.css";
import "../css/treeview-local.css";
import PropTypes from 'prop-types';


export default class Tree extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tree: props.tree,
      treeObj: '',
      collapsedBookkeeping: '',
      // collapsedBookkeeping: dataSource.map(() => false),
    };
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  async componentDidMount() {
    //console.log(this.state.tree);
    let treeView = this.createTreeViewRecurs(this.state.tree, 1);
    this.setState({
      treeView: treeView,
    });
  }

  createTreeViewRecurs(tree, levels) {
    let makeNode = (node, levels) => {
      const label = 
      <span 
        className="node"           
        onClick={this.handleClickLabel.bind(null, node.id)}>
          {node.displayName}
      </span>;
      return (
        <TreeView 
          key={node.id}
          nodeLabel={label}
          defaultCollapsed={(levels > 0) ? false : true}
          onClick={this.handleClickArrow.bind(null, node.id)}>
            {this.createTreeViewRecurs(node.children, levels-1)}
        </TreeView>
      );
    };

    let makeLeaf = (node) => {
      return (
        <div 
          className='info'
          key={node.id}
          onClick={this.handleClickLabel.bind(null, node.id)}>
            {node.displayName}
        </div>
      );
    };

    return (
      <div>
        {tree.map((node) => {
          return node.children ? makeNode(node, levels) : makeLeaf(node);
        })}
      </div>
    );
  }

  handleClickArrow(i) {
  }

  handleClickLabel(i) {
    console.log(i);
  }

  collapseAll() {
  }

  render() {
    return (
      <div>
        {this.state.treeView}
      </div>
    );
  }
}

Tree.PropTypes = {
  tree: PropTypes.array.isRequired,
}