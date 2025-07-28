import React from "react";
import { Layout } from "antd";
import ProductList from "./components/ProductList";

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header style={{ color: "#fff", fontSize: "20px" }}>Version B Codigo Limpio FrontEnd</Header>
    <Content style={{ padding: "20px" }}>
      <ProductList />
    </Content>
  </Layout>
);

const prueba = 123;

export default App;
