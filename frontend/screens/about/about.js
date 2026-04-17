function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Đóng dropdown khi click ra ngoài
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('dropdownMenu').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) menu.style.display = 'none';
});