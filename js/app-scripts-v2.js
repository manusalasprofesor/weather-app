const apiClave = '#'; // colocar la API Key de nuestra cuenta de OpenWeather Map
let temperaturaValor = document.querySelectorAll('.temperatura-valor');
let temperaturaDescripcion = document.querySelectorAll('.temperatura-descripcion');
let ubicacion = document.querySelectorAll('.ubicacion');
let iconoDom = document.querySelectorAll('.icono-animado');
let vientoVelocidad= document.querySelectorAll('.viento-velocidad');


window.addEventListener('load', () =>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion =>{
            let latitud = posicion.coords.latitude;
            let longitud = posicion.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiClave}&units=metric&lang=es`;
            datosTiempo(url, 0);
        });
    }
});

document.querySelector('#consulta').addEventListener('click', () =>{
    let datoUsuario = document.querySelector('#ciudad').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${datoUsuario}&appid=${apiClave}&units=metric&lang=es`
    datosTiempo(url, 1);
});

document.querySelector('#ciudad').addEventListener('keyup', (e) =>{
    if (e.key === 'Enter'){
        let datoUsuario = document.querySelector('#ciudad').value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${datoUsuario}&appid=${apiClave}&units=metric&lang=es`
        datosTiempo(url, 1);
    }
});

function datosTiempo(url, conten){
    fetch(url)
        .then (response => response.json())
        .then (datos =>{
            let temperatura = Math.round(datos.main.temp);
            let localizacion = datos.name;
            let descripcion = datos.weather[0].description;
            let viento = datos.wind.speed;
            let icono = datos.weather[0].main;
           

            temperaturaValor[conten].textContent = `${temperatura} °C`;
            ubicacion[conten].textContent = localizacion;
            temperaturaDescripcion[conten].textContent = descripcion;
            vientoVelocidad[conten].textContent = `${viento} m/s`;

            // Iconos animados
            switch(icono){
                case 'Clouds':
                    iconoDom[conten].src = 'img/cloudy-day-1.svg';
                    break;
                case 'Clear':
                    iconoDom[conten].src = 'img/day.svg';
                    break;
                case 'Snow':
                    iconoDom[conten].src = 'img/snowy-5.svg';
                    break;
                case 'Rain':
                    iconoDom[conten].src = 'img/rainy-6.svg';
                    break;
                case 'Drizzle':
                    iconoDom.src[conten] = 'img/rainy-5.svg';
                    break;
                case 'Thunderstorm':
                    iconoDom.src[conten] = 'img/thunder.svg';
                    break;
                case 'Atmosphere':
                    iconoDom.src[conten] = 'img/weather.svg';
                    break;
                default:
                    iconoDom.src[conten] = 'img/weather_sunset.svg';
                    break;
            }
        })
        .catch (err => console.error(err));
}
