
(function(){
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  if(burger){
    burger.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function enableTouchSubmenus(){
    const items = document.querySelectorAll('.has-submenu > a');
    items.forEach(a=>{
      a.addEventListener('click', (e)=>{
        if(window.matchMedia('(max-width: 768px)').matches){
          e.preventDefault();
          const li = a.parentElement;
          const open = li.classList.toggle('open');
          a.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
      });
    });
  }
  enableTouchSubmenus();
})();

function saludar(){
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edadStr = document.getElementById('edad').value.trim();
  const edad = Number(edadStr);
  if(!nombre || !apellido || isNaN(edad)){
    alert('Completá nombre, apellido y edad (número).');
    return;
  }
  const estado = clasificarEdad(edad);
  const saludo = `Hola ${nombre} ${apellido}, tenés ${edad} años. ${estado}.`;
  const out = document.getElementById('salidaBienvenida');
  if(out){ out.textContent = saludo; }
}

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
