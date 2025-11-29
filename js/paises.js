
const botonPais = document.getElementById("buscarPais");
const resultadoPais = document.getElementById("resultadoPais");
if(botonPais){
  botonPais.addEventListener("click", () => {
    const nombrePais = document.getElementById("pais").value.trim();
    if (!nombrePais) { alert("Por favor ingresa el nombre del país."); return; }
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}`;
    fetch(url)
      .then(response => { if (!response.ok) throw new Error("País no encontrado"); return response.json(); })
      .then(data => {
        resultadoPais.innerHTML = "";
        data.forEach(pais => {
          const capital = pais.capital ? pais.capital[0] : "No disponible";
          const html = `
            <div class="card">
              <h2>${pais.name.common}</h2>
              <p><strong>Capital:</strong> ${capital}</p>
              <p><strong>Población:</strong> ${Number(pais.population).toLocaleString('es-AR')}</p>
              <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="200">
            </div>`;
          resultadoPais.innerHTML += html;
        });
      })
      .catch(error => { resultadoPais.innerHTML = `<p style="color:red;">${error.message}</p>`; });
  });
}
