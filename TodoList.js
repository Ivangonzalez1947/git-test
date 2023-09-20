const prompt = require("prompt-sync")({ sigint: true });

function crearTarea (){
const titulo=[];
const descripcion=[];
const estado=[];
const fechaCreacion=[];
const vencimiento=[];
const costo=[];
}

function agregarTarea(ti,desc,est,fec,venc,cost) {
  titulo.push(ti);
  descripcion.push(desc);
  estado.push(est);
  fechaCreacion.push(fec);
  vencimiento.push(venc);
  costo.push(cost);
}

function modificarTarea(indice, ti,desc,est,fec,venc,cost) {
  titulo[indice] = ti;
  descripcion[indice] = desc;
  estado[indice] = est;
  fechaCreacion[indice] = fec;
  vencimiento[indice] = venc;
  costo[indice] = cost;
}

function eliminarTarea(indice) {
  titulo.splice(indice, 1);
  descripcion.splice(indice, 1);
  estado.splice(indice, 1);
  fechaCreacion.splice(indice, 1);
  vencimiento.splice(indice, 1);
  costo.splice(indice, 1);
}

function mostrarTodasLasTareas() {
  if (listaTareas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    for (let i = 0; i < listaTareas.length; i++) {
      const tarea = listaTareas[i];
      console.log(`Tarea ${i + 1}:`);
      console.log(tarea);
      console.log("--------------------");
    }
  }
}

function mostrarTareasOrdenAlfabetico() {
  const tareasOrdenadas = listaTareas.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));

  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas alfabéticamente:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      const tarea = tareasOrdenadas[i];
      console.log(`Tarea ${i + 1}:`);
      console.log(tarea);
      console.log("--------------------");
    }
  }
}

function mostrarTareasOrdenVencimiento() {
  const tareasOrdenadas = listaTareas.slice().sort((a, b) => a.vencimiento - b.vencimiento);

  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas por fecha de vencimiento:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      const tarea = tareasOrdenadas[i];
      console.log(`Tarea ${i + 1}:`);
      console.log(tarea);
      console.log("--------------------");
    }
  }
}

function mostrarTareasOrdenCreacion() {
  const tareasOrdenadas = listaTareas.slice().sort((a, b) => a.fechaCreacion - b.fechaCreacion);

  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas por fecha de creación:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      const tarea = tareasOrdenadas[i];
      console.log(`Tarea ${i + 1}:`);
      console.log(tarea);
      console.log("--------------------");
    }
  }
}

function crearTarea() {
  const titulo = prompt("Ingrese el título de la tarea:");
  const descripcion = prompt("Ingrese la descripción de la tarea:");
  const tarea = new Tarea(titulo, descripcion);
  agregarTarea(tarea);
  console.log("Tarea creada exitosamente.");
}

let opcion = -1;

while (opcion !== 0) {
  opcion = parseInt(prompt("¿Qué deseas hacer?\n[1] Ver mis tareas\n[2] Ordenar tareas\n[3] Buscar una tarea\n[4] Agregar una tarea\n[0] Salir"));

  switch (opcion) {
    case 1:
      let subopcion = -1;
      while (subopcion !== 0) {
        subopcion = parseInt(prompt("¿Qué tareas deseas ver?\n[1] Ver todas las tareas\n[2] Ver tareas pendientes\n[3] Ver tareas en curso\n[4] Ver tareas terminadas\n[0] Volver al menú principal"));
        switch (subopcion) {
          case 1:
            mostrarTodasLasTareas();
            break;
          case 2:
            mostrarTareasPorEstado("pendiente");
            break;
          case 3:
            mostrarTareasPorEstado("en curso");
            break;
          case 4:
            mostrarTareasPorEstado("terminada");
            break;
          case 0:
            console.log("Volviendo al menú principal...");
            break;
          default:
            console.log("Opción inválida. Por favor, seleccione una opción válida.");
            break;
        }
      }
      break;
    case 2:
      let orden = -1;
      while (orden !== 0) {
        orden = parseInt(prompt("¿Cómo deseas ordenar las tareas?\n[1] Orden alfabético\n[2] Orden por fecha de vencimiento\n[3] Orden por fecha de creación\n[0] Volver al menú principal"));
        switch (orden) {
          case 1:
            mostrarTareasOrdenAlfabetico();
            break;
          case 2:
            mostrarTareasOrdenVencimiento();
            break;
          case 3:
            mostrarTareasOrdenCreacion();
            break;
          case 0:
            console.log("Volviendo al menú principal...");
            break;
          default:
            console.log("Opción inválida. Por favor, seleccione una opción válida.");
            break;
        }
      }
      break;
    case 3:
      console.log("Buscar una tarea:");
      buscarTarea();
      break;
    case 4:
      console.log("Agregar una tarea:");
      crearTarea();
      break;
    case 0:
      console.log("Saliendo del programa...");
      break;
    default:
      console.log("Opción inválida. Por favor, seleccione una opción válida.");
      break;
  }
}