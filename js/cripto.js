
const botonCripto = document.getElementById("buscarCripto");
const resultadoCripto = document.getElementById("resultadoCripto");
if(botonCripto){
  botonCripto.addEventListener("click", () => {
    const moneda = document.getElementById("moneda").value;
    if (!moneda) { alert("Por favor selecciona una criptomoneda."); return; }
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(moneda)}`;
    fetch(url)
      .then(response => { if (!response.ok) throw new Error("Criptomoneda no encontrada"); return response.json(); })
      .then(data => {
        const cripto = data[0];
        resultadoCripto.innerHTML = `
          <div class="card">
            <h2>${cripto.name} (${cripto.symbol.toUpperCase()})</h2>
            <img src="${cripto.image}" alt="${cripto.name}" width="100">
            <p><strong>Precio USD:</strong> $${cripto.current_price.toLocaleString()}</p>
            <p><strong>Cambio 24h:</strong> ${cripto.price_change_percentage_24h.toFixed(2)}%</p>
            <p><strong>Market Cap:</strong> $${cripto.market_cap.toLocaleString()}</p>
          </div>`;
      })
      .catch(error => { resultadoCripto.innerHTML = `<p style="color:red;">${error.message}</p>`; });
  });
}
