Antes de tudo saiba que esse projeto está com o swagger. Logo toda api está documentada

Na hora que for testar cadastro de usuario vc terá que cadastrar dois tipos de usuarios. Um usuário admin com a role=2 e o usuário comum com role=1

Fiz dessa forma pensando que um usuario comum não pode desativar outros usuarios. E também não pode desativar os livros da tabela book. Então cadastrei essa regra de negócio

===================================

Para rodar o projeto siga os seguinte passos abaixo:


1-Abra o terminal na pasta onde está o projeto e digite o comando abaixo para carregar todas as libs:
$ npm install

Observação: O '$" não é para ser copiado ou colocado no comando e nos outros comando deste manual. Colequei ele só para exemplificar terminal linux.

2-Instale o docker seguindo os passos no site abaixo:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt

3-Instale o docker-compose seguindo os passos no site abaixo:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt


4-Depois de instalar o docker e o docker-compose rodo o comando abaixo no terminal no diretorio do projeto:

$ docker-compose up

5-Agora rode o component usando o comando abaixo:
$ docker-compose start

6-Agora com o componente do banco chegou a hora de rodar as migrations para criar a tabelas do banco. Use o comando abaixo:
$ prisma migrate dev

7-Pronto agora você pode roda o projeto com o camando abaixo:
$ npm run dev

8-Com o projeto funcionando abra o navegado web o endereço abaixo, que vai ter toda api documentada:

http://localhost:3000/api

No swagger está tudo documentado e descrito o que faz cada rota.

9- Você pode testar o projeto tanto no swagger pela api abaixo como pelo postman ou insomnia

10- Para executar os teste digite no terminal o comando abaixo:
$ npm run test

Só criei dois test por que iria levar muito tempo para criar todos os testes

No swagger está tudo documentado e descrito o que faz cada rota.

Caso tenha problemas para executar a api fale comigo pelo whatsapp: 85986070928. Também tem telegram. Ou responda por email
