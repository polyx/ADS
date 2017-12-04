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
      selectedBookkeping: [],
      selectedOrgId: "",
      // highlightedBookkeping: dataSource.map() => false
      // collapsedBookkeeping: dataSource.map(() => false),
    };
    this.handleClickArrow = this.handleClickArrow.bind(this);
    this.handleClickLabel = this.handleClickLabel.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  async componentDidMount() {
    // let tmpIds = ['eIQbndfxQMb', 'jUb8gELQApl', 'fdc6uOvgoji', 'O6uvpzGd5pu', 'qhqAxPSTUXp'];
    // let tree = this.createTreeRec(this.props.levelOne, this.props.allUnits, 1);
    let tree = this.createTreeRec(this.props.levelOne, this.props.allUnits, 1);
    
    this.setState({
      tree: tree,
    });
  }


  getFullInfoSorted(nodesIdInf, allUnits){
    // console.log(nodesIdInf);
    let nodesFullInf = nodesIdInf.map((idNode)=>{return allUnits.find((fullNode)=>{return fullNode.id === idNode.id})});
    

    let compare = (a, b) => {
      if (a.name > b.name) 
        return 1;
      if (b.name > a.name)
        return -1;
      return 0;
    }
    return nodesFullInf.sort(compare);
  }


  createTreeRec(nodesIdInf, allUnits, expLevels) {
    const selectedBookkeping = this.state.selectedBookkeping;
    let nodesFullInf = this.getFullInfoSorted(nodesIdInf, allUnits);

    let makeNode = (node, levels) => {
      const label = 
      <span 
        className="node"
        onClick={this.handleClickLabel.bind(null, node.id)}>
          {node.name}
      </span>;      
      return (
        <TreeView
          key={node.id}
          nodeLabel={label}
          defaultCollapsed={(levels > 0) ? false : true}          
          onClick={this.handleClickArrow.bind(null, node.id)}
          >
            {this.createTreeRec(node.children, allUnits, levels-1)}
        </TreeView>
      );
    };

    let makeLeaf = (node) => {
      return (
        <div 
          className='info'
          key={node.id}
          onClick={this.handleClickLabel.bind(null, node.id)}>
            {node.name}
        </div>
      );
    };    
    
    return (
      <div>
        {nodesFullInf.map((node) => {
          return (node.children.length !== 0)  ? makeNode(node, expLevels) : makeLeaf(node);
        })}
        {this.setState({selectedBookkeping: selectedBookkeping})}
      </div>
    );
  }
    

  handleClickLabel(i) {
    //console.log('handleClickLabel ' + i);
    this.setState({selectedOrgId: i}, () => {this.props.passNewSelectedOrgId(i)});
  } 


  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSet.length !== 0 && !this.areEqualSearchSets(this.props.searchSet, nextProps.searchSet)) {
      // future feature with showing searchSet
      // console.log(nextProps.searchSet);
      // console.log('handle new searchSet');
    }
    if (nextProps.selectedOrg !== null && this.state.selectedOrgId !== nextProps.selectedOrg.id ) {
      //console.log('componentWillReceiveProps old selectedOrgId ' + this.state.selectedOrgId);
      //console.log('componentWillReceiveProps new selectedOrgId ' + nextProps.selectedOrg.id);
      this.setState({selectedOrgId: nextProps.selectedOrg.id});
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

  handleClickArrow(i) {
  }

  collapseAll() {
  }

  render() {
    return (
      <div>
        {this.state.tree}
      </div>
    );
  }
}

TreeArea.propTypes = {
  allUnits: PropTypes.array.isRequired,
  levelOne: PropTypes.array.isRequired,
  searchSet: PropTypes.array.isRequired,
  selectedOrg: PropTypes.object,
  passNewSelectedOrgId: PropTypes.func.isRequired,
}