var fs = require('fs');
var hbs = require('handlebars');
var template_raw = fs.readFileSync('template.hbs').toString();
var sonidos = fs.readdirSync('sonidos');
const extension = /\.[^.]+$/;
const espacios = /[_-]/g;
const categoria = /^([A-Z]+) /;
const categoria_default = 'OTROS';

function nombre(sonido, con_categoria) {
    var nombre = sonido
        .replace(extension, '')
        .replace(espacios, ' ');

    return con_categoria
        ? nombre
        : nombre.replace(categoria, '');
}

function categoria_o_default(sonido) {
    var match = categoria.exec(nombre(sonido, true));
    return match? match[1] : categoria_default;
}

var archivos = sonidos.map((sonido) => ({
    archivo: `sonidos/${sonido}`,
    categoria: categoria_o_default(sonido),
    nombre: nombre(sonido)
}));

var categorias = archivos.reduce((categorias, archivo) => {
    if(categorias[archivo.categoria]) {
        categorias[archivo.categoria].push(archivo);
    } else {
        categorias[archivo.categoria] = [archivo];
    }
    return categorias;
}, {});

var template = hbs.compile(template_raw);
debugger;
var resultado = template({archivos, categorias});

console.log(resultado);
