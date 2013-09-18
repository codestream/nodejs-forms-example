window.onload = function () {

    'use strict';
    var existingEmails = [
        "test@test.com", "user@qwerty.com", "testuser@test.com", "haiaoah@gmail.com",
        "asksoi@hotmail.com", "ajioanioa@mail.ru"
    ];

    var formValidator = (function () {

        var emailInput, passwordErrorBlock, emailErrorBlock, strengthMeter;

        return {

            checkPassword: function () {
                var passwordValue = document.getElementById("password").value;
                passwordErrorBlock = document.getElementById("password-error");
                strengthMeter = document.getElementById("strength-meter");
                strengthMeter.style.display = "none";
                if (passwordValue.length === 0) {
                    passwordErrorBlock.style.display = "block";
                    passwordErrorBlock.style.cssColor = "black";
                    strengthMeter.style.display = "block";
                    strengthMeter.style.backgroundColor = "silver";
                    passwordErrorBlock.innerHTML = "Enter your password at least 12 characters";
                } else if (passwordValue.length > 0 && passwordValue.length <= 4) {
                    passwordErrorBlock.style.display = "block";
                    passwordErrorBlock.style.cssColor = "black";
                    strengthMeter.style.display = "block";
                    strengthMeter.style.backgroundColor = "silver";
                    passwordErrorBlock.innerHTML = "Your password is too weak";
                } else if (passwordValue.length > 4 && passwordValue.length <= 8) {
                    passwordErrorBlock.style.display = "block";
                    passwordErrorBlock.style.cssColor = "black";
                    strengthMeter.style.display = "block";
                    strengthMeter.style.backgroundColor = "orange";
                    passwordErrorBlock.innerHTML = "Your password now is bit stronger";
                } else if (passwordValue.length > 8 && passwordValue.length < 12) {
                    passwordErrorBlock.style.display = "block";
                    passwordErrorBlock.style.cssColor = "black";
                    strengthMeter.style.display = "block";
                    strengthMeter.style.backgroundColor = "orange";
                    passwordErrorBlock.innerHTML = "Your password now is almost bulletproof, try again";
                } else {
                    passwordErrorBlock.style.display = "block";
                    passwordErrorBlock.style.cssColor = "black";
                    strengthMeter.style.display = "block";
                    strengthMeter.style.backgroundColor = "green";
                    passwordErrorBlock.innerHTML = "Your password now is bulletproof";
                }
            },

            checkEmail: function () {
                emailInput = document.getElementById("email");
                emailErrorBlock = document.getElementById("email-error");
                if (emailInput.value.length > 0
                    && !emailInput.value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
                    emailErrorBlock.innerHTML = "Your email is not valid";
                    emailErrorBlock.style.cssColor = "red";
                }
                if (emailInput.value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
                    emailErrorBlock.innerHTML = "Your email valid";
                    emailErrorBlock.style.cssColor = "green";
                }

                for (var i = 0; i < existingEmails.length; i++) {
                    if (existingEmails[i] === emailInput.value) {
                        emailErrorBlock.innerHTML = "This e-mail has been already in use";
                        emailErrorBlock.style.cssColor = "red";
                    }
                }
            }
        };
    }());

    var passwordInputListener = function () {
        var passwordField = document.getElementById("password");
        if (passwordField.addEventListener) {
            passwordField.addEventListener('keydown', formValidator.checkPassword, false);
        } else {
            passwordField.onkeydown = function () {
                formValidator.checkPassword();
            }
        }
    };

    passwordInputListener();

    var emailInputListener = function () {
        var emailField = document.getElementById("email");
        if (emailField.addEventListener) {
            emailField.addEventListener('keydown', formValidator.checkEmail, false);
        } else {
            emailField.onkeyup = function () {
                formValidator.checkEmail();
            }
        }
    };

    emailInputListener();

    var onsubmitListener = function () {
        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");
        for (var i = 0; i < existingEmails.length; i++) {
            if (existingEmails[i] === emailInput.value || passwordInput.value.length === 0) {
                return false;
            } else if(existingEmails[i] !== emailInput.value && passwordInput.value.length >= 12){
                var f = document.forms['submit-form'];
                HTMLFormElement.prototype.submit.call(f);
            }
        }
    };

    var submitForm = function(){
        var submitButton = document.getElementById("submit");
        if(submitButton.addEventListener){
            submitButton.addEventListener('click', onsubmitListener, false);
        } else {
            submitButton.onsubmit = function(){
                onsubmitListener();
            }
        }
    };

    submitForm();
};