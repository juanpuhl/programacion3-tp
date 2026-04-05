// TP PROGRAMACION 3
// INTEGRANTES: NIETO, SCHENONE, BENITEZ, GARCIA, PUHL

console.log("Iniciando TP Programacion 3");

//1.a

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

mostrarTodosLosPersonajes();

//1.b Agregar un nuevo personaje (POST). 
async function agregarPersonaje() {
  try {
    const nuevoPersonaje = {
      id: 55,
      firstName: "Night",
      lastName: "King",
      fullName: "Night King",
      title: "Leader of the White Walkers",
      family: "White Walkers",
      image: "night-king.jpg",
      imageUrl: "https://thronesapi.com/assets/images/night-king.jpg"
    };

    const respuesta = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoPersonaje)
    });

    const resultado = await respuesta.json();
    console.log("1.b agregar personaje ");
    console.log(resultado);
  } catch (error) {
    console.error("error al agregar personaje: ", error.message);
  }
}
agregarPersonaje();


//1.c Buscar la información de un determinado personaje, utilizando un “id” como parámetro (GET).
async function buscarPersonajePorId(id) {
  try {
    const respuesta = await fetch(`${url}/${id}`);
    const personaje = await respuesta.json();
    console.log("1.c personaje por ID");
    console.log(personaje);
  } catch (error) {
    console.error("error al buscar personaje: ", error.message);
  }
}

buscarPersonajePorId(55); // ejemplo de que personaje busca

//2.a - Agregar un personaje al final del archivo
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
 
//2.b - Agregar dos personajes al inicio del archivo
function agregarDosPersonajesAlInicio() {
  try {
    const datos = fs.readFileSync('personajes.json', 'utf-8');
    const personajes = JSON.parse(datos);
    const personaje1 = {
      id: 101, //le pongo un  numero alto para que no haya problemas con las otras ids
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