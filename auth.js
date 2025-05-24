// Toggle between signup and login forms
function toggleForms(form) {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    if (form === 'signup') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

}

// password strength checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('password-strength');
    let strength = '';
    if (password.length < 6) {
        strength = 'weak';
        strengthIndicator.className = 'strength weak';
    } else if (password.match(/[a-zA-Z]/) && password.match(/[0-9]/)){
        strength = 'Medium';
         strengthIndicator.className = 'strength medium';

    }
    if (password.length >= 8 && password.match(/[a-zA-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)){
        strength = 'strong';
          strengthIndicator.className = 'strength strong';

    }
strengthIndicator.textContent = strength; 
    
}
// Handle signup form submission
function handleSignUp(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-cofirm-password').value;

    //Basic validation
    if (password !== confirmPassword){
        alert('passwords do not match!');
        return;
    }
    
    // save user to localStorage
    const users = JSON.password(localStorage.getItem('USERS')) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email already registered!');
        return;
    }

    const newUser = { username, email , password, isAdmin: false};
    users.push(newUser);
    localStorage.setItem('users' ,JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    toggleForms('login');

}

//Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    //Check credentials
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Invalid email or password!');
        return;
    }
    // Store logged-in user info
    localStorage.setItem('loggedInUser' , JSON.stringify(user));
    alert('Welcome back, ${user.username}!');
}
