const { default: chalk } = require('chalk')
const request = require('request')
const fs = require('fs')
const { isDataView } = require('util/types')

const geocode = (lugar,callback) =>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+lugar+'.json?limit=1&types=place&language=pt&access_token=pk.eyJ1IjoiYWlzMTIzMzIxIiwiYSI6ImNreDludGl4czNudXYzMHJudWMzYzZod3IifQ.cmkMToc3svW5CY7cd6d76w'

    request({url, json: true}, (error,response) =>{

        if (error){
            return callback('Ocorreu um erro!!!', undefined)
            
       }else if(response.body.features.length === 0){
            return callback('Local não encontrado!',undefined)
            
        }else{
            data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                cidade: response.body.features[0].place_name
            }

            const {latitude,longitude,cidade} = data

            //const hora = Date();
            //fs.appendFileSync('log.txt',hora +' Cidade: ' + cidade +'\n')
            //console.log(chalk.green('Cidade: ' + cidade +'\nLatitude: ' + latitude+'\nLongitude: '+ longitude))
            callback(error,data)
        }
    })
}


module.exports = {
    geocode: geocode
}