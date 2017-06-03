/**
 * Created by veronika on 29.04.17.
 */
var pass = document.getElementById('pass'),
    bar = document.getElementById('bar'),
    mesPass = document.getElementById('mesPass'),

    email = document.getElementById('email'),
    mesEmail = document.getElementById('mesEmail'),

    secondPass = document.getElementById('secondPass'),
    mesSecondPass = document.getElementById('mesSecondPass'),

    firstName = document.getElementById('firstName'),
    mesFirstName = document.getElementById('mesFirstName'),

    lastName = document.getElementById('lastName'),
    mesLastName = document.getElementById('mesLastName');

passChecker.config('minLength', 6)
    .config('maxLength', 16)
    .config({
            'diffCase'      : true,
            minLengthError  : 'Пароль слишком короткий',
            maxLengthError  : 'Пароль слишком длинный',
            alphaDigitError : 'Пароль должен содержать хотя бы одну цифру и одну букву',
            diffCaseError   : 'Пароль должен содержать как строчные так и заглавные буквы'
    });

easyValidate.config({
    emailError              :'Некорректный email',
    numError                :'Введите число',
    comparePasswordsError   :'Пароли не совпадают',
    stringError             : 'Поле не должно содержать цифры'
});

function addError(result, message, text) {

    if (!!result.error) {
        message.classList.add('error');
        message.innerText = result.message;
    } else {
        message.classList.remove('error');
        message.innerText = text;
    }

}

pass.addEventListener('keyup', function () {
    var result = passChecker.checkPass(pass.value);
    bar.style.width = 100 - result.rating * 100 + '%';

    addError(result, mesPass, 'Пароль корректен');

});

email.addEventListener('keyup', function () {
    var result = easyValidate.checkEmail(email.value);

    addError(result, mesEmail, 'Email корректен');

});

secondPass.addEventListener('keyup', function () {
    var result = easyValidate.comparePasswords(pass.value, secondPass.value);

    addError(result, mesSecondPass, 'Пароли совпадают');

});

firstName.addEventListener('keyup', function () {
    var result = easyValidate.checkStringOnNumbers(firstName.value);

    addError(result, mesFirstName, '');

});

lastName.addEventListener('keyup', function () {
    var result = easyValidate.checkStringOnNumbers(lastName.value);

    addError(result, mesLastName, '');

});

var registerForm = document.getElementById('register-form');
registerForm.onsubmit = function() {
    alert('s');
}