
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

// Informa que os arquivos .hbs devem usar as partes de views
hbs.registerPartials(__dirname+'/views/partials');

// Informa para utilizar files .hbs nas views
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n',(error)=>{
    if (error) {
        console.log('Unable to append in .log',error);
    }
  });

  next();
});

/*
app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page'
  });
});
*/

// Informa diretorio com páginas estáticas
app.use(express.static(__dirname+'/public'));

// Registra a data atual em getCurrentYear
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

// Rotas
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/about',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'About Page',
    welcomeMessage: 'About my website'
  });
});

// =========================================

// Porta servidor
app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
