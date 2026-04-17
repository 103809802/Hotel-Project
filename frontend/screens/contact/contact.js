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

function toggle(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}
 