<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Gerenciamento de Usuários</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <h1>Gerenciamento de Usuários</h1>

  <div class="card">
    <form id="userForm">
      <input type="hidden" id="id">

      <input type="text" id="nome" placeholder="Nome" required>
      <input type="email" id="email" placeholder="E-mail" required>
      <input type="text" id="telefone" placeholder="Telefone" required>

      <button type="submit">Salvar usuário</button>
    </form>
  </div>

  <div class="card">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="userTable"></tbody>
    </table>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>
