const express = require("express");
const router = express.Router();



router.use(express.static('public'));


router.get('/',(req,res)=>{ 
    res.render('pages/home');
});

router.get('/about',(req,res)=>{ 

    res.render('pages/about');
});

router.get('/cadastro',(req,res)=>{ 

    res.render('pages/cadastro',{users:users}); 
});

router.post('/cadastro/remove',(req,res)=>{
    let name = req.body.name;

    if(users.length==0){
        console.log("Erro: Não há elemento a ser removido!");
        return res.status(500).json({
            status:'error',
            error:`Removed element: ${name}`
        });

    } else {
        for(let cont=0;cont<users.length;cont++){
            if(users[cont].name==name){
                users.splice(cont,1);
                console.log("Elemento Removido: ",name);
                return res.status(200).json({
                    status:'sucess',
                    data:users
                });
            } else if(cont==users.length-1){
                console.log("Erro ao remover elemento: ",name);
                return res.status(400).json({
                    status:'error',
                    error:`Didn't Remove element: ${name}`
                });
            }
        }
    }
    
});


router.post('/cadastro/update',(req,res)=>{

    users[req.body.id].name=req.body.name; 
    users[req.body.id].email=req.body.email;
    users[req.body.id].address=req.body.address;
    users[req.body.id].age=req.body.age;
    users[req.body.id].heigth=req.body.heigth;
    users[req.body.id].vote=req.body.vote;

    res.sendStatus(200); 
    console.log("Dados recebidos: ",req.body);
});

router.get('/cadastro/list',(req,res)=>{

    console.log("Listinha: ",users);
    res.send(JSON.stringify(users));
});

router.post('/cadastro/add',(req,res)=>{
    
    let user={name:"",email:"",address:"",heigth:"",age:"",vote:""};

    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.heigth = req.body.heigth;
    user.age = req.body.age;
    user.vote = req.body.vote;

    users.push(user);
    console.log("Usuário cadastrado: ", user);
    console.log("Lista dos usuários: ", users); 
    res.sendStatus(200);
    res.status(200).json({
        status:'sucess',
        data: `Usuário ${user} foi adiocionado com sucesso!`
    });

});

module.exports = router;