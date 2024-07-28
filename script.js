document.addEventListener('DOMContentLoaded', () => {
    // Load the database when the DOM content is fully loaded
    loadDatabase();

    // Handle the registration form submission
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        console.log('Registering user:', username, password);

        const message = await insertUser(username, password);
        alert(message);
        if (message === 'Registration successful!') {
            // Hide registration form and show login form on successful registration
            document.getElementById('div3').style.display = 'none';
            document.getElementById('div2').style.display = 'block';
        }
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        console.log('Logging in user:', username, password);

        const message = await loginUser(username, password);
        alert(message);
        if (message === 'Login successful!') {
            window.location.href = 'Final_Page/final.html'; // Redirect to final.html on successful login
        }
    });

    // Handle contacts button click
    document.getElementById('contacts').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        // Toggle visibility of different sections
        document.getElementById('contacts').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'none';
        document.getElementById('cross1').style.display = 'block';
        document.getElementById('contact-container').style.display = 'block';
    });

    // Handle the cross button click to return to previous view
    document.getElementById('cross1').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        // Toggle visibility of different sections
        document.getElementById('cross1').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'block';
        document.getElementById('contacts').style.display = 'block';
        document.getElementById('contact-container').style.display = 'none';
    });

    // Toggle password visibility for login
    document.getElementById('eye').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye').style.display = 'none';
        document.getElementById('eye-slash').style.display = 'block';
        togglePasswordVisibility('password');
    });

    // Toggle password visibility for login
    document.getElementById('eye-slash').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye-slash').style.display = 'none';
        document.getElementById('eye').style.display = 'block';
        togglePasswordVisibility('password');
    });

    // Toggle password visibility for registration
    document.getElementById('eye1').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye1').style.display = 'none';
        document.getElementById('eye-slash1').style.display = 'block';
        togglePasswordVisibility('register_password');
    });

    // Toggle password visibility for registration
    document.getElementById('eye-slash1').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye-slash1').style.display = 'none';
        document.getElementById('eye1').style.display = 'block';
        togglePasswordVisibility('register_password');
    });

    // Toggle password visibility for confirm password
    document.getElementById('eye2').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye2').style.display = 'none';
        document.getElementById('eye-slash2').style.display = 'block';
        togglePasswordVisibility('confirm_password');
    });

    // Toggle password visibility for confirm password
    document.getElementById('eye-slash2').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('eye-slash2').style.display = 'none';
        document.getElementById('eye2').style.display = 'block';
        togglePasswordVisibility('confirm_password');
    });

    // Show registration form
    document.getElementById('show-register').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('div2').style.display = 'none';
        document.getElementById('div3').style.display = 'block';
    });

    // Show login form
    document.getElementById('show-login').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        document.getElementById('div3').style.display = 'none';
        document.getElementById('div2').style.display = 'block';
    });

    // Toggle password visibility helper function
    function togglePasswordVisibility(elementId) {
        const passwordField = document.getElementById(elementId);
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    }
});