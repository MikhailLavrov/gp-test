import React from 'react';
import { Layout } from 'antd';
import { DataTableContainer } from './components/DataTableContainer.tsx';
import { GithubOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header style={{color: '#fff'}}>Data: mockapi.io / Design: ant.design / Statement: Redux / ReactJS / TypeScript </Header>
      <Content style={{ padding: '0 50px' }}>
        <DataTableContainer />
      </Content>
      <Footer style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ©2023 &nbsp;
        <a href={'https://github.com/MikhailLavrov/gp-test'} style={{display: 'flex', alignItems: 'center', color: '#000'}}>
          <GithubOutlined style={{fontSize: '24px'}} />&nbsp; MikhailLavrov
        </a> 
      </Footer>
    </Layout>
  );
};

export default App;