
const fs = require('fs').promises;

//1
//Ruta a la API
const url = 'https://thronesapi.com/api/v2/Characters';

//a) Recuperar la información de todos los personajes (GET).
async function buscarTodos(){
    try{
        const resp = await fetch(url);
        console.log(resp);
        if (!resp.ok){
            console.log(`Error!`);
        }

        const personajes = await resp.json();
        console.log(personajes);
        return personajes;
    }catch (error){
        console.log(`Error! ${error}`);
    } 
}

//b) Agregar un nuevo personaje (POST).
async function crearPersonaje(personaje) {
    try{
        const resp = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json' 
            },
            body: JSON.stringify(personaje)
        })

        if (!resp.ok){
            console.log(`Error!`);
        }

        const pro = await response.status();
        console.log(`La respuesta es: ${pro}`);

    }catch (error){
        console.log(`⛔ Error! ${error}`);
    } 
}  

//b) Agregar un nuevo personaje (POST).
//Otro intento
async function enviarPersonaje(personaje) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personaje)
    })
    .then(response => console.log(response.status))
    }

//c) Buscar la información de un determinado personaje, utilizando un “id” como parámetro(GET).
async function buscarPorId(id){
    try{
        const resp = await fetch(`${url}/${id}`);
        if (!resp.ok){
            console.log(`Error!`);
        }

        const personaje = await resp.json();
        console.log(JSON.stringify(personaje));
    }catch (error){
        console.log(`Error! ${error}`);
    } 
}

//d) Persistir los datos de la primer consulta en un archivo local JSON.
async function crearJsonPersonajes() {
    try {
        const personajes = await buscarTodos();
        fs.writeFile('personajesGOT.json', JSON.stringify(personajes, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                return;
            }
            console.log('¡Archivo guardado con éxito!');
    });
    }
    catch (error) {
        console.log(`⛔ Error al crear el archivo JSON: ${error}`);
    }
}


//Función para tomar array de objetos y agregarle uno al final
/*
function agregarPersonajeAlFinal(oldJson,personaje){
    try{
        oldJson.push(personaje);
        console.log(oldJson);
        return oldJson
    }
    catch (error){
        console.error('Error con personaje:', error.message);
    }
}
*/


//2
//Rutas a los archivos JSON para punto 2
const rutaJson = './personajesGOT.json'
const rutaJsonResumen = './resumen_personajesGOT.json'

//a) Agregar un personaje al final del archivo.
async function agregarUnPersonajeAlFinal(rutaJSON, personaje) {
    try{
        const got = await fs.readFile(rutaJSON, 'utf-8');
        const gotjs = JSON.parse(got);

        gotjs.push(personaje);
        console.log(gotjs);

        const newJsonGot = JSON.stringify(gotjs);

        await fs.writeFile(rutaJSON, newJsonGot);

        console.log('🤺 Un Nuevo personaje añadido al final del archivo JSON!')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

//b) Agregar dos personajes al inicio del archivo.
async function agregarDosPersonajesAlInicio(rutaJSON, personaje1, personaje2) {
    try{
        const got = await fs.readFile(rutaJSON, 'utf-8');
        const gotjs = JSON.parse(got);

        gotjs.unshift(personaje1, personaje2);
        console.log(gotjs);

        const newJsonGot = JSON.stringify(gotjs);

        await fs.writeFile(rutaJSON, newJsonGot);

        console.log('🤺🤺 Dos Nuevos personajes añadidos al inicio del archivo JSON!')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

//c) Eliminar el primer personaje, mostrar en consola el elemento eliminado.
async function eliminarUnPersonajeAlInicio(rutaJSON) {
    try{
        const got = await fs.readFile(rutaJSON, 'utf-8');
        const gotjs = JSON.parse(got);

        const eliminado = gotjs.shift();
        console.log(eliminado);


        const newJsonGot = JSON.stringify(gotjs);

        await fs.writeFile(rutaJSON, newJsonGot);

        console.log('Primer personaje eliminado del archivo JSON!')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

//d) Crear un nuevo archivo que solo contenga los: id y nombres de los personajes.
async function atributosIdYNombres(rutaJSON, rutaJsonResumen) {
    try{
        const got = await fs.readFile(rutaJSON, 'utf-8');
        const gotjs = JSON.parse(got);

        const newJsonResumen = gotjs.map(({id, firstName, lastName}) => ({id, firstName, lastName}));
        console.log(newJsonResumen);

        const newJson = JSON.stringify(newJsonResumen);

        await fs.writeFile(rutaJsonResumen, newJson);

        console.log('ℹ️ Atributos seleccionados guardados en nuevo JSON!')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

//e) Para los datos anteriores ordenar por nombre y de forma decreciente, 
// luego mostrar por consola (investigar método sort()).
async function OrdenadoNombreDecreciente(rutaJSON) {
    try{
        const got = await fs.readFile(rutaJSON, 'utf-8');
        const gotjs = JSON.parse(got);

        gotjs.sort((a, b) => b.firstName.localeCompare(a.firstName));
        console.log(gotjs);
        
        const newJsonGot = JSON.stringify(gotjs);

        await fs.writeFile(rutaJSON, newJsonGot);

        console.log('🤺🤺 Personajes ordenados por nombre Z-A!')
    } catch (error) {
        console.error('Error:', error.message);
    }
}


//personajes para agregar o enviar
const personaje ={
  "id": 0,
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "title": "string",
  "family": "string",
  "image": "string",
  "imageUrl": "string"
}

const personaje1 = {
  "id": 53,
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "title": "string",
  "family": "string",
  "image": "string",
  "imageUrl": "string"
}

const personaje2 = {
  "id": 54,
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "title": "string",
  "family": "string",
  "image": "string",
  "imageUrl": "string"
}

const personaje3 = {
  "id": 55,
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "title": "string",
  "family": "string",
  "image": "string",
  "imageUrl": "string"
}


//1
//a
//buscarTodos();

//b
//enviarPersonaje(personaje);
//crearPersonaje(personaje);

//c
//buscarPorId(1);

//d
//crearJsonPersonajes();

//2
//a
//agregarUnPersonajeAlFinal(rutaJson, personaje1);

//b
//agregarDosPersonajesAlInicio(rutaJson, personaje2, personaje3);

//c
//eliminarUnPersonajeAlInicio(rutaJson);

//d
//atributosIdYNombres(rutaJson, rutaJsonResumen);

//e
//OrdenadoNombreDecreciente(rutaJsonResumen);

function selector(opcionNumero) {
    switch (opcionNumero) {
        case 1:
            buscarTodos() 
            break;
        case 2:
            enviarPersonaje(personaje) 
            break;
        case 3:
            crearPersonaje(personaje) 
            break;
        case 4:
            buscarPorId(1) 
            break;
        case 5:
            crearJsonPersonajes() 
            break;
        case 6:
            agregarUnPersonajeAlFinal(rutaJson, personaje1) 
            break;
        case 7:
            agregarDosPersonajesAlInicio(rutaJson, personaje2, personaje3) 
            break;
        case 8:
            eliminarUnPersonajeAlInicio(rutaJson) 
            break;  
        case 9:
            atributosIdYNombres(rutaJson, rutaJsonResumen) 
            break;  
        case 10:
            OrdenadoNombreDecreciente(rutaJsonResumen) 
            break;      
        default:
            console.log(`No hay más opciones`);
            break;
    }
}

selector(6);