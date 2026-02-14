// lib/terminal-commands.ts - Global terminal command definitions
//
// These commands are available on every page regardless of which lesson
// the user is viewing. Lesson-specific commands are defined in each
// lesson step's `terminalCommands` field in lib/lessons.ts.
//
// The goal is to make the terminal feel realistic: users can type any
// common Docker (or shell) command from lesson 1 onwards and receive
// plausible output, even if the command isn't required by the current
// lesson step.

export const globalCommands: Record<string, { output: string; hint?: string }> =
  {
    // ── Help & Clear ───────────────────────────────────────────────────
    help: {
      output: `Available global commands:
  help                  Show this help message
  clear                 Clear the terminal screen
  docker                Show Docker usage information
  docker --version      Show the installed Docker version
  docker version        Show detailed client/server version info
  docker info           Display system-wide information
  docker help           Show Docker help
  docker ps             List running containers
  docker ps -a          List all containers (including stopped)
  docker images         List downloaded images
  docker pull <image>   Download an image from Docker Hub
  docker run <image>    Create and start a container
  docker stop <name>    Stop a running container
  docker rm <name>      Remove a container
  docker logs <name>    View container logs
  docker inspect <name> Show detailed container info
  docker network ls     List networks
  docker volume ls      List volumes
  docker system df      Show Docker disk usage
  docker stats          Show live resource usage
  whoami / pwd / ls     Basic shell commands

Tip: Each lesson unlocks additional lesson-specific commands.
Type a command and press Enter to run it.`,
      hint: "Show a list of available commands",
    },

    clear: {
      output: "Screen cleared",
      hint: "Clear the terminal screen",
    },

    // ── Core Docker commands ───────────────────────────────────────────
    docker: {
      output: `Usage:  docker [OPTIONS] COMMAND [ARG...]
       docker [ --help | -v | --version ]

A self-sufficient runtime for containers.

Options:
      --config string      Location of client config files (default "/root/.docker")
  -c, --context string     Name of the context to use
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket to connect to
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  compose     Docker Compose
  container   Manage containers
  image       Manage images
  network     Manage networks
  system      Manage Docker
  volume      Manage volumes

Commands:
  build       Build an image from a Dockerfile
  exec        Execute a command in a running container
  images      List images
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  logs        Fetch the logs of a container
  ps          List containers
  pull        Download an image from a registry
  push        Upload an image to a registry
  rm          Remove one or more containers
  run         Create and run a new container from an image
  stop        Stop one or more running containers
  top         Display the running processes of a container
  version     Show the Docker version information

Run 'docker COMMAND --help' for more information on a command.`,
      hint: "Show Docker CLI usage information",
    },

    "docker --version": {
      output: "Docker version 24.0.7, build afdd53b",
      hint: "Show the installed Docker version",
    },

    "docker version": {
      output: `Client:
 Version:           24.0.7
 API version:       1.43
 Go version:        go1.20.10
 Git commit:        afdd53b
 Built:             Thu Oct 26 09:08:17 2023
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Engine - Community
 Engine:
  Version:          24.0.7
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.10
  Git commit:       311b9ff
  Built:            Thu Oct 26 09:08:17 2023
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.24
  GitCommit:        61f9fd88f79f081d64d6fa3bb1a0dc71ec870523
 runc:
  Version:          1.1.9
  GitCommit:        v1.1.9-0-gccaecfc
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0`,
      hint: "Show detailed Docker client and server version information",
    },

    "docker info": {
      output: `Client: Docker Engine - Community
 Version:    24.0.7
 Context:    default
 Debug Mode: false

Server:
 Containers: 6
  Running: 3
  Paused: 0
  Stopped: 3
 Images: 12
 Server Version: 24.0.7
 Storage Driver: overlay2
  Backing Filesystem: extfs
 Logging Driver: json-file
 Cgroup Driver: systemd
 Kernel Version: 5.15.0-91-generic
 Operating System: Ubuntu 22.04.3 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 4
 Total Memory: 7.764GiB
 Docker Root Dir: /var/lib/docker`,
      hint: "Display system-wide Docker information including containers, images, and server details",
    },

    "docker help": {
      output: `Usage:  docker [OPTIONS] COMMAND [ARG...]
       docker [ --help | -v | --version ]

A self-sufficient runtime for containers.

Common Commands:
  run         Create and run a new container from an image
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
  info        Display system-wide information

Run 'docker COMMAND --help' for more information on a command.

For more help on how to use Docker, head to https://docs.docker.com/go/guides/`,
      hint: "Show Docker help with common commands",
    },

    // ── Container listing ──────────────────────────────────────────────
    "docker ps": {
      output: `CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                  NAMES
a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.…"   2 hours ago      Up 2 hours      0.0.0.0:8080->80/tcp   webserver
b2c3d4e5f6a7   node:18        "docker-entrypoint.s…"   45 minutes ago   Up 45 minutes   0.0.0.0:3000->3000/tcp myapp
c3d4e5f6a7b8   redis:7        "docker-entrypoint.s…"   3 hours ago      Up 3 hours      6379/tcp               cache`,
      hint: "List all currently running containers",
    },

    "docker ps -a": {
      output: `CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS                     PORTS                  NAMES
a1b2c3d4e5f6   nginx:latest     "/docker-entrypoint.…"   2 hours ago      Up 2 hours                 0.0.0.0:8080->80/tcp   webserver
b2c3d4e5f6a7   node:18          "docker-entrypoint.s…"   45 minutes ago   Up 45 minutes              0.0.0.0:3000->3000/tcp myapp
c3d4e5f6a7b8   redis:7          "docker-entrypoint.s…"   3 hours ago      Up 3 hours                 6379/tcp               cache
d4e5f6a7b8c9   postgres:15      "docker-entrypoint.s…"   5 hours ago      Exited (0) 3 hours ago                            mydb
e5f6a7b8c9d0   hello-world      "/hello"                 2 days ago       Exited (0) 2 days ago                             eager_morse
f6a7b8c9d0e1   alpine:latest    "/bin/sh"                3 days ago       Exited (0) 3 days ago                             peaceful_pike`,
      hint: "List all containers, including stopped ones",
    },

    // ── Images ─────────────────────────────────────────────────────────
    "docker images": {
      output: `REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
node         18        a]b2c3d4e5f6   2 weeks ago    1.1GB
nginx        latest    c3d4e5f6a7b8   3 weeks ago    187MB
python       3.11      d4e5f6a7b8c9   3 weeks ago    1.01GB
alpine       latest    e5f6a7b8c9d0   4 weeks ago    7.38MB
postgres     15        f6a7b8c9d0e1   5 weeks ago    412MB
redis        7         a7b8c9d0e1f2   5 weeks ago    138MB`,
      hint: "List all locally downloaded Docker images",
    },

    // ── Pull ───────────────────────────────────────────────────────────
    "docker pull nginx": {
      output: `Using default tag: latest
latest: Pulling from library/nginx
a2abf6c4d29d: Pull complete
a9edb18cadd1: Pull complete
589b7251471a: Pull complete
186b1aaa4aa6: Pull complete
b4df32aa5a72: Pull complete
a0bcbecc962e: Pull complete
Digest: sha256:0d17b565c37bcbd895e9d92315a05c1c3c9a29f762b011a10c54a66cd53c9b31
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest`,
      hint: "Download the nginx image from Docker Hub",
    },

    "docker pull alpine": {
      output: `Using default tag: latest
latest: Pulling from library/alpine
4abcf2066143: Pull complete
Digest: sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b
Status: Downloaded newer image for alpine:latest
docker.io/library/alpine:latest`,
      hint: "Download the lightweight Alpine Linux image from Docker Hub",
    },

    // ── Run ────────────────────────────────────────────────────────────
    "docker run hello-world": {
      output: `Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:d000bc569937abbe195e20322a0bde6b2922d805332fd6d8a68b19f524b7d21d
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/`,
      hint: "Run the hello-world test container to verify Docker is working",
    },

    "docker run -it alpine sh": {
      output: `/ # (You are now inside an Alpine container. Type 'exit' to leave.)
/ # This is a simulated shell - in a real Docker environment,
/ # you would have full shell access inside the container.`,
      hint: "Start an interactive shell inside a new Alpine container",
    },

    // ── Container management ───────────────────────────────────────────
    "docker stop myapp": {
      output: "myapp",
      hint: "Stop the running container named 'myapp'",
    },

    "docker rm myapp": {
      output: "myapp",
      hint: "Remove the stopped container named 'myapp'",
    },

    "docker logs myapp": {
      output: `> myapp@1.0.0 start
> node server.js

Server running on port 3000
[2024-01-15T10:23:41.002Z] GET / 200 12ms
[2024-01-15T10:23:41.150Z] GET /favicon.ico 404 2ms
[2024-01-15T10:24:03.891Z] GET /api/users 200 45ms
[2024-01-15T10:24:05.223Z] POST /api/users 201 38ms
[2024-01-15T10:25:17.445Z] GET /api/users/1 200 8ms
[2024-01-15T10:26:02.109Z] GET /health 200 1ms
[2024-01-15T10:28:55.667Z] GET / 200 5ms
[2024-01-15T10:30:00.001Z] INFO: Health check passed`,
      hint: "View the stdout/stderr logs from the 'myapp' container",
    },

    "docker exec myapp ls": {
      output: `Dockerfile
node_modules
package-lock.json
package.json
server.js
src
tests`,
      hint: "Run 'ls' inside the running 'myapp' container",
    },

    "docker exec -it myapp sh": {
      output: `/app # (You are now inside the 'myapp' container.)
/app # This is a simulated shell - in a real Docker environment,
/app # you would have full shell access inside the container.`,
      hint: "Open an interactive shell inside the running 'myapp' container",
    },

    "docker inspect myapp": {
      output: `[
    {
        "Id": "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
        "Created": "2024-01-15T10:22:30.123456789Z",
        "Path": "docker-entrypoint.sh",
        "Args": ["node", "server.js"],
        "State": {
            "Status": "running",
            "Running": true,
            "Pid": 12345,
            "StartedAt": "2024-01-15T10:22:31.987654321Z"
        },
        "Image": "sha256:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        "Name": "/myapp",
        "NetworkSettings": {
            "Ports": {
                "3000/tcp": [{ "HostIp": "0.0.0.0", "HostPort": "3000" }]
            },
            "IPAddress": "172.17.0.3"
        }
    }
]
... (output truncated)`,
      hint: "Show detailed low-level information about the 'myapp' container in JSON format",
    },

    // ── Network & Volume ───────────────────────────────────────────────
    "docker network ls": {
      output: `NETWORK ID     NAME              DRIVER    SCOPE
a1b2c3d4e5f6   bridge            bridge    local
b2c3d4e5f6a7   host              host      local
c3d4e5f6a7b8   none              null      local
d4e5f6a7b8c9   myapp_default     bridge    local
e5f6a7b8c9d0   frontend_network  bridge    local`,
      hint: "List all Docker networks",
    },

    "docker volume ls": {
      output: `DRIVER    VOLUME NAME
local     myapp_data
local     postgres_data
local     redis_data
local     a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2`,
      hint: "List all Docker volumes",
    },

    // ── System ─────────────────────────────────────────────────────────
    "docker system df": {
      output: `TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          6         4         2.856GB   1.01GB (35%)
Containers      6         3         125.4MB   62.7MB (49%)
Local Volumes   4         3         256.8MB   12.3MB (4%)
Build Cache     12        0         345.6MB   345.6MB (100%)`,
      hint: "Show how much disk space Docker is using",
    },

    "docker top myapp": {
      output: `UID        PID      PPID     C    STIME   TTY   TIME       CMD
root       12345    12300    0    10:22   ?     00:00:03   node server.js
root       12389    12345    0    10:22   ?     00:00:00   /bin/sh -c node healthcheck.js`,
      hint: "Display the running processes inside the 'myapp' container",
    },

    "docker stats --no-stream": {
      output: `CONTAINER ID   NAME        CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O        PIDS
a1b2c3d4e5f6   webserver   0.02%     12.45MiB / 7.764GiB   0.16%     1.23MB / 890kB    0B / 4.1kB       3
b2c3d4e5f6a7   myapp       0.15%     85.32MiB / 7.764GiB   1.07%     5.67MB / 2.34MB   8.19kB / 0B      23
c3d4e5f6a7b8   cache       0.08%     8.91MiB / 7.764GiB    0.11%     234kB / 123kB     0B / 41kB        5`,
      hint: "Show CPU, memory, and network usage for all running containers (single snapshot)",
    },

    // ── Compose ────────────────────────────────────────────────────────
    "docker compose version": {
      output: "Docker Compose version v2.21.0",
      hint: "Show the installed Docker Compose version",
    },

    // ── Shell commands ─────────────────────────────────────────────────
    whoami: {
      output: "root",
      hint: "Print the current user name",
    },

    pwd: {
      output: "/",
      hint: "Print the current working directory",
    },

    ls: {
      output:
        "bin  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var",
      hint: "List files in the current directory",
    },

    "echo hello": {
      output: "hello",
      hint: "Print a message to the terminal",
    },

    "uname -a": {
      output:
        "Linux docker-desktop 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux",
      hint: "Show system kernel and OS information",
    },
  };
