import React from 'react';
// import {Panel} from 'react-bootstrap';
import TreeView from 'react-treeview/lib/react-treeview';
import "react-treeview/react-treeview.css";
import "../css/treeview-local.css";
import PropTypes from 'prop-types';


export default class TreeArea extends React.Component {
  // selected, highlighted
  
  constructor(props) {
    super(props);

    this.state = {
      tree: props.tree,
      treeView: '',
      selectedId: '',
      selectedBookkeping: [],
      // highlightedBookkeping: dataSource.map() => false
      // collapsedBookkeeping: dataSource.map(() => false),
    };
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  async componentDidMount() {
    let treeView = this.createTreeViewRecurs(this.state.tree, 1);
    this.setState({
      treeView: treeView,
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (this.areEqualSearchRes(this.props.searchRes, nextProps.searchRes)) {
    //   return;
    // }
    console.log('TreeArea, new searchRes');
    console.log(nextProps.searchRes);
  }

  areEqualSearchRes(list1, list2) {
    if (list1.length !== list2.length) return false;
    let res = true;
    for (const id in list1) {
      if (!list2.includes(id)){
        res = false;
        break;
      }
    }
    return res;
  }

  createTreeViewRecurs(tree, levels) {
    const selectedBookkeping = this.state.selectedBookkeping;
    const collapsedBookkeeping = this.state.collapsedBookkeeping;

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
        {this.setState({selectedBookkeping: selectedBookkeping})}
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

TreeArea.PropTypes = {
  tree: PropTypes.array.isRequired,
  searchRes: PropTypes.array.isRequired,
}