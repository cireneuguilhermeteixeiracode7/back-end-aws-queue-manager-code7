process.env.NODE_ENV = 'test';

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../server');
const Debt = require('./../app/models/debt');
const User = require('./../app/models/user');
const {debts, populateDebts, user,  populateUsers} = require('./mock/mocks')


beforeEach(populateUsers);
beforeEach(populateDebts);

describe('GET /client', () => {
  it('Deve listar todos clientes da API JSONPlaceholder.', (done) => {
    request(app)
      .get('/api/client')
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(10)
        
      })
      .end(done);
  })

  it('Não deve listar nada pois não possui token.', (done) => {
    request(app)
      .get('/api/client')
      .expect(401)
      .expect((res) => {
        expect(res.body.error).toBe("No token provided")
        
      })
      .end(done);
  })
});


describe('GET /debt/client/1', () => {
  it('Deve listar todas dívidas do cliente 1.', (done) => {
    request(app)
      .get('/api/debt/client/1')
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(2)
        expect(res.body.data[0].cliendId == res.body.data[1].cliendId == 1).toBe(true)
      })
      .end(done);
  })
});



describe('POST /debt', () => {
  it('Deve criar uma dívida para o cliente 1', (done) => {
    var debtToSave = {
      clientId: 1,
      value: 400,
      date:  Date.now(),
      reason: "Mais um teste",
    }
    request(app)
      .post('/api/debt')
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .send(debtToSave)
      .expect(200)
      .expect((res) => {
        expect(res.body.data._id).to;
      })
      .end((err, res) => {
        if(err) return done(err);

        Debt.find().then((debts) => {
          expect(debts.length).toBe(3);
          expect(debts[2].clientId).toBe(debtToSave.clientId);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

  it('Não deve criar uma dívida para o cliente', (done) => {
    var debtToSave = {
      clientId: 1,
    }
    request(app)
      .post('/api/debt')
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .send(debtToSave)
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.body.success).toBe(false);
        let errors = res.body.data.errors;
        expect(errors.value.message).toBe("Path `value` is required.");
        expect(errors.date.message).toBe("Path `date` is required.");
        expect(errors.reason.message).toBe("Path `reason` is required.");
        
        Debt.find().then((debts) => {
          expect(debts.length).toBe(2);
          done();
        }).catch((err) => {
          done(err);
        })
      })
  });
});


describe('GET /debt/:id', () => {
  it('Deve retornar uma dívida', (done) => {
    request(app)
      .get(`/api/debt/${debts[0]._id.toHexString()}`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.reason).toBe(debts[0].reason);
        expect(res.body.data.value).toBe(debts[0].value);
        expect(res.body.data.date).toBe(new Date(debts[0].date).toJSON());
        expect(res.body.data.cliendId).toBe(debts[0].cliendId);
      })
      .end(done);
  });

  

  it('Deve retornar nenhum objeto.', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .get(`/api/debt/${hexID}`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBe(null);

        
      })
      .end(done);
  })


  it('Deve retornar um erro com id inválido .', (done) => {

    request(app)
      .get(`/api/debt/1234`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(false);
    
      })
      .end(done);
  })

  
});

describe('DELETE /debt/:id', () => {
  it('Deve remover uma dívida', (done) => {
    var hexId = debts[1]._id.toHexString();

    request(app)
      .delete(`/api/debt/${hexId}`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletedCount).toBe(1);
      })
      .end((err, res) => {
        if(err) return done(err);

        Debt.findById(hexId).then((debt) => {
          expect(debt).toBeNull();
          done();
        }).catch((err) => {
          done(err);
        })
      })
  });

  

  it('Não deve deletar nenhum id.', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .delete(`/api/debt/${hexID}`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletedCount).toBe(0);
      })
      .end(done);
  });


  it('Deve retornar erro pois id é inválido.', (done) => {
    request(app)
      .delete('/api/debt/1234')
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(false);
    
      })
      .end(done);
  })
});

describe('PUT /debt/', () => {
  it('Deve atualizar dívida', (done) => {
    var debtToUpdate = {
      _id : new ObjectID().toHexString(),
      reason:  "This should be the new text"
    }
    
    request(app)
      .put(`/api/debt/`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .send(debtToUpdate)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.nModified).toBe(0);
      })
      .end(done);
  });

  it('Não deve atualizar nenhuma dívida.', (done) => {
    var debtToUpdate = {
      _id : debts[0]._id.toHexString(),
      reason:  "This should be the new text"
    }
    
    request(app)
      .put(`/api/debt/`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .send(debtToUpdate)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.nModified).toBe(1);
      })
      .end(done);
  });

  it('Não deve atualizar nenhuma dívida com id inválido.', (done) => {
    var debtToUpdate = {
      _id : '1234',
      reason:  "This should be the new text"
    }
    
    request(app)
      .put(`/api/debt/`)
      .set('Authorization', 'Bearer '+ user.tokens[0].token)
      .send(debtToUpdate)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(false);
      })
      .end(done);
  });
  
});



describe('POST /auth/signin', () => {
  it('Deve fazer a autenticação do usuário mocado.', (done) => {

    var userToAuth = {
      email : 'user_teste@email.com',
      password: "123456"
    }
    request(app)
      .post('/api/auth/signin')
      .send(userToAuth)
      .expect(200)
      .expect((res) => {        
        expect(res.body.success).toBe(true)
        expect(res.body.data.user._id).toBe(user._id)
      })
      .end(done);
  })


  it('Deve retornar senha inválida', (done) => {

    var userToAuth = {
      email : 'user_teste@email.com',
      password: "12345678"
    }
    request(app)
      .post('/api/auth/signin')
      .send(userToAuth)
      .expect(200)
      .expect((res) => {        
        expect(res.body.success).toBe(false)
        expect(res.body.data.message).toBe("Senha inválida")
      })
      .end(done);
  })
});



describe('POST /auth/signup', () => {
  it('Deve criar usuário.', (done) => {

    var userToSave = {
      name : 'Teste',
      email : 'user_teste2@email.com',
      password: "12345678"
    }
    request(app)
      .post('/api/auth/signup')
      .send(userToSave)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true)
      })
      .end((err, res) => {
        if(err) return done(err);

        User.find({email: 'user_teste2@email.com'}).then((users) => {
          expect(users.length).toBe(1);
          done();
        }).catch((err) => {
          done(err);
        });      
      })
  })


  it('Deve retornar email duplicado.', (done) => {

    var userToSave = {
      name : 'Teste',
      email : 'user_teste@email.com',
      password: "12345678"
    }
    request(app)
      .post('/api/auth/signup')
      .send(userToSave)
      .expect(200)
      .expect((res) => {        
        expect(res.body.success).toBe(false)
        expect(res.body.data.message).toBe("já existe um usuário com esse e-mail")
      })
      .end(done);
  })
});