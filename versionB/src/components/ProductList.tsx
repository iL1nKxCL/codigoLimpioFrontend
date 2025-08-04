import React, { useState, useEffect } from "react";
import { Button, Input, Card, message, InputNumber, Space, Select, Modal, } from "antd";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { SearchOutlined } from "@ant-design/icons";
import "./ProductList.css";

const { Search } = Input;

interface Product {
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
}

const STORAGE_KEY = "productos_versionB";

const categories = [
  { label: "Ropa", value: "ropa" },
  { label: "Zapatos", value: "zapatos" },
  { label: "Polerones", value: "polerones" },
  { label: "Frutas", value: "frutas" },
  { label: "Verduras", value: "verduras" },
  { label: "Tecnología", value: "tecnologia" },
  { label: "Otros", value: "otros" },
];

const formatNumber = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const capitalizeWords = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("otros");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [sortOption, setSortOption] = useState<string>("none");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (!name || !description || !category || stock < 0 || price <= 0) {
      return message.error("Complete todos los campos correctamente.");
    }
    const newProduct: Product = { name, description, stock, price, category };
    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setDescription("");
    setStock(0);
    setPrice(0);
    setCategory("otros");
    message.success("Producto agregado");
  };

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    message.info("Producto eliminado");
  };

  const openEditModal = (index: number) => {
    setEditingProductIndex(index);
    setEditProduct(products[index]);
    setIsModalVisible(true);
  };

  const handleEditChange = (field: keyof Product, value: string | number) => {
    setEditProduct((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const saveEditProduct = () => {
    if (editingProductIndex !== null && editProduct) {
      const updatedProducts = [...products];
      updatedProducts[editingProductIndex] = editProduct;
      setProducts(updatedProducts);
      message.success("Producto actualizado");
    }
    setIsModalVisible(false);
    setEditingProductIndex(null);
    setEditProduct(null);
  };

  const getSortedProducts = () => {
    const sorted = [...products];
    switch (sortOption) {
      case "priceAsc":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "category":
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return sorted;
    }
  };

  const getFilteredProducts = () => {
    return getSortedProducts().filter((item) =>
      `${item.name} ${item.category} ${item.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="product-container">
      <Card className="product-card" title="Agrega tus productos">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Nombre"
            aria-label="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Descripción"
            aria-label="Descripción del producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select
            aria-label="Categoría del producto"
            value={category}
            onChange={(val) => setCategory(val)}
            options={categories}
            style={{ width: "100%" }}
          />
          <Space align="end">
            <div className="input-block">
              <label htmlFor="stock-input">Stock:</label>
              <InputNumber
                id="stock-input"
                aria-label="Cantidad en stock"
                value={stock}
                onChange={(val) => setStock(val ?? 0)}
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value?.replace(/\./g, "") as unknown as number}
              />
            </div>
            <div className="input-block">
              <label htmlFor="price-input">Precio:</label>
              <InputNumber
                id="price-input"
                aria-label="Precio del producto"
                value={price}
                onChange={(val) => setPrice(val ?? 0)}
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(\.)/g, "") as unknown as number
                }
              />
            </div>
            <Button
              type="primary"
              className="btn-gradient"
              onClick={addProduct}
              aria-label="Agregar producto"
            >
              Agregar
            </Button>
          </Space>
        </Space>
      </Card>

      {/* Barra de búsqueda y ordenación */}
      <Space style={{ marginTop: "20px", marginBottom: "10px", width: "100%", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por nombre o categoría..."
          aria-label="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          enterButton={<Button aria-label="Buscar" icon={<SearchOutlined />} />}
          style={{ maxWidth: 300 }}
        />
        <Select
          aria-label="Ordenar productos"
          value={sortOption}
          onChange={(value) => setSortOption(value)}
          style={{ width: 200 }}
          options={[
            { label: "Sin orden", value: "none" },
            { label: "Precio: menor a mayor", value: "priceAsc" },
            { label: "Precio: mayor a menor", value: "priceDesc" },
            { label: "Nombre (A-Z)", value: "name" },
            { label: "Categoría (A-Z)", value: "category" },
          ]}
        />
      </Space>

<TransitionGroup className="products-list">
  {getFilteredProducts().map((item, index) => (
    <CSSTransition key={index} timeout={400} classNames="fade">
      <div>
        <Card className="product-item">
          <div className="product-header">
            <h3 className="product-name">{capitalizeWords(item.name)}</h3>
            <span className="product-price">$ {formatNumber(item.price)}</span>
          </div>

          <div className="product-info">
            <p><strong>Categoría:</strong> {capitalizeWords(item.category)}</p>
            <p><strong>Stock:</strong> {formatNumber(item.stock)}</p>
            <p>{capitalizeWords(item.description)}</p>
          </div>

          <Space style={{ marginTop: "10px" }}>
            <Button
              type="default"
              onClick={() => openEditModal(index)}
              aria-label={`Editar ${item.name}`}
            >
              Editar
            </Button>
            <Button
              danger
              onClick={() => removeProduct(index)}
              aria-label={`Eliminar ${item.name}`}
            >
              Eliminar
            </Button>
          </Space>
        </Card>
      </div>
    </CSSTransition>
  ))}
</TransitionGroup>

      {/* Modal para editar */}
        <Modal
          title={<h2 id="edit-title">Editar Producto</h2>}
          open={isModalVisible}
          onOk={saveEditProduct}
          onCancel={() => setIsModalVisible(false)}
          okText="Guardar"
          cancelText="Cancelar"
          aria-labelledby="edit-title"
        >
        {editProduct && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="Nombre"
              aria-label="Nombre editado del producto"
              value={editProduct.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <Input
              placeholder="Descripción"
              aria-label="Descripción editada del producto"
              value={editProduct.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
            />
            <Select
              aria-label="Categoría editada del producto"
              value={editProduct.category}
              onChange={(val) => handleEditChange("category", val)}
              options={categories}
              style={{ width: "100%" }}
            />
            <label htmlFor="edit-stock-input">Stock:</label>
            <InputNumber
              id="edit-stock-input"
              aria-label="Stock editado del producto"
              value={editProduct.stock}
              onChange={(val) => handleEditChange("stock", val ?? 0)}
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value?.replace(/\./g, "") as unknown as number}
            />
            <label htmlFor="edit-price-input">Precio:</label>
            <InputNumber
              id="edit-price-input"
              aria-label="Precio editado del producto"
              value={editProduct.price}
              onChange={(val) => handleEditChange("price", val ?? 0)}
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(\.)/g, "") as unknown as number
              }
            />
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default ProductList;