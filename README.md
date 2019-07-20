# star-wars
Projeto em nodejs
<br>
Build Setup
# Instale o docker
sudo apt install docker.io

# Instale o docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Na raiz do projeto, execute comando de build do docker para criar a imagem 
docker build -t star-wars .

# Execute o comando docker-compose up para construir a aplicação
docker-compose up

# Para executar os testes unitários criados
docker-compose -f docker-compose.test.yml up

# API's disponíveis
<br>
<b>/planet</b> - lista todos os planetas
<br>
<b>/planet?name=SomePlanet</b> - busca um planeta pelo nome
<br>
<b>/planet/id/:id</b> - busca um planeta pelo ID
<br>
<b>/planet/delete/:id</b> - exclui um planeta