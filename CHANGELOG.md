# Changelog

## [1.3.0](https://github.com/gucasassi/devcamp/compare/v1.2.0...v1.3.0) (2025-11-10)


### ✨ Features

* **bootcamp:** add advanced filtering ([eb66a50](https://github.com/gucasassi/devcamp/commit/eb66a50c233b7991784ddec8180bdd465e698800))
* **bootcamp:** add mongoose pre save hook to generate location using node geocoder ([95fff87](https://github.com/gucasassi/devcamp/commit/95fff87a331a2866a3bad66a16e466c9564d5588))
* **bootcamp:** add select and sorting ([4cf4aea](https://github.com/gucasassi/devcamp/commit/4cf4aeadb2d5a0e099f9c831fdf4c44dce4e29d1))
* **bootcamp:** get bootcamps within specified radius from zipcode ([e5a1bc7](https://github.com/gucasassi/devcamp/commit/e5a1bc765afcd43aaa131e07372d814a1275f5d6))


### 🛠️ Build

* **deps:** bump eslint and rimraf to latest version ([483c9d5](https://github.com/gucasassi/devcamp/commit/483c9d5f5d873ee869d8063d113d866f33d88b0b))
* **setup:** rename porject ([9d5f1c0](https://github.com/gucasassi/devcamp/commit/9d5f1c0cd75512fbfe5389084a7c43639944145b))
* **setup:** update image label to associate new repo name ([007bfc7](https://github.com/gucasassi/devcamp/commit/007bfc73339a616db6fe24429c4840f62c025751))
* **setup:** update legacy label format on dockerfile ([865ccf2](https://github.com/gucasassi/devcamp/commit/865ccf21be88a21d4a7e2fa5a33a760e1269acef))


### 🔄 Refactors

* **middleware:** resolve issues with error message property ([5109fef](https://github.com/gucasassi/devcamp/commit/5109fef3d8e904ad4336315d94092dfd97c4ffdf))

## [1.2.0](https://github.com/gucasassi/devcamp/compare/v1.1.1...v1.2.0) (2025-10-30)

### ✨ Features

- add error handler middleware ([12f04a1](https://github.com/gucasassi/devcamp/commit/12f04a1d9222218e6a3d056e53d3b2700917b2e4))
- implement centralized mongoose error handling ([2ef770f](https://github.com/gucasassi/devcamp/commit/2ef770fc32d419356bef21e61550c5a6a07d6352))
- **middleware:** introduce async handler to centralize error handling ([7451394](https://github.com/gucasassi/devcamp/commit/7451394a20f09b67163f85776dba73038934f387))

### 🔄 Refactors

- **bootcamp:** use mongoose middleware to automatically slugify name ([f9d98ea](https://github.com/gucasassi/devcamp/commit/f9d98ea355d96f4c9c56445a5c45e375790aa3db))

## [1.1.1](https://github.com/gucasassi/devcamp/compare/v1.1.0...v1.1.1) (2025-10-28)

### 🛠️ Build

- add label to assign docker image to github repo ([5f37ffc](https://github.com/gucasassi/devcamp/commit/5f37ffcb0629a143d54cabc4c1f63fe996f54c57))
- add label to assign docker image to github repo ([9435cbb](https://github.com/gucasassi/devcamp/commit/9435cbb4cd8034d9832965807884364cf289f438))

## [1.1.0](https://github.com/gucasassi/devcamp/compare/v1.0.0...v1.1.0) (2025-10-28)

### ✨ Features

- **bootcamp:** add total count to get bootcamps response payload ([16ef7de](https://github.com/gucasassi/devcamp/commit/16ef7de4d18e9acad5b07ac3b2e67b361866a253))
- **bootcamp:** implement delete endpoint ([d601205](https://github.com/gucasassi/devcamp/commit/d601205dac1c5099fb94bd4d677727a1ade04152))

## [1.0.0](https://github.com/gucasassi/devcamp/compare/devcamp-v1.0.0...devcamp-v1.0.0) (2025-10-28)

### ✨ Features

- **bootcamp:** add total count to get bootcamps response payload ([16ef7de](https://github.com/gucasassi/devcamp/commit/16ef7de4d18e9acad5b07ac3b2e67b361866a253))
- **bootcamp:** create bootcamp model ([6186115](https://github.com/gucasassi/devcamp/commit/61861155e120125002fbd6ddac0e584813828111))
- **bootcamp:** implement delete endpoint ([d601205](https://github.com/gucasassi/devcamp/commit/d601205dac1c5099fb94bd4d677727a1ade04152))
- **bootcamp:** implements create new bootcamp feature ([8b21777](https://github.com/gucasassi/devcamp/commit/8b2177784543b544d11ef53f4e714f6dfa558b57))
- **bootcamp:** implements get all bootcamps ([3d9919a](https://github.com/gucasassi/devcamp/commit/3d9919a5bf7b7cb18b36feb567e92ec6517ecd71))
- **bootcamp:** implements get bootcamp by id ([38b7289](https://github.com/gucasassi/devcamp/commit/38b72894c3c459634c4393d45b528a78bbe0b51e))
- **bootcamp:** implements update bootcamp ([7abb95b](https://github.com/gucasassi/devcamp/commit/7abb95b864768d4d89ff13c51b19b3859109f945))
- **bootcamps:** add bootcamps crud endpoints as routes ([e8d4166](https://github.com/gucasassi/devcamp/commit/e8d4166e5db25b058390676964bc4c844cef8bf3))
- **health:** add health endpoint ([8061209](https://github.com/gucasassi/devcamp/commit/8061209cfd8df786d31066b201a15b104814dbc3))
- **mongodb:** install moongose and configure db connection ([6190600](https://github.com/gucasassi/devcamp/commit/6190600d9a28b04eff77d05d1d22036ba3bb594e))
- **setup:** use morgan for logging requests ([b2771ca](https://github.com/gucasassi/devcamp/commit/b2771ca20621af1f94fd82a293f0bae1eba69d9b))

### 🧹 Chore

- cut 1.0.0 ([5d7de91](https://github.com/gucasassi/devcamp/commit/5d7de914a1b3b3309d077378f3c8659a69a89633))

### 🛠️ Build

- **deps:** force exact versions ([06d993d](https://github.com/gucasassi/devcamp/commit/06d993da96aaf4f724096ff145e386cd675ba6f2))
- **setup:** dockerize nodejs api ([9a04b61](https://github.com/gucasassi/devcamp/commit/9a04b61735f31328f648a63bb91b97d6faaf7d20))
- **setup:** install and configure semantic-release ([26f6763](https://github.com/gucasassi/devcamp/commit/26f6763fd1029ac51aeba36ec66001791563e97a))

### 🔄 Refactors

- **bootcamps:** move logic from routes to controllers ([afd6dd3](https://github.com/gucasassi/devcamp/commit/afd6dd3ec09dada4925f6dc24e5985794848f67b))
- **health:** return status 200 and success message ([85f2479](https://github.com/gucasassi/devcamp/commit/85f2479ac56dd688552c1e9c53949e98ab508f12))
