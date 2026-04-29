import React, { useState } from "react";

const diseases = [
  { id: "leucemias", label: "🔴 Leucemias agudas", image: "/leucemias.jpg" },
  { id: "llc", label: "🟣 LLC", image: "/llc.jpg" },
  { id: "linfoma", label: "🟠 Linfomas", image: "/linfoma.jpg" },
  { id: "mieloma", label: "🟡 Mieloma múltiplo", image: "/mieloma.jpg" },
  { id: "citopenias", label: "🟢 Citopenias / SMD", image: "/citopenias.jpg" },
  { id: "lmc", label: "🔵 LMC", image: "/lmc.jpg" },
  { id: "mielofibrose", label: "🟤 Mielofibrose", image: "/mielofibrose.jpg" }
];

export default function App() {
  const [screen, setScreen] = useState("identificacao");
  const [selected, setSelected] = useState(null);
  const [prontuario, setProntuario] = useState("");
  const [medico, setMedico] = useState("");

  if (screen === "identificacao") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>HemOncTrack</h1>
          <p style={styles.subtitle}>Suspeita de neoplasia onco-hematológica na emergência</p>

          <input
            placeholder="Número do prontuário"
            value={prontuario}
            onChange={e => setProntuario(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Nome do médico"
            value={medico}
            onChange={e => setMedico(e.target.value)}
            style={styles.input}
          />

          <button
            disabled={!prontuario || !medico}
            onClick={() => setScreen("home")}
            style={!prontuario || !medico ? styles.buttonDisabled : styles.buttonPrimary}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (screen === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Selecionar suspeita</h1>
          <p style={styles.subtitle}>
            Prontuário: <strong>{prontuario}</strong> | Médico: <strong>{medico}</strong>
          </p>

          {diseases.map(d => (
            <button
              key={d.id}
              style={styles.diseaseButton}
              onClick={() => {
                setSelected(d);
                setScreen("onepage");
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "onepage" && selected) {
    return (
      <div style={styles.page}>
        <div style={styles.cardWide}>
          <button onClick={() => setScreen("home")} style={styles.backButton}>
            ← Voltar
          </button>

          <h1 style={styles.title}>{selected.label}</h1>

          <img
            src={selected.image}
            alt={selected.label}
            style={styles.onePageImage}
          />

          <button
            style={styles.buttonPrimary}
            onClick={() =>
              alert(
                "Registro confirmado:\n" +
                "Prontuário: " + prontuario + "\n" +
                "Médico: " + medico + "\n" +
                "Suspeita: " + selected.label
              )
            }
          >
            Confirmar registro
          </button>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "20px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111827"
  },
  card: {
    maxWidth: "520px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
  },
  cardWide: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
  },
  title: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "28px",
    fontWeight: "800"
  },
  subtitle: {
    color: "#475569",
    fontSize: "15px",
    marginBottom: "20px"
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "12px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px"
  },
  buttonPrimary: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#6b1b73",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "14px"
  },
  buttonDisabled: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#94a3b8",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    marginTop: "14px"
  },
  diseaseButton: {
    display: "block",
    width: "100%",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    textAlign: "left",
    cursor: "pointer"
  },
  backButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    cursor: "pointer",
    marginBottom: "12px"
  },
  onePageImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
  }
};