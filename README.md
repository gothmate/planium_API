### API Planium

Para iniciar o servidor, depois de baixar as dependência "npm i -y", digite "npm start".

o servidor local vai abrir no localhost:8000.

As seguintes rotas GET foram configuradas:

/prices

/plans

/beneficiarios

A rota POST (/add_ben) recebe a seguinte estrutura baseada em informações das rotas /prices e /plans:

{

"associados": [

​ { "nome": "Mary", "idade": "50", "preco": 40 }

​ ],

"codigoReg": 2,

"valorTotal": 40

}
