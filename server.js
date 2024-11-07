const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let users = [
  {id: 1,name:"John Doe",email:"John@gmail.com"},
  {id: 2 , name : "Harry Potter", email: "Harry@gmail.com"}
];

app.get('/', (req, res) => {
  res.send('Hello John!')
})

app.get('/api/users', (req,res)=>{
  res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  res.status(200).json(user);
})

app.post('/api/users', (req,res)=>{
  const { name, email}= req.body;
  users.push({id:Date.now(),name:name,email:email});
  res.status(201).json(users);
});

app.put('/api/users/:id',(req, res)=>{
  const userId = parseInt(req.params.id);
  const { name , email} = req.body;

  const user = users.find(u => u.id === userId);
  if(!user){
    return res.status(404).json({message: "User not found"});
  }
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);

});

app.delete('/api/users/:id',(req,res)=>{
  users = users.filter(user => user.id !== parseInt(req.params.id));
  res.status(204).send();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})