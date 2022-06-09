const express = require('express');
const bodyParser = require('body-parser')
const app = express();

/***********MIDDLEWARE*************/
app.use(bodyParser.json())

const database = {
  users: [
    {
      id: '123',
      name: 'Gar',
      email: 'gar@email.com',
      password: 'Garfield',
      entries: 0,
      joined: new Date ()
    },
    {
      id: '124',
      name: 'Rick',
      email: 'rick@email.com',
      password: 'Rick James',
      entries: 0,
      joined: new Date ()
    }
  ]
}

app.get('/', (req, res)=>{
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  //I had an error with the post json
  // console.log(database.users[0].email, "🥷🏼\n")
  // console.log(req.body.email, "🔥\n")
  if (req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password){
        res.send('sign in is successful')
  } else {
    res.status(400).json('Error logging in');
  }
})
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date ()
  })
  res.json(database.users[database.users.length-1])

})
app.get('/profile/:id', (req, res)=> {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id)  {
      found = true;
      return res.json(user);
    } 
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id)  {
      found = true;
      user.entries++
      return res.json(user.entries);
    } 
  })
  if (!found) {
    res.status(400).json('not found')
  }
})


//This is for bcrypt password hashing



app.listen(3000, ()=> {
  console.log('app is running on port 3000')
})

/*
/sign in --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user 
/image --> Put --> user
/
*/