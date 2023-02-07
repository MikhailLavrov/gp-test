import React from 'react';
import { Layout } from 'antd';
import DataTable from './components/DataTable.tsx';
import { GithubOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <DataTable />
      </Content>
      <Footer style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ©2023 &nbsp;
        <a href={'https://github.com/MikhailLavrov/gp-test'}>
          <GithubOutlined style={{fontSize: '24px'}} />
        </a>
      </Footer>
    </Layout>
  );
};

export default App;