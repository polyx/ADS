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
      selectedOrgId: '',
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


  handleClickLabel(i) {
    console.log('handleClickLabel ' + i);
    this.setState({selectedOrgId: i}, () => {this.props.passNewSelectedOrgId(i)});
  } 


  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSet.length !== 0 && !this.areEqualSearchSets(this.props.searchSet, nextProps.searchSet)) {
      console.log(nextProps.searchSet);
      console.log('handle new searchSet');
    }
    if (nextProps.selectedOrgId !== null && this.state.selectedOrgId !== nextProps.selectedOrgId ) {
      // console.log(this.state.selectedOrgId);
      // console.log(nextProps.selectedOrgId);
      console.log('handle old selectedOrgId ' + this.state.selectedOrgId);
      console.log('handle new selectedOrgId ' + nextProps.selectedOrgId);
      this.setState({selectedOrgId: nextProps.selectedOrgId});
    }
  }

  areEqualSearchSets(list1, list2) {
    // only unique ids in this lists (they are sets)
    if (list1.length !== list2.length) return false;
    let res = true;
    for (var i = 0; i < list1.length; i++) {
      if (!list2.includes(list1[i])){
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
  tree: PropTypes.array,
  searchSet: PropTypes.array.isRequired,
  selectedOrgId: PropTypes.number,
  passNewSelectedOrgId: PropTypes.func.isRequired,
}