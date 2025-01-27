
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

let workTime = document.getElementById("work-time");
let breakTime = document.getElementById("break-time");
let sets = document.getElementById("sets");
let setPomodoro = document.getElementById("pomodoro-set");

let workSeconds;
let breakSeconds; 
let setsUsuario;
let set = 1;

let botonPlay = document.getElementById("boton-play");
let botonPause = document.getElementById("boton-pause");
botonPause.disabled = true;
let botonRestart = document.getElementById("boton-stop");
botonRestart.disabled = true;

let interval;
let pomodoroInterval = "Inicio";
let pomodoroSection = "Work";
let barraProgreso = document.getElementById("progreso");

let minutosHTML = document.getElementById("minutos");
let segundosHTML = document.getElementById("segundos");
let heading2 = document.getElementById("heading-2");
let imagenGato = document.getElementById("imagen-gato");

botonPlay.addEventListener("click", function(){
    if(pomodoroInterval == "Inicio"){
        pomodoroInterval = "Ejecucion";
        /* tomamos los valores y ejecutamos el pomodoro*/ 
        workSeconds = parseInt(workTime.value) * 60;
        breakSeconds = parseInt(breakTime.value) * 60;
        setsUsuario = parseInt(sets.value);
        //habilitamos los botones y desactivamos
        botonPlay.disabled = true; 
        botonPause.disabled = false;
        botonRestart.disabled = false;

        pomodoro();
        
    }else if(pomodoroInterval == "Pausa"){
        botonPlay.disabled = true; 
        botonPause.disabled = false;
        botonRestart.disabled = false;
        imagenGato.src ="https://i.gifer.com/origin/c3/c366c9ba820eefe6e183a351f5716b4e_w200.gif";
        pomodoroInterval = "Ejecucion";
        pomodoro(); // volvemos a ejecutar el pomodoro en donde quedo

    }
})
botonPause.addEventListener("click", function(){
    if(pomodoroInterval == "Ejecucion"){
        clearInterval(interval);
        pomodoroInterval = "Pausa";
        botonPlay.disabled = false;
        botonPause.disabled = true;
        imagenGato.src = "https://images.vexels.com/media/users/3/272048/isolated/preview/ffe477e3c59bce60b203051f33628276-gato-negro-de-dibujos-animados-sentado.png";
    }
})
botonRestart.addEventListener("click", function(){
    pomodoroInterval = "Inicio";
    botonPlay.disabled= false;
    botonPause.disabled = true;
    botonRestart.disabled = true;
    minutosHTML.innerHTML = workTime.value;
    segundosHTML.innerHTML = "00";
    pomodoroSection = "Work";
    set = 1;
    barraProgreso.style.width = "0%";
    clearInterval(interval);
    heading2.style.display = "none";
    imagenGato.src = "https://images.vexels.com/media/users/3/272048/isolated/preview/ffe477e3c59bce60b203051f33628276-gato-negro-de-dibujos-animados-sentado.png";
})

function pomodoro(){
    
    if(set <= setsUsuario){
        setPomodoro.innerHTML = "Pomodoro#" + set;
        if(pomodoroSection == "Work"){
            interval = setInterval(startPomodoro, 1000); 
        }else{
            interval =  setInterval(breakPomodoro,1000);
        }
    }else{
        alert("Pomodoro terminado");
        pomodoroInterval = "Inicio";
        botonPlay.disabled= false;
        botonPause.disabled = true;
        botonRestart.disabled = true;
        minutosHTML.innerHTML = workTime.value;
        segundosHTML.innerHTML = "00";
        pomodoroSection = "Work";
        set = 1;
        barraProgreso.style.width = "0%";
        clearInterval(interval);
        heading2.style.display = "none";
        imagenGato.src = "https://images.vexels.com/media/users/3/272048/isolated/preview/ffe477e3c59bce60b203051f33628276-gato-negro-de-dibujos-animados-sentado.png";
    }
}

function startPomodoro(){
    let minutos = Math.floor(workSeconds / 60) ;
    let segundos = workSeconds % 60;
    pomodoroSection = "Work";
    actualizarProgreso(workSeconds, parseInt(workTime.value));
    
    /* Cambiar h2 */
    heading2.style.display = "block";
    heading2.innerHTML = "Work!!";
    /* cambiar imagen gato*/
    imagenGato.src ="https://i.gifer.com/origin/c3/c366c9ba820eefe6e183a351f5716b4e_w200.gif"

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

    if(workSeconds == 0){
        clearInterval(interval); 
        interval = setInterval(breakPomodoro, 1000);
        workSeconds = parseInt(workTime.value) * 60;
        barraProgreso.style.width = "0%";
    }else{
        workSeconds--;
    }
}
function breakPomodoro(){
    pomodoroSection = "Break";
    actualizarProgreso(breakSeconds, parseInt(breakTime.value));
    let minutos = Math.floor(breakSeconds / 60) ;
    let segundos = breakSeconds % 60;
    heading2.innerHTML = "Break";
    imagenGato.src = "https://images.vexels.com/media/users/3/272048/isolated/preview/ffe477e3c59bce60b203051f33628276-gato-negro-de-dibujos-animados-sentado.png";
    
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

    if(breakSeconds == 0){
        clearInterval(interval); 
        set++;
        breakSeconds = parseInt(breakTime.value) * 60;
        barraProgreso.style.width = "0%";
        pomodoro();

    }else{
        breakSeconds--;
    }
}

function actualizarProgreso(tiempoRestante,tiempoTotal){
    tiempoTotal =  tiempoTotal * 60;
    let progress = ((tiempoTotal - tiempoRestante) / tiempoTotal) * 100;

    barraProgreso.style.width = progress + "%";
}





    















