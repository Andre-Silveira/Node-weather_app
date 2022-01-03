const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode.js')
const forecast = require('./util/forecast.js')

const app = express();
const port = process.env.PORT || 3000

//Definindo o path do diretorio 
const publicDiretoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')


//Definindo a configuração do 'EXPRESS'
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//Definindo o uso estatico do express
app.use(express.static(publicDiretoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'André Silveira'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'André Silveira'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'André Silveira'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'Você deve adicionar o endereço (address)'
        })
    }

    geocode.geocode(req.query.address,(error, {latitude,longitude,cidade} = {})=>{
        if (error){
            return res.send({
                erro: error
            })
        } else if (latitude,longitude){
            forecast.forecast(latitude,longitude,(erro, dados) => {
                if (erro){
                    return res.send({
                        erro: erro
                    })}
               
                res.send({
                    address: req.query.address,
                    location: cidade,
                    latitude: latitude,
                    longitude: longitude,
                    forecast: dados
                })
            })
            
        }
        
    })


})  

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: 'Page404',
        name: 'André Silveira',
        erroMessage: 'Artigo Help não funcionando.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Page404',
        name: 'André',
        erroMessage: 'A página não está funcionando'


    })
})



app.listen(port,() => {
    console.log('Conectado ao servidor pela porta 3000.')
})