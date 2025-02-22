document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "New password and confirm password do not match!";
    } else {
        errorMessage.textContent = "";
        alert("Password changed successfully!");
        // Here, you can add an API call to update the password in your database
    }
});