const mongoose = require('./../server/db/mongoose');
const expect = require('expect');

const { Repository } = require('./../server/db/repositories');
const { Username } = require('./../server/db/username');
const { User } = require('./../server/db/user');

// console.log(mongoose.connection.host);
// console.log(mongoose.connection.port);

let user = new User({
    _id: new mongoose.Types.ObjectId(),
    githubId: 1111111,
    login: 'testUser1',
    name: 'testUser1',
    html_url: 'https://github.com/testUser1',
    accessToken: 'sadjkskajfeifhwgsjfksdfkmcoiwerkhdskfjksladjf',
});

let repo = new Repository({
    _id: new mongoose.Types.ObjectId(),
    name: 'curiosity',
    html_url: 'https://github.com/mubaris/curiosity',
    description: 'Find Amazing Github Projects',
    stargazers_count: 72,
    forks_count: 12,
    created_at: new Date(),
    updated_at: new Date(),
    language: 'Javascript',
});

describe('Simple DB test', () => {
    describe('User', () => {
        it('Should save user to db', (done) => {
            user.save().then((usr) => {
                expect(usr._id).toBe(user._id);
                done();
            })
           .catch(e => done(e));
        });
    });
    describe('Repository', () => {
        it('Should save repository to db', (done) => {
            repo.save().then((rep) => {
                expect(rep._id).toBe(rep._id);
                done();
            })
           .catch(e => done(e));
        });
    });
});


