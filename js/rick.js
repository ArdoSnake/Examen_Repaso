
const botonRick = document.getElementById("buscarRick");
const resultadoRick = document.getElementById("resultadoRick");
if(botonRick){
  botonRick.addEventListener("click", () => {
    const id = document.getElementById("personajeId").value.trim();
    if (!id) { alert("Por favor ingresa un ID de personaje."); return; }
    const url = `https://rickandmortyapi.com/api/character/${encodeURIComponent(id)}`;
    fetch(url)
      .then(response => { if (!response.ok) throw new Error("Personaje no encontrado"); return response.json(); })
      .then(data => {
        resultadoRick.innerHTML = `
          <div class="card">
            <h2>${data.name}</h2>
            <img src="${data.image}" alt="${data.name}">
            <p><strong>Estado:</strong> ${data.status}</p>
            <p><strong>Especie:</strong> ${data.species}</p>
          </div>`;
      })
      .catch(error => { resultadoRick.innerHTML = `<p style="color:red;">${error.message}</p>`; });
  });
}
