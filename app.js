document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const studentCode = document.getElementById('student-code').value;
  const password = document.getElementById('password').value;

  fetch(`http://localhost:3000/student?code=${studentCode}&password=${password}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#students-table tbody');
      tableBody.innerHTML = ''; // تنظيف الجدول
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.code}</td>
        <td>${data.name}</td>
        <td>${data.grade}</td>
      `;
      tableBody.appendChild(row);
      document.getElementById('students-table').style.display = 'table';
    })
    .catch(err => alert(err.message));
});
