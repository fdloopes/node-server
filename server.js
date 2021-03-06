
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

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
    message: 'Welcome to my website'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    message: 'About my website'
  });
});

app.get('/portfolio',(req,res)=>{
  res.render('portfolio.hbs',{
    pageTitle: 'Portifolio Page',
    message: 'My projects portifolio'
  });
});

app.get('/study',(req,res)=>{
  res.render('study.hbs',{
    pageTitle: 'Studies Page',
    message: 'My studies'
  });
});
// =========================================

// Porta servidor
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
