    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const connection = require("./database/database.js");
    const Pergunta =require("./database/pergunta");
    const Resposta = require("./database/resposta");
    //const modal = require("./modais/modal.js");
 
    

    //data base

    connection
            .authenticate()
            .then(()=>{
                console.log('conexão com o banco ok')
            })
            .catch((msgerro)=>{
    console.log(msgerro);
            });

    app.set('view engine','ejs');
    app.use(express.static('public'));
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    //rotas
    app.get("/",(req,res)=>{

        Pergunta.findAll({
            raw:true,
            order:[
                ['id','DESC']
            ]
        }).then(perguntas=>{
            res.render("index",{
                perguntas:perguntas
            });
    console.log(perguntas);

        });
    

    });

    app.get("/verResposta/:id",(req,res)=>{
        
        var id = req.params.id;
        Resposta.findOne({
            where:{
                id:id
            }
        }).then(resposta =>{

            if(resposta!=undefined){

             Resposta.findAll({
                 where:{id:resposta.id}
             }).then(respostas=>{

                Pergunta.findOne({

                    where:{id:resposta.perguntaId}
                }).then(pergunta=>{
                    res.render("respostas",{

                   
    
                        respostas:respostas,
                        pergunta:pergunta
                       
    
                        
                

                });

                });
             
                  
                  

             });




}else{
        
              
res.redirect("/");
            }
        });
      

   
     
    });

    app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
    });
    app.post("/salvarPergunta",(req,res)=>{
        var titulo = req.body.titulo;
        var descricao=req.body.descricao;
        Pergunta.create({
        titulo:titulo,
        descricao:descricao

        }).then(()=>{
            res.redirect("/");
        });
    });

        app.get("/pergunta/:id",(req,res)=>{
            var id = req.params.id;
            Pergunta.findOne({
                where:{
                    id:id
                }
            }).then(pergunta =>{

                if(pergunta!=undefined){

                 Resposta.findAll({
                     where:{perguntaId:pergunta.id}
                 }).then(respostas=>{
                    res.render("pergunta",{

                        pergunta:pergunta,
                        respostas:respostas
                       

                        
                    });    

                 });


  

    }else{
            
                  
    res.redirect("/");
                }
            });
        });

      

        app.post("/salvarResposta",(req,res)=>{
            var corpo = req.body.corpo;
            var perguntaId=req.body.pergunta;
        
                Resposta.create({
                    corpo:corpo,
                    perguntaId:perguntaId
                }).then(()=>{
                    console.log(Resposta);
                    res.redirect("/pergunta/"+perguntaId);
                })
                
            
            

        });


      
    app.listen(8080,()=>{console.log("App rodando!")});