window.onload = function () {
    'use strict';

    var formValidator = (function () {

        var existingEmails = [
            "test@test.com", "user@qwerty.com", "testuser@test.com", "haiaoah@gmail.com",
            "asksoi@hotmail.com", "ajioanioa@mail.ru"
        ];

        var passwordInput, emailInput, passwordErrorBlock, emailErrorBlock, strengthMeter;

        return {

            checkPassword: function () {
                passwordInput = document.getElementById("password");
                passwordErrorBlock = document.getElementById("password-error");
                strengthMeter = document.getElementById("strength-meter");
                var passwordLength = passwordInput.value.length;
                switch(passwordLength){
                    case 0:
                        passwordErrorBlock.style.display = "block";
                        passwordErrorBlock.style.cssColor = "red";
                        strengthMeter.style.backgroundColor = "red";
                        return;
                    case 1:
                        strengthMeter.style.display = "block";
                        passwordErrorBlock.innerHTML = "Your password is too weak";
                        passwordErrorBlock.style.marginTop = 0.4 + "%";
                        passwordErrorBlock.style.cssColor = "red";
                        strengthMeter.style.backgroundColor = "red";
                        break;
                    case 2:
                        strengthMeter.style.display = "block";
                        if(passwordInput.value.match(/(?=.*[a-z])/i)){
                            passwordErrorBlock.innerHTML = "Your password now a bit better, try more complex password";
                            passwordErrorBlock.style.marginTop = 0.4 + "%";
                            passwordErrorBlock.style.cssColor = "red";
                            strengthMeter.style.backgroundColor = "red";
                        }
                        break;
                    case 4:
                        strengthMeter.style.display = "block";
                        if(passwordInput.value.match(/[^\w\s]/gi)){
                            strengthMeter.style.backgroundColor = "#b8860b";
                            passwordErrorBlock.innerHTML = "Your password is strong, but it must be at least 12 characters";
                            passwordErrorBlock.style.marginTop = 0.4 + "%";
                            passwordErrorBlock.style.cssColor = "red";
                            strengthMeter.style.backgroundColor = "red";
                        }
                        break;
                    case 8:
                        strengthMeter.style.display = "block";
                        if(passwordInput.value.match(/[^\w\s]/gi)){
                            strengthMeter.style.backgroundColor = "#b8860b";
                            passwordErrorBlock.innerHTML = "Your password is strong, but it must be at least 12 characters";
                            passwordErrorBlock.style.marginTop = 0.4 + "%";
                            passwordErrorBlock.style.cssColor = "red";
                            strengthMeter.style.backgroundColor = "red";
                        }
                        break;
                    case 12:
                        strengthMeter.style.display = "block";
                        if(passwordInput.value.match(/^(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)){
                            strengthMeter.style.backgroundColor = "#008000";
                            strengthMeter.style.width = passwordInput.style.width;
                            passwordErrorBlock.innerHTML = "Your password is bulletproof";
                            passwordErrorBlock.style.marginTop = 0.4 + "%";
                            passwordErrorBlock.style.cssColor = "#008000";
                        }
                        break;
                }
            },

            replaceWrongLiterals: function () {
                passwordInput = document.getElementById("password");
                passwordInput.value = passwordInput.value.replace(/[а-яА-Я]/g, "");

                return passwordInput;
            },

            checkEmail: function(){
                emailInput = document.getElementById("email");
                emailErrorBlock = document.getElementById("email-error");
                if(emailInput.value.length > 0
                    && !emailInput.value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)){
                    emailErrorBlock.innerHTML = "Your email doesn't valid";
                    emailErrorBlock.style.cssColor = "red";
                }
                if(emailInput.value.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)){
                    emailErrorBlock.innerHTML = "Your email valid";
                    emailErrorBlock.style.cssColor = "green";
                }

                for(var i = 0; i < existingEmails.length; i++){
                    if(existingEmails[i] === emailInput.value){
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
            passwordField.addEventListener('keyup', formValidator.checkPassword, false);
            passwordField.addEventListener('keyup', formValidator.replaceWrongLiterals, false);
        } else {
            passwordField.onkeyup = function () {
                formValidator.checkPassword();
                formValidator.replaceWrongLiterals();
            }
        }
    };

    passwordInputListener();

    var emailInputListener = function(){
        var emailField = document.getElementById("email");
        if(emailField.addEventListener){
            emailField.addEventListener('keyup', formValidator.checkEmail, false);
        } else {
            emailField.onkeyup = function(){
                formValidator.checkEmail();
            }
        }
    };

    emailInputListener();
};