"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function pedirChistes() {
    return __awaiter(this, void 0, void 0, function* () {
        const mostrar = document.getElementById('mostrarChiste');
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener el chiste');
            }
            const data = yield response.json();
            mostrar.textContent = data.joke;
            currentJoke = data.joke;
        }
        catch (error) {
            mostrar.textContent = 'Hubo un error al pedir los chistes';
            console.error(error);
        }
        guardarPuntuacion();
        emojiItem.forEach((item) => {
            item.classList.remove('selected');
            calificacion = 0;
            console.log("a VER si se quita al pedir nuevo chiste", calificacion);
        });
    });
}
function pedirClima() {
    return __awaiter(this, arguments, void 0, function* (ciudad = "Barcelona") {
        var _a;
        const apiKey = "13a90374849f8d04b244930a0d6c3885";
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
        try {
            const response = yield fetch(URL);
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la API");
            }
            const jsonMeteo = yield response.json();
            const nombreIcono = jsonMeteo.weather[0].icon;
            const ciudad = jsonMeteo.name;
            const pais = jsonMeteo.sys.country;
            const temperatura = jsonMeteo.main.temp;
            const tempMax = jsonMeteo.main.temp_max;
            const tempMin = jsonMeteo.main.temp_min;
            const sensaTemp = jsonMeteo.main.feels_like;
            const humedad = jsonMeteo.main.humidity;
            console.log(`Ciudad: ${ciudad}, País: ${pais}`);
            console.log(`Temperatura: ${temperatura}°C`);
            console.log(`Temperatura Máxima: ${tempMax}°C`);
            console.log(`Temperatura Mínima: ${tempMin}°C`);
            console.log(`Sensación Térmica: ${sensaTemp}°C`);
            console.log(`Humedad: ${humedad}%`);
            console.log(`Icono: ${nombreIcono}`);
            document.getElementById("ciudad").textContent = `Ciudad: ${ciudad}`;
            document.getElementById("temperatura").textContent = `Temperatura: ${temperatura}°C`;
            document.getElementById("temp_max").textContent = `Temp. Max: ${tempMax}°C`;
            document.getElementById("temp_min").textContent = `Temp. Min: ${tempMin}°C`;
            document.getElementById("sensa_temp").textContent = `Sensación: ${sensaTemp}°C`;
            document.getElementById("humedad").textContent = `Humedad: ${humedad}%`;
            (_a = document.getElementById("icono")) === null || _a === void 0 ? void 0 : _a.setAttribute("src", `https://openweathermap.org/img/wn/${nombreIcono}.png`);
        }
        catch (error) {
            console.error("Error al obtener los datos meteorológicos: ", error);
        }
    });
}
pedirClima();
const ciudad = "Barcelona";
function mostrar() {
    pedirChistes();
    pedirClima();
}
let currentJoke = '';
let reportJokes = [
    {
        joke: "...",
        score: 1,
        date: new Date(),
    }
];
const emojiItems = document.querySelectorAll('#emoji-selector .list-group-item');
let calificacion = 0;
emojiItems.forEach(item => {
    item.addEventListener('click', () => {
        emojiItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const selectedItem = document.querySelector('.list-group-item.selected');
        const selectedValue = selectedItem ? selectedItem.dataset.value || null : null;
        if (selectedValue) {
            calificacion = parseInt(selectedValue, 10);
        }
        console.log("a VER si se asigna el valor emoji", selectedValue);
    });
});
const guardarPuntuacionBtn = document.getElementById('guardarPuntuacionBtn');
const emojiItem = document.querySelectorAll('#emoji-selector .list-group-item');
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(guardarPuntuacionBtn === null || guardarPuntuacionBtn === void 0 ? void 0 : guardarPuntuacionBtn.contains(target)) &&
        !target.closest('#emoji-selector .list-group-item')) {
        emojiItem.forEach((item) => {
            item.classList.remove('selected');
            calificacion = 0;
            console.log("a VER si se quita el hacer click fuera", calificacion);
        });
    }
});
emojiItem.forEach((item) => {
    item.addEventListener('click', () => {
        emojiItem.forEach((otherItem) => {
            otherItem.classList.remove('selected');
        });
        item.classList.add('selected');
    });
});
function pushearCalificaciones(joke, score, date) {
    reportJokes.push({
        joke: joke,
        score: score,
        date: date
    });
}
pedirChistes();
function guardarPuntuacion() {
    if (currentJoke && calificacion > 0) {
        pushearCalificaciones(currentJoke, calificacion, new Date());
        console.log("Chiste guardado con puntuación", calificacion);
        console.log(reportJokes);
    }
    else {
        console.log("No se ha seleccionado una puntuación válida o no hay chiste");
        console.log(reportJokes);
    }
}
//# sourceMappingURL=index.js.map