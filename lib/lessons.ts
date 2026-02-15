// lib/lessons.ts - Lesson content, metadata, and helper functions

export interface LessonStep {
  title: string;
  content: string; // HTML-safe markdown-like content
  animation: string; // which animation component to show
  terminalCommands?: Record<string, { output: string; hint?: string }>;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  icon: string; // emoji
  steps: LessonStep[];
}

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────────
  // LESSON 1: What is Docker?
  // ─────────────────────────────────────────────
  {
    slug: "what-is-docker",
    title: "What is Docker?",
    description:
      "Understand the problem Docker solves, how it compares to virtual machines, and the core architecture of the Docker platform.",
    icon: "\u{1F433}",
    steps: [
      {
        title: "The Problem",
        content: `<p>Imagine you just built an amazing web application on your laptop. Everything works perfectly\u2014the database connects, the API responds, the frontend renders beautifully. You proudly hand it off to your teammate and hear the dreaded words: <strong>\u201CIt doesn\u2019t work on my machine.\u201D</strong></p>
<p>This happens because software depends on a specific environment: the operating system version, installed libraries, environment variables, configuration files, and even the folder structure. Your laptop has all of these set up just right, but your teammate\u2019s machine is different.</p>
<p>Docker solves this by packaging your application <em>together with its entire environment</em> into a lightweight, portable unit called a <strong>container</strong>. Think of it like a shipping container for software\u2014no matter where it goes, everything inside stays exactly the same.</p>
<p>With Docker, \u201Cworks on my machine\u201D becomes \u201Cworks on <em>every</em> machine.\u201D Developers, testers, and production servers all run the identical container, eliminating environment-related bugs once and for all.</p>`,
        animation: "container-vs-vm",
        terminalCommands: {
          "docker --version": {
            output: "Docker version 24.0.7, build afdd53b",
            hint: "Check which version of Docker is installed",
          },
        },
      },
      {
        title: "Virtual Machines vs Containers",
        content: `<p>Before Docker, the standard solution for environment consistency was <strong>virtual machines (VMs)</strong>. A VM runs a complete guest operating system on top of a <em>hypervisor</em>\u2014think of it as running an entire computer inside your computer. It works, but it\u2019s heavy: each VM needs its own OS kernel, its own memory allocation, and its own disk space.</p>
<p>Containers take a radically different approach. Instead of virtualizing the hardware, containers share the <strong>host operating system\u2019s kernel</strong> and isolate only the application and its dependencies. This makes them incredibly lightweight\u2014a container can start in milliseconds and use just megabytes of memory, whereas a VM takes minutes to boot and consumes gigabytes.</p>
<p>Here\u2019s a helpful analogy: a VM is like renting an entire apartment building just to use one room, while a container is like renting exactly the room you need\u2014same building, shared infrastructure, but your space is completely private.</p>
<p>Because containers are so lightweight, you can run dozens or even hundreds of them on a single machine. This density is one of the reasons Docker revolutionized how we deploy software.</p>`,
        animation: "container-vs-vm",
      },
      {
        title: "How Docker Works",
        content: `<p>Docker\u2019s architecture has three main components that work together. Understanding these will help everything else in this tutorial click into place.</p>
<p>The <strong>Docker Daemon</strong> (<code>dockerd</code>) is the background service that does the heavy lifting\u2014building images, running containers, and managing networks and volumes. It listens for requests and manages Docker objects on the host machine.</p>
<p>The <strong>Docker Client</strong> (<code>docker</code>) is the command-line tool you interact with. When you type <code>docker run</code>, the client sends that command to the daemon via a REST API. The client and daemon can run on the same machine or on different machines entirely.</p>
<p>The <strong>Docker Registry</strong> is where images are stored and shared. Docker Hub is the default public registry\u2014think of it as the \u201Cnpm\u201D or \u201CGitHub\u201D for container images. When you run <code>docker pull nginx</code>, Docker downloads the image from Docker Hub. You can also run your own private registry for proprietary images.</p>`,
        animation: "container-vs-vm",
      },
      {
        title: "Try It Out",
        content: `<p>Now that you understand the core concepts, let\u2019s get hands-on! The terminal below simulates a Docker environment where you can try real commands without installing anything.</p>
<p>Start by running <code>docker info</code> to see an overview of your Docker installation. This command shows you how many containers and images exist on the system, the storage driver in use, and other runtime details. It\u2019s a great diagnostic tool when something isn\u2019t working.</p>
<p>Next, try <code>docker help</code> to see a list of available commands. Don\u2019t worry about memorizing them\u2014we\u2019ll cover the important ones step by step in the coming lessons.</p>
<p>As you progress through this tutorial, every lesson includes a simulated terminal. Experiment freely\u2014you can\u2019t break anything here!</p>`,
        animation: "container-vs-vm",
        terminalCommands: {
          "docker info": {
            output: `Client: Docker Engine - Community
 Version:    24.0.7
 Context:    default

Server:
 Containers: 3
  Running:   1
  Paused:    0
  Stopped:   2
 Images:     12
 Server Version: 24.0.7
 Storage Driver: overlay2
 Logging Driver: json-file
 Operating System: Docker Desktop
 Architecture: x86_64`,
            hint: "Display system-wide information about Docker",
          },
          "docker help": {
            output: `Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container
  exec        Execute a command in a running container
  ps          List containers
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  push        Upload an image to a registry
  images      List images
  login       Log in to a registry
  logout      Log out from a registry
  search      Search Docker Hub for images
  version     Show the Docker version information
  info        Display system-wide information`,
            hint: "Show available Docker commands",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 2: Images & Containers
  // ─────────────────────────────────────────────
  {
    slug: "images-and-containers",
    title: "Images & Containers",
    description:
      "Learn the difference between images and containers, how image layers work, and the full container lifecycle.",
    icon: "\u{1F4E6}",
    steps: [
      {
        title: "What is a Docker Image?",
        content: `<p>A <strong>Docker image</strong> is a read-only template that contains everything needed to run an application: the code, runtime, system tools, libraries, and settings. Think of it as a <em>blueprint</em> or a <em>recipe</em>\u2014it describes exactly what the final result should look like, but it isn\u2019t the running thing itself.</p>
<p>Just like a blueprint can be used to construct many identical buildings, a single Docker image can be used to create many identical containers. The image never changes; each container gets its own writable layer on top.</p>
<p>Images are identified by a <strong>name</strong> and a <strong>tag</strong>. For example, <code>node:18-alpine</code> refers to the Node.js image with the \u201C18-alpine\u201D tag, meaning Node.js version 18 running on Alpine Linux. If you omit the tag, Docker defaults to <code>:latest</code>.</p>
<p>Try running <code>docker images</code> in the terminal below to see what images are available on this system. You\u2019ll notice each image has a size\u2014we\u2019ll learn why some are much smaller than others in the next step.</p>`,
        animation: "image-layers",
        terminalCommands: {
          "docker images": {
            output: `REPOSITORY    TAG         IMAGE ID       CREATED        SIZE
node          18-alpine   a3d2c7f9b1e4   2 days ago     175MB
nginx         latest      3964ce7b8458   5 days ago     187MB
python        3.11-slim   f2e84c9a7d31   1 week ago     152MB
alpine        3.18        c1aabb73d233   2 weeks ago    7.34MB
hello-world   latest      d2c94e258dcb   3 months ago   13.3kB`,
            hint: "List all Docker images on the system",
          },
        },
      },
      {
        title: "Image Layers",
        content: `<p>Docker images aren\u2019t monolithic blobs\u2014they\u2019re built from a series of <strong>layers</strong> stacked on top of each other. Each layer represents a change: installing a package, copying a file, or setting an environment variable. This layered architecture is one of Docker\u2019s most powerful features.</p>
<p>Think of it like making a sandwich. The bread is your base layer (the operating system), then you add lettuce (system libraries), cheese (your runtime like Node.js), and finally the filling (your application code). Each ingredient is a separate layer.</p>
<p>The brilliant part is <strong>layer sharing</strong>. If you have ten Node.js applications, they can all share the same base OS layer and Node.js layer\u2014only the application code layer is unique to each image. This saves enormous amounts of disk space and makes pulling images from a registry much faster.</p>
<p>Docker also uses a <strong>layer cache</strong> during builds. If a layer hasn\u2019t changed since the last build, Docker reuses the cached version instead of rebuilding it. This is why the order of instructions in your Dockerfile matters so much\u2014we\u2019ll explore this in the Dockerfile lesson.</p>`,
        animation: "image-layers",
      },
      {
        title: "What is a Container?",
        content: `<p>If an image is a blueprint, a <strong>container</strong> is the building constructed from that blueprint. Technically, a container is a <em>running instance</em> of an image\u2014it takes the read-only image layers and adds a thin <strong>writable layer</strong> on top where the application can store runtime data.</p>
<p>Each container is isolated from other containers and from the host system. It has its own filesystem, its own network interface, and its own process tree. From inside the container, it looks like you have an entire machine to yourself\u2014even though you\u2019re sharing the host kernel with every other container.</p>
<p>You can create multiple containers from the same image, and each one operates independently. Change a file in one container, and it doesn\u2019t affect the others. This isolation is what makes containers so reliable and predictable.</p>
<p>Use <code>docker ps</code> to see containers that are currently running. This is one of the commands you\u2019ll use most often when working with Docker.</p>`,
        animation: "image-layers",
        terminalCommands: {
          "docker ps": {
            output: `CONTAINER ID   IMAGE          COMMAND                  STATUS          PORTS                  NAMES
a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.\u2026"   Up 2 hours      0.0.0.0:80->80/tcp     webserver
f6e5d4c3b2a1   node:18        "node server.js"         Up 45 minutes   0.0.0.0:3000->3000/tcp my-app`,
            hint: "List currently running containers",
          },
        },
      },
      {
        title: "Container Lifecycle",
        content: `<p>Every container goes through a <strong>lifecycle</strong> with well-defined states: created, running, paused, stopped, and removed. Understanding this lifecycle helps you manage containers effectively.</p>
<p>The most common way to create and start a container in one step is <code>docker run</code>. When you run <code>docker run hello-world</code>, Docker pulls the image (if not cached locally), creates a new container, starts it, and the container executes its default command. Some containers do their job and exit; others (like web servers) keep running until you stop them.</p>
<p>You can stop a running container with <code>docker stop</code>, which sends a graceful shutdown signal, or <code>docker kill</code> for an immediate halt. A stopped container still exists on disk\u2014you can restart it with <code>docker start</code> or inspect its logs. To permanently remove it, use <code>docker rm</code>.</p>
<p>Try running <code>docker run hello-world</code> below, then use <code>docker ps -a</code> to see all containers, including stopped ones. Notice how the hello-world container shows an \u201CExited\u201D status\u2014it did its job and stopped.</p>

<h4>Running Commands in a Container with docker exec</h4>
<p><code>docker exec</code> lets you run commands inside a <strong>running</strong> container without stopping or restarting it. Think of it as SSH-ing into the container\u2014except you don\u2019t need an SSH server installed. The container just needs to be running.</p>
<p>The most common usage is getting an interactive shell: <code>docker exec -it myapp sh</code>. The <code>-i</code> flag keeps STDIN open (interactive), and the <code>-t</code> flag allocates a pseudo-terminal so you get a proper shell prompt. Together, <code>-it</code> gives you a fully interactive session inside the container.</p>
<p>Common uses for <code>docker exec</code> include:</p>
<ul>
<li><strong>Debugging:</strong> Inspect files, check running processes, or test network connectivity from inside the container</li>
<li><strong>Checking logs:</strong> Read log files that aren\u2019t sent to stdout</li>
<li><strong>Running migrations:</strong> Execute database migration scripts inside a running app container</li>
<li><strong>Inspecting the environment:</strong> View environment variables, installed packages, or filesystem state</li>
</ul>`,
        animation: "image-layers",
        terminalCommands: {
          "docker run hello-world": {
            output: `Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:d58e752213a51785838f9eed2b7a498ffa1cb3aa7f946dda11af39286c3db9a9
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The daemon pulled the "hello-world" image from Docker Hub.
 3. The daemon created a new container from that image.
 4. The daemon streamed that output to the Docker client.`,
            hint: "Run the hello-world container to verify Docker works",
          },
          "docker ps -a": {
            output: `CONTAINER ID   IMAGE          COMMAND                  STATUS                     PORTS                  NAMES
b7c8d9e0f1a2   hello-world    "/hello"                 Exited (0) 5 seconds ago                          eager_tesla
a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.\u2026"   Up 2 hours                 0.0.0.0:80->80/tcp     webserver
f6e5d4c3b2a1   node:18        "node server.js"         Up 45 minutes              0.0.0.0:3000->3000/tcp my-app`,
            hint: "List all containers, including stopped ones",
          },
          "docker exec myapp ls /app": {
            output: `Dockerfile
node_modules
package.json
package-lock.json
server.js
src
tests`,
            hint: "List files inside the running container's /app directory",
          },
          "docker exec -it myapp sh": {
            output: "/ # You are now inside the container. Type 'exit' to leave.",
            hint: "Open an interactive shell inside the container",
          },
          "docker exec myapp env": {
            output: `PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=a1b2c3d4e5f6
NODE_VERSION=18.19.0
YARN_VERSION=1.22.19
HOME=/root
DATABASE_URL=postgres://user:pass@db:5432/myapp
NODE_ENV=production`,
            hint: "View environment variables inside the container",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 3: Writing a Dockerfile
  // ─────────────────────────────────────────────
  {
    slug: "writing-a-dockerfile",
    title: "Writing a Dockerfile",
    description:
      "Master the art of writing Dockerfiles\u2014from choosing a base image to defining the startup command for your application.",
    icon: "\u{1F4DD}",
    steps: [
      {
        title: "What is a Dockerfile?",
        content: `<p>A <strong>Dockerfile</strong> is a plain text file that contains a series of instructions for building a Docker image. Think of it as a <em>recipe</em>: each instruction is a step, and when Docker follows all the steps in order, the result is a ready-to-use image.</p>
<p>The beauty of a Dockerfile is that it makes your environment <strong>reproducible</strong>. Instead of writing a long wiki page explaining how to set up a development machine (\u201Cinstall Node 18, then run npm install, then copy config.json to...\u201D), you write a Dockerfile and let Docker handle the rest. Anyone can build the exact same image from the same Dockerfile.</p>
<p>Dockerfiles are typically placed in the root of your project directory alongside your source code. By convention, the file is named exactly <code>Dockerfile</code> with no extension, though you can use the <code>-f</code> flag to specify a different filename.</p>
<p>In the next few steps, we\u2019ll build a Dockerfile from scratch, one instruction at a time. By the end, you\u2019ll have a complete Dockerfile for a Node.js application.</p>
<p>Here\u2019s a complete example \u2014 we\u2019ll break down each instruction in the following steps:</p>
<pre><code># Use official Node.js Alpine image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy application source code
COPY . .

# Document which port the app listens on
EXPOSE 3000

# Define the command to start the application
CMD ["node", "server.js"]</code></pre>`,
        animation: "dockerfile",
      },
      {
        title: "FROM - Base Image",
        content: `<p>Every Dockerfile must begin with a <code>FROM</code> instruction. This tells Docker which <strong>base image</strong> to start from\u2014the foundation layer upon which everything else is built.</p>
<p>Choosing the right base image is an important decision. For a Node.js app, you might use <code>FROM node:18-alpine</code>. The <code>alpine</code> variant is based on Alpine Linux, a minimal distribution that produces images as small as 5 MB. Compared to the full <code>node:18</code> image (around 900 MB), the Alpine version (<code>node:18-alpine</code> at ~175 MB) saves a huge amount of space.</p>
<p>You can also start from a bare operating system like <code>FROM ubuntu:22.04</code> or even <code>FROM scratch</code> (an empty image with absolutely nothing in it). The more minimal your base image, the smaller and more secure your final image will be\u2014there\u2019s less surface area for vulnerabilities.</p>
<p>Here\u2019s what the first line of our Dockerfile looks like:</p>
<pre><code>FROM node:18-alpine</code></pre>
<p>This single line gives us a working Linux environment with Node.js 18 pre-installed. Not bad for one line of code!</p>`,
        animation: "dockerfile",
      },
      {
        title: "COPY & RUN",
        content: `<p>With our base image set, the next step is to add our application code and install dependencies. The <code>COPY</code> instruction copies files from your local machine into the image, and <code>RUN</code> executes commands during the build process.</p>
<p>A common pattern is to first copy only the dependency manifest (<code>package.json</code>), install dependencies, and <em>then</em> copy the rest of the source code. This takes advantage of Docker\u2019s layer caching\u2014if your dependencies haven\u2019t changed, Docker skips the slow <code>npm install</code> step entirely.</p>
<pre><code>WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .</code></pre>
<p>The <code>WORKDIR</code> instruction sets the working directory inside the container. All subsequent <code>COPY</code>, <code>RUN</code>, and <code>CMD</code> instructions will execute relative to this path. If the directory doesn\u2019t exist, Docker creates it automatically.</p>
<p>Notice the order: dependencies first, source code second. If you change a source file but not <code>package.json</code>, Docker reuses the cached <code>npm install</code> layer and only re-copies your updated source files. This can reduce build times from minutes to seconds.</p>`,
        animation: "dockerfile",
      },
      {
        title: "CMD & EXPOSE",
        content: `<p>The final lines of our Dockerfile tell Docker how the container communicates with the outside world and what command to run at startup.</p>

<p><code>EXPOSE</code> documents which port your app listens on. It doesn\u2019t actually publish the port\u2014that happens at runtime with <code>-p</code>\u2014but it serves as built-in documentation for anyone reading the Dockerfile.</p>
<pre><code>EXPOSE 3000</code></pre>

<p><code>CMD</code> defines the <strong>default command</strong> that runs when a container starts. Only the last <code>CMD</code> in a Dockerfile takes effect. Always use the <strong>exec form</strong> (JSON array) in production:</p>
<pre><code>CMD ["node", "server.js"]</code></pre>
<p>The exec form runs the process directly as PID 1, so it receives signals like <code>SIGTERM</code> and can shut down gracefully. The shell form (<code>CMD node server.js</code>) wraps your process in <code>/bin/sh</code>, which may not forward signals properly.</p>

<p><code>ENTRYPOINT</code> sets a <strong>fixed executable</strong> that always runs. When paired with <code>CMD</code>, the entrypoint stays fixed while <code>CMD</code> provides default arguments that can be overridden:</p>
<pre><code>ENTRYPOINT ["node"]
CMD ["server.js"]</code></pre>
<p>With this pattern, <code>docker run myapp</code> runs <code>node server.js</code>, while <code>docker run myapp worker.js</code> runs <code>node worker.js</code>\u2014the entrypoint stays, only the argument changes. To bypass the entrypoint entirely, use <code>docker run --entrypoint sh myapp</code>.</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="border-bottom:1px solid #334155;"><th style="text-align:left;padding:8px;color:#2496ED;">Feature</th><th style="text-align:left;padding:8px;color:#2496ED;">CMD</th><th style="text-align:left;padding:8px;color:#2496ED;">ENTRYPOINT</th></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;">Purpose</td><td style="padding:8px;">Default command/arguments</td><td style="padding:8px;">Fixed executable</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;">Override at runtime</td><td style="padding:8px;">Replaced by args after image name</td><td style="padding:8px;">Requires <code>--entrypoint</code> flag</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;">Used together</td><td style="padding:8px;">Provides default args to ENTRYPOINT</td><td style="padding:8px;">Receives args from CMD or runtime</td></tr>
<tr><td style="padding:8px;">Best for</td><td style="padding:8px;">Flexible, general-purpose images</td><td style="padding:8px;">Single-purpose containers, CLI tools</td></tr>
</table>

<p>Try the commands below to see how CMD and ENTRYPOINT interact at runtime.</p>`,
        animation: "dockerfile",
        terminalCommands: {
          "cat Dockerfile": {
            output: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["server.js"]`,
            hint: "View the complete Dockerfile",
          },
          "docker run myapp": {
            output: "Server running on port 3000",
            hint: "Run with default CMD argument (server.js)",
          },
          "docker run myapp worker.js": {
            output: "Worker process started",
            hint: "Override CMD to run worker.js instead of server.js",
          },
          "docker run --entrypoint sh myapp": {
            output: "/ # (shell access, overriding entrypoint)",
            hint: "Override the ENTRYPOINT to get a shell inside the container",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 4: Docker Build & Run
  // ─────────────────────────────────────────────
  {
    slug: "docker-build-and-run",
    title: "Docker Build & Run",
    description:
      "Turn your Dockerfile into a running application. Learn to build images, leverage the build cache, map ports, and mount volumes.",
    icon: "\u{1F680}",
    steps: [
      {
        title: "Building an Image",
        content: `<p>Now that we have a Dockerfile, it\u2019s time to <strong>build</strong> an image from it. The <code>docker build</code> command reads your Dockerfile, executes each instruction, and produces a final image that you can run anywhere.</p>
<p>The basic syntax is <code>docker build -t myapp .</code> where <code>-t myapp</code> assigns a name (tag) to the image and <code>.</code> tells Docker to use the current directory as the <strong>build context</strong>\u2014the set of files Docker can access during the build.</p>
<p>During the build, Docker processes each instruction as a separate <strong>step</strong>. You\u2019ll see output like \u201CStep 1/6 : FROM node:18-alpine\u201D followed by a layer hash. Each step creates a new layer, and Docker caches each one for future builds.</p>
<p>Try running <code>docker build -t myapp .</code> in the terminal below. Watch how Docker pulls the base image, installs dependencies, and copies your application code layer by layer. The final line shows the image ID you\u2019ll use to run containers.</p>`,
        animation: "build-run",
        terminalCommands: {
          "docker build -t myapp .": {
            output: `[+] Building 12.4s (10/10) FINISHED
 => [internal] load build definition from Dockerfile          0.0s
 => [internal] load .dockerignore                             0.0s
 => [internal] load metadata for docker.io/library/node:18    1.2s
 => [1/5] FROM docker.io/library/node:18-alpine@sha256:a1b2   0.0s
 => [internal] load build context                             0.1s
 => [2/5] WORKDIR /app                                        0.1s
 => [3/5] COPY package*.json ./                               0.0s
 => [4/5] RUN npm install --production                        9.8s
 => [5/5] COPY . .                                            0.1s
 => exporting to image                                        1.1s
 => => naming to docker.io/library/myapp:latest               0.0s

Successfully built a3f2d7c8b9e1
Successfully tagged myapp:latest`,
            hint: "Build a Docker image from the Dockerfile in the current directory",
          },
        },
      },
      {
        title: "Build Cache",
        content: `<p>One of Docker\u2019s most powerful optimizations is the <strong>build cache</strong>. When you rebuild an image, Docker checks each instruction against its cache. If the instruction and all its inputs (files, base image, etc.) are unchanged, Docker reuses the cached layer instead of rebuilding it.</p>
<p>This is why we structured our Dockerfile to copy <code>package.json</code> before the source code. The <code>npm install</code> step is slow (often 30\u201360 seconds), but it only needs to re-run when dependencies change. If you\u2019re just editing application code, Docker skips straight to the <code>COPY . .</code> step, and your rebuild takes under a second.</p>
<p>However, the cache has an important rule: <strong>once a layer is invalidated, all subsequent layers are also rebuilt</strong>. If you change <code>package.json</code>, Docker must re-run <code>npm install</code> and re-copy all source files, even if those files haven\u2019t changed.</p>
<p>A common mistake is putting <code>COPY . .</code> before <code>RUN npm install</code>. In that case, <em>any</em> file change in your project invalidates the cache and triggers a full <code>npm install</code>. Ordering your Dockerfile from least-frequently-changed to most-frequently-changed instructions is the key to fast builds.</p>`,
        animation: "build-run",
      },
      {
        title: "Running a Container",
        content: `<p>With your image built, you can create and start a container using <code>docker run</code>. This is the command you\u2019ll use most often, and it has several important flags worth knowing.</p>
<p>The <code>-d</code> flag runs the container in <strong>detached mode</strong> (in the background), so you get your terminal back. Without it, the container\u2019s output streams directly to your terminal and <code>Ctrl+C</code> stops the container.</p>
<p>The <code>-p</code> flag maps a port on your host machine to a port inside the container. The syntax is <code>-p HOST:CONTAINER</code>, so <code>-p 3000:3000</code> means \u201Csend traffic from my machine\u2019s port 3000 to the container\u2019s port 3000.\u201D You can even use different ports, like <code>-p 8080:3000</code>.</p>
<p>The <code>--name</code> flag gives your container a human-readable name. Without it, Docker assigns a random name like \u201Ceager_tesla\u201D or \u201Cvibrant_wozniak.\u201D Named containers are much easier to manage\u2014you can use the name with <code>docker stop</code>, <code>docker logs</code>, and other commands. Try running the command below to launch your application!</p>`,
        animation: "build-run",
        terminalCommands: {
          "docker run -d -p 3000:3000 myapp": {
            output:
              "a7f3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
            hint: "Run the myapp image in detached mode with port mapping",
          },
          "docker run -d -p 3000:3000 --name myapp myapp": {
            output:
              "a7f3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
            hint: "Run with a custom container name",
          },
        },
      },
      {
        title: "Port Mapping & Volumes",
        content: `<p><strong>Port mapping</strong> bridges the network gap between your host and the container. Containers have their own isolated network stack, so without a port mapping, you can\u2019t reach the application running inside. The <code>-p</code> flag creates this bridge, forwarding traffic from a host port to a container port.</p>
<p>You can verify which ports are mapped with the <code>docker port</code> command. You can also map multiple ports for containers that listen on more than one (e.g., a web server on port 80 and an admin panel on port 8080).</p>
<p><strong>Volumes</strong> solve a different problem: data persistence. By default, when a container is removed, all data inside it is lost. Volumes mount a directory from your host machine into the container, so data persists even after the container is gone.</p>
<p>The syntax is <code>-v /host/path:/container/path</code>. For development, you might mount your source code directory so that changes on your laptop instantly appear inside the container: <code>docker run -v $(pwd):/app myapp</code>. This creates a fast feedback loop without rebuilding the image every time you edit a file.</p>`,
        animation: "build-run",
        terminalCommands: {
          "docker port myapp": {
            output: "3000/tcp -> 0.0.0.0:3000",
            hint: "Show port mappings for the myapp container",
          },
          "docker volume ls": {
            output: `DRIVER    VOLUME NAME
local     app-data
local     db-storage
local     node_modules`,
            hint: "List all Docker volumes",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 5: Docker Compose
  // ─────────────────────────────────────────────
  {
    slug: "docker-compose",
    title: "Docker Compose",
    description:
      "Orchestrate multi-container applications with Docker Compose. Define services, networks, and volumes in a single YAML file.",
    icon: "\u{1F517}",
    steps: [
      {
        title: "Why Docker Compose?",
        content: `<p>Imagine you\u2019re building a modern web application. You need a <strong>Node.js server</strong>, a <strong>PostgreSQL database</strong>, a <strong>Redis cache</strong>, and maybe a <strong>reverse proxy</strong> like Nginx. Each one runs in its own container. Without Docker Compose, you\u2019d have to run a separate <code>docker run</code> command for every single service\u2014each with its own flags for ports, volumes, environment variables, and network settings.</p>
<p>That\u2019s four or five long, complex commands you need to remember and execute in the right order. If you need to tear everything down and restart, you do it all over again. It\u2019s tedious, error-prone, and a nightmare to share with teammates. What if someone forgets the <code>--network</code> flag? What if the database starts before the migration container?</p>
<p><strong>Docker Compose</strong> solves this by letting you define your entire application stack in a single YAML file called <code>docker-compose.yml</code>. All services, networks, volumes, and their relationships are described declaratively. Then, with one command\u2014<code>docker compose up</code>\u2014everything starts together, connected and configured.</p>
<p>Think of it this way: instead of hiring each contractor separately and giving them individual instructions, you have one <em>project manager</em> (Compose) who reads the master plan and coordinates everyone. Compose is your orchestrator for local development and testing environments.</p>`,
        animation: "compose",
        terminalCommands: {
          "docker compose version": {
            output: "Docker Compose version v2.21.0",
            hint: "Check the installed version of Docker Compose",
          },
        },
      },
      {
        title: "The docker-compose.yml File",
        content: `<p>The heart of Docker Compose is the <code>docker-compose.yml</code> file. This YAML file follows a specific structure: at the top level you define <strong>services</strong> (your containers), <strong>networks</strong> (how they communicate), and <strong>volumes</strong> (persistent data storage). Each service maps to a single container and specifies everything Docker needs to run it.</p>
<p>Under each service, you can set the <strong>image</strong> to use (or a <strong>build</strong> context to build from a Dockerfile), <strong>ports</strong> to expose, <strong>environment</strong> variables for configuration, <strong>volumes</strong> to mount, and <strong>depends_on</strong> to declare startup order. The syntax mirrors the flags you\u2019d pass to <code>docker run</code>, but in a clean, readable format.</p>
<p>For example, a typical web application stack might have three services: <code>web</code> (your Node.js app built from a local Dockerfile), <code>db</code> (a PostgreSQL image with a named volume for data persistence), and <code>cache</code> (a Redis image). Each is configured with the right ports and environment variables, and they\u2019re all connected on the same network automatically.</p>
<p>Try running <code>cat docker-compose.yml</code> below to see a realistic Compose file. Notice how readable and self-documenting it is\u2014anyone on your team can look at this file and understand the entire architecture of your application at a glance.</p>
<p>Let's break down the key sections of a <code>docker-compose.yml</code> file:</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="border-bottom:1px solid #334155;"><th style="text-align:left;padding:8px;color:#2496ED;">Section</th><th style="text-align:left;padding:8px;color:#2496ED;">Purpose</th><th style="text-align:left;padding:8px;color:#2496ED;">Example</th></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>services</code></td><td style="padding:8px;">Defines each container in your app</td><td style="padding:8px;"><code>web</code>, <code>db</code>, <code>cache</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>image</code></td><td style="padding:8px;">Pre-built image from a registry</td><td style="padding:8px;"><code>postgres:15-alpine</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>build</code></td><td style="padding:8px;">Build from a local Dockerfile</td><td style="padding:8px;"><code>build: .</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>ports</code></td><td style="padding:8px;">Map host ports to container ports</td><td style="padding:8px;"><code>"3000:3000"</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>environment</code></td><td style="padding:8px;">Set environment variables</td><td style="padding:8px;"><code>POSTGRES_USER: user</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>volumes</code></td><td style="padding:8px;">Persist data or mount host files</td><td style="padding:8px;"><code>pgdata:/var/lib/postgresql/data</code></td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><code>depends_on</code></td><td style="padding:8px;">Control startup order</td><td style="padding:8px;"><code>depends_on: [db, cache]</code></td></tr>
</table>`,
        animation: "compose",
        terminalCommands: {
          "cat docker-compose.yml": {
            output: `version: "3.9"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - cache

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
            hint: "View the docker-compose.yml file for a web + database + cache stack",
          },
        },
      },
      {
        title: "Services & Dependencies",
        content: `<p>In a multi-container application, services often depend on each other. Your web server can\u2019t handle requests until the database is ready. A migration service shouldn\u2019t start until PostgreSQL is accepting connections. Docker Compose provides <strong><code>depends_on</code></strong> to control the startup order of your services.</p>
<p>When you declare <code>depends_on: [db, cache]</code> in your web service, Compose ensures that the <code>db</code> and <code>cache</code> containers are <em>started</em> before the <code>web</code> container. However, \u201Cstarted\u201D doesn\u2019t mean \u201Cready.\u201D A PostgreSQL container may take a few seconds to initialize its data directory. For true readiness, you can add <strong>health checks</strong> and use <code>depends_on</code> with the <code>condition: service_healthy</code> option.</p>
<p>Services communicate with each other using their <strong>service names as hostnames</strong>. In the Compose file, if your database service is called <code>db</code>, your web app connects to it at <code>db:5432</code>\u2014no IP addresses needed. Compose sets up an internal DNS resolver that maps service names to container IPs automatically. This is one of the most convenient features of Compose.</p>
<p>Environment variables are the standard way to pass configuration to each service. Database credentials, API keys, connection strings\u2014all of these go in the <code>environment</code> section. You can also reference a <code>.env</code> file for secrets you don\u2019t want to commit to version control. Try <code>docker compose config</code> below to see how Compose validates and resolves the final configuration.</p>`,
        animation: "compose",
        terminalCommands: {
          "docker compose config": {
            output: `name: myapp
services:
  cache:
    image: redis:7-alpine
    networks:
      default: null
    ports:
      - mode: ingress
        target: 6379
        published: "6379"
        protocol: tcp
  db:
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: pass
      POSTGRES_USER: user
    image: postgres:15-alpine
    networks:
      default: null
    ports:
      - mode: ingress
        target: 5432
        published: "5432"
        protocol: tcp
    volumes:
      - type: volume
        source: pgdata
        target: /var/lib/postgresql/data
  web:
    build:
      context: .
    depends_on:
      cache:
        condition: service_started
      db:
        condition: service_started
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/myapp
      REDIS_URL: redis://cache:6379
    networks:
      default: null
    ports:
      - mode: ingress
        target: 3000
        published: "3000"
        protocol: tcp
    volumes:
      - type: bind
        source: .
        target: /app
networks:
  default:
    name: myapp_default
volumes:
  pgdata:
    name: myapp_pgdata`,
            hint: "Validate and display the resolved Compose configuration",
          },
        },
      },
      {
        title: "Compose Commands",
        content: `<p>Docker Compose provides a handful of essential commands that make managing your application stack a breeze. The most important one is <code>docker compose up -d</code>, which builds images (if needed), creates containers, networks, and volumes, and starts everything in detached mode. It\u2019s the single command that brings your entire application to life.</p>
<p>To stop and remove all containers, networks, and the default network created by <code>up</code>, run <code>docker compose down</code>. Add the <code>-v</code> flag to also remove named volumes (useful for resetting database data). For day-to-day development, you\u2019ll bounce between <code>up</code> and <code>down</code> frequently.</p>
<p>Other essential commands include <code>docker compose logs -f</code> to tail the combined log output of all services (or a specific one with <code>docker compose logs -f web</code>), <code>docker compose ps</code> to check the status of all services, and <code>docker compose exec web sh</code> to get a shell inside a running service container. You can also scale services with <code>docker compose up --scale worker=3</code> to run multiple instances of a service.</p>
<p>For development workflows, Compose supports <strong>watch mode</strong> with <code>docker compose watch</code>, which automatically syncs file changes and rebuilds services as you code. Combined with volume mounts for hot reloading, this gives you a tight feedback loop\u2014edit a file, save it, and see the changes instantly in your containerized application.</p>`,
        animation: "compose",
        terminalCommands: {
          "docker compose up -d": {
            output: `[+] Running 4/4
 \u2714 Network myapp_default   Created                            0.1s
 \u2714 Container myapp-cache-1 Started                            0.4s
 \u2714 Container myapp-db-1    Started                            0.5s
 \u2714 Container myapp-web-1   Started                            0.8s`,
            hint: "Start all services in detached mode",
          },
          "docker compose ps": {
            output: `NAME              IMAGE              COMMAND                  SERVICE   CREATED         STATUS         PORTS
myapp-cache-1     redis:7-alpine     "docker-entrypoint.s\u2026"   cache     2 minutes ago   Up 2 minutes   0.0.0.0:6379->6379/tcp
myapp-db-1        postgres:15        "docker-entrypoint.s\u2026"   db        2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp
myapp-web-1       myapp-web          "node server.js"         web       2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp`,
            hint: "List the status of all services in the Compose project",
          },
          "docker compose down": {
            output: `[+] Running 4/4
 \u2714 Container myapp-web-1   Removed                            1.2s
 \u2714 Container myapp-cache-1 Removed                            0.5s
 \u2714 Container myapp-db-1    Removed                            0.8s
 \u2714 Network myapp_default   Removed                            0.1s`,
            hint: "Stop and remove all containers and networks",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 6: Docker Networking
  // ─────────────────────────────────────────────
  {
    slug: "docker-networking",
    title: "Docker Networking",
    description:
      "Understand how containers communicate. Learn about bridge networks, DNS resolution, and exposing services to the outside world.",
    icon: "\u{1F310}",
    steps: [
      {
        title: "Container Networking Basics",
        content: `<p>Every Docker container gets its own <strong>network namespace</strong>\u2014a completely isolated network environment with its own virtual ethernet interface, IP address, routing table, and port space. From the container\u2019s perspective, it has its own private network, just like a separate computer on the network.</p>
<p>By default, when you create a container, Docker connects it to a built-in network called <strong>bridge</strong>. This is a virtual network switch that allows containers to communicate with each other and with the host machine. Docker also provides two other default networks: <strong>host</strong> (which removes network isolation entirely) and <strong>none</strong> (which gives the container no network access at all).</p>
<p>Here\u2019s a useful analogy: think of containers as <em>rooms in a building</em>. Each room is private and self-contained. <strong>Networks</strong> are the hallways that connect rooms together. Rooms on the same hallway can easily communicate, but rooms on different hallways are isolated from each other. You, as the architect, decide which hallways to build and which rooms to connect.</p>
<p>Understanding networking is crucial because real-world applications are rarely a single container. A web app talks to a database, which talks to a cache, which might talk to a message queue. Docker networking is the plumbing that makes all of this communication possible. Try <code>docker network ls</code> below to see the default networks.</p>`,
        animation: "networking",
        terminalCommands: {
          "docker network ls": {
            output: `NETWORK ID     NAME      DRIVER    SCOPE
a1b2c3d4e5f6   bridge    bridge    local
d6e5f4c3b2a1   host      host      local
f1a2b3c4d5e6   none      null      local`,
            hint: "List all Docker networks on the system",
          },
        },
      },
      {
        title: "Bridge Networks",
        content: `<p>The <strong>default bridge network</strong> is created automatically when Docker starts. All containers join this network unless you specify otherwise. However, the default bridge has significant limitations: containers can only reach each other by IP address (not by name), and all containers share the same network with no isolation between them.</p>
<p><strong>User-defined bridge networks</strong> are the recommended approach and solve all of these problems. When you create your own bridge network with <code>docker network create</code>, containers on that network get <em>automatic DNS resolution</em>\u2014they can reach each other simply by container name. This is a game-changer because it means you never have to hardcode IP addresses.</p>
<p>User-defined bridges also provide better <strong>isolation</strong>. You can create separate networks for different application stacks: your web app and database share one network, while your monitoring tools share another. Containers on different networks cannot communicate unless you explicitly connect them to both networks. You can also configure custom subnets, IP ranges, and gateway addresses.</p>
<p>The general best practice is to <em>always</em> create a user-defined network for your applications rather than relying on the default bridge. Docker Compose does this automatically\u2014every Compose project gets its own dedicated network, which is one reason Compose is so convenient for multi-container setups.</p>`,
        animation: "networking",
        terminalCommands: {
          "docker network create mynetwork": {
            output: "e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
            hint: "Create a new user-defined bridge network",
          },
          "docker network inspect mynetwork": {
            output: `[
    {
        "Name": "mynetwork",
        "Id": "e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8",
        "Created": "2024-01-15T10:30:00.000000000Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Config": [
                {
                    "Subnet": "172.20.0.0/16",
                    "Gateway": "172.20.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]`,
            hint: "View detailed information about a network",
          },
        },
      },
      {
        title: "Container DNS & Communication",
        content: `<p>Docker runs an <strong>embedded DNS server</strong> at <code>127.0.0.11</code> inside every user-defined network. When a container tries to resolve a hostname, Docker\u2019s DNS server intercepts the query and maps container names to their current IP addresses. This is how <code>webapp</code> can reach <code>db</code> just by using its name\u2014no configuration files, no hardcoded IPs.</p>
<p>This <strong>service discovery</strong> mechanism is incredibly powerful. Containers can come and go, get new IP addresses each time they restart, and everything still works because the DNS entries update automatically. Your application code simply connects to <code>db:5432</code> or <code>cache:6379</code>, and Docker resolves it to the right container every time.</p>
<p>When you use <strong>Docker Compose</strong>, networking gets even easier. Compose automatically creates a dedicated network for your project and registers every service name as a DNS entry. If your Compose file defines services called <code>web</code>, <code>db</code>, and <code>cache</code>, each can reach the others by those exact names. You don\u2019t need to configure anything\u2014it just works out of the box.</p>
<p>For debugging network issues between containers, you can use standard tools like <code>ping</code>, <code>curl</code>, or <code>nslookup</code> from inside a container with <code>docker exec</code>. This lets you verify that DNS resolution is working and that containers can reach each other. Try the command below to see a container pinging another by name.</p>`,
        animation: "networking",
        terminalCommands: {
          "docker exec webapp ping db": {
            output: `PING db (172.20.0.3): 56 data bytes
64 bytes from 172.20.0.3: seq=0 ttl=64 time=0.089 ms
64 bytes from 172.20.0.3: seq=1 ttl=64 time=0.075 ms
64 bytes from 172.20.0.3: seq=2 ttl=64 time=0.082 ms
64 bytes from 172.20.0.3: seq=3 ttl=64 time=0.071 ms
--- db ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.071/0.079/0.089 ms`,
            hint: "Ping the 'db' container by name from the 'webapp' container",
          },
        },
      },
      {
        title: "Network Types & Port Publishing",
        content: `<p>Docker supports several <strong>network drivers</strong>, each designed for different use cases. The <strong>bridge</strong> driver (default) creates an isolated network on a single host\u2014perfect for local development and standalone applications. The <strong>host</strong> driver removes network isolation entirely, letting the container share the host\u2019s network stack directly. This eliminates the overhead of network address translation and is useful for performance-sensitive applications, but you lose the safety of isolation.</p>
<p>For multi-host deployments, the <strong>overlay</strong> driver creates a distributed network that spans multiple Docker hosts (used with Docker Swarm or Kubernetes). The <strong>macvlan</strong> driver assigns a real MAC address to each container, making it appear as a physical device on the network\u2014useful for legacy applications that expect to be directly on the LAN. The <strong>none</strong> driver completely disables networking for maximum isolation.</p>
<p><strong>Port publishing</strong> is how you let the outside world talk to your container. Here's the thing: by default, a container is completely isolated — even if your web server is running inside on port 3000, nobody can reach it. It's like having a shop inside a building with no door to the street.</p>
<p>The <code>-p</code> flag creates that door. When you write <code>-p 8080:3000</code>, you're saying: <em>"Anyone who knocks on my computer's port 8080, send them to the container's port 3000."</em> The first number is your machine (the street), the second is the container (the shop). You can use the same port on both sides (<code>-p 3000:3000</code>) or different ones — it's up to you.</p>
<p><strong>Why would a developer want this?</strong> Without port publishing, you can't access your app in a browser, your API can't receive requests, and your database isn't reachable from your code editor's tools. Port publishing is the bridge between your development workflow and the isolated container world. During development, you publish ports so you can test in your browser at <code>localhost:3000</code>. In production, a reverse proxy or load balancer handles the routing instead.</p>
<p>Choosing the right network type depends on your needs. For most development scenarios, a <strong>user-defined bridge</strong> is the best choice. Use <strong>host</strong> networking when you need maximum performance and don\u2019t need isolation. Use <strong>overlay</strong> when you\u2019re running a multi-node cluster. And remember: containers on the same network can communicate freely on any port\u2014you only need <code>-p</code> to expose services to the <em>outside</em> world.</p>`,
        animation: "networking",
        terminalCommands: {
          "docker run --network host nginx": {
            output: `/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2024/01/15 10:45:00 [notice] 1#1: using the "epoll" event method
2024/01/15 10:45:00 [notice] 1#1: nginx/1.25.3
2024/01/15 10:45:00 [notice] 1#1: built by gcc 12.2.0
2024/01/15 10:45:00 [notice] 1#1: OS: Linux 5.15.0-91-generic
2024/01/15 10:45:00 [notice] 1#1: start worker processes`,
            hint: "Run Nginx with host networking (no port mapping needed)",
          },
          "docker port webapp": {
            output: `3000/tcp -> 0.0.0.0:3000
8443/tcp -> 0.0.0.0:443`,
            hint: "Show all port mappings for the webapp container",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 7: Docker Volumes & Data
  // ─────────────────────────────────────────────
  {
    slug: "docker-volumes",
    title: "Docker Volumes & Data",
    description:
      "Master data persistence in Docker. Learn about named volumes, bind mounts, and strategies for keeping your data safe across container restarts.",
    icon: "\u{1F4BE}",
    steps: [
      {
        title: "The Data Problem",
        content: `<p>Containers are <strong>ephemeral</strong> by nature\u2014when you remove a container, all the data stored inside it vanishes. This isn\u2019t a bug; it\u2019s a feature. The principle of <em>immutable infrastructure</em> says that containers should be disposable and replaceable at any time, like paper cups rather than ceramic mugs.</p>
<p>But here\u2019s the catch: real-world applications need to <strong>persist data</strong>. Your database stores user records, your CMS holds uploaded images, and your application writes log files. If all of that disappears every time you restart or update a container, you\u2019d have a very unhappy set of users.</p>
<p>This is where <strong>Docker volumes</strong> come in. Volumes store data <em>outside</em> the container\u2019s writable layer, on the host filesystem. The container can read and write to the volume as if it were a normal directory, but the data lives independently of the container\u2019s lifecycle.</p>
<p>Think of it like a USB drive for your container. You can plug it in, save your files, unplug it, throw away the container, spin up a brand new one, plug the USB drive back in, and all your data is still there. Let\u2019s explore the different types of volumes Docker offers.</p>`,
        animation: "volumes",
        terminalCommands: {
          "docker volume ls": {
            output: `DRIVER    VOLUME NAME
local     app-data
local     db-storage
local     redis-cache
local     user-uploads
local     nginx-logs`,
            hint: "List all existing Docker volumes on the system",
          },
        },
      },
      {
        title: "Named Volumes",
        content: `<p><strong>Named volumes</strong> are the recommended way to persist data in Docker. They are created and managed entirely by Docker, stored in a special location on the host filesystem (typically <code>/var/lib/docker/volumes/</code>), and referenced by a human-readable name rather than a file path.</p>
<p>You create a named volume with <code>docker volume create</code> and then attach it to a container using the <code>-v</code> flag. The syntax is <code>-v volume-name:/path/in/container</code>. Docker handles all the details\u2014creating the directory, setting permissions, and ensuring the data persists across container restarts and removals.</p>
<p>Named volumes are the best choice for <strong>production databases</strong> and any data that absolutely must survive. They can be shared between multiple containers (for example, a web server and a backup job reading the same data). You can inspect them with <code>docker volume inspect</code>, and back them up by mounting the volume into a temporary container.</p>
<p>One of the nicest features of named volumes is that Docker will <em>automatically pre-populate</em> a new volume with the contents of the container\u2019s target directory. So if your image has default config files at <code>/data</code>, creating a named volume mounted at <code>/data</code> will copy those defaults into the volume on first use.</p>`,
        animation: "volumes",
        terminalCommands: {
          "docker volume create app-data": {
            output: `app-data`,
            hint: "Create a new named volume called app-data",
          },
          "docker run -v app-data:/data myapp": {
            output: `Unable to find image 'myapp:latest' locally
latest: Pulling from library/myapp
Digest: sha256:e4b2c9f1a7d3...
Status: Downloaded newer image for myapp:latest
Container started with volume mounted at /data
Initializing application...
Loading configuration from /data/config.json
Connected to database at /data/db.sqlite
Server listening on port 3000
Volume app-data mounted successfully at /data`,
            hint: "Start a container with the named volume mounted at /data",
          },
        },
      },
      {
        title: "Bind Mounts",
        content: `<p><strong>Bind mounts</strong> take a different approach from named volumes. Instead of letting Docker manage the storage location, a bind mount maps a <em>specific directory on your host machine</em> directly into the container. You specify the full host path, and whatever is at that path becomes available inside the container.</p>
<p>The syntax looks similar to named volumes but uses an absolute path instead of a name: <code>-v /home/user/myproject:/app</code>. A common shorthand is <code>-v $(pwd):/app</code>, which mounts the current directory. Changes you make on the host are <strong>immediately visible</strong> inside the container, and vice versa\u2014there\u2019s no copying or syncing involved.</p>
<p>This makes bind mounts perfect for <strong>development workflows</strong>. You can edit code in your IDE on the host, and the running container picks up the changes instantly\u2014especially powerful with tools like <code>nodemon</code> or hot module replacement that watch for file changes. No need to rebuild the image every time you tweak a line of code.</p>
<p>However, bind mounts come with an important <strong>security consideration</strong>: the container can modify files on your host machine. If a container process runs as root and has a bind mount to your home directory, it could potentially alter or delete your files. Always be mindful of what you\u2019re mounting and what permissions the container process has.</p>`,
        animation: "volumes",
        terminalCommands: {
          "docker run -v $(pwd):/app -w /app node:18 npm start": {
            output: `> myapp@1.0.0 start
> nodemon server.js

[nodemon] 3.0.2
[nodemon] to restart at any time, enter \`rs\`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting \`node server.js\`
Server running on http://localhost:3000
Connected to database
Watching for file changes...`,
            hint: "Run a Node.js app with the current directory bind-mounted for live reloading",
          },
        },
      },
      {
        title: "Backup & Best Practices",
        content: `<p>Backing up Docker volumes is straightforward once you know the pattern. The standard approach is to spin up a temporary container that mounts both the volume you want to back up and a host directory, then use <code>tar</code> to create an archive. The command looks like: <code>docker run --rm -v myvolume:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data</code>. The <code>--rm</code> flag ensures the helper container is automatically removed when it finishes.</p>
<p>Here are the <strong>best practices</strong> for managing data in Docker. Use <strong>named volumes</strong> for databases and any data that must persist reliably\u2014they\u2019re managed by Docker, easy to back up, and work consistently across platforms. Use <strong>bind mounts</strong> for development when you need live code reloading and fast iteration cycles.</p>
<p>For <em>sensitive data</em> that should never be written to disk (like encryption keys in memory or temporary session tokens), Docker offers <strong>tmpfs mounts</strong>. A tmpfs mount stores data in the host\u2019s RAM and disappears completely when the container stops. This is the most secure option for transient secrets.</p>
<p>The most important rule: <strong>never store important data in the container\u2019s writable layer</strong>. The container layer is tightly coupled to the container\u2019s lifecycle and adds to the container\u2019s size. If the container is removed, that data is gone forever. Always use volumes for anything you care about keeping.</p>
<p>Here's a quick reference for choosing the right storage option:</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="border-bottom:1px solid #334155;"><th style="text-align:left;padding:8px;color:#2496ED;">Type</th><th style="text-align:left;padding:8px;color:#2496ED;">Best For</th><th style="text-align:left;padding:8px;color:#2496ED;">Persists?</th><th style="text-align:left;padding:8px;color:#2496ED;">Managed By</th></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><strong>Named Volume</strong></td><td style="padding:8px;">Databases, file uploads, production data</td><td style="padding:8px;">✓ Yes</td><td style="padding:8px;">Docker</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><strong>Bind Mount</strong></td><td style="padding:8px;">Development (live code sync), config files</td><td style="padding:8px;">✓ Yes</td><td style="padding:8px;">You (host filesystem)</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><strong>tmpfs Mount</strong></td><td style="padding:8px;">Secrets, temp files, sensitive data</td><td style="padding:8px;">✗ No (RAM only)</td><td style="padding:8px;">OS (memory)</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px;"><strong>Container Layer</strong></td><td style="padding:8px;">Nothing important — treat as disposable</td><td style="padding:8px;">✗ No</td><td style="padding:8px;">Container lifecycle</td></tr>
</table>
<p><strong>Rule of thumb:</strong> If you care about the data, use a volume. If you need real-time sync with your host, use a bind mount. If it's sensitive and temporary, use tmpfs. Never rely on the container's writable layer for anything you need to keep.</p>`,
        animation: "volumes",
        terminalCommands: {
          "docker run --rm -v app-data:/data alpine ls /data": {
            output: `config.json
db.sqlite
logs/
uploads/
cache/
sessions/
backup-manifest.json`,
            hint: "List the contents of the app-data volume using a temporary Alpine container",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 8: Multi-Stage Builds
  // ─────────────────────────────────────────────
  {
    slug: "multi-stage-builds",
    title: "Multi-Stage Builds",
    description:
      "Build smaller, more secure Docker images using multi-stage builds. Learn the builder pattern, optimize layer caching, and create production-ready containers.",
    icon: "\u{1F3D7}\uFE0F",
    steps: [
      {
        title: "The Image Size Problem",
        content: `<p>When you build a Docker image for a typical application, you often need a lot of <strong>development tools</strong>: compilers, build systems, testing frameworks, type checkers, and hundreds of dev dependencies. A full Node.js development image can easily balloon to <strong>1 GB or more</strong>, and a Go or Rust image with the full compiler toolchain can be even larger.</p>
<p>But here\u2019s the thing: your <em>production</em> application doesn\u2019t need any of those tools. A compiled Go binary runs on its own. A built React frontend is just static HTML, CSS, and JavaScript files. A Node.js app only needs the runtime and its production dependencies. All those compilers, dev dependencies, and build tools are dead weight in production.</p>
<p>Shipping oversized images has real consequences. They take longer to <strong>push and pull</strong> from registries, consuming bandwidth and slowing down deployments. They use more <strong>disk space</strong> on every server that runs them. And critically, every extra package is potential <strong>attack surface</strong>\u2014a compiler or build tool in production is an unnecessary security risk.</p>
<p>Imagine packing for a weekend trip but bringing your entire workshop of tools, just in case. You\u2019d need a truck instead of a suitcase. Multi-stage builds let you use the workshop during construction but only pack the finished product for the trip. Let\u2019s see how.</p>`,
        animation: "multistage",
        terminalCommands: {
          "docker images": {
            output: `REPOSITORY       TAG           IMAGE ID       CREATED        SIZE
myapp            dev           f7a3b2c1d4e5   2 minutes ago  1.2GB
myapp            production    a1b2c3d4e5f6   5 minutes ago  85MB
node             18            c9d8e7f6a5b4   3 days ago     998MB
node             18-alpine     b4c5d6e7f8a9   3 days ago     175MB
nginx            alpine        e1f2a3b4c5d6   5 days ago     41MB
alpine           3.18          d2e3f4a5b6c7   2 weeks ago    7.34MB`,
            hint: "Compare image sizes - notice the massive difference between dev and production",
          },
        },
      },
      {
        title: "Multi-Stage Dockerfile",
        content: `<p>A <strong>multi-stage build</strong> uses multiple <code>FROM</code> statements in a single Dockerfile. Each <code>FROM</code> instruction begins a new <em>stage</em>, and each stage starts with a fresh filesystem. The magic happens with <code>COPY --from=</code>, which lets you cherry-pick files from a previous stage into the current one.</p>
<p>The first stage (often called the <strong>builder</strong>) contains all the heavy tools: the full Node.js runtime, npm, all dev dependencies, the TypeScript compiler, and your build scripts. It does all the work\u2014compiling, bundling, optimizing\u2014and produces the final output files.</p>
<p>The second stage starts from a <strong>minimal base image</strong> (like <code>node:18-alpine</code> or even <code>nginx:alpine</code> for static sites) and uses <code>COPY --from=builder</code> to grab only the compiled output and production dependencies. Everything else\u2014the compiler, dev dependencies, source code, test files\u2014is left behind in the builder stage.</p>
<p>The result? Your final image contains only what\u2019s needed to <em>run</em> the application. The builder stage is discarded after the build completes. Docker doesn\u2019t even store it in your local image list. You get the best of both worlds: a full development environment for building, and a tiny, clean image for production.</p>`,
        animation: "multistage",
        terminalCommands: {
          "cat Dockerfile": {
            output: `# Stage 1: Builder
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
            hint: "View a multi-stage Dockerfile with a builder stage and a production stage",
          },
        },
      },
      {
        title: "The Builder Pattern",
        content: `<p>The <strong>builder pattern</strong> is a strategy for organizing your multi-stage Dockerfile. Stage 1 (the builder) is your full-powered workshop where all the heavy lifting happens. Stage 2 (production) is the sleek, minimal package you actually ship.</p>
<p>In the builder stage, you install <em>all</em> dependencies (including devDependencies), compile TypeScript to JavaScript, build your frontend assets, run your linter, and execute your test suite. If any of these steps fail, the build stops and you get an error\u2014meaning a broken build never produces an image. Think of it as a quality gate built right into your image pipeline.</p>
<p>In the production stage, you start fresh from a slim base image and copy over <em>only</em> the artifacts you need: the compiled <code>dist/</code> folder, the pruned <code>node_modules/</code> with production-only packages, and your <code>package.json</code>. No TypeScript source, no test files, no <code>.eslintrc</code>, no <code>jest.config.js</code>\u2014none of it.</p>
<p>The size difference is dramatic. A typical Node.js app goes from <strong>1.2 GB</strong> (with all dev tools) to <strong>85\u2013150 MB</strong> (production only). For Go applications, the difference is even more striking\u2014from hundreds of megabytes down to a <strong>10\u201320 MB</strong> static binary on <code>scratch</code>. Smaller images mean faster deployments, lower costs, and fewer vulnerabilities.</p>`,
        animation: "multistage",
        terminalCommands: {
          "docker build -t myapp:optimized .": {
            output: `[+] Building 34.7s (15/15) FINISHED
 => [internal] load build definition from Dockerfile           0.0s
 => [internal] load .dockerignore                              0.0s
 => [internal] load metadata for docker.io/library/node:18     0.8s
 => [internal] load metadata for docker.io/library/node:18-a   0.8s
 => [builder 1/6] FROM docker.io/library/node:18@sha256:abc   0.0s
 => [builder 2/6] WORKDIR /app                                 0.1s
 => [builder 3/6] COPY package*.json ./                        0.0s
 => [builder 4/6] RUN npm ci                                  18.3s
 => [builder 5/6] COPY . .                                     0.2s
 => [builder 6/6] RUN npm run build                            8.4s
 => [stage-1 1/4] FROM docker.io/library/node:18-alpine        0.0s
 => [stage-1 2/4] WORKDIR /app                                 0.0s
 => [stage-1 3/4] COPY --from=builder /app/dist ./dist         0.1s
 => [stage-1 4/4] COPY --from=builder /app/node_modules ./     2.1s
 => exporting to image                                         4.7s
 => => naming to docker.io/library/myapp:optimized             0.0s

Successfully built d8e9f0a1b2c3
Successfully tagged myapp:optimized`,
            hint: "Build the image using multi-stage Dockerfile - watch both stages execute",
          },
        },
      },
      {
        title: "Security & Optimization Tips",
        content: `<p>Multi-stage builds give you smaller images, but there are additional best practices to make your images even more <strong>secure and efficient</strong>. Start by always using <em>specific version tags</em> for your base images. Using <code>node:18.19.0-alpine</code> instead of <code>node:latest</code> ensures your builds are reproducible and won\u2019t break when a new version is released.</p>
<p>Run your application as a <strong>non-root user</strong>. By default, containers run as root, which is a security risk. Add <code>USER node</code> (or create a custom user) in your Dockerfile so that even if an attacker exploits your application, they have limited permissions. Most official images (like <code>node</code>) ship with a non-root user already created for this purpose.</p>
<p>Use a <code>.dockerignore</code> file to exclude unnecessary files from the build context. Files like <code>node_modules/</code>, <code>.git/</code>, <code>.env</code>, test files, and documentation should never be sent to the Docker daemon. A good <code>.dockerignore</code> speeds up builds and prevents sensitive files from accidentally ending up in your image.</p>
<p>Finally, <strong>scan your images for vulnerabilities</strong> using tools like <code>docker scout</code>. Even minimal base images can contain known CVEs in their system packages. Regular scanning helps you catch issues early, and pinning package versions in your Dockerfile ensures you don\u2019t accidentally introduce vulnerable dependencies. Layer your Dockerfile with the most stable instructions first for <strong>maximum cache hits</strong>.</p>`,
        animation: "multistage",
        terminalCommands: {
          "docker scout quickview myapp:optimized": {
            output: `    \u2714 Image stored for indexing
    \u2714 Indexed 142 packages

  Target     \u2502 myapp:optimized  \u2502 0C     2H     5M    12L
    digest   \u2502 d8e9f0a1b2c3     \u2502
  Base image \u2502 node:18-alpine   \u2502 0C     1H     3M     8L

  Packages with vulnerabilities
    CVE-2023-44487   \u2502 HIGH   \u2502 nghttp2 1.57.0  (fix: 1.58.0)
    CVE-2023-45853   \u2502 HIGH   \u2502 zlib    1.3     (fix: 1.3.1)
    CVE-2023-52425   \u2502 MEDIUM \u2502 expat   2.5.0   (fix: 2.6.0)
    CVE-2024-0567    \u2502 MEDIUM \u2502 gnutls  3.8.2   (fix: 3.8.3)
    CVE-2024-0553    \u2502 MEDIUM \u2502 gnutls  3.8.2   (fix: 3.8.3)

  19 vulnerabilities found (12 low, 5 medium, 2 high, 0 critical)
  Recommendations: Update base image to node:18.19.1-alpine`,
            hint: "Scan the optimized image for known vulnerabilities",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 9: Container Orchestration
  // ─────────────────────────────────────────────
  {
    slug: "container-orchestration",
    title: "Container Orchestration",
    description:
      "Scale beyond a single host. Learn the fundamentals of container orchestration, Docker Swarm basics, and get an introduction to Kubernetes concepts.",
    icon: "\u2638\uFE0F",
    steps: [
      {
        title: "Why Orchestration?",
        content: `<p>Running Docker on a single machine works great for development, but <strong>production environments</strong> demand much more. You need high availability so your app stays online even when a server fails. You need horizontal scaling to handle traffic spikes. You need load balancing to distribute requests evenly, rolling updates to deploy without downtime, and self-healing to automatically replace crashed containers.</p>
<p>When one server isn\u2019t enough, you need an <strong>orchestrator</strong>\u2014a system that manages containers across multiple machines. The orchestrator decides which node runs which container, monitors their health, and takes corrective action when something goes wrong. It turns a collection of individual servers into a unified, reliable platform.</p>
<p>Think of it this way: <em>Docker is a single musician who can play beautifully on their own. Container orchestration is the conductor managing an entire orchestra</em>\u2014coordinating dozens of musicians, making sure everyone plays in sync, and stepping in if someone misses a beat. The conductor doesn\u2019t play an instrument; they ensure the whole ensemble performs as one.</p>
<p>The two most popular orchestrators in the Docker ecosystem are <strong>Docker Swarm</strong> (built into Docker Engine) and <strong>Kubernetes</strong> (the industry standard). We\u2019ll explore both in this lesson, starting with Swarm\u2019s simplicity and building up to Kubernetes\u2019 power.</p>`,
        animation: "orchestration",
        terminalCommands: {
          "docker info": {
            output: `Client: Docker Engine - Community
 Version:    24.0.7
 Context:    default

Server:
 Containers: 5
  Running:   3
  Paused:    0
  Stopped:   2
 Images:     18
 Server Version: 24.0.7
 Storage Driver: overlay2
 Logging Driver: json-file
 Swarm: inactive
 Operating System: Docker Desktop
 Architecture: x86_64
 CPUs: 8
 Total Memory: 15.63GiB`,
            hint: "Check Docker system info \u2014 notice Swarm is currently inactive",
          },
        },
      },
      {
        title: "Docker Swarm",
        content: `<p><strong>Docker Swarm</strong> is Docker\u2019s built-in orchestration tool\u2014it comes bundled with every Docker Engine installation, so there\u2019s nothing extra to install. You activate it with a single command: <code>docker swarm init</code>. This transforms your Docker host into a <strong>Swarm manager</strong>, ready to coordinate containers across multiple machines.</p>
<p>Swarm uses a <strong>manager/worker architecture</strong>. Manager nodes handle the scheduling decisions\u2014they decide which node should run which container, maintain the desired state of the cluster, and serve the Swarm API. Worker nodes are the muscle\u2014they receive tasks from managers and run the actual containers. A node can be both a manager and a worker, which is common in smaller clusters.</p>
<p>The key abstraction in Swarm is the <strong>service</strong>. Rather than running individual containers with <code>docker run</code>, you create services that describe <em>what</em> you want to run and <em>how many</em> replicas you need. Think of a service as a recipe: \u201CI want 3 copies of my web app running at all times.\u201D Swarm ensures that recipe is always fulfilled, even if a node goes down.</p>
<p>Swarm also includes a built-in <strong>load balancer</strong> that automatically distributes incoming traffic across all healthy replicas of a service. You don\u2019t need to configure Nginx or HAProxy\u2014Swarm handles it with its <em>ingress routing mesh</em>. Any node in the swarm can accept traffic for any service, making networking beautifully simple.</p>`,
        animation: "orchestration",
        terminalCommands: {
          "docker swarm init": {
            output: `Swarm initialized: current node (dxn1zf6l61qsb1josjja83ngz) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.`,
            hint: "Initialize Docker Swarm mode on this node",
          },
          "docker node ls": {
            output: `ID                            HOSTNAME         STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
dxn1zf6l61qsb1josjja83ngz *   docker-desktop   Ready     Active         Leader           24.0.7`,
            hint: "List all nodes in the swarm cluster",
          },
        },
      },
      {
        title: "Services & Scaling",
        content: `<p>Creating a service in Docker Swarm is straightforward: use <code>docker service create</code> with a name, the number of replicas you want, port mappings, and the image to run. Swarm takes care of distributing those replicas across available nodes in the cluster.</p>
<p>The real power shows up when you need to <strong>scale</strong>. Running <code>docker service scale web=10</code> instantly tells Swarm to bring the total number of replicas to 10. Swarm figures out which nodes have capacity, schedules the new containers, and starts them\u2014often in just seconds. Scaling down works the same way; Swarm gracefully terminates the extra replicas.</p>
<p>When you need to deploy a new version of your application, Swarm performs a <strong>rolling update</strong>. Instead of stopping all containers at once (causing downtime), Swarm replaces them in batches. You control this with <code>--update-delay</code> (time between batches) and <code>--update-parallelism</code> (how many to update at once). If a new container fails its health check, Swarm can automatically <strong>roll back</strong> to the previous version.</p>
<p>This combination of easy scaling and zero-downtime deployments is what makes orchestration so valuable. You describe the <em>desired state</em> (\u201CI want 3 healthy replicas of version 2.0\u201D), and Swarm continuously works to make reality match that state. If a container crashes, Swarm replaces it. If a node goes offline, Swarm reschedules its containers elsewhere.</p>`,
        animation: "orchestration",
        terminalCommands: {
          "docker service create --name web --replicas 3 -p 80:80 nginx": {
            output: `uq2xv7k3a1d8m5n6o9p2q4r7
overall progress: 3 out of 3 tasks
1/3: running   [==================================================>]
2/3: running   [==================================================>]
3/3: running   [==================================================>]
verify: Service converged`,
            hint: "Create a service with 3 replicas of nginx",
          },
          "docker service ls": {
            output: `ID             NAME    MODE         REPLICAS   IMAGE          PORTS
uq2xv7k3a1d8   web     replicated   3/3        nginx:latest   *:80->80/tcp`,
            hint: "List all services running in the swarm",
          },
        },
      },
      {
        title: "Kubernetes Overview",
        content: `<p><strong>Kubernetes</strong> (often abbreviated as <strong>K8s</strong>) is the industry-standard container orchestration platform, originally developed by Google and now maintained by the Cloud Native Computing Foundation. While Docker Swarm is simpler to set up, Kubernetes offers a far richer ecosystem with more flexibility, extensibility, and community support.</p>
<p>Kubernetes introduces several key concepts. A <strong>Pod</strong> is the smallest deployable unit\u2014it wraps one or more containers that share networking and storage. A <strong>Deployment</strong> manages a set of identical Pods and handles rolling updates and rollbacks. A <strong>Service</strong> provides stable networking for a set of Pods (since Pods are ephemeral and can be replaced at any time). An <strong>Ingress</strong> manages external HTTP/HTTPS access to your services.</p>
<p>One of Kubernetes\u2019 greatest strengths is its <strong>declarative configuration</strong>. You write YAML files describing your desired state\u2014\u201CI want 5 replicas of my app, each with 512 MB of memory, exposed on port 80\u201D\u2014and Kubernetes continuously reconciles the actual state with your desired state. This configuration-as-code approach integrates naturally with Git and CI/CD pipelines.</p>
<p>So when should you choose Swarm vs. Kubernetes? <em>Docker Swarm</em> is the right choice when you want simplicity: it\u2019s built into Docker, requires minimal setup, and handles most common orchestration needs. <em>Kubernetes</em> is the right choice when you need a vast plugin ecosystem, multi-cloud support, advanced scheduling, or when your organization is already invested in the K8s ecosystem. Both solve the same core problems\u2014scheduling, scaling, networking, and self-healing\u2014but at different levels of complexity and power.</p>`,
        animation: "orchestration",
        terminalCommands: {
          "kubectl get pods": {
            output: `NAME                        READY   STATUS    RESTARTS   AGE
web-app-6d8f7b9c4-2xk9p    1/1     Running   0          4h
web-app-6d8f7b9c4-7mj3n    1/1     Running   0          4h
web-app-6d8f7b9c4-q8w5r    1/1     Running   0          4h
api-server-85b4f7d-k4x2m   1/1     Running   0          2h
api-server-85b4f7d-p9n7v   1/1     Running   0          2h
redis-master-0              1/1     Running   0          6h`,
            hint: "List all pods running in the Kubernetes cluster",
          },
          "kubectl get services": {
            output: `NAME          TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
kubernetes    ClusterIP      10.96.0.1       <none>         443/TCP        24h
web-app       LoadBalancer   10.96.45.123    34.82.91.204   80:31245/TCP   4h
api-server    ClusterIP      10.96.78.56     <none>         8080/TCP       2h
redis         ClusterIP      10.96.12.89     <none>         6379/TCP       6h`,
            hint: "List all services in the Kubernetes cluster",
          },
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LESSON 10: Docker in Production
  // ─────────────────────────────────────────────
  {
    slug: "docker-in-production",
    title: "Docker in Production",
    description:
      "Ship containers with confidence. Learn health checks, resource limits, logging, security hardening, and CI/CD pipeline integration.",
    icon: "\u{1F680}",
    steps: [
      {
        title: "Health Checks",
        content: `<p>In production, it\u2019s not enough for a container to be <em>running</em>\u2014it needs to be <strong>healthy</strong>. A container might be up but stuck in a deadlock, out of memory, or unable to connect to its database. The <code>HEALTHCHECK</code> instruction in your Dockerfile tells Docker how to verify that your application is actually working, not just alive.</p>
<p>A health check is simply a command that Docker runs periodically inside the container. If the command exits with code 0, the container is <strong>healthy</strong>. If it exits with code 1, the container is <strong>unhealthy</strong>. A typical health check for a web application pings its own health endpoint: <code>HEALTHCHECK CMD curl -f http://localhost:3000/health || exit 1</code>.</p>
<p>You can configure the timing with <code>--interval</code> (how often to check, default 30s), <code>--timeout</code> (how long to wait for a response, default 30s), <code>--retries</code> (how many consecutive failures before marking unhealthy, default 3), and <code>--start-period</code> (grace period for container startup). These settings let you tune the balance between quick detection and avoiding false alarms.</p>
<p>Health checks become <em>essential</em> when you\u2019re using an orchestrator like Swarm or Kubernetes. The orchestrator monitors the health status and can automatically <strong>restart unhealthy containers</strong> or remove them from the load balancer. Without health checks, a broken container keeps receiving traffic and silently fails. With them, your system self-heals.</p>`,
        animation: "production",
        terminalCommands: {
          "docker inspect --format='{{.State.Health.Status}}' webapp": {
            output: "healthy",
            hint: "Check the health status of a running container",
          },
          "docker ps": {
            output: `CONTAINER ID   IMAGE          COMMAND                  STATUS                    PORTS                  NAMES
a1b2c3d4e5f6   myapp:2.0      "node server.js"         Up 3 hours (healthy)      0.0.0.0:3000->3000/tcp webapp
b2c3d4e5f6a7   postgres:15    "docker-entrypoint.s\u2026"   Up 3 hours (healthy)      5432/tcp               database
c3d4e5f6a7b8   redis:7        "docker-entrypoint.s\u2026"   Up 3 hours (healthy)      6379/tcp               cache
d4e5f6a7b8c9   nginx:latest   "/docker-entrypoint.\u2026"   Up 3 hours (healthy)      0.0.0.0:80->80/tcp     proxy`,
            hint: "List running containers \u2014 notice the (healthy) status indicator",
          },
        },
      },
      {
        title: "Resource Limits",
        content: `<p>By default, a Docker container has <strong>unlimited access</strong> to the host machine\u2019s CPU and memory. This means a single misbehaving container\u2014say, one with a memory leak\u2014can consume all available resources and bring down every other container on the same host. In production, this is a recipe for disaster.</p>
<p>Docker provides flags to set hard limits on resource usage. The <code>--memory</code> flag (e.g., <code>--memory=512m</code>) caps the container\u2019s RAM. If the container tries to exceed this limit, Linux\u2019s <strong>OOM (Out of Memory) killer</strong> terminates it. The <code>--cpus</code> flag (e.g., <code>--cpus=1.5</code>) limits how many CPU cores the container can use\u20141.5 means it can use at most one and a half cores.</p>
<p>For more granular CPU control, you can use <code>--cpu-shares</code> to set <em>relative priority</em>. A container with 1024 shares gets twice the CPU time as one with 512 shares\u2014but only when the CPU is contested. When there\u2019s spare capacity, any container can burst beyond its share. This is great for mixing high-priority and background workloads.</p>
<p>Setting resource limits is a <strong>best practice for every production container</strong>. It protects your infrastructure from runaway processes, makes capacity planning predictable, and ensures fair resource distribution. Use <code>docker stats</code> to monitor real-time resource usage and validate that your limits are set appropriately for each container\u2019s workload.</p>`,
        animation: "production",
        terminalCommands: {
          "docker run -d --memory=512m --cpus=1.5 --name webapp myapp": {
            output: "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
            hint: "Run a container with memory and CPU limits",
          },
          "docker stats webapp --no-stream": {
            output: `CONTAINER ID   NAME     CPU %     MEM USAGE / LIMIT   MEM %     NET I/O          BLOCK I/O        PIDS
e5f6a7b8c9d0   webapp   0.45%     128.3MiB / 512MiB   25.06%    1.23MB / 892kB   4.1MB / 12.3kB   23`,
            hint: "Show resource usage statistics for the webapp container",
          },
        },
      },
      {
        title: "Logging & Monitoring",
        content: `<p>Docker captures everything your application writes to <strong>stdout</strong> and <strong>stderr</strong> as container logs. This is a key convention: always log to standard output, never to files inside the container. When your app writes to stdout, Docker\u2019s logging infrastructure captures, stores, and makes those logs accessible through the <code>docker logs</code> command.</p>
<p>The <code>docker logs</code> command is your first stop for debugging. Use <code>--tail 20</code> to see the last 20 lines, <code>--since 1h</code> to filter by time, and <code>--follow</code> to stream logs in real time (like <code>tail -f</code>). For containers that produce a lot of output, these filters are essential for finding what you need quickly.</p>
<p>Behind the scenes, Docker uses <strong>log drivers</strong> to determine where logs are stored. The default <code>json-file</code> driver writes logs to JSON files on the host. For production, you might switch to <code>syslog</code>, <code>fluentd</code>, <code>awslogs</code> (for AWS CloudWatch), or <code>gelf</code> (for Graylog). You can configure the log driver globally in the Docker daemon config or per-container with <code>--log-driver</code>.</p>
<p>For monitoring resource usage, <code>docker stats</code> provides a live dashboard showing CPU, memory, network, and disk I/O for all running containers. In production, you\u2019ll typically set up <strong>cAdvisor</strong> to collect container metrics, <strong>Prometheus</strong> to store and query them, and <strong>Grafana</strong> to visualize dashboards and set up alerts. This observability stack gives you full visibility into your containerized infrastructure.</p>`,
        animation: "production",
        terminalCommands: {
          "docker logs --tail 20 webapp": {
            output: `[2024-01-15T10:23:45.123Z] INFO: Server starting on port 3000
[2024-01-15T10:23:45.456Z] INFO: Connected to database at postgres:5432
[2024-01-15T10:23:45.789Z] INFO: Redis cache connected at redis:6379
[2024-01-15T10:23:46.012Z] INFO: Health check endpoint registered at /health
[2024-01-15T10:23:46.345Z] INFO: Server ready and accepting connections
[2024-01-15T10:24:01.234Z] INFO: GET /api/users 200 12ms
[2024-01-15T10:24:03.567Z] INFO: GET /api/products 200 8ms
[2024-01-15T10:24:15.890Z] INFO: POST /api/orders 201 45ms
[2024-01-15T10:25:01.123Z] INFO: Health check passed
[2024-01-15T10:25:30.456Z] WARN: Slow query detected: 230ms
[2024-01-15T10:26:01.789Z] INFO: GET /api/users 200 15ms`,
            hint: "View the last 20 log lines from the webapp container",
          },
          "docker stats --no-stream": {
            output: `CONTAINER ID   NAME       CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
a1b2c3d4e5f6   webapp     0.45%     128.3MiB / 512MiB     25.06%    1.23MB / 892kB    4.1MB / 12.3kB    23
b2c3d4e5f6a7   database   1.23%     256.1MiB / 1GiB       25.01%    5.67MB / 3.21MB   12.8MB / 45.6MB   42
c3d4e5f6a7b8   cache      0.12%     45.7MiB / 256MiB      17.85%    892kB / 456kB     1.2MB / 8.9kB     4
d4e5f6a7b8c9   proxy      0.08%     12.3MiB / 128MiB      9.61%     2.34MB / 2.12MB   512kB / 4.1kB     5`,
            hint: "Show resource usage for all running containers",
          },
        },
      },
      {
        title: "Security Best Practices",
        content: `<p>Security in Docker starts with your Dockerfile. By default, containers run as <strong>root</strong>, which is dangerous\u2014if an attacker exploits a vulnerability, they have root access inside the container. Always add a <code>USER</code> instruction to switch to a non-root user: <code>USER node</code> for Node.js apps, or create a dedicated user with <code>RUN addgroup -S appgroup && adduser -S appuser -G appgroup</code>.</p>
<p>Use the <code>--read-only</code> flag to mount the container\u2019s filesystem as read-only. This prevents attackers from modifying binaries or writing malicious scripts inside the container. If your app needs to write temporary files, mount a <strong>tmpfs</strong> volume for just that directory. The principle of <strong>least privilege</strong> also applies to Linux capabilities\u2014use <code>--cap-drop ALL</code> to remove all capabilities and <code>--cap-add</code> to grant only what your app needs.</p>
<p>Never store secrets\u2014API keys, database passwords, TLS certificates\u2014in your Docker images. Anyone who pulls the image can extract them. Instead, use <strong>Docker secrets</strong> (in Swarm mode), environment variables injected at runtime, or a secrets manager like HashiCorp Vault. Use a <code>.dockerignore</code> file to ensure sensitive files like <code>.env</code>, <code>.git</code>, and <code>node_modules</code> are never accidentally copied into the image.</p>
<p>Finally, <strong>scan your images for vulnerabilities</strong> regularly. Tools like <code>docker scout cves</code>, Trivy, and Snyk analyze your image layers and report known CVEs (Common Vulnerabilities and Exposures). Keep your base images updated\u2014an old <code>node:16</code> image might have hundreds of unpatched vulnerabilities. Automate scanning in your CI/CD pipeline so every image is checked before it reaches production.</p>`,
        animation: "production",
        terminalCommands: {
          "docker scout cves myapp:latest": {
            output: `    \u2713 Image stored for indexing
    \u2713 Indexed 214 packages

  Target: myapp:latest (linux/amd64)
    digest: sha256:a3f2d7c8b9e1...

  ## Overview

                      \u2502 Analyzed Image
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Target              \u2502 myapp:latest
  digest              \u2502 a3f2d7c8b9e1
  platform            \u2502 linux/amd64
  vulnerabilities     \u2502 0C  1H  3M  12L
  size                \u2502 175 MB
  packages            \u2502 214

  ## Vulnerabilities

  1H: libcurl 7.88.1 \u2192 CVE-2023-38545 (fixed in 8.4.0)
  3M: openssl 3.0.8 \u2192 CVE-2023-3817, CVE-2023-3446, CVE-2023-2975
  12L: various low-severity findings in base image packages`,
            hint: "Scan the image for known security vulnerabilities",
          },
          "docker run --read-only --user 1000:1000 myapp": {
            output: `WARNING: No swap limit support
Starting application as non-root user (uid=1000, gid=1000)
Filesystem mounted as read-only
[2024-01-15T10:30:00.123Z] INFO: Server starting on port 3000
[2024-01-15T10:30:00.456Z] INFO: Running with restricted capabilities
[2024-01-15T10:30:00.789Z] INFO: Server ready and accepting connections`,
            hint: "Run a container with read-only filesystem as a non-root user",
          },
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

/** Look up a single lesson by its URL slug. */
export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

/** Alias for getLesson - used by some page components. */
export function getLessonBySlug(slug: string): Lesson | undefined {
  return getLesson(slug);
}

/** Return an array of all lesson slugs (useful for static route generation). */
export function getAllSlugs(): string[] {
  return lessons.map((lesson) => lesson.slug);
}

/** Alias for getAllSlugs - used by some page components. */
export function getAllLessonSlugs(): string[] {
  return getAllSlugs();
}

/** Return the 0-based index of a lesson within the lessons array, or -1 if not found. */
export function getLessonIndex(slug: string): number {
  return lessons.findIndex((lesson) => lesson.slug === slug);
}
