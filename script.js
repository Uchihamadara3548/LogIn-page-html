document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the contact icon
    document.getElementById('contacts').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contacts').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'none';
        document.getElementById('cross1').style.display = 'block';
        document.getElementById('contact-container').style.display = 'block';
    });

    // Event listener for the cross1 icon
    document.getElementById('cross1').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('cross1').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'block';
        document.getElementById('contacts').style.display = 'block';
        document.getElementById('contact-container').style.display = 'none';
    });

    // Event listeners for toggling password visibility in login form
    document.getElementById('eye').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye').style.display = 'none';
        document.getElementById('eye-slash').style.display = 'block';
        togglePasswordVisibility('password');
    });

    document.getElementById('eye-slash').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash').style.display = 'none';
        document.getElementById('eye').style.display = 'block';
        togglePasswordVisibility('password');
    });

    // Event listeners for toggling password visibility in registration form
    document.getElementById('eye1').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye1').style.display = 'none';
        document.getElementById('eye-slash1').style.display = 'block';
        togglePasswordVisibility('register_password');
    });

    document.getElementById('eye-slash1').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash1').style.display = 'none';
        document.getElementById('eye1').style.display = 'block';
        togglePasswordVisibility('register_password');
    });

    document.getElementById('eye2').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye2').style.display = 'none';
        document.getElementById('eye-slash2').style.display = 'block';
        togglePasswordVisibility('confirm_password');
    });

    document.getElementById('eye-slash2').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash2').style.display = 'none';
        document.getElementById('eye2').style.display = 'block';
        togglePasswordVisibility('confirm_password');
    });

    // Function to toggle password visibility
    function togglePasswordVisibility(elementId) {
        const passwordField = document.getElementById(elementId);
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    }

    // Event listener for switching to the registration form
    document.getElementById('show-register').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'block';
    });

    // Event listener for switching to the login form
    document.getElementById('show-login').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('div3').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
    });

    // Event listener for the login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        performQuery('SELECT * FROM users WHERE username = ?', [username])
            .then(results => {
                if (results.length > 0 && results[0].password === password) {
                    alert('Login successful!');
                    window.location.href = 'Final_Page/final.html';  // Update with actual final page URL
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Event listener for the registration form submission
    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('register_username');
        const password = formData.get('register_password');

        insertUser(username, password)
            .then(message => {
                alert(message);
                if (message === 'Registration successful!') {
                    document.getElementById('div3').style.display = 'none';
                    document.getElementById('div2').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed.');
            });
    });
});