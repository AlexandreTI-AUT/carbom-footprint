import { useState } from "react";
import "./FormCarbono.css";

const tiposEmissao = [
  "CO₂ (Dióxido de Carbono)",
  "CH₄ (Metano)",
  "N₂O (Óxido Nitroso)",
  "CFCs (Clorofluorcarbonetos)",
  "HFCs (Hidrofluorcarbonetos)",
  "SF₆ (Hexafluoreto de Enxofre)",
  "O₃ (Ozônio)",
  "NOx (Óxidos de Nitrogênio)",
  "SO₂ (Dióxido de Enxofre)",
  "CO (Monóxido de Carbono)",
];

const FormCarbono = () => {
  const [empresa, setEmpresa] = useState("");
  const [tipoEmissao, setTipoEmissao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateFields = () => {
    let formErrors = {};

    if (!empresa.trim())
      formErrors.empresa = "Por favor, insira o nome da empresa.";
    if (!tipoEmissao.trim())
      formErrors.tipoEmissao = "Selecione um tipo de emissão.";
    if (!quantidade.trim()) {
      formErrors.quantidade = "Informe a quantidade estimada.";
    } else if (!/^\d+$/.test(quantidade)) {
      formErrors.quantidade = "Digite apenas números inteiros.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();

    if (isValid) {
      console.log("Formulário enviado!", { empresa, tipoEmissao, quantidade });

      setSuccessMessage(
        "Com base na quantidade informada, podemos calcular os créditos de carbono necessários."
      );

      setEmpresa("");
      setTipoEmissao("");
      setQuantidade("");
      setErrors({});

      setTimeout(() => setSuccessMessage(""), 20000);
    }
  };

  return (
    <div className="form-container" data-test-id="form-container">
      <h2 data-test-id="titulo-form">Registrar Pegada de Carbono</h2>
      <p className="subtitulo">Preencha os dados</p>

      <form onSubmit={handleSubmit} data-test-id="form-carbono">
        {/* Empresa */}
        <div className="form-group">
          <label htmlFor="empresa">
            Empresa: <span className="required">*</span>
          </label>
          <input
            id="empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Digite o nome da empresa"
            data-test-id="input-empresa"
            autoFocus
          />
          {errors.empresa && (
            <span className="error-message">{errors.empresa}</span>
          )}
        </div>

        {/* Tipo de Emissão */}
        <div className="form-group">
          <label htmlFor="tipoEmissao">
            Tipo de Emissão: <span className="required">*</span>
          </label>
          <select
            id="tipoEmissao"
            value={tipoEmissao}
            onChange={(e) => setTipoEmissao(e.target.value)}
            data-test-id="select-tipo-emissao"
          >
            <option value="">Selecione um tipo</option>
            {tiposEmissao.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          {errors.tipoEmissao && (
            <span className="error-message">{errors.tipoEmissao}</span>
          )}
        </div>

        {/* Quantidade Estimada */}
        <div className="form-group">
          <label htmlFor="quantidade">
            Quantidade Estimada (toneladas): <span className="required">*</span>
          </label>
          <input
            id="quantidade"
            type="number"
            min="0"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value.replace(/\D/g, ""))}
            placeholder="Digite a quantidade em toneladas"
            data-test-id="input-quantidade"
          />
          {errors.quantidade && (
            <span className="error-message">{errors.quantidade}</span>
          )}
        </div>

        {/* Botão */}
        <button type="submit" data-test-id="botao-registrar">
          Registrar
        </button>
      </form>

      {successMessage && (
        <p className="success-message" data-test-id="mensagem-sucesso">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default FormCarbono;
