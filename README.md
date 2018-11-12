# alarmDisplay-DataCenter

The central data storage and administration for the alarm display project.

The following architectures are supported:
* amd64
* arm64v8
* arm32v7


## Travis CI
Current build status: [![Build Status](https://travis-ci.org/t08094a/alarmDisplay-DataCenter.svg?branch=master)](https://travis-ci.org/t08094a/alarmDisplay-DataCenter)

Define following environment variables in Travis:
* DOCKER_USERNAME
* DOCKER_PASSWORD

## Generate Docker Images
1. initialize the local repository after cloning: `./init-repo.sh .`
2. Configure the docker hub settings and target platforms: `build.config`
3. Build the source and create docker images: `./build.sh`


## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use yarn scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    yarn start

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.


## Building for production

To optimize the dataCenter application for production, run:

    yarn build --prod && yarn start


Then navigate to [http://localhost:3000/api](http://localhost:3000/api) in your browser.

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Then, run a Sonar analysis:

```
./mvnw -Pprod clean test sonar:sonar
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [./docker](./docker) folder to launch required third party services.

For example, to start a mongo database in a docker container, run:

    docker-compose -f docker/mongo.yml up -d

To stop it and remove the container, run:

    docker-compose -f docker/mongo.yml down

Then run:

    docker-compose -f docker/docker-compose.yml up -d



[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
