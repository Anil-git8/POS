function updateDetails(event) {
    event.preventDefault();
    
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const address = document.getElementById('addressInput').value;

    document.getElementById('stuname').textContent = name;
    document.getElementById('email').textContent = email;
    document.getElementById('address').textContent = address;

    alert('Details updated successfully!');
}

function updateProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}