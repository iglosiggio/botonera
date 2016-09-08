var fs = require('fs');
var hbs = require('handlebars');
var template_raw = fs.readFileSync('template.hbs').toString();
var sonidos = fs.readdirSync('sonidos');
var extension = /\.[^.]+$/;
var espacios = /[_-]/;

var archivos = sonidos.map((sonido) => ({
    archivo: `sonidos/${sonido}`,
    nombre: sonido
        .replace(extension, '')
        .replace(espacios, ' ')
}));

var template = hbs.compile(template_raw);

var resultado = template({archivos});

console.log(resultado);
