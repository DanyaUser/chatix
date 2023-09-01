console.log('Script connected')

document.addEventListener('DOMContentLoaded', function (){
    const form = document.getElementById('formID');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username); // Сохраняем имя в локальном хранилище
        window.location.href = 'chat.html'; // Перенаправляем на страницу чата
    });
});