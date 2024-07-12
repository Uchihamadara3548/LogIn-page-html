document.addEventListener('DOMContentLoaded', function() {
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

        // Perform the login query
        performQuery('SELECT * FROM users WHERE username = ?', [username]).then(results => {
            if (results.length > 0) {
                const user = results[0];
                if (user.password === password) {
                    alert('Login successful!');
                    window.location.href = 'Final_Page/final.html';  // Change to the actual final page URL
                } else {
                    alert('Invalid username or password.');
                }
            } else {
                alert('Invalid username or password.');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });

// Event listener for the registration form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('register_username');
    const password = formData.get('register_password');

    // Perform the user insertion
    insertUser(username, password).then(message => {
        alert(message);
        if (message === 'Registration successful!') {
            document.getElementById('div3').style.display = 'none';
            document.getElementById('div2').style.display = 'block';
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Registration failed.');
    });
});
}) ;