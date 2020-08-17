# rockeseat-nodejs-goBarber
back end em node js

# Funcionalidades

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve poder recuperar um e-mail com instruções de recuperação;de senha;
- o usuário deve poder resetar sua senha;
 
**RNF**

- Utilizar Mailtrap para testar em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- o envio de e-mails deve acontecer em segundo plano (background job);


**RN**

- link enviado para por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**
- O Usuário deve poder atualizar o seu perfil
 
**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a sua senha, o usuario deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

**RF**
- O usuario deve poder listar seus agendamentos de um dia expecifico
- o prestador deve receber uma notificação sempre que hover um novo agendamento;
- o prestador deve poder visualizar as notificações não lidas;

**RNF**
 - Os agendamentos de prestador no dia deven ser arnazenadas em cache;
 - As notificações do prestador devem ser armazenadas no MongoDB;
 - As notificações do prstador devem ser envidas em tempo-real utlizando Socket.io;

**RN**
- A noficação deve ter um status de não-lida para que o prestador possa controlar;

# Agendamento de Servico

**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar todos os dias de um mês com pelo menos um horário disponivel em um dia especifico de um prestador;
- o usuario 

**RNF**
 - A listagem de prestadores deve ser armazenada em cache;

**RN**
- cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h ás 18h(Primeiro ás 8h, ultimo ás 17h);
- o usuario não pode agendar em um horario já ocupado;
- o usuario não pode agendar em um horario já passou;
- o usuario não pode agendar serviços consigo mesmo;