import React from 'react';
import {Layout, Tabs} from 'antd';
import Logo from '../../Img/Logo.png';

// components
import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm';


// importing SASS file
import './SignIn.scss';

const SignIn = () => {

    const { Content} = Layout;
    const {TabPane} = Tabs;

    return ( 
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="logo GLI"/>
                </h1>

                <div className="sign-in__content-tabs">
                    <Tabs type='card'>
                        <TabPane tab={<span>Login</span>} key="1">
                            <LoginForm/>
                        </TabPane>
                        <TabPane tab={<span>Sign Up</span>} key="2">
                            <RegisterForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
     );
}
 
export default SignIn;