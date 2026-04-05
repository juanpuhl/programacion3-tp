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

//mostrarTodosLosPersonajes();

//1.b - POST

async function agregarPersonaje() {
    try {
        const nuevoPersonaje = {
            firstName: "Adrian",
            lastName: "Martinez",
            fullName: "Adrian Martinez",
            title: "'Maravilla' Martinez",
            family: "Academia",
            imageUrl: ""
        };

        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPersonaje)
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

//gregarPersonaje();


//1.C - Buscar por ID

// buscamos un personaje x su ID 
async function buscarPersonajePorId(id){
    try{
        const respuesta = await fetch(`${url}/${id}`);

        if(!respuesta.ok){
           console.log("No se encontró el personaje con ID:", id);
            return;
        }
        const personaje = await respuesta.json();
        
        return personaje;
    }
        catch (error){
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

//mostrarPersonajePorId(4);

//1.d - Guardar personajes en archivo json.

async function guardarPersonajesEnArchivo() {
    try {
        const personajes = await obtenerTodosLosPersonajes();

        await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));
        console.log("Archivos personajes.json guardado correctamente");
        
    }
        catch (error) { 
            console.error("Error al guardar el archivo json:", error.message);        
    }
}

//guardarPersonajesEnArchivo();

// Punto 2
//2.a  Agregar un personaje al final del archivo
function agregarPersonajeAlFinal() {
  try {
    const datos = fs.readFileSync('personajes.json', 'utf-8');
    const personajes = JSON.parse(datos);
 
    const nuevo = {
      id: 100,
      firstName: "Brienne",
      lastName: "Of Tarth",
      fullName: "Brienne Of Tarth",
      title: "Ser",
      family: "House Tarth",
      image: "brienne.jpg",
      imageUrl: "https://thronesapi.com/assets/images/brienne.jpg"
    };
 
    personajes.push(nuevo);
    fs.writeFileSync('personajes.json', JSON.stringify(personajes, null, 2));
    console.log("2.a Personaje agregado al final ");
    console.log(personajes);
  } catch (error) {
    console.error("error en 2.a:", error.message);
  }
}
 
//2.b  Agregar dos personajes al inicio del archiv
function agregarDosPersonajesAlInicio() {
  try {
    const datos = fs.readFileSync('personajes.json', 'utf-8');
    const personajes = JSON.parse(datos);
    const personaje1 = {
      id: 101,
      firstName: "Missandei",
      lastName: "",
      fullName: "Missandei",
      title: "Advisor to Daenerys",
      family: "None",
      image: "missandei.jpg",
      imageUrl: "https://thronesapi.com/assets/images/missandei.jpg"
    };
    const personaje2 = {
      id: 102,
      firstName: "Grey",
      lastName: "Worm",
      fullName: "Grey Worm",
      title: "Commander of the Unsullied",
      family: "None",
      image: "grey-worm.jpg",
      imageUrl: "https://thronesapi.com/assets/images/grey-worm.jpg"
    };
 
    personajes.unshift(personaje1, personaje2);
    fs.writeFileSync('personajes.json', JSON.stringify(personajes, null, 2));
    console.log("2.b dos personajes agregados al inicio");
    console.log(personajes);
  } catch (error) {
    console.error("error en 2.b:", error.message);
  }
}
 