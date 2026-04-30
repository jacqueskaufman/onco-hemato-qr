import React, { useState } from "react";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzJKuSHcRJFIhHDMrDzoabVvcdMFEM_nkNwV-u9EjObhUFXgdayfoViRFik3tTVLTrE/exec";

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
  const [saving, setSaving] = useState(false);

  async function salvarRegistro() {
    if (!selected) return;

    setSaving(true);

    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          prontuario: prontuario,
          medico: medico,
          suspeita: selected.label
        })
      });

      setScreen("final");
    } catch (error) {
      alert("Erro ao salvar registro. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  if (screen === "identificacao") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>HemOncTrack</h1>
          <p style={styles.subtitle}>
            Suspeita de neoplasia onco-hematológica na emergência
          </p>

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
            style={
              !prontuario || !medico
                ? styles.buttonDisabled
                : styles.buttonPrimary
            }
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
            Prontuário: <strong>{prontuario}</strong>
            <br />
            Médico: <strong>{medico}</strong>
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
            style={saving ? styles.buttonDisabled : styles.buttonPrimary}
            disabled={saving}
            onClick={salvarRegistro}
          >
            {saving ? "Salvando..." : "Confirmar registro"}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "final") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>✅ Registro realizado</h1>

          <p style={styles.subtitle}>
            Obrigado pela utilização do HemOncTrack.
          </p>

          <div style={styles.summaryBox}>
            <p>
              <strong>Prontuário:</strong> {prontuario}
            </p>
            <p>
              <strong>Médico:</strong> {medico}
            </p>
            <p>
              <strong>Suspeita:</strong> {selected?.label}
            </p>
          </div>

          <button
            style={styles.buttonPrimary}
            onClick={() => {
              setProntuario("");
              setMedico("");
              setSelected(null);
              setScreen("identificacao");
            }}
          >
            Novo atendimento
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
    maxWidth: "600px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
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
    marginBottom: "10px",
    fontSize: "30px",
    fontWeight: "800"
  },

  subtitle: {
    color: "#475569",
    fontSize: "17px",
    marginBottom: "24px",
    lineHeight: "1.5"
  },

  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "16px",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "20px"
  },

  buttonPrimary: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    background: "#6b1b73",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "16px"
  },

  buttonDisabled: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    background: "#94a3b8",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "16px"
  },

  diseaseButton: {
    display: "block",
    width: "100%",
    padding: "18px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    textAlign: "left",
    cursor: "pointer"
  },

  backButton: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    cursor: "pointer",
    marginBottom: "14px",
    fontSize: "16px",
    fontWeight: "600"
  },

  onePageImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
  },

  summaryBox: {
    background: "#f1f5f9",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "1.4"
  }
};