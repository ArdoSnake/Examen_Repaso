
// --- NAV: móvil y escritorio ---
(function(){
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  // Overlay inyectado
  let overlay = document.querySelector('.nav-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function closeAllSubmenus(){
    document.querySelectorAll('.has-submenu.open').forEach(li=>li.classList.remove('open'));
    document.querySelectorAll('.has-submenu > a[aria-expanded="true"]').forEach(a=>a.setAttribute('aria-expanded','false'));
  }

  function toggleNav(){
    if(!nav) return;
    const isOpen = nav.classList.toggle('open');
    if (burger) burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    overlay.classList.toggle('show', isOpen);
    if(!isOpen) closeAllSubmenus();
  }

  if(burger){ burger.addEventListener('click', toggleNav); }
  overlay.addEventListener('click', ()=>{ if(nav?.classList.contains('open')) toggleNav(); });

  // Submenús táctiles en móvil
  const parents = document.querySelectorAll('.has-submenu > a');
  parents.forEach(a=>{
    a.addEventListener('click', (e)=>{
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if(!isMobile) return;
      e.preventDefault();
      const li = a.parentElement;
      const willOpen = !li.classList.contains('open');

      // Cerrar hermanos
      const siblings = li.parentElement?.querySelectorAll('.has-submenu.open') || [];
      siblings.forEach(sib=>{
        if(sib!==li){
          sib.classList.remove('open');
          const link = sib.querySelector(':scope > a[aria-expanded="true"]');
          if(link) link.setAttribute('aria-expanded','false');
        }
      });

      li.classList.toggle('open', willOpen);
      a.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });
})();

// --- Bienvenida ---
document.addEventListener('DOMContentLoaded', () => {
  // Rellenar inputs si hay datos guardados
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const edadInput = document.getElementById('edad');

  const nombreGuardado = localStorage.getItem('nombre');
  const apellidoGuardado = localStorage.getItem('apellido');
  const edadGuardada = localStorage.getItem('edad');

  if (nombreGuardado) nombreInput.value = nombreGuardado;
  if (apellidoGuardado) apellidoInput.value = apellidoGuardado;
  if (edadGuardada) edadInput.value = edadGuardada;

  // Si ya había datos, mostrar el saludo automáticamente
  if (nombreGuardado && apellidoGuardado && edadGuardada) {
    mostrarSaludo(nombreGuardado, apellidoGuardado, Number(edadGuardada));
  }
});

function saludar() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edadStr = document.getElementById('edad').value.trim();
  const edad = Number(edadStr);

  if (!nombre || !apellido || isNaN(edad)) {
    alert('Completá nombre, apellido y edad (número).');
    return;
  }

  // Guardar datos en localStorage para que persistan
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('apellido', apellido);
  localStorage.setItem('edad', edadStr);

  mostrarSaludo(nombre, apellido, edad);
}

function mostrarSaludo(nombre, apellido, edad) {
  const estado = clasificarEdad(edad); // asumo que esta función ya existe
  const saludo = `Hola ${nombre} ${apellido}, tenés ${edad} años. ${estado}.`;
  const out = document.getElementById('salidaBienvenida');
  if (out) out.textContent = saludo;
}

// --- Opcional: función para "cerrar sesión" ---
function cerrarSesion() {
  localStorage.removeItem('nombre');
  localStorage.removeItem('apellido');
  localStorage.removeItem('edad');
  location.reload(); // refresca la página para pedir datos nuevamente
}


// --- Likes con localStorage ---
(function(){
  const buttons = document.querySelectorAll('[data-like-id]');
  buttons.forEach(btn=>{
    const id = btn.getAttribute('data-like-id');
    const key = 'like:' + id;
    const countEl = btn.querySelector('[data-like-count]');
    let count = Number(localStorage.getItem(key) || '0');
    if(countEl) countEl.textContent = String(count);
    btn.addEventListener('click', ()=>{
      const active = btn.getAttribute('data-active') === 'true';
      btn.setAttribute('data-active', active ? 'false' : 'true');
      count = count + (active ? -1 : 1);
      localStorage.setItem(key, String(Math.max(count,0)));
      if(countEl) countEl.textContent = String(Math.max(count,0));
    });
  });
})();
