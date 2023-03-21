var bd = window.localStorage
var recursos = []
var template, tabla,  cajetinX, cajetinY,cajetinNombre,cajetinDireccion,cajetinHorario,cajetinTelefono, formulario, btnBorrar
var modal;

window.addEventListener("load",function(){
  
  template = document.querySelector("template")
  tabla = document.querySelector("tbody")
  cajetinX = document.querySelector("#x")
  cajetinY = document.querySelector("#y")
  cajetinNombre = document.querySelector("#nombre")
  cajetinDireccion = document.querySelector("#direccion")
  cajetinHorario = document.querySelector("#horario")
  cajetinTelefono = document.querySelector("#telefono")
  formulario = document.querySelector("form")
  btnBorrar = document.querySelector("button#borrar")

  if( bd.getItem("datos") ){
    recursos = JSON.parse(bd.getItem("datos"))
    recursos.forEach( (u,pos)=>{
      añadirFila(u,pos)
    })
  }
 
  modal = bootstrap.Modal.getOrCreateInstance( 
    document.querySelector("#modalFormulario")
  )
  
  formulario.addEventListener("submit", enviar)

})

function añadirFila(recurso,pos){
  let nuevaFila = template.content.cloneNode(true)
  nuevaFila.querySelector("th.x").innerText = recurso.x
  nuevaFila.querySelector("td.y").innerText = recurso.y
  nuevaFila.querySelector("td.nombre").innerText = recurso.nombre
  nuevaFila.querySelector("td.direccion").innerText = recurso.direccion
  nuevaFila.querySelector("td.horario").innerText = recurso.horario
  nuevaFila.querySelector("td.telefono").innerText = recurso.telefono
  tabla.appendChild(nuevaFila)  
}

function enviar(ev){
  ev.preventDefault()
  
  let recurso = crearRecurso() 
  recursos.push(recurso)
  añadirFila(recurso, recursos.length-1)
  
  bd.setItem("datos",JSON.stringify(recursos)) 

  modal.hide() 
}

function crearRecurso(){
  return {
    "x" : cajetinX.value,
    "y" : cajetinY.value,
    "nombre" : cajetinNombre.value,
    "direccion" : cajetinDireccion.value,
    "horario" : cajetinHorario.value,
    "telefono" : cajetinTelefono.value
  }
}
