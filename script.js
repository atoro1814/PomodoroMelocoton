
/*logica para las opciones de la pagina*/
let botonMenu = document.getElementById("boton-menu");
let botonCierre = document.getElementById("boton-cierre");
let opciones = document.getElementById("contenedor-opciones");

botonMenu.addEventListener("click", function(){
    opciones.style.display = "flex";
    opciones.style.zIndex = "1";
})

botonCierre.addEventListener("click", function(){
    opciones.style.display = "none";
})

/*logica para el cronometro*/
let workSeconds;
let breakSeconds;
let setsTotal;


//obtener elementos del DOM de la configuracion
let workMinutes = document.getElementById("work-time");
let breakMinutes = document.getElementById("break-time");
let setTime = document.getElementById("sets");
let minutosHTML = document.getElementById("minutos");
let segundosHTML = document.getElementById("segundos");
let setsHTML = document.getElementById("pomodoro-set");
let heading2 = document.getElementById("heading-2");
let imagenGato = document.getElementById("imagen-gato");
let sound = document.getElementById("sound");

//variables
let setInicial = 1;
let estado = "work";
let interval;
let seccion = "Inicio";

let botonPlay = document.getElementById("boton-play");
let botonPause = document.getElementById("boton-pause");
let botonRestart = document.getElementById("boton-stop");

//configuracion de los botones estado Inicial

botonPause.disabled = true;
botonRestart.disabled = true;


botonPlay.addEventListener("click", function(){
    //obtener segundos de trabajo
    
    
    heading2.style.display = "block";
    //configuracion de botones
    botonPlay.disabled = true;
    botonPause.disabled = false;
    botonRestart.disabled = false;
    //iniciar el cronometro
    if(seccion == "Inicio"){
        workSeconds = parseInt(workMinutes.value) * 60;
        breakSeconds = parseInt(breakMinutes.value) * 60;
        
        setsTotal = parseInt(setTime.value);
        pomodoro();     
    }else if(seccion == "Ejecucion"){
        pomodoro();
    }
})
botonPause.addEventListener("click", function(){
    clearInterval(interval);
    seccion = "Ejecucion";
    //configuracion de botones
    botonPlay.disabled = false;
    botonRestart.disabled = false;
    botonPause.disabled = true; 

})

botonRestart.addEventListener("click", function(){
    //configuracion de botones
    botonPlay.disabled = false;
    botonPause.disabled = true;
    botonRestart.disabled = true;

    restaurar();
})
function pomodoro(){
    if(setInicial <= setsTotal){
        if(estado == "work"){
            sound.play();
            interval = setInterval(startPomodoro, 1000);
        
        }else if (estado == "break"){
            sound.play();
            interval = setInterval(breakPomodoro, 1000);
        }
    }else{
        heading2.innerHTML = "Pomodoro Terminado";
        restaurar();
    }
}
function startPomodoro(){
    //cambios en el DOM
    
    setsHTML.innerHTML = "pomodoro#" + setInicial;
    heading2.innerHTML = "Work!!";
    imagenGato.src ="https://i.gifer.com/origin/c3/c366c9ba820eefe6e183a351f5716b4e_w200.gif"

    let minutos = Math.floor(workSeconds / 60);
    let segundos = workSeconds % 60;
    actualizarTiempoHTML(minutos,segundos);

    if(workSeconds == 0){
        clearInterval(interval);
        estado = "break";
        workSeconds = parseInt(workMinutes.value) * 60;
        pomodoro();
    }else{
        workSeconds--;
    }
}
function breakPomodoro(){
    //cambios en el DOM
    setsHTML.innerHTML = "pomodoro#" + setInicial;
    heading2.innerHTML = "Break!!";
    imagenGato.src = "https://images.vexels.com/media/users/3/272048/isolated/preview/ffe477e3c59bce60b203051f33628276-gato-negro-de-dibujos-animados-sentado.png";
    
    let minutos = Math.floor(breakSeconds / 60) ;
    let segundos = breakSeconds % 60;
    
    actualizarTiempoHTML(minutos,segundos); 


    if(breakSeconds == 0){
        clearInterval(interval); 
        estado = "work";
        setInicial++;
        breakSeconds = parseInt(breakMinutes.value) * 60;
        pomodoro();
    }else{
        breakSeconds--;
    }
}

function actualizarTiempoHTML (minutos,segundos){
    if(segundos == 0){
        segundosHTML.innerHTML = "00";
    }
    else{
        if(segundos < 10){
            segundosHTML.innerHTML = "0" + segundos;
        }else{
            segundosHTML.innerHTML = segundos;
        }        
    }

    if(minutos < 10){
        minutosHTML.innerHTML = "0" + minutos;
    }else{
        minutosHTML.innerHTML = minutos;
    }
}
function restaurar(){
    clearInterval(interval);
    //configuracion de botones
    botonPlay.disabled = false;
    botonPause.disabled = true;
    botonCierre.disabled = true;

    workSeconds = parseInt(workMinutes.value) * 60;
    breakSeconds = parseInt(breakMinutes.value) * 60;
    setInicial = 1;
    setsHTML.innerHTML = "pomodoro#" + setInicial;
    seccion = "Inicio";
    estado = "work";
    let minutos = Math.floor(workSeconds / 60);
    let segundos = workSeconds % 60;
    actualizarTiempoHTML(minutos,segundos);

}











    















