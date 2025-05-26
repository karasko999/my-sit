/**
 * ملف JavaScript الرئيسي لموقع KARASKO
 * يحتوي على: تهيئة الصفحة - تأثيرات التمرير - تفاعلات العناصر
 */

document.addEventListener('DOMContentLoaded', function() {
  // تهيئة الجسيمات
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#5865F2"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#5865F2",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
  
  // تهيئة تأثير الكتابة
  if (typeof Typed !== 'undefined') {
    const typed = new Typed('#typed', {
      strings: [
        'مطور ويب متقدم',
        'خبير واجهات مستخدم',
        'مبرمج Python',
        'مبتكر حلول رقمية'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true
    });
  }
  
  // تعيين سنة الفوتر
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // تفعيل بطاقات سيرفرات ديسكورد
  document.querySelectorAll('.server-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.join-button')) return;
      const link = this.getAttribute('data-link');
      if (link) window.open(link, '_blank');
    });
  });
  
  // تهيئة نموذج الاتصال
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.');
      this.reset();
      // توليد كابتشا جديد بعد الإرسال
      if (typeof securitySystem !== 'undefined') {
        securitySystem.currentCaptcha = securitySystem.generateCaptcha();
      }
    });
  }
  
  // تأثيرات التمرير
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.server-card, .skill-card, .contact-form, footer, .tech-stack');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
        
        // تحريك أشرطة المهارات
        if (element.classList.contains('skill-card')) {
          const skillLevel = element.querySelector('.skill-level');
          const skillPercent = element.querySelector('.skill-percent');
          const targetWidth = skillLevel.dataset.width || '90%';
          
          skillLevel.style.width = '0';
          skillPercent.textContent = '0%';
          
          setTimeout(() => {
            skillLevel.style.width = targetWidth;
            skillPercent.textContent = targetWidth;
          }, 300);
        }
      }
    });
  };
  
  // تعيين عرض أشرطة المهارات
  document.querySelectorAll('.skill-level').forEach(bar => {
    const skillType = bar.classList[1].split('-')[0];
    const widths = {
      'html': '95%',
      'css': '90%',
      'js': '85%',
      'python': '90%'
    };
    bar.dataset.width = widths[skillType];
  });
  
  // تشغيل عند التحميل وعند التمرير
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // التتبع النشط للقسم
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // تأثيرات الأيقونات التقنية
  const techIcons = document.querySelectorAll('.tech-icons i, .icon-item');
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.animation = 'none';
      setTimeout(() => {
        icon.style.animation = 'float 4s ease-in-out infinite';
      }, 10);
    });
  });
});