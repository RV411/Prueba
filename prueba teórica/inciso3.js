// Tiene un arreglo de strings los cuales deben ser filtrados por su longitud mayor a dos 
// y a la vez convertidos a un array de enteros con la longitud de cada string, ¿cómo lo haría? 
// Ejemplo de entrada y salida: [“hola”, “mundo”, “es”, “una”, “prueba”] => [4, 5, 3, 6]

let array = ["hola","mundo","es","una","prueba"];
let arrayCantidad=[]

function contarLetras(frase) {
    let conteo = [];
    let temporal;
    temporal=Array.from(frase).length;
    if (typeof frase != 'string' && temporal>2) {
        throw TypeError('El argumento debe ser una cadena de caracteres.');
    }
    conteo.push(temporal);

    return conteo;
}

try {
    arrayCantidad = Array.from(array, x => contarLetras(x))
    console.log(`Arreglo en Numero: ${e.message}`);

} catch (e) {
    console.log(`Error: ${e.message}`);
}