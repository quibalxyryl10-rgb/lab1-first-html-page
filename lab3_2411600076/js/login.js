document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const feedbackDiv = document.getElementById('loginFeedback');
    const rememberMe = document.getElementById('rememberMe');

    // Auto-fill saved username
    if (localStorage.getItem('rememberMe') === 'true') {
        usernameInput.value = localStorage.getItem('savedUsername') || '';
        rememberMe.checked = true;
    }

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    function showFeedback(message, type) {
        const alertClass = type === 'danger' ? 'alert-danger' : 'alert-success';
        feedbackDiv.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        feedbackDiv.innerHTML = '';

        if (username === '' || password === '') {
            showFeedback('Please enter both username and password.', 'danger');
            return;
        }

        if (username === 'admin' && password === 'password123') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', username);

            if (rememberMe.checked) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('savedUsername', username);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('savedUsername');
            }

            showFeedback('Login successful! Redirecting...', 'success');

            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showFeedback('Invalid username or password.', 'danger');
        }
    });

    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loginBtn.click();
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loginBtn.click();
    });
});