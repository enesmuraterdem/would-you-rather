import { Layout } from 'antd';

const LoginLayout = ({ children }) => {
    return (
        <Layout.Content style={{ height: '100vh' }}>
            { children }
        </Layout.Content>
    )
}

export default LoginLayout;