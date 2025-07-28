import React, { useState, useEffect } from "react";
import { Button, Input, Card, List, message, InputNumber, Space } from "antd";

interface Product {
  name: string;
  description: string;
  stock: number;
  price: number;
}

const STORAGE_KEY = "productos_versionB";

const ProductList: React.FC = () => {
  // 1. Leer directamente desde localStorage al inicializar el estado
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  // 2. Guardar en localStorage cada vez que products cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (!name || !description || stock < 0 || price <= 0) {
      return message.error("Complete todos los campos correctamente.");
    }
    const newProduct: Product = { name, description, stock, price };
    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setDescription("");
    setStock(0);
    setPrice(0);
    message.success("Producto agregado");
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    message.info("Producto eliminado");
  };

  return (
    <Card title="Gestión de Productos">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Space align="center">
          <div style={{ display: "flex", flexDirection: "column", width: "100px" }}>
            <label>Stock:</label>
            <InputNumber
              placeholder="Stock"
              value={stock}
              onChange={(val) => setStock(val ?? 0)}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "100px" }}>
            <label>Precio:</label>
            <InputNumber
              placeholder="Precio"
              value={price}
              onChange={(val) => setPrice(val ?? 0)}
              style={{ width: "100%" }}
            />
          </div>
          <Button type="primary" onClick={addProduct} style={{ marginTop: "22px" }}>
            Agregar
          </Button>
        </Space>
      </Space>
      <List
        style={{ marginTop: "20px" }}
        dataSource={products}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button danger onClick={() => removeProduct(index)}>
                Eliminar
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`${item.name} - $${item.price}`}
              description={`Stock: ${item.stock} | ${item.description}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProductList;
