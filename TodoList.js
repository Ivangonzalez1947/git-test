const prompt = require("prompt-sync")({ sigint: true });

const titulo = [];
const descripcion = [];
const estado = [];
const fechaCreacion = [];
const vencimiento = [];
const dificultad = [];
let modifica = 0;

function agregarTarea(
  ti,
  desc,
  est = "pendiente",
  fec = new Date(),
  venc,
  dif
) {
  titulo.push(ti);
  descripcion.push(desc);
  estado.push(est);
  fechaCreacion.push(fec);
  vencimiento.push(venc);
  dificultad.push(dif);
}

function eliminarTarea(indice) {
  titulo.splice(indice, 1);
  descripcion.splice(indice, 1);
  estado.splice(indice, 1);
  fechaCreacion.splice(indice, 1);
  vencimiento.splice(indice, 1);
  dificultad.splice(indice, 1);
}

function editarTarea(indice) {
  console.log(`Editando tarea ${indice + 1}: ${titulo[indice]}`);
  console.log("Presione Enter para mantener el valor actual.");
  const nuevoTitulo =
    prompt(`Nuevo título (${titulo[indice]}): `) || titulo[indice];
  const nuevaDescripcion =
    prompt(`Nueva descripción (${descripcion[indice]}): `) ||
    descripcion[indice];
  const nuevoEstado =
    prompt(`Nuevo estado (${estado[indice]}): `) || estado[indice];
  console.log("Ingrese la fecha de vencimiento de la tarea (YYYY-MM-DD): ");
  const nuevaFechaVencimiento =
    prompt(`Nueva fecha de vencimiento (${vencimiento[indice]}): `) ||
    vencimiento[indice];
  console.log("Ingrese la dificultad de la tarea (Fácil, Medio, Difícil): ");
  const nuevaDificultad =
    prompt(`Nueva dificultad (${dificultad[indice]}): `) || dificultad[indice];
  const fechaActual = new Date();
  titulo[indice] = nuevoTitulo;
  descripcion[indice] = nuevaDescripcion;
  estado[indice] = nuevoEstado;
  vencimiento[indice] = nuevaFechaVencimiento;
  dificultad[indice] = nuevaDificultad;
  fechaCreacion[indice] = fechaCreacion[indice] || fechaActual;
  console.log("Tarea editada exitosamente.");
}

function mostrarTodasLasTareas() {
  if (titulo.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    for (let i = 0; i < titulo.length; i++) {
      console.log(`Tarea ${i + 1}:`);
      console.log(
        `Titulo: ${titulo[i]}\nDescripcion: ${descripcion[i]}\nEstado: ${
          estado[i]
        }\nFechaCreacion: ${fechaCreacion[i]}\nVencimiento: ${
          vencimiento[i]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[i])}\n`
      );
      console.log("------------------------");
    }
  }
}

function mostrarTareasOrdenAlfabetico() {
  const tareasOrdenadas = titulo.slice().sort((a, b) => a.localeCompare(b));
  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas alfabéticamente:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      console.log(`Tarea ${i + 1}:`);
      console.log(
        `Titulo: ${titulo[i]}\nDescripcion: ${descripcion[i]}\nEstado: ${
          estado[i]
        }\nFechaCreacion: ${fechaCreacion[i]}\nVencimiento: ${
          vencimiento[i]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[i])}\n`
      );
      console.log("--------------------");
    }
  }
}

function mostrarTareasOrdenVencimiento() {
  const tareasOrdenadas = vencimiento.slice().sort((a, b) => a - b);
  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas por fecha de vencimiento:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      console.log(`Tarea ${i + 1}:`);
      console.log(
        `Titulo: ${titulo[i]}\nDescripcion: ${descripcion[i]}\nEstado: ${
          estado[i]
        }\nFechaCreacion: ${fechaCreacion[i]}\nVencimiento: ${
          vencimiento[i]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[i])}\n`
      );
      console.log("--------------------");
    }
  }
}

function mostrarTareasOrdenCreacion() {
  const tareasOrdenadas = fechaCreacion.slice().sort((a, b) => a - b);
  if (tareasOrdenadas.length === 0) {
    console.log("No hay tareas para mostrar.");
  } else {
    console.log("Tareas ordenadas por fecha de creación:");
    for (let i = 0; i < tareasOrdenadas.length; i++) {
      console.log(`Tarea ${i + 1}:`);
      console.log(
        `Titulo: ${titulo[i]}\nDescripcion: ${descripcion[i]}\nEstado: ${
          estado[i]
        }\nFechaCreacion: ${fechaCreacion[i]}\nVencimiento: ${
          vencimiento[i]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[i])}\n`
      );
      console.log("--------------------");
    }
  }
}

