require('./../config/config');

const mongoose = require('./../server/db/mongoose');
const expect = require('expect');

const { Repository } = require('./../server/db/repositories');
const { Stargazers } = require('./../server/db/Stargazers');
const { User } = require('./../server/db/user');


const user = new User({
    _id: new mongoose.Types.ObjectId(),
    githubId: 1111111,
    login: 'testUser1',
    name: 'testUser1',
    html_url: 'https://github.com/testUser1',
    accessToken: 'sadjkskajfeifhwgsjfksdfkmcoiwerkhdskfjksladjf',
});

const repo = new Repository({
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

describe('Simple DB test', function (){
        it('User:Should save user to db', function (done) {
            user.save().then((usr) => {
                expect(usr._id).toBe(user._id);
                done();
            })
           .catch(e => done(e));
        });
        it('Repository:Should save repository to db', function (done) {
            repo.save().then((rep) => {
                expect(rep._id).toBe(rep._id);
                done();
            })
           .catch(e => done(e));
        });
});


