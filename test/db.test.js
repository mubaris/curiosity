require('./../config/config');

const mongoose = require('./../server/db/mongoose');
const expect = require('expect');

const { Repository } = require('./../server/db/repositories');
const { Username } = require('./../server/db/username');
const { User } = require('./../server/db/user');


const user = new User({
    id: new mongoose.Types.ObjectId(),
    githubId: 1111111,
    login: 'testUser1',
    name: 'testUser1',
    html_url: 'https://github.com/testUser1',
    accessToken: 'sadjkskajfeifhwgsjfksdfkmcoiwerkhdskfjksladjf',
});

const repo = new Repository({
    id: new mongoose.Types.ObjectId(),
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
    it('User:Should save user to db', (done) => {
        user.save().then((usr) => {
            expect(usr.id).toBe(user.id);
            done();
        })
           .catch(e => done(e));
    });
    it('Repository:Should save repository to db', (done) => {
        repo.save().then((rep) => {
            expect(rep.id).toBe(rep.id);
            done();
        })
           .catch(e => done(e));
    });
});

