import React, { useState } from "react";
import { Tabs, Card, Rate, Input, Button, message, Table, InputNumber, Select } from "antd";
import jsPDF from "jspdf";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const EvaluacionSistema = () => {
  console.log("📊 Evaluación del sistema cargada");

  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [claridadInterfaz, setClaridadInterfaz] = useState(0);
  const [calidadCodigo, setCalidadCodigo] = useState(0);
  const [accesibilidad, setAccesibilidad] = useState(0);
  const [rendimiento, setRendimiento] = useState(0);
  const [usabilidad, setUsabilidad] = useState(0);
  const [satisfaccion, setSatisfaccion] = useState(0);
  const [comentarios, setComentarios] = useState("");

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

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Evaluación del Sistema`, 10, 10);
    doc.text(`Evaluador: ${nombre}`, 10, 18);
    doc.text(`Rol: ${rol}`, 10, 26);
    doc.text(`Experiencia previa: ${experiencia}`, 10, 34);

    doc.text("\n📊 Comparación técnica:", 10, 44);
    data.forEach((item, idx) => {
      const line = `${item.metric}: A=${item.versionA}, B=${item.versionB}`;
      doc.text(line, 10, 54 + idx * 10);
    });

    const offset = 54 + data.length * 10 + 10;
    doc.text("\n📋 Evaluación de percepción:", 10, offset);
    doc.text(`Claridad de la interfaz: ${claridadInterfaz}/5`, 10, offset + 10);
    doc.text(`Calidad del código: ${calidadCodigo}/5`, 10, offset + 20);
    doc.text(`Accesibilidad visual: ${accesibilidad}/5`, 10, offset + 30);
    doc.text(`Rendimiento general: ${rendimiento}/5`, 10, offset + 40);
    doc.text(`Facilidad de uso: ${usabilidad}/5`, 10, offset + 50);
    doc.text(`Satisfacción general: ${satisfaccion}/5`, 10, offset + 60);
    doc.text("Comentarios adicionales:", 10, offset + 70);
    doc.text(doc.splitTextToSize(comentarios, 180), 10, offset + 80);

    doc.save(`evaluacion_${nombre.replace(/\s+/g, '_')}.pdf`);
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
                  value={row.versionA}
                  min={0}
                  onChange={(val) => handleTableChange(val ?? 0, index, "versionA")}
                />
              ),
              versionB: (
                <InputNumber
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
          <p>Nombre del evaluador</p>
          <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" />

          <p>Rol del evaluador</p>
          <Select value={rol} onChange={setRol} placeholder="Selecciona tu rol">
            <Option value="Desarrollador">Desarrollador</Option>
            <Option value="Tester">Tester</Option>
            <Option value="Estudiante">Estudiante</Option>
            <Option value="Usuario final">Usuario final</Option>
          </Select>

          <p>Experiencia previa en sistemas similares</p>
          <Input value={experiencia} onChange={(e) => setExperiencia(e.target.value)} placeholder="Breve descripción" />

          <p>Claridad de la interfaz</p>
          <Rate value={claridadInterfaz} onChange={setClaridadInterfaz} />

          <p>Calidad del código (percibida)</p>
          <Rate value={calidadCodigo} onChange={setCalidadCodigo} />

          <p>Accesibilidad visual y navegación</p>
          <Rate value={accesibilidad} onChange={setAccesibilidad} />

          <p>Rendimiento general del sistema</p>
          <Rate value={rendimiento} onChange={setRendimiento} />

          <p>Facilidad de uso</p>
          <Rate value={usabilidad} onChange={setUsabilidad} />

          <p>Satisfacción general con la aplicación</p>
          <Rate value={satisfaccion} onChange={setSatisfaccion} />

          <p>Comentarios adicionales</p>
          <TextArea rows={4} value={comentarios} onChange={(e) => setComentarios(e.target.value)} />

          <Button type="primary" onClick={handleGeneratePDF} style={{ marginTop: 10 }}>
            Descargar Informe Detallado en PDF
          </Button>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default EvaluacionSistema;
