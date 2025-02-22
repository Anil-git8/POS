function changeLoginType() {
    const loginType = document.getElementById("loginType").value;
    const loginTitle = document.getElementById("loginTitle");
  
    if (loginType === "admin") {
      // Update the title and show/hide forms
      loginTitle.textContent = "Admin Login";
      document.getElementById("cashierLogin").style.display = "none";
      document.getElementById("adminLogin").style.display = "block";
    } else if (loginType === "cashier") {
      // Update the title and show/hide forms
      loginTitle.textContent = "Cashier Login";
      document.getElementById("cashierLogin").style.display = "block";
      document.getElementById("adminLogin").style.display = "none";
    }
  }
  
  function login() {

   



    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (username && password) {
        localStorage.setItem("username", username); // Store username
        // window.location.href = "action.html";
        // document.getElementById("loginContainer").style.display = "none"; // Hide form
        document.getElementById("loading").style.display = ""; // Show loading spinner
        
        // Simulate login success and redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "action.html"; // Change this to your destination page
        }, 500);
    } else {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please enter both username and password!";
    }
}

// Listen for "Enter" key press on the password field
document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        login(); // Call the login function
    }
});
  
 
  function adminLogin() {
    const adminUsername = document.getElementById("adminUsername").value;
    const adminPassword = document.getElementById("adminPassword").value;
  
    if (adminUsername && adminPassword) {
      localStorage.setItem("adminUsername", adminUsername);

      document.getElementById("loading1").style.display = "";
      // window.location.href = "dashboard.html";

      setTimeout(() => {
        window.location.href = "dashboard.html"; // Change this to your destination page
      }, 500);
    }
  else {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Please enter both username and password!";
}

  }
// Listen for "Enter" key press on the password field
document.getElementById("adminPassword").addEventListener("keydown", function(event) {
if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    adminLogin(); // Call the login function
}
});


  function submitRegister() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const mail = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const branchCode = document.getElementById("branchCode").value;
  
    if (
      !firstName ||
      !lastName ||
      !address ||
      !phone ||
      !location ||
      !branchCode
    ) {
      showPopup("Please fill all the fields!", "error");
      return;
    }
  
    showPopup("Registration Successful!", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
  
  function showPopup(message, type) {
    const popup = document.getElementById("popup");
    popup.textContent = message;
    popup.className = popup `${type}`;
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 1500);
  }
  
  const modal = document.getElementById("editModal");
  
  function editDetails() {
    modal.style.display = "flex";
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  
  function saveDetails() {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const phone = document.getElementById("phoneInput").value;
    const address = document.getElementById("addressInput").value;
  
    document.getElementById("stuname").innerText = name;
    document.getElementById("email").innerText = `Email:${email}`;
    document.getElementById("address").innerText = `${address}`;
    document.getElementById("phone").innerText = `Phone:${phone}`;
  
    closeModal();
  }


