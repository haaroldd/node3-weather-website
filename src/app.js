const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { EWOULDBLOCK } = require('constants')


const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //__dirname refers to the location of the file we are in. in this case, app.js, that's why we need to complete the route with ../ to go back to web-server file
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harold'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Harold'
//     }, {
//         name: 'Nany'
//     }])
// })

app.get('/about', (req, res) => {
    res.render('about', {  //The name in between '' needs to match with the name of the file we want to render
        title: 'About me',
        name: 'Harold el tipo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Chukibobo',
        title: 'Help',
        name: 'Harold Dominguez'
    })
})

app.get('/weather', (req, res) => { 
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
             return res.send({ error })
                }  
    forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                 return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
          })
     })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Harold',
        erromssg: 'Article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harold',
        erromssg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
