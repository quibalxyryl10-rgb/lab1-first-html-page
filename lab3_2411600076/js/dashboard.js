document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const username = localStorage.getItem('user') || 'User';
    updateGreeting(username);
    updateStatistics();
    populateActivityTable();
    setupLogout();

    document.getElementById('userName').textContent = username;
});

function updateGreeting(username) {
    const hour = new Date().getHours();
    let timeOfDay = '';
    if (hour >= 5 && hour < 12) timeOfDay = 'Good Morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'Good Afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'Good Evening';
    else timeOfDay = 'Good Night';

    document.getElementById('greeting').textContent = `${timeOfDay}, ${username}!`;
}

function updateStatistics() {
    const stats = [
        { title: 'Daily Orders', value: '47', color: 'text-primary', icon: '📊' },
        { title: 'Revenue', value: '$2,450', color: 'text-success', icon: '💰' },
        { title: 'Menu Items', value: '32', color: 'text-info', icon: '🍕' },
        { title: 'Tables', value: '15', color: 'text-warning', icon: '🪑' }
    ];

    stats.forEach((stat, index) => {
        const titleEl = document.getElementById(`stat${index + 1}-title`);
        const valueEl = document.getElementById(`stat${index + 1}-value`);
        if (titleEl) titleEl.textContent = `${stat.icon} ${stat.title}`;
        if (valueEl) {
            valueEl.textContent = stat.value;
            valueEl.className = `card-text fw-bold ${stat.color}`;
        }
    });
}

function populateActivityTable() {
    const tableBody = document.getElementById('activityTableBody');
    if (!tableBody) return;

    const activities = [
        { time: '12:30 PM', order: 'New order: Table 4 - 2x Pizza', status: 'success' },
        { time: '12:15 PM', order: 'Payment received: Order #1023', status: 'success' },
        { time: '11:45 AM', order: 'Table 7 seated: 4 guests', status: 'info' },
        { time: '11:20 AM', order: 'Low stock alert: 3 items', status: 'warning' },
        { time: '10:50 AM', order: 'Table 5 completed: $89', status: 'success' },
        { time: '10:30 AM', order: 'New reservation: 6:30 PM', status: 'info' }
    ];

    tableBody.innerHTML = '';
    activities.forEach(activity => {
        const row = document.createElement('tr');
        let badgeClass = 'bg-secondary';
        if (activity.status === 'success') badgeClass = 'bg-success';
        else if (activity.status === 'warning') badgeClass = 'bg-warning text-dark';
        else if (activity.status === 'info') badgeClass = 'bg-info text-dark';
        row.innerHTML = `
            <td>${activity.time}</td>
            <td>${activity.order}</td>
            <td><span class="badge ${badgeClass}">${activity.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutLink = document.getElementById('logoutLink');

    function performLogout(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }

    if (logoutBtn) logoutBtn.addEventListener('click', performLogout);
    if (logoutLink) logoutLink.addEventListener('click', performLogout);
}