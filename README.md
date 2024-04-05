## Lista de tarefas

Este é um projeto simples, onde consiste em criar uma conta, realizar um login, adicionar e excluir tarefas. no front-end eu utilizei React.js e no back-end eu utilizei Node.js, para banco de dados eu optei por usar
Postgresql fornecido pela Neon.tech.
O projeto em si foi bem simples na parte de login, registro e recuperação de senha, pois no projeto "Haikyuu" eu fiz coisas parecidas e pude reaproveitar muito conhecimento já obtido. Tive mesmo um pouco de dificuldade na parte de
adicionar e remover tasks, mas isso não chega nem perto da maior dificuldade que tive com esse projeto.
A minha maior dificuldade foi no deploy, o meu banco de dados consiste em duas tabelas relacionadas, uma de usuários e outra de tarefas que é relacionada a cada usuário especifico. Ao realizar o login 
o token é armazenado num cookie para posteriormente ser utilizado para enviar em requisições de adicionar ou remover tarefas, consequentemente no back-end podendo obter o id através do token, porém o meu problema foi que o cookie não estava
sendo enviado corretamente na requisição, então tive que optar por enviar ele no corpo de cada uma das requisições, não quis interceptar nenhuma requisição para poder enviar o token automaticamente em cada uma delas, pois como a aplicação já estava em deploy
isso iria demandar mais tempo de estudo de algo que eu ainda não sei ao certo realizar. Utilizei a plataforma da vercel para hospedar o meu front-end e a plataforma da render para hospedar o back-end. 

OBS: Ao tentar realizar qualquer requisição na aplicação haverá uma delay de 50s aproximadamente (É o tempo para o servidor ser ligado na plataforma da Render)

![Screenshot 2024-04-04 at 14-17-19 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/67d96292-6dd3-46f7-8494-5e3831167b9c)


![Screenshot 2024-04-04 at 14-17-29 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/bb773968-9bf2-43c2-ad73-871bbb2204f5)


![Screenshot 2024-04-04 at 14-17-36 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/39da5ce7-d2ef-4a01-8139-6132b65492e3)


![Screenshot 2024-04-04 at 14-17-44 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/784bdb3d-ea9b-44bc-b58b-53737181d3ec)


![Screenshot 2024-04-05 at 02-46-51 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/3bdc26c0-2b2e-47a4-9fe9-8d81d3f89a89)


![Screenshot 2024-04-05 at 02-48-00 Lista de tarefas](https://github.com/accsj/Lista-de-Tarefas/assets/109449153/50e35366-d02a-410b-84cb-03699fd8d5bd)
