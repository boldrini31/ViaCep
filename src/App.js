import './App.css';
import React, { useState, useEffect } from 'react';
import getCep from "./api"

function App() {

  const [cep, setCep] = useState();
  const [rua, setRua] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    if (result) {
      if (result.status && result.status === 200) {
        setRua(result.data.logradouro)
        setBairro(result.data.bairro)
        setCidade(result.data.cidade)
        setUf(result.data.uf)
      } else {
        limpa_formulario_cep();
        alert("CEP Inexistente.");
      }
    }
  }, [result]);


  const limpa_formulario_cep = () => {

    setRua("")
    setBairro("")
    setCidade("")
    setUf("")

  }

  const pesquisacep = async (valor) => {

    const cepTemp = valor.replace(/\D/g, '');

    if (cepTemp && cepTemp.length === 8) {
      setRua("...")
      setBairro("...")
      setCidade("...")
      setUf("...")

      await getCep(cep)
        .then(function (response) {
          setResult(response)
        })
    } else {
      limpa_formulario_cep();
      alert("Formato do CEP Inválido.");
    }


  }



  return (
    <div className="App">
      <form method="get" action=".">
        <label>Cep:
            <input name="cep" type="text" id="cep" value={cep} size="10" maxLength="9"
            onChange={(e) => setCep(e.target.value)}
            onBlur={() => pesquisacep(cep)} /></label><br />
        <label>Rua:
        <input name="rua" type="text" id="rua" size="60" value={rua} /></label><br />
        <label>Bairro:
            <input name="bairro" type="text" id="bairro" size="40" value={bairro} /></label><br />
        <label>Cidade:
            <input name="cidade" type="text" id="cidade" size="40" value={cidade} /></label><br />
        <label>Estado:
            <input name="uf" type="text" id="uf" size="2" value={uf} /></label><br />
      </form>
    </div>
  );
}

export default App;
