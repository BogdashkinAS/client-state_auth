const signinActive = document.getElementById('signin')
const welcome = document.getElementById('welcome')
const form = document.getElementById('signin__form')
const login = document.querySelector('input[name="login"]')
const password = document.querySelector('input[name="password"]')
const user = document.getElementById('user_id')

// localStorage.clear() // для проверки локального хранилища

signinActive.classList.add('signin_active')

if(localStorage.getItem('id') != null) {
    welcomeUser(localStorage.getItem('id'));
}

function welcomeUser(id) {
    signinActive.classList.remove('signin_active')
    user.textContent = id
    welcome.classList.add('welcome_active')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    let formData = new FormData(form)
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth')
    xhr.send(formData)
    xhr.addEventListener('load', () => {
        if(xhr.response.success) {
            localStorage.setItem('id', xhr.response.user_id)
            welcomeUser(localStorage.getItem('id'))
        } else {
            alert('Неверный логин/пароль')
        }
        form.reset()
    })
})