var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var direccion = req.body.direccion;
  var email = req.body.email;
  var telefono = req.body.telefono;

  var obj = {
    to: 'molinaspablo46@gmail.com',
    subject: 'Contacto desde al Web',
    html: nombre +" "+"con dirección en: "+direccion+" "+"cuyo teléfono es: "+telefono+" "+"quiere recibir información al siguiente corréo electrónico: "+ email +" "
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', { message: 'Mensaje enviado correctamente' });

});

module.exports = router;
