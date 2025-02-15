import { useState } from "react";
import "./FormCarbono.css";

const FormCarbono = () => {
  const [empresa, setEmpresa] = useState("");
  const [tipoEmissao, setTipoEmissao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateFields = () => {
    let formErrors = {};

    if (!empresa.trim()) formErrors.empresa = "Empresa é obrigatória.";
    if (!tipoEmissao.trim())
      formErrors.tipoEmissao = "Tipo de emissão é obrigatório.";
    if (!quantidade.trim()) {
      formErrors.quantidade = "Quantidade estimada é obrigatória.";
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
    }
  };

  return (
    <div className="form-container" data-test-id="form-container">
      <h2 data-test-id="titulo-form">Registrar Pegada de Carbono</h2>
      <p className="subtitulo">Preencha os dados</p>

      <form onSubmit={handleSubmit} data-test-id="form-carbono">
        <div className="form-group">
          <label>Empresa:</label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            data-test-id="input-empresa"
          />
          {errors.empresa && (
            <span className="error-message" data-test-id="erro-empresa">
              {errors.empresa}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Tipo de Emissão:</label>
          <input
            type="text"
            value={tipoEmissao}
            onChange={(e) => setTipoEmissao(e.target.value)}
            data-test-id="input-tipo-emissao"
          />
          {errors.tipoEmissao && (
            <span className="error-message" data-test-id="erro-tipo-emissao">
              {errors.tipoEmissao}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Quantidade Estimada (toneladas):</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value.replace(/\D/g, ""))}
            data-test-id="input-quantidade"
          />
          {errors.quantidade && (
            <span className="error-message" data-test-id="erro-quantidade">
              {errors.quantidade}
            </span>
          )}
        </div>

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
