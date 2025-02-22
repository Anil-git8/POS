const salesByMonthCtx = document.getElementById('salesByMonthChart').getContext('2d');
new Chart(salesByMonthCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Sales',
            data: [10000, 15000, 20000, 12000, 8000, 6000, 7000, 14000, 18000, 22000, 17000, 19000],
            borderColor: 'orange',
            borderWidth: 2,
        }]
    },
    options: { responsive: true }
});

const salesByBranchCtx = document.getElementById('salesByBranchChart').getContext('2d');
new Chart(salesByBranchCtx, {
    type: 'bar',
    data: {
        labels: ['Branch A', 'Branch B', 'Branch C'],
        datasets: [{
            label: 'Sales',
            data: [106000, 106000, 111000],
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        }]
    },
    options: { responsive: true }
});

const salesByProductLineCtx = document.getElementById('salesByProductLineChart').getContext('2d');
new Chart(salesByProductLineCtx, {
    type: 'bar',
    data: {
        labels: ['Food', 'Sports', 'Electronics', 'Fashion', 'Home', 'Health'],
        datasets: [{
            label: 'Sales',
            data: [56000, 55000, 54000, 54000, 54000, 49000],
            backgroundColor: '#03a9f4',
        }]
    },
    options: { responsive: true }
});

const salesByPaymentCtx = document.getElementById('salesByPaymentChart').getContext('2d');
new Chart(salesByPaymentCtx, {
    type: 'pie',
    data: {
        labels: ['Cash', 'Ewallet', 'Credit Card'],
        datasets: [{
            data: [31.2, 34.74, 34.06],
            backgroundColor: ['#ff5722', '#4caf50', '#2196f3'],
        }]
    },
    options: { responsive: true }
});
