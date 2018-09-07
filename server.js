const express = require('express'); //nodemon server.js -e js,hbs
const hbs = require('hbs'); //handlebars
const fs = require('fs');

const port = process.env.PORT || 3000; //get heroku variable
var app = express(); 

hbs.registerPartials(__dirname + '/views/partials'); //add partial templates
app.set('view engine', 'hbs'); //handlebars


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
	return text.toUpperCase();
});
app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Welcome to my website!',
		pageTitle: 'Home Page',
	});
	
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Project',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
}); 

//set up local host