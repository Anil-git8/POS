let employeeData = []; // To store employees in memory
let editingIndex = null; // Track the index of the employee being edited

// Show popup function
function showPopup() {
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('employee-popup').style.display = 'block';
}

// Close popup function
function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('employee-popup').style.display = 'none';
}

// Function to open the Add Employee form
function openAddEmployeeForm() {
    // Reset the form and button text when opening for adding a new employee
    document.getElementById('employee-form').reset();
    const saveButton = document.querySelector('#employee-form button');
    saveButton.textContent = 'Add Employee';  // Set text to "Add Employee"
    saveButton.setAttribute('onclick', 'addEmployee()');  // Set onclick to "addEmployee"
    document.getElementById('popup-title').textContent = 'Add Employee'; // Set title to "Add Employee"
    editingIndex = null; // Reset editing index

    showPopup();  // Show the form
}

// Add employee function
function addEmployee() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const role = document.getElementById('role').value;
    const contact = document.getElementById('contact').value;
    const status = document.getElementById('status').value;

    const employee = { name, id, role, contact, status, lastUpdated: new Date().toLocaleString() };
    employeeData.push(employee);

    renderTable();
    closePopup();
    document.getElementById('employee-form').reset();
}

// Render table with employee data
function renderTable() {
    const tableBody = document.getElementById('employee-table-body');
    tableBody.innerHTML = ''; // Clear the table body

    employeeData.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        // Disable the buttons if status is 'Inactive'
        const isDisabled = employee.status === 'Inactive' ? 'disabled' : '';

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.id}</td>
            <td>${employee.role}</td>
            <td>${employee.contact}</td>
            <td>${employee.status}</td>
            <td>${employee.lastUpdated}</td>
            <td>
                <button class="btn btn-primary" onclick="editEmployee(${index})" ${isDisabled}>Edit</button>
                <button class="btn btn-danger" onclick="deleteEmployee(${index})" ${isDisabled}>Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit employee function
function editEmployee(index) {
    const employee = employeeData[index];
    document.getElementById('name').value = employee.name;
    document.getElementById('id').value = employee.id;
    document.getElementById('role').value = employee.role;
    document.getElementById('contact').value = employee.contact;
    document.getElementById('status').value = employee.status;

    const saveButton = document.querySelector('#employee-form button');
    saveButton.textContent = 'Save Changes';  // Change text to "Save Changes"
    saveButton.setAttribute('onclick', `saveChanges(${index})`);  // Set onclick to "saveChanges"
    document.getElementById('popup-title').textContent = 'Edit Employee'; // Set title to "Edit Employee"

    editingIndex = index; // Set the index of the employee being edited
    showPopup();  // Show the form in edit mode
}

// Save changes to an existing employee
function saveChanges(index) {
    const employee = employeeData[index];
    employee.name = document.getElementById('name').value;
    employee.id = document.getElementById('id').value;
    employee.role = document.getElementById('role').value;
    employee.contact = document.getElementById('contact').value;
    employee.status = document.getElementById('status').value;
    employee.lastUpdated = new Date().toLocaleString();

    renderTable();
    closePopup();
}

// Delete employee function
function deleteEmployee(index) {
    employeeData.splice(index, 1);
    renderTable();
}

// Search function for table filtering
function searchTable() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    const table = document.querySelector("table");
    const rows = table.getElementsByTagName("tr");

    // Loop through table rows and hide rows that do not match the search
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let rowContainsSearchText = false;

        // Loop through each cell in the row to check if it contains the search text
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchText)) {
                rowContainsSearchText = true;
                break;
            }
        }

        // Toggle visibility based on whether the row matches the search text
        rows[i].style.display = rowContainsSearchText ? "" : "none";
    }
}
