const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//Models
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão db MySQL OK!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })
//Usando EJS no express
app.set('view engine', 'ejs');
//Usando arquivos public no express (img,css...)
app.use(express.static('public'));
//Pegando os dados do formulário e transformando em Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            //exibir respostas
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                //ordenando do maior ao menor
                order: [['id', 'DESC']]
            }).then(respostas => {
                //exibir pergunta
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/")
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
    // res.render("perguntar");
});

app.listen(8080, () => {
    console.log("Servidor iniciado! http://localhost:8080")
});