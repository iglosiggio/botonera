const fs = require('fs');
const hbs = require('handlebars');
const template_raw = fs.readFileSync('template.hbs').toString();
const extension = /\.[^.]+$/;
const espacios = /[_-]/g;
const categoria = /^([A-Z]+) /;

function nombre(sonido, con_categoria) {
    var nombre = sonido
        .replace(extension, '')
        .replace(espacios, ' ');

    return con_categoria
        ? nombre
        : nombre.replace(categoria, '');
}

const categorias = fs.readdirSync('sonidos').map((categoria) => ({
    nombre: nombre(categoria),
    archivos: fs.readdirSync(`sonidos/${categoria}`).map((sonido) => ({
        archivo: `sonidos/${categoria}/${sonido}`,
        categoria: categoria,
        nombre: nombre(sonido)
    }))
}));

var template = hbs.compile(template_raw);

var resultado = template({categorias});

console.log(resultado);