function crearTarea() {
  const ti = prompt("Ingrese el título de la tarea: ");
  const desc = prompt("Ingrese la descripción de la tarea: ");
  const venc = prompt(
    "Ingrese la fecha de vencimiento de la tarea (YYYY-MM-DD): "
  );
  const dif = prompt(
    "Ingrese la dificultad de la tarea, la primera letra en mayuscula (Facil, Medio, Dificil): "
  );
  agregarTarea(ti, desc, undefined, new Date(), venc, dif);
  console.log("Tarea creada exitosamente.");
}

function mostrarTareasPorEstado(est) {
  const tareasFiltradas = [];
  for (let i = 0; i < estado.length; i++) {
    if (estado[i] === est) {
      tareasFiltradas.push(i);
    }
  }
  if (tareasFiltradas.length === 0) {
    console.log(`No hay tareas ${est} para mostrar.`);
  } else {
    console.log(`Tareas ${est}:`);
    for (let i = 0; i < tareasFiltradas.length; i++) {
      const indice = tareasFiltradas[i];
      console.log(`Tarea ${indice + 1}:`);
      console.log(
        `Titulo: ${titulo[indice]}\nDescripcion: ${
          descripcion[indice]
        }\nEstado: ${estado[indice]}\nFechaCreacion: ${
          fechaCreacion[indice]
        }\nVencimiento: ${
          vencimiento[indice]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[indice])}\n`
      );
      console.log("--------------------");
    }
  }
}

function buscarTarea() {
  const busqueda = prompt(
    "Ingrese el título o descripción de la tarea que desea buscar: "
  );
  const tareasEncontradas = [];
  for (let i = 0; i < titulo.length; i++) {
    if (titulo[i].includes(busqueda) || descripcion[i].includes(busqueda)) {
      tareasEncontradas.push(i);
    }
  }
  if (tareasEncontradas.length === 0) {
    console.log("No se encontraron tareas que coincidan con la búsqueda.");
  } else {
    console.log("Tareas encontradas:");
    for (let i = 0; i < tareasEncontradas.length; i++) {
      const indice = tareasEncontradas[i];
      console.log(`Tarea ${indice + 1}:`);
      console.log(
        `Titulo: ${titulo[indice]}\nDescripcion: ${
          descripcion[indice]
        }\nEstado: ${estado[indice]}\nFechaCreacion: ${
          fechaCreacion[indice]
        }\nVencimiento: ${
          vencimiento[indice]
        }\nDificultad: ${convertirDificultadEnEstrellas(dificultad[indice])}\n`
      );
      console.log("--------------------");
    }
  }
}

function convertirDificultadEnEstrellas(dificultad) {
  let estrellas = "";
  switch (dificultad) {
    case "Facil":
      estrellas = "★☆☆ Facil-Easy-Noob";
      break;
    case "Medio":
      estrellas = "★★☆ Medio-Medium-Pro";
      break;
    case "Dificil":
      estrellas = "★★★ Dificil-HardCord-Hacker";
      break;
    default:
      estrellas = "Sin dificultad";
      break;
  }
  return estrellas;
}

