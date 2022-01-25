// Tiene un arreglo de números, los cuales pueden ser o no repetidos, 
// ¿cómo eliminaría los repetidos? ¿Cómo los ordenaría en forma ascendente? 
// Ejemplo de entrada y salida: [1, 2, 5, 10, 8, 8, 1, 3, 4, 5] => [1, 2, 3, 4, 5, 8, 10]


let array = [1, 2, 5, 10, 8, 8, 1, 3, 4, 5];
array.sort(function (a, b){
        return a-b;
    });

let set = new Set(array);

console.log(`salida: ${set}`);
