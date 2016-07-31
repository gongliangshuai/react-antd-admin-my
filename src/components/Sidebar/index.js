import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  items: [],
  currentIndex: 0
}

const propTypes = {
  items: PropTypes.array,
  currentIndex: PropTypes.number
}

class Sidebar extends React.Component {
  constructor (props) {
    super(props)

    this.menuClickHandle = this.menuClickHandle.bind(this);
    this.onCollapseChange = this.onCollapseChange.bind(this);
    this.state = {
      collapse: true,
    };
  }

  componentDidMount () {
    this.props.getAllMenu()
  }

  menuClickHandle (item) {
    this.props.updateNavPath(item.keyPath, item.key)
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  render () {
    const { items } = this.props
    const collapse = this.state.collapse;
    let openKey = []
    const menu = items.map((item) => {
      openKey.push('sub'+item.key)
      return (
        <SubMenu
          key={'sub'+item.key}
          title={<span><Icon type={item.icon} />{item.name}</span>}
        >
          {item.child.map((node) => {
            return (
              <Menu.Item key={'menu'+node.key}><Link to={node.url}>{node.name}</Link></Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            <Menu.Item key="user">
              <Icon type="user" /><span className="nav-text">导航一</span>
            </Menu.Item>
            <Menu.Item key="setting">
              <Icon type="setting" /><span className="nav-text">导航二</span>
            </Menu.Item>
            <Menu.Item key="laptop">
              <Icon type="laptop" /><span className="nav-text">导航三</span>
            </Menu.Item>
            <Menu.Item key="notification">
              <Icon type="notification" /><span className="nav-text">导航四</span>
            </Menu.Item>
            <Menu.Item key="folder">
              <Icon type="folder" /><span className="nav-text">导航五</span>
            </Menu.Item>
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
