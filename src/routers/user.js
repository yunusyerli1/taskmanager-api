const express = require('express');
const multer = require('multer');
const sharp = require('sharp')
//const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()





//Signup
router.post('/users', async (req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e)
    }
  });

//Login
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        //res.send({user:user.getPublicProfile(), token}) //Password ve tokenların gizlenmesinin manuel yolu
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

//Logout
router.post('/users/logout', auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((tokenItem) => {
            return tokenItem.token !== req.token
        })
        await req.user.save();
        res.send('Logout successfull!')
    } catch(e) {
        res.status(500).send()
    }
})

//LogoutAll
router.post('/users/logoutAll', auth, async (req,res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('All accounts logged out successfull!')
    } catch(e) {
        res.status(500).send()
    }
})
//Get my info
//aradaki auth middleware çalıştırır
router.get('/users/me', auth, async (req,res)=>{
        res.send(req.user);
})



//Update Yourseld
router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//Delete Yourself
router.delete('/users/me', auth, async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(400).send()
        // }
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e) {
        return res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        // if(!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a PDF'))
        // }
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a .jpg or .jpeg or .png format'))
        }
        cb(undefined, true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})

//Upload profile pic
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    //req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save()
    res.send()  
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {
    try {
        req.user.avatar=undefined
        await req.user.save()
        res.send()
    } catch(e) {
        return res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e) {

    }
})

module.exports = router;


  //Eski yöntem

// app.get('/users',(req,res)=>{
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })


//Get a User

// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch(e) {
//         res.status(500).send();
//     }
// })



//Update a User
// router.patch('/users/:id', async (req,res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if(!isValidOperation) {
//         return res.status(400).send({error: 'Invalid update!'})
//     }

//     try {
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })


//Delete a User
// router.delete('/users/:id', async (req,res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);

//         if(!user) {
//             return res.status(400).send()
//         }
//         res.send(user)
//     } catch(e) {
//         return res.status(500).send()
//     }
// })