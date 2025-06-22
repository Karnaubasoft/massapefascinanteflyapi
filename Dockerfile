FROM node:22.1.0-slim

WORKDIR /app

# Instala dependências do sistema
RUN apt-get update -y && apt-get install -y openssl libssl-dev

# Instala pnpm
RUN npm install -g pnpm

# Copia apenas arquivos de dependência primeiro para aproveitar cache
COPY package.json pnpm-lock.yaml* ./

# Instala dependências
RUN pnpm install

# Copia todo o restante do projeto (depois das dependências)
COPY . .

# Gera o Prisma Client
RUN pnpm exec prisma generate

# Expõe a porta da API
EXPOSE 3333

# Roda o projeto
CMD ["pnpm", "run", "dev"]