let opcion = -1;
while (opcion !== 0) {
  console.clear();
  console.log("¿Qué deseas hacer?");
  console.log("[1] Ver mis tareas");
  console.log("[2] Ordenar tareas");
  console.log("[3] Buscar una tarea");
  console.log("[4] Agregar una tarea");
  console.log("[0] Salir");
  opcion = parseInt(
    prompt("Ingrese el número de la opción que desea seleccionar: ")
  );
  switch (opcion) {
    case 1:
      let subopcion = -1;
      while (subopcion !== 0) {
        console.clear();
        console.log("¿Qué tareas deseas ver?");
        console.log("[1] Ver todas las tareas");
        console.log("[2] Ver tareas pendientes");
        console.log("[3] Ver tareas en curso");
        console.log("[4] Ver tareas terminadas");
        console.log("[0] Volver al menú principal");
        subopcion = parseInt(
          prompt("Ingrese el número de la opción que desea seleccionar: ")
        );
        switch (subopcion) {
          case 1:
            mostrarTodasLasTareas();
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificar = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (tareaModificar > 0 && tareaModificar <= titulo.length) {
                editarTarea(tareaModificar - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 2:
            mostrarTareasPorEstado("pendiente");
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarPendiente = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarPendiente > 0 &&
                tareaModificarPendiente <= titulo.length
              ) {
                editarTarea(tareaModificarPendiente - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 3:
            mostrarTareasPorEstado("en curso");
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarEnCurso = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarEnCurso > 0 &&
                tareaModificarEnCurso <= titulo.length
              ) {
                editarTarea(tareaModificarEnCurso - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 4:
            mostrarTareasPorEstado("terminada");
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarTerminada = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarTerminada > 0 &&
                tareaModificarTerminada <= titulo.length
              ) {
                editarTarea(tareaModificarTerminada - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 0:
            console.log("Volviendo al menú principal...");
            break;
          default:
            console.log(
              "Opción inválida. Por favor, seleccione una opción válida."
            );
            break;
        }
        console.log("Presione Enter para continuar...");
        prompt();
      }
      break;
    case 2:
      let subopcionOrdenamiento = -1;
      while (subopcionOrdenamiento !== 0) {
        console.clear();
        console.log("¿Cómo deseas ordenar las tareas?");
        console.log("[1] Ordenar alfabéticamente por título");
        console.log("[2] Ordenar por fecha de vencimiento");
        console.log("[3] Ordenar por fecha de creación");
        console.log("[0] Volver al menú principal");
        subopcionOrdenamiento = parseInt(
          prompt("Ingrese el número de la opción que desea seleccionar: ")
        );
        switch (subopcionOrdenamiento) {
          case 1:
            mostrarTareasOrdenAlfabetico();
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarAlfabetico = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarAlfabetico > 0 &&
                tareaModificarAlfabetico <= titulo.length
              ) {
                editarTarea(tareaModificarAlfabetico - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 2:
            mostrarTareasOrdenVencimiento();
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarVencimiento = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarVencimiento > 0 &&
                tareaModificarVencimiento <= titulo.length
              ) {
                editarTarea(tareaModificarVencimiento - 1);
              } else {
                const tareaEliminar = parseInt(
                  prompt("Ingrese el número de la tarea que desea eliminar: ")
                );
                if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                  eliminarTarea(tareaEliminar - 1);
                  console.log("Tarea eliminada exitosamente.");
                }
              }
            }
            break;
          case 3:
            mostrarTareasOrdenCreacion();
            modifica = parseInt(
              prompt(
                "1-Si desea modificar alguna tarea\n2-Eliminar Tarea\n sino cualquier numero:"
              )
            );
            if (modifica === 1) {
              const tareaModificarCreacion = parseInt(
                prompt("Ingrese el número de la tarea que desea modificar: ")
              );
              if (
                tareaModificarCreacion > 0 &&
                tareaModificarCreacion <= titulo.length
              ) {
                editarTarea(tareaModificarCreacion - 1);
              } else {
                if (modifica === 2) {
                  const tareaEliminar = parseInt(
                    prompt("Ingrese el número de la tarea que desea eliminar: ")
                  );
                  if (tareaEliminar > 0 && tareaEliminar <= titulo.length) {
                    eliminarTarea(tareaEliminar - 1);
                    console.log("Tarea eliminada exitosamente.");
                  }
                }
              }
            }
            break;
          case 0:
            console.log("Volviendo al menú principal...");
            break;
          default:
            console.log(
              "Opción inválida. Por favor, seleccione una opción válida."
            );
            break;
        }
        console.log("Presione Enter para continuar...");
        prompt();
      }
      break;
    case 3:
      console.clear();
      console.log("Buscar una tarea:");
      buscarTarea();
      modifica = parseInt(
        prompt("Si desea modificar la tarea, ingrese 1, sino cualquier numero:")
      );
      if (modifica === 1) {
        const tareaModificarCreacion = parseInt(
          prompt("Ingrese el número de la tarea que desea modificar: ")
        );
        if (
          tareaModificarCreacion > 0 &&
          tareaModificarCreacion <= titulo.length
        ) {
          editarTarea(tareaModificarCreacion - 1);
        } else {
          console.log("Número de tarea inválido.");
        }
      }
      console.log("Presione Enter para continuar...");
      prompt();
      break;
    case 4:
      console.clear();
      console.log("Agregar una tarea:");
      crearTarea();
      console.log("Presione Enter para continuar...");
      prompt();
      break;
    case 0:
      console.log("¡Gracias por usar nuestro programa de gestión de tareas!");
      console.log(
        "Esperamos que haya sido útil para organizar tus actividades."
      );
      console.log("¡Vuelve pronto y que tengas un día productivo!");
      break;
    default:
      console.log("Opción inválida. Por favor, seleccione una opción válida.");
      console.log("Presione Enter para continuar...");
      prompt();
      break;
  }
}
