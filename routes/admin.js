const express = require('express')
const router = express.Router()
const post = require('../models/post')
const categorie = require('../models/categories')
//const {isAdmin} = require("../helpers/is_admin")
const session = require("express-session");

router.get('/',(req,res)=>{
    post.findAll({order:[['id','DESC']]}).then((post)=>{
        res.render('home',{posts:post,title:'Blog Node js - Home',user:req.session.name})
    })
})

router.get('/posts',(req,res)=>{
    
    if (req.session.name) {
        post.findAll().then((post)=>{
            res.render('posts',{posts:post,title:'Blog Node js - Postagens',user:req.session.name})
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }

})

router.get('/posts/add', (req,res)=>{
    categorie.findAll({order:[['id','DESC']]}).then((categorie)=>{
        res.render('AddPosts',{categories:categorie,title:'Blog Node js - Nova postagem',user:req.session.name})
    })
    
})

router.get('/posts/:id',(req,res)=>{
    if (req.session.name) {
        post.findOne({where:{id:req.params.id}}).then((p)=>{
            if (p) {
                res.render('Posts/index',{posts:p,title:'Blog Node js - Ver postagem',user:req.session.name})
            }else{
                req.flash('error_msg','Postagem não encontrada')
                res.redirect('/')
            }
    
        }).catch(()=>{
            req.flash('error_msg','Houve um erro interno')
            res.redirect('/')
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
   
    
})

router.post('/posts/add',(req,res)=>{
    var erros = []

    if (req.body.categoria == '0') {
        erros.push({texto:'Categória invalida, registre uma categória'})

    }

    if (erros.length > 0) {
        res.render('AddPosts',{erros:erros})
    }else{

        let d = new Date()

        const newPost = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            conteudo: req.body.conteudo,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            date: d.getDate()
        }

        post.create(newPost).then(()=>{
            req.flash('success_msg','Postagem criada com sucesso!')
            res.redirect('/posts')

        }).catch(()=>{
            req.flash('error_msg','Houve um erro ao salvar postagem')
            res.redirect('/posts')
        })
    }
})

router.get('/posts/edit/:id', (req,res)=>{
    if (req.session.name) {
        categorie.findAll().then((categorie)=>{

            post.findOne({where: {id : req.params.id}}).then((post)=>{
                res.render('editposts',{posts:post,categories:categorie,title:'Blog Node js - Editar postagem',user:req.session.name})
            }).catch(()=>{
                req.flash('error_msg','Essa postagem não existe')
                res.redirect('/posts')
            })
    
        }).catch(()=>{
            req.flash('error_msg','Erro ao carregar categorias')
            res.redirect('/')
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
   
});

router.post('/posts/edit',(req,res)=>{
  
    post.findOne({where: {id : req.body.id}}).then((post)=>{
        post.titulo = req.body.titulo
        post.slug = req.body.slug
        post.decricao = req.body.descricao
        post.conteudo = req.body.conteudo
        post.categoria = req.body.categoria
        
        post.save().then(()=>{
            req.flash('success_msg','Postagem editada com sucesso!')
            res.redirect('/posts')
        }).catch(()=>{
            req.flash('error_msg','Houve um erro interno ao fazer a edição')
            res.redirect('/posts')
        })
        
    }).catch(()=>{
        req.flash('error_msg','Houve um erro ao editar a postagem')
        res.redirect('/posts')
    })
})

router.get('/deletar/post/:id',(req,res)=>{
    if (req.session.name) {
        post.destroy({where: {'id' : req.params.id}}).then(()=>{
            req.flash('success_msg','Postagem deletada com sucesso!')
            res.redirect('/posts')
        }).catch((error)=>{
            req.flash('error_msg','Esta Postagem não existe')
            res.redirect('/posts')
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
    
});

router.get('/categories', (req,res)=>{
    
    categorie.findAll({order:[['id','DESC']]}).then((categorie)=>{
        res.render('categories/index',{categories:categorie,title:'Blog Node js - Categórias',user:req.session.name})
    }).catch(()=>{
        req.flash('error_msg','Houve um erro interno ao carregar categórias')
        res.redirect('/')
    })
})

router.get('/categories/:id',(req,res)=>{
    
    categorie.findOne({where : {'id': req.params.id}}).then((c)=>{

        const ct = c
        if (ct) {

            post.findAll({where : {'categoria': req.params.id}}).then((p)=>{
                res.render('categories/posts',{posts:p,categories:ct,title:'Blog Node js - Postagem de Categórias',user:req.session.name})

            }).catch(()=>{
                req.flash('error_msg','Houve um erro ao listar postagens')
                res.redirect('/')

            })

        }else{
            req.flash('error_msg','Categória não encontrada')
            res.redirect('/')
        }

    }).catch(()=>{
        req.flash('error_msg','Houve um erro interno ao carregar postagens')
        res.redirect('/')
    })
})

router.get('/add/categories',(req,res)=>{
    if (req.session.name) {
        res.render('AddCategories',{title:'Blog Node js - Nova categória',user:req.session.name})
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
    
})

router.post('/categories/new', (req,res)=>{
    let erros = []

    if (req.body.name.length < 3) {
        erros.push({texto : "Nome muito pequeno"})
    }

    if (erros.length > 0) {
        res.render("AddCategories",{texto:erros})
    }else{
        let d = new Date();
        
        categorie.create({
            name: req.body.name,
            slug: req.body.slug,
            date:  d.getDate()

        }).then(()=>{
            req.flash("success_msg","Categória criada com sucesso")
            res.redirect('/categories')

        }).catch(()=>{
            req.flash("error_msg","Erro ao salvar categoria,tente novamente")
        })
        
    }

})

router.get('/categorias/edit/:id', (req,res)=>{
    if (req.session.name) {
        categorie.findOne({where: {id : req.params.id}}).then((categorie)=>{
            res.render('editcategorias',{categories:categorie,title:'Blog Node js - Editar Categória',user:req.session.name})
        }).catch(()=>{
            req.flash('error_msg','Essa categória não existe')
            res.redirect('/categories')
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
    
});

router.post('/categorias/edit',(req,res)=>{

    categorie.findOne({where: {id : req.body.id}}).then((categorie)=>{
        categorie.name = req.body.name
        categorie.slug = req.body.slug
        
        categorie.save().then(()=>{
            req.flash('success_msg','Categória editada com sucesso!')
            res.redirect('/categories')
        }).catch(()=>{
            req.flash('error_msg','Houve um erro interno ao fazer a edição')
            res.redirect('/categories')
        })
        
    }).catch(()=>{
        req.flash('error_msg','Houve um erro ao editar a edição')
        res.redirect('/categories')
    })
})

router.get('/deletar/:id', (req,res)=>{
    if (req.session.name) {
        categorie.destroy({where: {'id' : req.params.id}}).then(()=>{
            req.flash('success_msg','Categória deletada com sucesso!')
            res.redirect('/categories')
        }).catch((error)=>{
            req.flash('error_msg','Esta Categória não existe')
            res.redirect('/categories')
        })
    }else{
        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
    
});

module.exports = router
