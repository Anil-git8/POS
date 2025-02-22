let attendanceData = [];

function showAttendancePopup() {
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('attendance-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('attendance-popup').style.display = 'none';
}

function addAttendance() {
    const employeeName = document.getElementById('employee-name').value;
    const attendanceStatus = document.getElementById('attendance-status').value;
    const shift = document.getElementById('shift').value;

    const attendanceRecord = {
        employeeName,
        attendanceStatus,
        shift,
        lastUpdated: new Date().toLocaleString(),
    };

    attendanceData.push(attendanceRecord);
    renderAttendanceTable();
    closePopup();
    document.getElementById('attendance-form').reset();
}

function renderAttendanceTable() {
    const tableBody = document.getElementById('attendance-table-body');
    tableBody.innerHTML = '';

    attendanceData.forEach((attendance, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${attendance.employeeName}</td>
            <td>${attendance.attendanceStatus}</td>
            <td>${attendance.shift}</td>
            <td>${attendance.lastUpdated}</td>
            <td>
                <button class="btn btn-primary" onclick="editAttendance(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteAttendance(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editAttendance(index) {
    const attendance = attendanceData[index];
    document.getElementById('employee-name').value = attendance.employeeName;
    document.getElementById('attendance-status').value = attendance.attendanceStatus;
    document.getElementById('shift').value = attendance.shift;

    const saveButton = document.querySelector('#attendance-form button');
    saveButton.textContent = 'Save Changes';
    saveButton.setAttribute('onclick', `saveAttendanceChanges(${index})`);

    showAttendancePopup();
}

function saveAttendanceChanges(index) {
    const attendance = attendanceData[index];
    attendance.employeeName = document.getElementById('employee-name').value;
    attendance.attendanceStatus = document.getElementById('attendance-status').value;
    attendance.shift = document.getElementById('shift').value;
    attendance.lastUpdated = new Date().toLocaleString();

    renderAttendanceTable();
    closePopup();
}

function deleteAttendance(index) {
    attendanceData.splice(index, 1);
    renderAttendanceTable();
}

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.style.display = searchBar.style.display === 'none' ? 'inline-block' : 'none';
}

function searchTable() {
    const searchText = document.getElementById("searchBar").value.toLowerCase();
    const table = document.querySelector("table"); // Adjust the selector if necessary
    const rows = table.getElementsByTagName("tr");

    // Loop through table rows (skipping the first header row)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let rowContainsSearchText = false;

        // Loop through each cell in the row
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchText)) {
                rowContainsSearchText = true;
                break;
            }
        }

        // Toggle row visibility based on search match
        rows[i].style.display = rowContainsSearchText ? "" : "none";
    }
}


