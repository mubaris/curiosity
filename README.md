# Curiosity

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a28af21730b647da8a84974696776cc0)](https://www.codacy.com/app/mubaris/curiosity?utm_source=github.com&utm_medium=referral&utm_content=mubaris/curiosity&utm_campaign=badger)
[![Code Climate](https://codeclimate.com/github/mubaris/curiosity/badges/gpa.svg)](https://codeclimate.com/github/mubaris/curiosity)
[![Build Status](https://travis-ci.org/mubaris/curiosity.svg?branch=master)](https://travis-ci.org/mubaris/curiosity)
[![CircleCI](https://circleci.com/gh/mubaris/curiosity.svg?style=svg)](https://circleci.com/gh/mubaris/curiosity)
[![Say Thanks](https://img.shields.io/badge/Say%20Thanks!-%F0%9F%A6%89-1EAEDB.svg)](https://saythanks.io/to/mubaris)
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/curiosity-project/Lobby)

Find amazing github projects as a feed. :zap: :zap:

![gif](https://media.giphy.com/media/l2SpYDOZmp3H2cAAo/giphy.gif)

## Peek at Curiosity

![peek](https://i.imgsafe.org/e6a506c205.png)

## Get Chrome Extension

Curiosity Chrome extension is available now. Which is made by [Aswanth](https://github.com/aswanthkoleri)

[Get Chrome Extension](https://chrome.google.com/webstore/detail/curiosity/pmggmachmjpmgmfpgbfgdnhheneiedhj)

[Have a look at Repo](https://github.com/aswanthkoleri/Curiosity)

## How it's done

I've collected usernames of amazing stargazers :star: in Github. By using Github API, Curiosity will collect their stars and will show as a feed.

## What you need

You need to submit Github Token to access Github API.

## Getting Started
##### Pre-Installation Requirements
###### Node
- Download and install latest stable version of [Node](https://nodejs.org/en/download/). This app is tested on Node version v6.10.3

###### MongoDb
- Download and Install [MongoDB Community Edition] (https://docs.mongodb.com/manual/installation/#mongodb-community-edition). This app is tested on MongoDB version v3.4.1

	- Create new data directory for mondoDB.
      ```bash
      mkdir -p </path/to/mongodb-data>
      ```
	- Run MongoDB
      ```bash
      mongod --dbpath </path/to/mongodb-data>
      ```
 

Now you should have mongoDB server running. If any issue please visit [mongoDB Doc](https://docs.mongodb.com/manual/installation/#tutorials). 

Open another terminal/Command Prompt to clone this App.

##### Installing and running curiosity

```bash
# Rest of the guide assumes you already have MongoDB installed and MongoDB server is running.

# Get the latest version
git clone https://github.com/curiositylab/curiosity

# Change directory
cd curiosity 

# First time install only
yarn install

# Start the app
yarn run start
```
If installation is successful You should see following message. visit 'http://localhost:3000' to view website.
```
NODE_ENV -> dev
MONGODB_URI -> mongodb://127.0.0.1:27017/curiosity
Starting server on port 3000.
```

Other Scripts for developement and testing.
```bash
# run test for the app
yarn run test-node

# Start app with watch (10s delay)
yarn run watch
```


## Tools I used

* [SweetAlert2](https://limonte.github.io/sweetalert2/)
* [infinite-scroll](https://github.com/alexblack/infinite-scroll)
* [Axios](https://github.com/mzabriskie/axios)
