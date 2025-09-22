// 移动端菜单切换
document.getElementById('menuToggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});

// 点击导航链接关闭移动菜单
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// 表单提交处理
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 在实际应用中，这里会有AJAX请求发送表单数据到后端
    // 这里我们仅做前端演示
    document.getElementById('contactForm').reset();
    document.getElementById('formSuccess').classList.remove('hidden');
    
    // 3秒后隐藏成功消息
    setTimeout(() => {
        document.getElementById('formSuccess').classList.add('hidden');
    }, 3000);
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('py-2');
        header.classList.remove('py-4');
    } else {
        header.classList.add('py-4');
        header.classList.remove('py-2');
    }
    
    // 更新当前激活的导航链接
    updateActiveNavLink();
});

// 更新当前激活的导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 初始化导航链接状态
    updateActiveNavLink();
    
    // 为所有部分添加淡入动画
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});
