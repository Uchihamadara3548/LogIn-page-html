document.addEventListener('DOMContentLoaded', function() {
// Function for using nav icons

  //for contact icon
document.getElementById('contacts').addEventListener('click', function(event) {
        event.preventDefault();
   
   document.getElementById('contacts').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
                       document.getElementById('div3').style.display = 'none';
                         document.getElementById('cross1').style.display = 'block';
              document.getElementById('contact-container').style.display = 'block';
    });
    
   //for cross1 icon
    document.getElementById('cross1').addEventListener('click', function(event) {
        event.preventDefault();
   
   document.getElementById('cross1').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
                       document.getElementById('div3').style.display = 'block';
                       
                       document.getElementById('contacts').style.display = 'block';
              document.getElementById('contact-container').style.display = 'none';
    });

  //Event Listener for switching between eye and eye slash
  
  //for login password
document.getElementById('eye').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye').style.display = 'none';
        document.getElementById('eye-slash').style.display = 'block';
    });
    
   //for register password    
document.getElementById('eye1').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye1').style.display = 'none';
        document.getElementById('eye-slash1').style.display = 'block';
    });
    
    //for confirm password    
document.getElementById('eye2').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye2').style.display = 'none';
        document.getElementById('eye-slash2').style.display = 'block';
    });
    
  //Event Listener for switch between eye slash and eye
  
   //for login password
document.getElementById('eye-slash').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash').style.display = 'none';
        document.getElementById('eye').style.display = 'block';
    });
    
   //for register password 
document.getElementById('eye-slash1').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash1').style.display = 'none';
        document.getElementById('eye1').style.display = 'block';
    });
    
    //for confirm password   
document.getElementById('eye-slash2').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('eye-slash2').style.display = 'none';
        document.getElementById('eye2').style.display = 'block';
    });
    
    //Event listener for making password visible using eye icon
   
   //for login password 
document.getElementById('eye').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';      
    } else {
        passwordField.type = 'password';       
    }
});

   //for register password
document.getElementById('eye1').addEventListener('click', function() {
    var passwordField = document.getElementById('register_password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';      
    } else {
        passwordField.type = 'password';       
    }
});

  //for confirm password
document.getElementById('eye2').addEventListener('click', function() {
    var passwordField = document.getElementById('confirm_password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';      
    } else {
        passwordField.type = 'password';       
    }
});

 //Event listener for making password hidden using eye icon
  
   //for login password
document.getElementById('eye-slash').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    if (passwordField.type === 'text') {
        passwordField.type = 'password';        
    } else {
        passwordField.type = 'text';      
    }
});

  //for register password
document.getElementById('eye-slash1').addEventListener('click', function() {
    var passwordField = document.getElementById('register_password');
    if (passwordField.type === 'text') {
        passwordField.type = 'password';        
    } else {
        passwordField.type = 'text';      
    }
});

  //for confirm password
document.getElementById('eye-slash2').addEventListener('click', function() {
    var passwordField = document.getElementById('confirm_password');
    if (passwordField.type === 'text') {
        passwordField.type = 'password';        
    } else {
        passwordField.type = 'text';      
    }
});

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
});