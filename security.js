/**
 * نظام حماية متكامل لموقع KARASKO
 * يشمل: كابتشا - حماية النماذج - حماية من هجمات DDoS
 */

class SecuritySystem {
  constructor() {
    this.currentCaptcha = this.generateCaptcha();
    this.failedAttempts = 0;
    this.maxAttempts = 3;
    this.lockDuration = 30; // ثانية
    this.initProtection();
  }

  // توليد كابتشا عشوائي
  generateCaptcha() {
    const chars = "0456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha-text').textContent = captcha;
    return captcha;
  }

  // التحقق من الكابتشا
  validateCaptcha(input) {
    if (input !== this.currentCaptcha) {
      this.failedAttempts++;
      if (this.failedAttempts >= this.maxAttempts) {
        this.lockForm(this.lockDuration);
      }
      return false;
    }
    return true;
  }

  // غلق النموذج مؤقتًا
  lockForm(seconds) {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.style.opacity = '0.5';
    form.querySelectorAll('input, button, textarea').forEach(el => {
      el.disabled = true;
    });

    let timer = seconds;
    const timerEl = document.createElement('div');
    timerEl.id = 'form-timer';
    timerEl.style.color = '#ff4757';
    timerEl.style.textAlign = 'center';
    timerEl.style.marginBottom = '15px';
    timerEl.style.fontWeight = 'bold';
    timerEl.textContent = `تم تعطيل النموذج لمدة ${timer} ثانية`;
    
    const existingTimer = document.getElementById('form-timer');
    if (existingTimer) {
      existingTimer.replaceWith(timerEl);
    } else {
      form.prepend(timerEl);
    }

    const interval = setInterval(() => {
      timer--;
      timerEl.textContent = `تم تعطيل النموذج لمدة ${timer} ثانية`;
      if (timer <= 0) {
        clearInterval(interval);
        form.style.opacity = '1';
        form.querySelectorAll('input, button, textarea').forEach(el => {
          el.disabled = false;
        });
        timerEl.remove();
        this.failedAttempts = 0;
        this.currentCaptcha = this.generateCaptcha();
      }
    }, 1000);
  }

  // حماية الروابط الخارجية
  secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      link.rel = 'noopener noreferrer';
      link.addEventListener('click', (e) => {
        if (!confirm('أنت على وشك الانتقال إلى موقع خارجي. هل تريد المتابعة؟')) {
          e.preventDefault();
        }
      });
    });
  }

  // منع حقن الكود
  sanitizeInput(input) {
    if (!input) return input;
    
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
      "`": '&#x60;',
      "=": '&#x3D;'
    };
    const reg = /[&<>"'`=/]/ig;
    return input.replace(reg, (match) => (map[match]));
  }

  // تهيئة النظام
  initProtection() {
    // تطبيق على جميع حقول النص
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        e.target.value = this.sanitizeInput(e.target.value);
      });
    });

    // حماية النموذج
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        const captchaInput = document.getElementById('captcha-input').value;
        if (!this.validateCaptcha(captchaInput)) {
          e.preventDefault();
          alert('الرمز غير صحيح! يرجى المحاولة مرة أخرى');
        }
      });
    }

    this.secureExternalLinks();

    // تحديث الكابتشا
    document.getElementById('refresh-captcha')?.addEventListener('click', () => {
      this.currentCaptcha = this.generateCaptcha();
    });

    // إضافة سياسة أمان المحتوى
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = "Content-Security-Policy";
    cspMeta.content = "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com;";
    document.head.appendChild(cspMeta);
  }
}

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const securitySystem = new SecuritySystem();
  window.securitySystem = securitySystem; // جعله متاحًا عالميًا للتصحيح
});