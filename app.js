// TP PROGRAMACION 3
// INTEGRANTES: NIETO, SCHENONE, BENITEZ, GARCIA, PUHL

const fs = require("fs").promises;

console.log("Iniciando TP Programacion 3");

//1.a - GET

const url = "https://thronesapi.com/api/v2/Characters";

//obtenemos los personajes de la API utilizando fetch y async/await
async function obtenerTodosLosPersonajes() {
  try {
    const respuesta = await fetch(url);
    const personajes = await respuesta.json();

    return personajes;
  } catch (error) {
    console.error("Error al obtener los personajes:", error.message);
  }
}
//mostramos los personajes obtenidos en la consola
async function mostrarTodosLosPersonajes() {
  const personajes = await obtenerTodosLosPersonajes();
  console.log(" - - - 1.a Todos los Personajes - - - ");
  console.log(personajes);
}

//1.b - POST

async function agregarPersonaje() {
  try {
    const nuevoPersonaje = {
      firstName: "Adrian",
      lastName: "Martinez",
      fullName: "Adrian Martinez",
      title: "'Maravilla' Martinez",
      family: "Academia",
      imageUrl: "",
    };

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoPersonaje),
    });

    console.log("Estado:", respuesta.status);

    if (respuesta.ok) {
      console.log("Personaje agregado correctamente");
    } else {
      console.log("No se pudo agregar el personaje");
    }
  } catch (error) {
    console.error("Error al agregar personaje:", error);
  }
}

//1.C - Buscar por ID

// buscamos un personaje x su ID
async function buscarPersonajePorId(id) {
  try {
    const respuesta = await fetch(`${url}/${id}`);

    if (!respuesta.ok) {
      console.log("No se encontró el personaje con ID:", id);
      return;
    }
    const personaje = await respuesta.json();

    return personaje;
  } catch (error) {
    console.error("Error al buscar personaje por id:", error.message);
  }
}

//mostramos el personaje encontrado por ID en la consola
async function mostrarPersonajePorId(idBuscado) {
  //const idBuscado = 4; // ID del personaje a buscar
  const personaje = await buscarPersonajePorId(idBuscado);
  console.log(` - - - 1.c Personaje con ID ${idBuscado} - - - `);
  console.log(personaje);
}

//1.d - Guardar personajes en archivo json.

async function guardarPersonajesEnArchivo() {
  try {
    const personajes = await obtenerTodosLosPersonajes();

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));
    console.log("Archivos personajes.json guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el archivo json:", error.message);
  }
}

// Punto 2
// 2.a - Agregar un personaje al final del archivo.

async function agregarPersonajeAlFinal() {
  try {
    const contenidoArchivo = await fs.readFile("personajes.json", "utf-8");
    const personajes = JSON.parse(contenidoArchivo);

    //buscamos el ultimo id y hacemos +1
    const ultimoId = personajes[personajes.length - 1].id;
    const nuevoId = ultimoId + 1;

    const nuevoPersonaje = {
      id: nuevoId,
      firstName: "Adrian",
      lastName: "Martinez",
      fullName: "Adrian Martinez",
      title: "'Maravilla' Martinez",
      family: "Academia",
      imageUrl: "",
    };

    personajes.push(nuevoPersonaje);

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    console.log(" - - - 2.a Agregar personaje al final - - - ");
    console.log("Personaje agregado correctamente al final del archivo");
    console.log(nuevoPersonaje);
  } catch (error) {
    console.error(
      "Error al agregar personaje al final del archivo:",
      error.message,
    );
  }
}

// 2.b - Agregar dos personajes al inicio del archivo

async function agregarDosPersonajesAlInicio() {
  try {
    const contenido = await fs.readFile("personajes.json", "utf-8");
    const personajes = JSON.parse(contenido);

    const ultimoId = personajes[personajes.length - 1].id;
    const nuevoId1 = ultimoId + 1;
    const nuevoId2 = ultimoId + 2;

    const personaje1 = {
      id: nuevoId1,
      firstName: "Lionel",
      lastName: "Messi",
      fullName: "Lionel Messi",
      title: "Campeon del Mundo",
      family: "Argentina",
      imageUrl: "",
    };

    const personaje2 = {
      id: nuevoId2,
      firstName: "Emiliano",
      lastName: "Martinez",
      fullName: "Emiliano Martinez",
      title: "Dibu",
      family: "Argentina",
      imageUrl: "",
    };

    personajes.unshift(personaje1, personaje2);

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    console.log(" - - - 2.b Agregar dos personajes al inicio - - - ");
    console.log("Se agregaron dos personajes al inicio del archivo");
    console.log(personaje1);
    console.log(personaje2);
  } catch (error) {
    console.error(
      "Error en 2.b al agregar personajes al inicio:",
      error.message,
    );
  }
}
agregarDosPersonajesAlInicio();

// 2.c
async function eliminarPrimerPersonaje() {
  try {
    const datos = await fs.readFile("personajes.json", "utf-8");
    const personajes = JSON.parse(datos);

    const eliminado = personajes.shift();

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    console.log(" - - - Elemento eliminado - - - ");
    console.log(eliminado);
  } catch (error) {
    console.error("Error en el punto 2.c:", error.message);
  }
}

// 2.d
async function crearResumenPersonajes() {
  try {
    const datos = await fs.readFile("personajes.json", "utf-8");
    const personajes = JSON.parse(datos);

    const listaResumida = personajes.map((p) => {
      return {
        id: p.id,
        nombreCompleto: p.fullName,
      };
    });

    await fs.writeFile(
      "personajes_resumen.json",
      JSON.stringify(listaResumida, null, 2),
    );

    console.log(
      " - - - 2.d Archivo 'personajes_resumen.json' creado con éxito - - - ",
    );
    console.log(
      "Se guardaron " + listaResumida.length + " personajes resumidos.",
    );
  } catch (error) {
    console.error("Error en el punto 2.d:", error.message);
  }
}

//2.e
async function ordenarNombresDecreciente() {
  try {
    const datos = await fs.readFile("personajes_resumen.json", "utf-8");
    const personajes = JSON.parse(datos);

    personajes.sort((a, b) => {
      return b.nombreCompleto.localeCompare(a.nombreCompleto);
    });

    console.log("Personajes ordenados alfabeticamente");
    console.log(personajes);
  } catch (error) {
    console.error("Error en el punto 2.e:", error.message);
  }
}

//Funciones!!!

// *** PUNTO 1: ***
// 1 A - Recuperar la información de todos los personajes (GET).
//mostrarTodosLosPersonajes();

// 1 B - Agregar un nuevo personaje (POST).
//AgregarPersonaje();

// 1 C - Buscar la información de un determinado personaje, utilizando un “id” como parámetro (GET).
//mostrarPersonajePorId(4);

// 1 D - Persistir los datos de la primer consulta en un archivo local JSON.
//guardarPersonajesEnArchivo();

// *** PUNTO 2: ***
// 2 A - Agregar un personaje al final del archivo.
//agregarPersonajeAlFinal();

// 2 B - Agregar dos personajes al inicio del archivo.
//agregarDosPersonajesAlInicio();

// 2 C - Eliminar el primer personaje, mostrar en consola el elemento eliminado.

// 2 D - Crear un nuevo archivo que solo contenga los: id y nombres de los personajes.
//crearResumenPersonajes();

// 2 E -  Para los datos anteriores ordenar por nombre y de forma decreciente, luego mostrar por consola (investigar método sort()).
//ordenarNombresDecreciente();
