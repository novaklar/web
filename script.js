const btnNotas = document.getElementById('btnNotas');
const btnFinanzas = document.getElementById('btnFinanzas');
const notasSection = document.getElementById('notasSection');
const finanzasSection = document.getElementById('finanzasSection');
const guardarNotasBtn = document.getElementById('guardarNotas');
const blocNotas = document.getElementById('blocNotas');

function mostrarInicio() {
  notasSection.classList.add('hidden');
  finanzasSection.classList.add('hidden');
}

btnNotas.addEventListener('click', () => {
  notasSection.classList.remove('hidden');
  finanzasSection.classList.add('hidden');
});

btnFinanzas.addEventListener('click', () => {
  finanzasSection.classList.remove('hidden');
  notasSection.classList.add('hidden');
});

guardarNotasBtn.addEventListener('click', () => {
  localStorage.setItem('notas', blocNotas.value);
  alert('Notas guardadas');
  mostrarInicio();
});

// Cargar notas guardadas al iniciar
window.addEventListener('DOMContentLoaded', () => {
  const notasGuardadas = localStorage.getItem('notas');
  if (notasGuardadas) {
    blocNotas.value = notasGuardadas;
  }

  // Cargar registros financieros guardados
  const registrosGuardados = localStorage.getItem('registrosFinancieros');
  if (registrosGuardados) {
    registros = JSON.parse(registrosGuardados);
    actualizarTabla();
  }

  // Cargar ganancia total guardada
  const gananciaGuardada = localStorage.getItem('gananciaTotal');
  if (gananciaGuardada) {
    gananciaTotal = parseFloat(gananciaGuardada);
    document.getElementById('gananciaTotal').textContent = Math.round(gananciaTotal);
  }
});

let gananciaTotal = 0;
let registros = [];

// Función para actualizar la tabla con los registros
function actualizarTabla() {
  const tabla = document.getElementById('tablaRegistros');
  tabla.innerHTML = '';

  registros.forEach(registro => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${registro.fecha}</td>
      <td>${registro.tipo}</td>
      <td>$${Math.round(registro.cantidad)}</td>
    `;
    tabla.appendChild(fila);
  });
}

function agregarRegistro() {
  const fecha = document.getElementById('fecha').value;
  const cantidadInput = document.getElementById('cantidad').value;
  const tipo = document.getElementById('tipo').value;
  const cantidad = parseFloat(cantidadInput);

  if (!fecha || isNaN(cantidad)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const nuevoRegistro = { fecha, tipo, cantidad };
  registros.push(nuevoRegistro);

  gananciaTotal += tipo === "Ingreso" ? cantidad : -cantidad;
  document.getElementById('gananciaTotal').textContent = Math.round(gananciaTotal);

  actualizarTabla();

  // Guardar en localStorage
  localStorage.setItem('registrosFinancieros', JSON.stringify(registros));
  localStorage.setItem('gananciaTotal', gananciaTotal.toString());

  // Limpiar campos
  document.getElementById('fecha').value = "";
  document.getElementById('cantidad').value = "";
  document.getElementById('tipo').value = "Ingreso";
}
