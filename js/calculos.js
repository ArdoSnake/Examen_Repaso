// calculos.js

// calculadora básica
function calcular(op){
  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  let res = '-';
  if(!isNaN(n1) && !isNaN(n2)){
    switch(op){
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n2 !== 0 ? n1 / n2 : 'Error (÷0)'; break;
    }
  }
  document.getElementById('resultado').textContent = `Resultado: ${res}`;
}

// edad hasta 100
function edadHasta100(){
  const edad = parseInt(document.getElementById('edadInput').value);
  if(!isNaN(edad) && edad >= 0){
    const faltan = 100 - edad;
    document.getElementById('edadResultado').textContent = `Años hasta 100: ${faltan}`;
  } else {
    document.getElementById('edadResultado').textContent = 'Años hasta 100: -';
  }
}

// factorial
function factorial(){
  const n = parseInt(document.getElementById('factInput').value);
  if(isNaN(n) || n < 0){
    document.getElementById('factResultado').textContent = 'Resultado: -';
    return;
  }
  let res = 1;
  for(let i=2;i<=n;i++) res *= i;
  document.getElementById('factResultado').textContent = `Resultado: ${res}`;
}

// mostrar fecha dinámica en footer y floter
function setFecha(){
  const fecha = new Date();
  const opciones = { year:'numeric', month:'long', day:'numeric' };
  const f = fecha.toLocaleDateString('es-ES', opciones);
  const copy = document.getElementById('copyright');
  if(copy) copy.textContent = `Eduardo Aranda — ${f}`;
  const floter = document.getElementById('floter');
  if(floter) floter.textContent = `Eduardo Aranda — ${f}`;
}
setFecha();

// menú responsive
document.addEventListener('DOMContentLoaded', () => {
  const btnMenu = document.getElementById('btn-menu');
  const nav = document.getElementById('main-nav');
  btnMenu.addEventListener('click', () => nav.classList.toggle('show'));
});
