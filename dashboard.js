function forgetContent(){
    // document.getElementById('profileedit').style.display='block';
    document.getElementById('forget').style.display='block';
    document.getElementById('profileedit').style.display='none';
    document.getElementById('emp').style.display='none';
    document.getElementById('invent').style.display='none';

   }

    function showContent(){
        document.getElementById('profileedit').style.display='block';
        document.getElementById('forget').style.display='none';
        document.getElementById('emp').style.display='none';
        document.getElementById('invent').style.display='none';

    }
     
    function empContent(){
        document.getElementById('profileedit').style.display='none';
        document.getElementById('forget').style.display='none';
        document.getElementById('emp').style.display='block';
        document.getElementById('invent').style.display='none';
    }

    function inventContent(){
        document.getElementById('profileedit').style.display='none';
        document.getElementById('forget').style.display='none';
        document.getElementById('emp').style.display='none';
        document.getElementById('invent').style.display='block';
        document.getElementById('dash').style.display='none';

    }

   function dashContent(){
        document.getElementById('profileedit').style.display='none';
        document.getElementById('forget').style.display='none';
        document.getElementById('emp').style.display='none';
        document.getElementById('invent').style.display='none';
        document.getElementById('dash').style.display='block';
   }




    const adminUsername = localStorage.getItem("adminUsername");

// If a username is found, update the span element with the username
if (adminUsername) {
document.getElementById("usernameDisplay").textContent = adminUsername;
} else {
// If no username is found, display "Guest"
document.getElementById("usernameDisplay").textContent = "Guest";
}



    // function toggleSidebar() {
    //     const sidebar = document.getElementById('sidebar');
    //     sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    // }

    function togglePopup() {
        const popup = document.getElementById('profilePopup');
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }
    
        function logout() {
           sessionStorage.clear(); // Clear session storage (if used)
           localStorage.clear(); // Clear local storage (if used)

          window.location.href = "index.html"; // Redirect to login page
     } // Redirect to login page



//     function showContent(section) {
//     const content = document.getElementById('content1');
//     if (section === 'profile') {
//         content.innerHTML = `
//             <div class="container">
//                 <div class="part1">
//     <img class="img" src="profile.png" alt="profile pic">
//     <!--<i class="bi bi-pencil btn" onclick="editDetails()" id="edit-name">hi</i>-->
//     <div class="mail">
//     <h2 id="stuname">Your Name</h2>
//     <p class="email" id="email">sampleemail@gmail.com</p>
//     </div>
//             </div>
            
//     <div class="name-container">
//          <hr class="hr">
//     <p class="address" id="address">Address</p>
//     </div>
   
// </div>
// </div>

// <!--profile pic modal-->

// <div class="modal" id="editModal">
//     <div class="modal-content">
//         <div class="modal-header">
//             <h5 style="color:white;"><i style="color:white;" class="bi bi-pencil"></i>Edit Profile</h5>
//         </div>
//         <div class="modal-body">
//             <div class="form-group">
//                 <label for="nameInput">Name</label>
//                 <input type="text" id="nameInput" value="John Doe">
//             </div>
//             <div class="form-group">
//                 <label for="emailInput">Email</label>
//                 <input type="email" id="emailInput" value="john.doe@example.com">
//             </div>
            
//             <div class="form-group">
//                 <label for="addressInput">Address</label>
//                 <input type="text" id="addressInput" value="Hyderabad, Telangana">
//             </div>
            
//         </div>
//         <div class="modal-footer">
//             <button onclick="saveDetails()">Save Changes</button>
//         </div>
//     </div>
//     </div>

// `;
//     } else if (section === 'changePassword') {
//         content.innerHTML = `
//             <div class="form-container center">
//                 <h2>Change Password</h2>
//                 <input type="password" placeholder="Old Password" required>
//                 <input type="password" placeholder="New Password">
//                 <input type="password" placeholder="Confirm Password">
//                 <button onclick="alert('Password changed successfully!')">Submit</button>
//             </div>
//         `;
        
//     } else {
//         content.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2><p>Content for ${section}.</p>`;
//     }
// }

function saveDetails() {
const name = document.getElementById('nameInput').value;
const email = document.getElementById('emailInput').value;

const address = document.getElementById('addressInput').value;

document.getElementById('stuname').textContent = name;
document.getElementById('email').textContent = email;

document.getElementById('address').textContent = address;

alert('Details updated successfully!');
}


    window.onclick = function(event) {
        if (!event.target.matches('.profile img')) {
            const popup = document.getElementById('profilePopup');
            if (popup && popup.style.display === 'block') {
                popup.style.display = 'none';
            }
        }
    };
    function goToDashboard() {
        window.location.href = "dashboard.html";
    }