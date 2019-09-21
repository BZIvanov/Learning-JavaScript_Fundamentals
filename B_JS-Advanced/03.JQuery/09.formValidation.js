function validate() {
    let username = $('#username');
    let email = $('#email');
    let password = $('#password');
    let confirmPassword = $('#confirm-password');
    let companyCheckbox = $('#company');
    let companyInfo = $('#companyInfo');
    let companyNumber = $('#companyNumber');
    let submitBtn = $('#submit');
    let validationDiv = $('#valid');
    let allAreValid = true;

    companyCheckbox.on('change', function() {
        if (companyCheckbox.is(':checked')) {
            companyInfo.css('display', 'block');
        } else {
            companyInfo.css('display', 'none');
        }
    })

    submitBtn.on('click', function(event) {
        // submit reloads the browser page and we will prevent that
        event.preventDefault();
        validateForm();
        validationDiv.css('display', allAreValid ? 'block' : 'none');
        allAreValid = true;
    })

    function validateForm() {
        validateInputWithRegex(username, /^[A-Za-z\d]{3,20}$/g);
        validateInputWithRegex(email, /^.*?@.*?\..*$/g);
        if (password.val() === confirmPassword.val()) {
            validateInputWithRegex(password, /^\w{5,15}$/g);
            validateInputWithRegex(confirmPassword, /^\w{5,15}$/g);
        } else {
            password.css('border', 'solid red');
            confirmPassword.css('border', 'solid red');
            allAreValid = false;
        }

        if (companyCheckbox.is(':checked')) {
            validateCompanyInfo();
        }
    }

    function validateInputWithRegex(input, pattern) {
        if (pattern.test(input.val())) {
            input.css('border', 'none');
        } else {
            input.css('border', 'solid red');
            allAreValid = false;
        }
    }

    function validateCompanyInfo() {
        let numValue = Number(companyNumber.val());
        if (numValue >= 1000 && numValue <= 9999) {
            companyNumber.css('border', 'none');
        } else {
            companyNumber.css('border', 'solid red');
            allAreValid = false;
        }
    }
}
