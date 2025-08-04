import React, { useState } from "react";
import { Tabs, Card, Rate, Input, Button, message, Table, InputNumber, Select, Form } from "antd";
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
    console.log(`📈 Cambió ${key} de ${updated[index].metric} a`, value);
  };

  const handleGeneratePDF = (values: any) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Evaluación del Sistema`, 10, 10);
    doc.text(`Evaluador: ${values.nombre}`, 10, 18);
    doc.text(`Rol: ${values.rol}`, 10, 26);
    doc.text(`Experiencia previa: ${values.experiencia}`, 10, 34);

    doc.text("\n📊 Comparación técnica:", 10, 44);
    data.forEach((item, idx) => {
      const line = `${item.metric}: A=${item.versionA}, B=${item.versionB}`;
      doc.text(line, 10, 54 + idx * 10);
    });

    const offset = 54 + data.length * 10 + 10;
    doc.text("\n📋 Evaluación de percepción:", 10, offset);
    doc.text(`Claridad de la interfaz: ${values.claridadInterfaz}/5`, 10, offset + 10);
    doc.text(`Calidad del código: ${values.calidadCodigo}/5`, 10, offset + 20);
    doc.text(`Accesibilidad visual: ${values.accesibilidad}/5`, 10, offset + 30);
    doc.text(`Rendimiento general: ${values.rendimiento}/5`, 10, offset + 40);
    doc.text(`Facilidad de uso: ${values.usabilidad}/5`, 10, offset + 50);
    doc.text(`Satisfacción general: ${values.satisfaccion}/5`, 10, offset + 60);
    doc.text("Comentarios adicionales:", 10, offset + 70);
    doc.text(doc.splitTextToSize(values.comentarios, 180), 10, offset + 80);

    doc.save(`evaluacion_${values.nombre.replace(/\s+/g, '_')}.pdf`);
    message.success("📥 PDF generado correctamente");
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
          <Form form={form} layout="vertical" onFinish={handleGeneratePDF}>
            <Form.Item label="Nombre del evaluador" name="nombre" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item label="Rol del evaluador" name="rol" rules={[{ required: true }]}> <Select><Option value="Desarrollador">Desarrollador</Option><Option value="Tester">Tester</Option><Option value="Estudiante">Estudiante</Option><Option value="Usuario final">Usuario final</Option></Select> </Form.Item>
            <Form.Item label="Experiencia previa en sistemas similares" name="experiencia"> <Input /> </Form.Item>
            <Form.Item label="Claridad de la interfaz" name="claridadInterfaz"> <Rate /> </Form.Item>
            <Form.Item label="Calidad del código (percibida)" name="calidadCodigo"> <Rate /> </Form.Item>
            <Form.Item label="Accesibilidad visual y navegación" name="accesibilidad"> <Rate /> </Form.Item>
            <Form.Item label="Rendimiento general del sistema" name="rendimiento"> <Rate /> </Form.Item>
            <Form.Item label="Facilidad de uso" name="usabilidad"> <Rate /> </Form.Item>
            <Form.Item label="Satisfacción general con la aplicación" name="satisfaccion"> <Rate /> </Form.Item>
            <Form.Item label="Comentarios adicionales" name="comentarios"> <TextArea rows={4} /> </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Descargar Informe Detallado en PDF</Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default EvaluacionSistema;