document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("datosForm");
  const status = document.getElementById("status-datos");

  if (!form || !status) {
    console.warn("⚠ Elementos del formulario de datos personales no encontrados.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recarga

    const ci = document.getElementById("ci").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const sexo = document.getElementById("sexo").value;
    const ciudad = document.getElementById("ciudad").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const nacimiento = document.getElementById("nacimiento").value;
    const email = document.getElementById("email").value.trim();

    // Obtener colores del tema
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary");
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent");

    // Función para mostrar mensajes
    const showMsg = (msg, ok = false) => {
      status.textContent = msg;
      status.style.color = ok ? primary : accent;
    };

    // VALIDACIONES

    // CI
    if (ci === "") return showMsg("El CI es obligatorio");
    if (!/^[0-9]{5,12}$/.test(ci)) return showMsg("CI inválido (solo números entre 5 y 12 dígitos)");

    // Nombre
    if (firstName.length < 2) return showMsg("Nombre demasiado corto");

    // Apellido
    if (lastName.length < 2) return showMsg("Apellido demasiado corto");

    // Sexo
    if (sexo === "") return showMsg("Seleccione un sexo");

    // Email
    if (email !== "" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) 
      return showMsg("Correo electrónico inválido");

    // Teléfono (opcional pero si escribe, debe ser válido)
    if (phone !== "" && !/^[0-9+\s-]{6,15}$/.test(phone))
      return showMsg("Teléfono inválido");

    // Fecha de nacimiento
    if (nacimiento === "")
      return showMsg("Seleccione una fecha de nacimiento");

    const fechaNac = new Date(nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();

    if (edad < 10 || edad > 100)
      return showMsg("Fecha de nacimiento no válida (edad entre 10 y 100)");

    // TODO CORRECTO 🎉
    showMsg("Formulario enviado correctamente ✔", true);
  });
});
