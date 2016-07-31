import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col, Menu, Icon} from 'antd';

import NavPath from '../../components/NavPath'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import {fetchProfile, logout} from '../../actions/user';

import 'antd/style/index.less';
import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onCollapseChange = this.onCollapseChange.bind(this);
    this.state = {
      collapse: true,
    };
  }

  componentWillMount() {
    const {actions} = this.props;
    actions.fetchProfile();
  }

  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  render() {
    const {user, actions} = this.props;
    const collapse = this.state.collapse;

    return (
      <div>
      <Header user={user} />
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
        <aside className="ant-layout-sider" style={{'position': 'fixed'}} >
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
        <div className="ant-layout-main">
          
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {
      user: user ? user : null,
  };
};

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({fetchProfile, logout}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
