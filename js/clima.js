
const API_KEY = "2cac7394f9fcc58ca6035f87b25767a7";
const botonBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");
if(botonBuscar){
  botonBuscar.addEventListener("click", () => {
    const ciudad = document.getElementById("ciudad").value.trim();
    if (!ciudad) { alert("Por favor ingresa una ciudad."); return; }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;
    fetch(url)
      .then(response => { if (!response.ok) throw new Error("Ciudad no encontrada"); return response.json(); })
      .then(data => {
        resultado.innerHTML = `
          <div class="card">
            <h2>Clima en ${data.name}</h2>
            <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
            <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
            <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
          </div>`;
      })
      .catch(error => { resultado.innerHTML = `<p style="color:red;">${error.message}</p>`; });
  });
}
