# Welcome 💫

This repo is associated with the `Docker Undocked` workshop conducted by [HSP, PESU Electronic City Campus](https://homebrew.hsp-ec.xyz/). You can find the article that this repo is based on [here](https://homebrew.hsp-ec.xyz/posts/docker-undocked/).

The repo consists of three sections:

### 1. A simple example to introduce the participants of the workshop and reader to the `Dockerfile`:
       This example dockerises a basic NodeJS + Express application using a lightweight node + alpine base image and exploiting the features of Docker image layers and caching for fatser build times.

### 2. A full-stack MERN application broken into containers that are up by `Docker Compose`:
       This is a simple MERN stack To-Do application put behind an `Nginx` Docker container as a reverse proxy so that our React and backend services/containers can be accesses over a browser. The design for this application when it is running on the [Docker Playground](https://labs.play-with-docker.com/):
       ![Compose Example Design](https://i.ibb.co/5s9rF8n/image.png)
