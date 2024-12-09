// Conceptos basicos de Javascript
// Variable
// Var
// let nombre;
// // Cadena de texto log
// console.log(nombre);
// nombre= "Dayana";
// console.log("Hola mundo")
// alert("hola mundo desde un alert");
// //tipos de datos
// //string
// let texto="soy un texto";
// //Number
// let numero=42;
// //Boolean
// let verdadero= true;
// //undefined
// let undefined;
// //null
// let vacio= null;

// Definir variables y constantes
// Para mandarla a traer a traves del documento
// Se puede definir con otro nombre la variable
const fecha= document.querySelector('#fecha');
const lista= document.querySelector('#lista');
const elemento= document.querySelector('#elemento');
const input= document.querySelector('#input');
const botonAgregar= document.querySelector('#boton-agregar');
const check= 'bi-record-circle';
const tachado= 'tachado';
const uncheck='bi-circle';
let LIST;
let id;

// Programación

const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day: 'numeric',

});

// Función agregar tarea
function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    };

    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `<li id="elemento">
    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
    <p class="tarea-lista text ${LINE}">${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-x"></i>
</li> `
// Donde incorporará el nuevo elemento
   lista.insertAdjacentHTML("beforeend",elemento);
};

function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true;
};
// Función eliminar un elemento
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
};

// Función agregar tarea
botonAgregar.addEventListener("click",()=>{
    const tarea= input.value;
    if(tarea){
        agregarTarea(tarea,id,false,false)
        // Se colocan dos falsos por que aun no esta realizado y ni eliminado es tarea pendiente
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
    // Se guarda la información en el local storage
        localStorage.setItem("TODO",JSON.stringify(LIST));
         id++; //Para que aumente de uno en uno
         input.value="";
    }
});

// Para guardar los elemento de la lista en un archivo Json escuchando lo del item event
lista.addEventListener("click",function(event){
const element= event.target;
const elementData= element.attributes.data.value;
if (elementData== "hecho"){
    tareaRealizada(element);
} else if (elementData== "eliminar"){
    tareaEliminada(element);
};
localStorage.setItem("TODO",JSON.stringify(LIST));
});

// Si data existe guarda estos valores en el archivo JSON
let data=localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    cargarLista(LIST);
}
// Array= coleccion de elementos
else {
    // lista con elementos vacios
    LIST=[];
    id= 0;
}

function cargarLista(array){
    array.forEach(
        function(item){
            agregarTarea(item.nombre,item.id,item.hecho, item.eliminar);
        }
    );
};