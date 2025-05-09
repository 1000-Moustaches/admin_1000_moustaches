# Admin 1000 Moustaches

Ce site permet la gestion des animaux, des familles d'accueil, des vétérinaires et de leurs interventions.
Le front est réalisé en ReactJS et le server en NodeJS Express

## Git

### Important

Before developing, run after cloning the project:

```
git config core.hooksPath .githooks
```

#### [GitLint](https://github.com/jorisroovers/gitlint/)

```
brew install gitlint
```

##### How to setup

You have to setup git hooks. Run on your repository root folder:

```
gitlint install-hook
```

You should put `.gitlint` file in root folder of your repository:

```
[general]
ignore=B6
contrib=contrib-title-conventional-commits
```

### Cheat sheet

#### GitLint

Information about [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/)
| Types | |
|--|--|
| fix | _A bug fix_ |
|docs|_Documentation only changes_|
|feat|_New feature or task related to a feature_|
|style|_Changes that do not affect the meaning of the code (white­-space, format­ting, missing semi-c­olons, etc)_|
|refactor|_A code change that neither fixes a bug nor adds a feature_|
|perf|_A code change that improves perfor­mance_|
|test|_Adding missing tests or correcting existing tests_|
|build|_Changes that affect the build system or external depend­encies (example scopes: gulp, broccoli, npm)_|
|ci|_Changes to our CI config­uration files and scripts (example scopes: Travis, Circle, Browse­rStack, SauceLabs)_|
|chore|_Other changes that don't modify src or test files_|
|revert|_Reverts a previous commit_|

## Installation

- lancer la bdd
  - builder l'image docker en exécutant la commande depuis le dossier docker/database :
    `docker build --build-arg DB_ROOT_PASSWORD=$(grep DB_ROOT_PASSWORD ../../server/.env | cut -d '=' -f2) --build-arg DB_NAME=$(grep DB_NAME ../../server/.env | cut -d '=' -f2) --build-arg DB_USER=$(grep DB_USER ../../server/.env | cut -d '=' -f2) --build-arg DB_PASSWORD=$(grep DB_PASSWORD ../../server/.env | cut -d '=' -f2) -t mysql-docker .`
    - lancer le conteneur dans docker desktop
- installer le server en local : `cd server && npm i`
- installer le front en local : `cd front && npm i`

## Développement local

- lancer le server avec firebase emulator : `cd server && npm start`
- lancer le front : `cd front && npm start`

## Roles Google Cloud

For the CICD to work, you need to add a json file in the CICD secrets.
This file is generated on Google Cloud.
You have to add a service account with these roles :
- Administrateur Firebase Hosting
- Administrateur d'extension Firebase
- Editeur d'extensions Firebase
- Dévelopeur d'extensions Firebase
- Administrateur des objets Storage
- Administrateur Cloud Function
- Administrateur Logging
- Utilisateur du compte de service

When the account is created, create a key as JSON.

Encode the JSON file with base 64
`base64 -b -i key.json -o key-base64.json`

Upload the content of the key-base64.json file in a secret on the CICD (as GOOGLE_APPLICATION_CREDENTIALS)