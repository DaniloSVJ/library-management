Para rodar o projeto siga os seguinte passos abaixo:

PARTE 1

1-Abra o terminal na pasta onde está o projeto e digite o comando abaixo para carregar todas as libs:
$ npm install

2-Instale o docker seguindo os passos no site abaixo:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt

3-Instale o docker-compose seguindo os passos no site abaixo:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt


4-Depois de instalar o docker e o docker-compose rodo o comando abaixo no terminal no diretorio do projeto:

$ docker-compose up

5-Agora com o componente do banco chegou a hora de rodar as migrations para criar a tabelas do banco. Use o comando abaixo:
$ prisma migrate dev

6-Pronto agora você pode roda o projeto com o camando abaixo:
$ npm run dev

7-Com o projeto funcionando abra o navegado web o endereço abaixo, que vai ter toda api documentada:

http://localhost:3000/api

8- Você pode testar o projeto tanto no swagger pela api abaixo como pelo postman ou insomnia


No swagger está tudo documentado e descrito o que faz cada rota.

Caso tenha problemas para executar a api fale comigo pelo whatsapp: 85986070928. Também tem telegram. Ou responda por email
