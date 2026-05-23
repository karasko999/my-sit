// 1. خلفية الجزيئات الشبكية
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY; this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 14000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.3) - 0.15;
        let directionY = (Math.random() * 0.3) - 0.15;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, 'rgba(0, 210, 255, 0.25)'));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
}
initParticles(); animateParticles();

// 2. تحديث شريط التمرير
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scrollBar').style.width = (winScroll / height) * 100 + '%';
});

// 3. (المصحح) دالة العدادات لتجنب NaN
const counters = document.querySelectorAll('.count-num');
function triggerCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText;
            const inc = target / 50; 
            if(current < target) {
                counter.innerText = Math.ceil(current + inc);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) triggerCounters();
}, {threshold: 0.4});
observer.observe(document.querySelector('.about-section'));

// 4. تفعيل أشرطة المهارات
const skillBars = document.querySelectorAll('.skill-per');
const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        skillBars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
    }
}, { threshold: 0.15 });
skillsObserver.observe(document.querySelector('.skills-section'));

function toggleSkillDefinition(card) {
    document.querySelectorAll('.skill-card').forEach(c => {
        if (c !== card) c.classList.remove('active-card');
    });
    card.classList.toggle('active-card');
}

// 5. نظام المشاريع (Modal)
const projectsDetailsDB = {
    1: { title: "سيستم بيع مخدرات (FiveM Roleplay)", badge: "برمجة أنظمة وألعاب 🎮", description: "سكربت مخصص لإدارة وتصنيع المواد وتوزيعها الذكي داخل سيرفرات الـ Roleplay الواقعية..." },
    2: { title: "بوت ديسكورد حماية سيرفر (Anti-Raid)", badge: "Node Discord Bot 🛡️", description: "بوت أمان خارق بنظام حصانة متطور لمنع عمليات الـ Raid وحذف الرسائل..." },
    3: { title: "موقع ويب متكامل للسيرفر (Gaming Gateway)", badge: "تطوير الويب الكامل 🌐", description: "بوابة لاعبين متكاملة تشمل متجر شراء الميزات ولوحة إحصائيات متزامنة..." }
};

function openProjectModal(id) {
    const data = projectsDetailsDB[id];
    if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalBadge').textContent = data.badge;
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('projectModal').classList.add('active-modal');
    }
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active-modal');
}
