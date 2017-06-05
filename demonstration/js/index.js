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
            minLengthError  : 'Пароль занадто короткий',
            maxLengthError  : 'Пароль занадто довгий',
            alphaDigitError : 'Пароль повинен містити хоча б одну цифру і одну букву',
            diffCaseError   : 'Пароль повинен містити як рядкові так і великі літери'
    });

easyValidate.config({
    emailError              :'Некоректний email',
    numError                :'Введіть число',
    comparePasswordsError   :'Паролі не співпадають',
    stringError             :'Поле не повинно містити цифри'
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

    addError(result, mesPass, 'Пароль коректний');

});

email.addEventListener('keyup', function () {
    var result = easyValidate.checkEmail(email.value);

    addError(result, mesEmail, 'Email коректний');

});

secondPass.addEventListener('keyup', function () {
    var result = easyValidate.comparePasswords(pass.value, secondPass.value);

    addError(result, mesSecondPass, 'Паролі співпадають');

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