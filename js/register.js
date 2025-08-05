document.getElementById("register").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (password === confirm_password) {
        // Redirect to login if passwords match
        window.location.href = "login.html";
    } else {
        alert("Your registration has failed. Passwords do not match.");
    }
});