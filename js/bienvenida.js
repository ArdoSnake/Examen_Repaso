// bienvenida.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-welcome');
  const form = document.getElementById('welcome-form');
  const openBtn = document.getElementById('open-welcome');
  const closeBtn = document.getElementById('close-modal');
  const saludoArea = document.getElementById('saludoArea');
  const resetBtn = document.getElementById('reset-welcome');
  const floter = document.getElementById('floter');

  // helper para mostrar fecha en footer y floter
  const setFecha = () => {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const f = fecha.toLocaleDateString('es-ES', opciones);
    const copy = document.getElementById('copyright');
    if(copy) copy.textContent = `Eduardo Aranda — ${f}`;
    if(floter) floter.textContent = `Eduardo Aranda — ${f}`;
  };

  setFecha();

  // abrir modal
  function openModal(){ modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Si hay datos guardados, mostrar saludo
  function mostrarSaludoFromStorage(){
    const nombre = localStorage.getItem('bien_nombre');
    const apellido = localStorage.getItem('bien_apellido');
    const edad = localStorage.getItem('bien_edad');

    if(nombre && apellido && edad){
      const n = nombre, a = apellido, e = parseInt(edad,10);
      const mayor = (e >= 20) ? 'Es mayor' : 'Es menor';
      saludoArea.innerHTML = `<strong>¡Hola ${n} ${a}!</strong><p class="small">${mayor} · Edad: ${e}</p>`;
      return true;
    } else {
      saludoArea.innerHTML = `<p class="placeholder">Aún no se ha ingresado tu nombre. Haz clic en "Iniciar" para registrarte.</p>`;
      return false;
    }
  }
  mostrarSaludoFromStorage();

  // form submit
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = parseInt(document.getElementById('edad').value,10);

    if(!nombre || !apellido || isNaN(edad) || edad <= 0){
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    // guardar en localStorage
    localStorage.setItem('bien_nombre', nombre);
    localStorage.setItem('bien_apellido', apellido);
    localStorage.setItem('bien_edad', String(edad));

    mostrarSaludoFromStorage();
    closeModal();
  });

  // abrir modal automáticamente si no hay datos
  if(!localStorage.getItem('bien_nombre')){
    openModal();
  }

  // reset
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('bien_nombre');
    localStorage.removeItem('bien_apellido');
    localStorage.removeItem('bien_edad');
    mostrarSaludoFromStorage();
    openModal();
  });
});

const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');

btnMenu.addEventListener('click', () => {
    nav.classList.toggle('show');
});
