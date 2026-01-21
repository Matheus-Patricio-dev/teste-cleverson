const table = document.getElementById('userTable');
const form = document.getElementById('userForm');
const telefoneInput = document.getElementById('telefone')

function maskPhone(value) {
  value = value.replace(/\D/g, '');

  if (value.length > 11) value = value.slice(0, 11);

  if (value.length >= 11) {
    return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  if (value.length >= 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }

  return value;
}

function loadUsers() {
  fetch('api.php')
    .then(res => res.json())
    .then(users => {
      table.innerHTML = '';
      users.forEach(user => {
        table.innerHTML += `
          <tr>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.telefone}</td>
            <td>
              <button class="edit" onclick="editUser(${user.id})">Editar</button>
              <button class="delete" onclick="deleteUser(${user.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();


  const data = {
    id: document.getElementById('id').value,
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value
  };

  fetch('api.php', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(() => {
    form.reset();
    loadUsers();
  });
});

function editUser(id) {
  fetch('api.php?id=' + id)
    .then(res => res.json())
    .then(user => {
      document.getElementById('id').value = user.id;
      document.getElementById('nome').value = user.nome;
      document.getElementById('email').value = user.email;
      document.getElementById('telefone').value = user.telefone;
    });
}

function deleteUser(id) {
  if (!confirm('Deseja excluir este usuário?')) return;

  fetch('api.php', {
    method: 'DELETE',
    body: JSON.stringify({ id })
  }).then(loadUsers);
}

loadUsers();
