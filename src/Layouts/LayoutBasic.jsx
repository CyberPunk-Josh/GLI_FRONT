import React, {useState, Fragment} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SignIn from '../Pages/SignIn';
import MenuSider from '../Pages/MenuSider';
import MenuTop from '../Components/MenuTop';
import { Layout } from 'antd';

// scss
import './LayoutBasic.scss'


const LayoutBasic = (props) => {

    const { routes } = props;
    const {Header, Content} = Layout;

    const {user, isLoading} = useAuth()

    // close and open menu:
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    if(!user && !isLoading){
        return(
            <Fragment>
                <Route path="/" component={SignIn}/>
                <Redirect to="/" />
            </Fragment>
        )
    }

    if(user && !isLoading){
        return ( 
            <Layout>
                <MenuSider
                    menuCollapsed={menuCollapsed}
                />
                <Layout className='layout-admin' style={{ marginLeft: menuCollapsed ? '80px' : '200px'}}>
                    <Header className='layout-admin__header'>
                        <MenuTop
                            setMenuCollapsed={setMenuCollapsed}
                            menuCollapsed={menuCollapsed}
                        />
                    </Header>
                    <Content className='layout-admin__content'>
                        <LoadRoutes routes={routes} />
                    </Content>
                </Layout>
            </Layout>
         );
    }

    return null;
}

function LoadRoutes({routes}) {

    return(
        <Switch>
        {routes.map((route, index) =>(
            <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
        ))}
        </Switch>
    )
};
 
export default LayoutBasic;