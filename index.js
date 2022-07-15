require('dotenv').config()
const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async () => {

    let opt = '';

    const busquedas = new Busquedas();

    do {
        console.clear();
        opt = await inquirerMenu();

        switch (opt) {

            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //buscar lugares
                const lugares = await busquedas.ciudad(termino);

                // seleccionar lugar
                const id = await listarLugares(lugares);

                if (id === '0') continue;


                const lugarSel = lugares.find(l => l.id === id)

                busquedas.agregarHistorial(lugarSel.nombre)

                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)//
                //mostar resultados

                console.log('\nInformación del lugar\n'.green)
                console.log('Ciudad:', lugarSel.nombre)
                console.log('Lat:', lugarSel.lat)
                console.log('Lng:', lugarSel.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Mínima:', clima.min)
                console.log('Máxima:', clima.max)
                console.log('El clima está: ', clima.desc)

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx}  ${lugar}`);
                })
                break;
        }

         await pausa();

    } while (opt !== 0);


}


main();