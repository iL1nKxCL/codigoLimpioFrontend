import React, { useState } from "react";
import {
  Tabs,
  Card,
  Rate,
  Input,
  Button,
  message,
  Table,
  InputNumber,
  Select,
  Form,
} from "antd";
import jsPDF from "jspdf";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const EvaluacionSistema = () => {
  console.log("📊 Evaluación del sistema cargada");

  const [form] = Form.useForm();
  const [data, setData] = useState([
    { key: "1", metric: "Puntaje Lighthouse (%)", versionA: 0, versionB: 0 },
    { key: "2", metric: "Errores ESLint", versionA: 0, versionB: 0 },
    { key: "3", metric: "Tiempo de carga (ms)", versionA: 0, versionB: 0 },
    { key: "4", metric: "Accesibilidad (WAVE)", versionA: 0, versionB: 0 },
  ]);

  const handleTableChange = (value: number, index: number, key: "versionA" | "versionB") => {
    const updated = [...data];
    updated[index][key] = value;
    setData(updated);
  };

const handleGeneratePDF = (values: any) => {
  const doc = new jsPDF();

  // 🔷 Título principal
  doc.setTextColor(40, 40, 180); // Azul
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Evaluación Código Limpio Frontend", 105, 20, { align: "center" });

  // 🔧 Información personal
  doc.setTextColor(0, 0, 0); // Negro
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Evaluador: ${values.nombre}`, 20, 35);
  doc.text(`Rol: ${values.rol}`, 20, 42);
  doc.text(`Experiencia previa: ${values.experiencia || "No indicada"}`, 20, 49);

  // 🧱 Línea divisoria
  doc.setDrawColor(160, 160, 160);
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);

  // 📊 Comparación técnica
  doc.setTextColor(0, 140, 0); // Verde oscuro
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Comparación técnica", 20, 65);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  data.forEach((item, idx) => {
    const line = `${item.metric}: A=${item.versionA}, B=${item.versionB}`;
    doc.text(line, 25, 75 + idx * 8);
  });

  const offset = 75 + data.length * 8 + 10;

  doc.line(20, offset, 190, offset);

  // ⭐ Evaluación de percepción
  doc.setTextColor(180, 80, 30); // Rojo suave
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Evaluación de percepción", 20, offset + 10);

  const perceptionMetrics = [
    ["Claridad de la interfaz", values.claridadInterfaz],
    ["Calidad del código", values.calidadCodigo],
    ["Accesibilidad visual", values.accesibilidad],
    ["Rendimiento general", values.rendimiento],
    ["Facilidad de uso", values.usabilidad],
    ["Satisfacción general", values.satisfaccion],
  ];

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  perceptionMetrics.forEach((metric, i) => {
    doc.text(`${metric[0]}: ${metric[1] || 0}/5`, 25, offset + 20 + i * 8);
  });

  // 📝 Comentarios
  doc.text("Comentarios adicionales:", 25, offset + 75);
  doc.setFont("helvetica", "italic");
  doc.text(
    doc.splitTextToSize(values.comentarios || "Sin comentarios", 160),
    25,
    offset + 83
  );

  // 📥 Guardar
  doc.save(`evaluacion_codigolimpio_${values.nombre.replace(/\s+/g, "_")}.pdf`);
  message.success("🎉 PDF estilizado generado correctamente");

  };

  // Validación manual
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleGeneratePDF(values);
    } catch (error) {
      message.error("❌ Completa los campos requeridos correctamente.");
    }
  };

  const columns = [
    { title: "Métrica", dataIndex: "metric", key: "metric" },
    { title: "Versión A", dataIndex: "versionA", key: "versionA" },
    { title: "Versión B", dataIndex: "versionB", key: "versionB" },
  ];

  return (
    <Card title="Evaluación Detallada del Sistema">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Comparación Técnica" key="1">
          <Table
            pagination={false}
            dataSource={data.map((row, index) => ({
              ...row,
              versionA: (
                <InputNumber
                  aria-label={`Versión A para ${row.metric}`}
                  value={row.versionA}
                  min={0}
                  onChange={(val) => handleTableChange(val ?? 0, index, "versionA")}
                />
              ),
              versionB: (
                <InputNumber
                  aria-label={`Versión B para ${row.metric}`}
                  value={row.versionB}
                  min={0}
                  onChange={(val) => handleTableChange(val ?? 0, index, "versionB")}
                />
              ),
            }))}
            columns={columns}
          />
        </TabPane>

        <TabPane tab="Encuesta Detallada" key="2">
          <Form form={form} layout="vertical">
            <Form.Item
              label="* Nombre del evaluador"
              name="nombre"
              rules={[{ required: true, message: "'nombre' es requerido." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="* Rol del evaluador"
              name="rol"
              rules={[{ required: true, message: "'rol' es requerido." }]}
            >
              <Select>
                <Option value="Desarrollador">Desarrollador</Option>
                <Option value="Tester">Tester</Option>
                <Option value="Estudiante">Estudiante</Option>
                <Option value="Usuario final">Usuario final</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Experiencia previa en sistemas similares" name="experiencia">
              <Input />
            </Form.Item>
            <Form.Item label="Claridad de la interfaz" name="claridadInterfaz">
              <Rate />
            </Form.Item>
            <Form.Item label="Calidad del código (percibida)" name="calidadCodigo">
              <Rate />
            </Form.Item>
            <Form.Item label="Accesibilidad visual y navegación" name="accesibilidad">
              <Rate />
            </Form.Item>
            <Form.Item label="Rendimiento general del sistema" name="rendimiento">
              <Rate />
            </Form.Item>
            <Form.Item label="Facilidad de uso" name="usabilidad">
              <Rate />
            </Form.Item>
            <Form.Item label="Satisfacción general con la aplicación" name="satisfaccion">
              <Rate />
            </Form.Item>
            <Form.Item label="Comentarios adicionales" name="comentarios">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Descargar Informe Detallado en PDF
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default EvaluacionSistema;
