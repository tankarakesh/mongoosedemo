const express = require('express');
const db = require('./utils/db');
const User =require('./utils/db')
const app = express();
app.use(express.json());
app.listen('3004');

app.get('/', (req,res) => 
{
    console.log('Welcome To Get...');
    res.send('Welcome To Get API');
});

app.post('/users', async(req,res) =>
{
    const u =new User(req.body);
    try{
        await u.save();
        res.status(200).send('Record is saved...'+ u);
    }catch(e)
    {
        res.status(400).send(e.message);
    }
});

app.get('/users',async(req,res)=>
{
    console.log('Welcome');
    try{
        const users = await User.find({});
        if(!users)
        {
          res.status(400).send();      
        }
        res.status(200).send(users);
    }
    catch(e)
    {
        res.status(500).send();
    }
});

app.get('/users/:id',async(req,res) =>
{
    console.log(req.params.id);
    try{
    const user = await User.findById(req.params.id);

    if(!user)
    {
    res.sendStatus(400).send('No User Found...');
    }

    res.status(200).send(user);

    }catch(e)
    {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:id', async(req, res) =>
{

    console.log('Deleting...')
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    console.log('After Delete...')
        if(!user)
        {
            res.status(400).send('No Record Is Found...');
        }

        res.status(200).send(user);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
    
});

app.patch('/users/:id', async(req,res)=>
{
    try{

        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true});
console.log('After user update');
        if(!user)
        {
            res.status(400).send('No Record Is Found...');
        }

        res.status(200).send(user);


    }catch(e)
    {
        res.status(500).send(e.message);
    }

});