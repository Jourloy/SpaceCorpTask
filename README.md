<a href="https://jourloy.com/">
	<h1 align="center">
		SpaceCorp
	</h1>
</a>

<p align="center">
	<a href="" target="_blank"><img src="https://img.shields.io/github/v/tag/jourloy/SpaceCorpTask?color=red&label=version&style=for-the-badge&labelColor=000000"/></a>
</p>

<p align="center">FullStack test task 😎</p>

## Table of Contents:

- [Getting Started](#getting-started)
- - [Installation](#installation)
- - - [.env](#evn)
- - [Test](test)
- [Running the app](#running-the-app)
- - [Docker](#docker)
- - [Yarn](#yarn)
- [Dev](#dev)
- - [Users](#users)
- - [Swagger](#swagger)
- - [Limits](#limits)
- - - [Default](#default)

## Getting Started

### Installation

```bash
$ yarn install
```

#### .evn

Don't forget create `.env` from `.env.sample` and add data

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

###### Warning! I don't work with test in this case

### Running the app

#### Docker

```bash
$ docker-compose up -d
```

#### Yarn

Check `MONGO_HOST` before start via yarn. By default I use docker host

```bash
# Development
$ yarn start:dev

# Production
$ yarn start
```

## Dev

### Users

By default app create admin user. Look into .env for credentials

### Swagger

You can open local swagger documentation on http://localhost:5000/api

### Limits

#### Default

**Limit:** 10 requests in 60 seconds

Worked on:

- /auth
- /movies

<h2 align="center">
	Technologies
</h2>

<div align="center">
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=NEST.js&logo=nestjs&style=for-the-badge&labelColor=000000&color=000000"/></a>
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=Docker&logo=Docker&style=for-the-badge&labelColor=000000&color=000000"/></a>
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=Mongo&logo=MongoDB&style=for-the-badge&labelColor=000000&color=000000"/></a>
</div>

<h1 align="center">
	You can also check my other projects
</h1>

<div align="center">
	<a href="https://github.com/Jourloy/Backend" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=Backend&style=for-the-badge&labelColor=000000&color=000000"/></a>
	<a href="https://github.com/Jourloy/Frontend" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=Frontend&style=for-the-badge&labelColor=000000&color=000000"/></a>
</div>