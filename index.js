const express = require('express');
const app = express()
const path = require('path')


app.set('view engine','ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.set("views" , path.join(__dirname,'views'))
var tarefas = []
var tarefasInProgress = []
var tarefasCompleted = []

app.get("/" , (req,res)=>{
    res.render('index.ejs' ,{tarefasList : tarefas , tarefasProgress: tarefasInProgress , tarefasCompleted:tarefasCompleted})
})

app.post('/',(req,res) => {
    tarefas.push(req.body.task)
    res.redirect('/')
})

app.get('/deletar/:questionid' , (req,res) =>{
    tarefas.splice(req.params.questionid,1)
    res.redirect('/')
})
app.get('/deleteCompleted/:questionid' , (req,res) =>{
    tarefasCompleted.splice(req.params.questionid,1)
    res.redirect('/')
})

app.get('/comeBack/:questionid' , (req,res) =>{
    tarefas.unshift(tarefasInProgress[req.params.questionid])
    tarefasInProgress.splice(req.params.questionid,1)
    res.redirect('/')
})

app.get('/progress/:questionid' , (req,res) =>{
    tarefasInProgress.push(tarefas[req.params.questionid])
    tarefas.splice(req.params.questionid,1)
    res.redirect('/')
})
app.get('/completed/:questionid' , (req,res) =>{
    tarefasCompleted.push(tarefasInProgress[req.params.questionid])
    tarefasInProgress.splice(req.params.questionid,1)
    res.redirect('/')
})


app.listen(3000, (req,res)=>{
    console.log('Rodando')
})

