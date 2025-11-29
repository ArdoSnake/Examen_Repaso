
const botonPokemon = document.getElementById("buscarPokemon");
const resultadoPokemon = document.getElementById("resultadoPokemon");
if(botonPokemon){
  botonPokemon.addEventListener("click", () => {
    const nombrePokemon = document.getElementById("pokemon").value.trim().toLowerCase();
    if (!nombrePokemon) { alert("Por favor ingresa un nombre o ID de Pokémon."); return; }
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombrePokemon)}`;
    fetch(url)
      .then(response => { if (!response.ok) throw new Error("Pokémon no encontrado"); return response.json(); })
      .then(data => {
        const tipos = data.types.map(t => t.type.name).join(", ");
        resultadoPokemon.innerHTML = `
          <div class="card">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${tipos}</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
          </div>`;
      })
      .catch(error => { resultadoPokemon.innerHTML = `<p style="color:red;">${error.message}</p>`; });
  });
}
