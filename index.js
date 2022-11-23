const express=require("express");
const body_parser=require("body-parser");
const axios=require("axios");
require('dotenv').config();

const app=express().use(body_parser.json());
const Port=3000;

const token=process.env.TOKEN;
const mytoken=process.env.MYTOKEN;//prasath_token

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(Port,()=>{
    console.log("webhook is listening om port:" , Port,process.env.PORT);
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook",(req,res)=>{
   let mode=req.query["hub.mode"];
   let challange=req.query["hub.challenge"];
   let token=req.query["hub.verify_token"];

    console.log("Request",req.query);
    if(mode && token){

        if(mode==="subscribe" && token===mytoken){
            res.status(200).send(challange);
        }else{
            res.status(403);
        }

    }

});

app.post("/webhook",(req,res)=>{ //i want some 

    let body_param=req.body;

    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
        console.log("inside body param");
        if(body_param.entry && 
            body_param.entry[0].changes && 
            body_param.entry[0].changes[0].value.messages && 
            body_param.entry[0].changes[0].value.messages[0]  
            ){
               let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
               let from = body_param.entry[0].changes[0].value.messages[0].from; 
               let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

               console.log("phone number "+phon_no_id);
               console.log("from "+from);
               console.log("boady param "+msg_body);

               axios({
                   method:"POST",
                   url:"https://graph.facebook.com/v13.0/"+phon_no_id+"/messages?access_token="+token,
                   data:{
                       messaging_product:"whatsapp",
                       to:from,
                       text:{
                           body: VerificaRobot (msg_body)
                       }
                   },
                   headers:{
                       "Content-Type":"application/json"
                   }

               });

               res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }

    }

});

app.get("/",(req,res)=>{
    //res.status(200).send("hello this is webhook setup");
    res.render('pages/index');
});


async function VerificaRobot(msg) {
    try {
      this.util.debug("Enviando para Api em " + process.env.URL_API);
  
      let res = await axios
        .post(process.env.URL_API, msg, {
          todo: msg,
        })
        .then((res) => {
          this.util.debug(`statusCode: ${res.statusCode}`);
          this.util.debug(res);
          const notifications = res.data.toString("utf8");
          return notifications;
        })
        .catch((error) => {
          console.error(error);
        });
  
      this.util.debug("Resposta: " + res);
      return res;
      // return  request.post({
      //     "headers": { "content-type": "application/json" },
      //     "url": process.env.URL_API,
      //     "body": JSON.stringify(msg)
      // }, (error, response, body) => {
      //     if (error) {
      //         return this.util.debug(error);
      //     }
      //     this.util.debug(body);
      //     return body;
      // });
    } catch (erro) {
      this.util.debug(erro);
    }
    return "Erro Acesso API.";
  }