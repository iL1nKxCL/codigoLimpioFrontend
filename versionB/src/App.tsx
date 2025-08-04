// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import EvaluacionSistema from "./EvaluacionSistema";
import { Layout, Menu } from "antd";

// ⚠️ Esta línea está para generar error ESLint 
const A = "⚠️ El Código Está Sin errores. Bueno, exceptuando este..."; 

const { Header, Content } = Layout;

const App = () => {
  console.log("📦 App renderizado");

  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Productos</Link>
            </Menu.Item>
            <Menu.Item key="2" aria-labelledby="evaluacion-id">
              <span id="evaluacion-id">
                <Link to="/evaluacion-sistema">Evaluación del Sistema</Link>
              </span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/evaluacion-sistema" element={<EvaluacionSistema />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};



export default App;
