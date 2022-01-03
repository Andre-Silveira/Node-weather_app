const request = require('request')
const chalk = require('chalk')
const fs = require('fs')

const forecast = (latitude,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=39d889d4d94d647bf6fad173651c0701&query="+latitude+","+longitude 
    
    request({url, json: true},(error, response)=>{
        if(error){
            return callback('Não é possível obter os dados de previsão do tempo!!!', undefined)
        }else if(response.body.success){
            return callback('Não foi possível identificar a localização!!!', undefined)
        }else{
            dados = {
                descricao: response.body.current.weather_descriptions[0],
                temperatura: response.body.current.temperature,
                sensacao: response.body.current.feelslike
            }
            const {descricao,temperatura,sensacao} = dados
            //fs.appendFileSync('log.txt',descricao +'. A temperatura atual é de '+temperatura+'ºC. A sensação térmica é de '+sensacao+'ºC.')
            callback(undefined, descricao +'. A temperatura atual é de '+ temperatura + 'ºC. A sensação térmica é de '+ sensacao +'ºC.')
            //callback(undefined, dados)
            
        }      
    })
}

module.exports = {
    forecast
}
