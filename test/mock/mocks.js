process.env.NODE_ENV = 'test';

const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const Debt = require('../../app/models/debt');
const User = require('../../app/models/user');
const authJWT = require('../../secrets/auth');
const bcrypt = require('bcrypt');


const userOneID = new ObjectID();
console.log(userOneID);
const user = {
  _id: userOneID,
  email: "user_teste@email.com",
  password: "123456",
  name: 'User Teste',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ id: userOneID }, authJWT.secret).toString()
  }]
};




const debts = [
    {
    _id: new ObjectID(),
    clientId: 1,
    value: 200,
    date:  Date.now(),
    reason: "First test debt",
    }, 
    {
    _id: new ObjectID(),
    clientId: 1,
    value: 200,
    date:  Date.now(),
    reason: "Second test debt",
}];

var populateDebts = (done) => {

    Debt.deleteMany().then(() => {
        return Debt.insertMany(debts);
    })
    .catch(error=>console.log(error))
    .then(() => done())

  
};


var populateUsers = (done) => {
    let userToSave = { 
        name: user.name,
        email: user.email,
        password: user.password
    };
    User.deleteMany({})
        
        .then(()=> bcrypt.hash(userToSave.password, 10))
        .then(hash=> {
            userToSave.password = hash;
            return new User(userToSave).save()
        })
        .then(resp=>{
            user._id = String(resp._id)
        })
        .catch(error=>console.log(error))
        .then(() => done())


};


module.exports = {
  debts,
  populateDebts,
  user,
  populateUsers
}