import React from 'react';
import { Layout } from 'antd';
import DataTable from './components/DataTable.tsx';


const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <DataTable />
      </Content>
      <Footer style={{ textAlign: 'center' }}>M.Lavrov ©2023 Created by me </Footer>
    </Layout>
  );
};

export default App;