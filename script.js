// خلفية الجزيئات الشبكية المتطورة للموقع
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


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('scrollBar').style.width = (winScroll / height) * 100 + '%';
});


const statNumbers = document.querySelectorAll('.stat-number');
function triggerCounters() {
    statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        let count = 0;
        let speed = target / 40; 
        const updateCount = () => {
            if(count < target) { 
                count += Math.ceil(speed); 
                if(count > target) count = target;
                num.innerText = count + "+"; 
                setTimeout(updateCount, 40); 
            } else { 
                num.innerText = target + "+"; 
            }
        };
        updateCount();
    });
}
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) triggerCounters();
}, {threshold: 0.4});
observer.observe(document.querySelector('.about-section'));


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

// --- قاعدة البيانات للشرح الكامل والكلي لمشاريعك ---
const projectsDetailsDB = {
    1: {
        title: "سيستم بيع مخدرات (FiveM Roleplay)",
        badge: "برمجة أنظمة وألعاب 🎮",
        description: "سكربت مخصص لإدارة وتصنيع المواد وتوزيعها الذكي داخل سيرفرات الـ Roleplay الواقعية. يعتمد على تجربة لاعب غامرة تبدأ من مراحل جمع المواد الخام، ثم تصنيعها وطبخها في أماكن سرية ومحمية، وصولاً إلى مرحلة التوزيع والبيع الذكي لـ بوتات الـ NPC في الشوارع."
    },
    2: {
        title: "بوت ديسكورد حماية سيرفر (Anti-Raid)",
        badge: "Node Discord Bot 🛡️",
        description: "بوت أمان خارق بنظام حصانة متطور لمنع عمليات الـ Raid وحذف الرسائل من المخربين. مبرمج بالكامل بلغة بايثون ومصمم لحماية مجتمعات الألعاب وسيرفراتك الكبرى من التخريب الداخلي والخارجي مع توفير لوغ (Logs) فوري مسجل لكل التحركات المشبوهة."
    },
    3: {
        title: "موقع ويب متكامل للسيرفر (Gaming Gateway)",
        badge: "تطوير الويب الكامل 🌐",
        description: "بوابة لاعبين متكاملة تشمل متجر شراء الميزات ولوحة إحصائيات متزامنة تعرض إحصائيات اللاعب من داخل اللعبة (مستواه، أمواله، وسجل العقوبات)، بالإضافة إلى متجر إلكتروني وقسم متطور لتقديم طلبات الانضمام للـ Whitelist."
    }
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
