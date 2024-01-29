# Use uma imagem Node.js como base
FROM node:14

# Crie o diretório de trabalho do aplicativo
WORKDIR /app

# Copie os arquivos de configuração e de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos do aplicativo
COPY . .

# Exponha a porta que o aplicativo será executado (se aplicável)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
