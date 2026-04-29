import React, { useState } from "react";

const diseases = [
  { id: "leucemia", label: "🔴 Leucemias agudas / LPA" },
  { id: "linfoma", label: "🟠 Linfomas" },
  { id: "mieloma", label: "🟡 Mieloma múltiplo" },
  { id: "citopenia", label: "🟢 Citopenias / SMD" },
  { id: "mpn", label: "🔵 MPN / LMC" }
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selected, setSelected] = useState("");
  const [prontuario, setProntuario] = useState("");

  if (screen === "home") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Suspeita de Neoplasia Onco-Hematológica</h2>
        {diseases.map(d => (
          <button
            key={d.id}
            style={{ display: "block", margin: 10, padding: 10 }}
            onClick={() => {
              setSelected(d.label);
              setScreen("onepage");
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
    );
  }

  if (screen === "onepage") {
    return (
      <div style={{ padding: 20 }}>
        <h2>{selected}</h2>
        <p>Aqui entra o one page da doença.</p>

        <button onClick={() => setScreen("form")}>
          Registrar prontuário
        </button>
      </div>
    );
  }

  if (screen === "form") {
    return (
      <div style={{ padding: 20 }}>
        <h3>Registro</h3>

        <input
          placeholder="Número do prontuário"
          value={prontuario}
          onChange={e => setProntuario(e.target.value)}
        />

        <br /><br />

        <button
          onClick={() => alert("Registrado: " + prontuario)}
        >
          Confirmar
        </button>
      </div>
    );
  }
}