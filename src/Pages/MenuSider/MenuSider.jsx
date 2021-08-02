import React from 'react';
import {Link, withRouter } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {AppleOutlined, UserOutlined, PicCenterOutlined, TeamOutlined, ShoppingOutlined, CalendarOutlined, WarningOutlined, RiseOutlined} from '@ant-design/icons';


// SCSS:
import './MenuSider.scss';

function MenuSider(props){

    const {menuCollapsed, location} = props;
    const {Sider} = Layout;

    return(
        <Sider className="menu-sider" collapsed={menuCollapsed}> 
            <Menu theme='light' mode='inline' defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key='1'>
                    <Link to={'#'}>
                        <UserOutlined />
                        <span className='nav-text'>Admin</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='2'>
                    <Link to={'#'}>
                        <PicCenterOutlined />
                        <span className='nav-text'>Catalogues</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='3'>
                    <Link to={'#'}>
                        <TeamOutlined />
                        <span className='nav-text'>Leaders</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='4'>
                    <Link to={'#'}>
                    <ShoppingOutlined />
                        <span className='nav-text'>Users</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='5'>
                    <Link to={'#'}>
                    <TeamOutlined />
                        <span className='nav-text'>My Company</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='/courses'>
                    <Link to={'/courses'}>
                        <AppleOutlined />
                        <span className='nav-text'>Courses</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='6'>
                    <Link to={'#'}>
                    <ShoppingOutlined />
                        <span className='nav-text'>Rewards</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='7'>
                    <Link to={'#'}>
                    <CalendarOutlined />
                        <span className='nav-text'>Events</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='8'>
                    <Link to={'#'}>
                    <WarningOutlined />
                        <span className='nav-text'>Notifications</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key='9'>
                    <Link to={'#'}>
                    <RiseOutlined />
                        <span className='nav-text'>Reports</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);