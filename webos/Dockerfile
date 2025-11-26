FROM node:20-bullseye

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    unzip \
    wget \
    openjdk-11-jre \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install webOS CLI
RUN npm install -g @webos-tools/cli

WORKDIR /app

CMD ["bash"]
