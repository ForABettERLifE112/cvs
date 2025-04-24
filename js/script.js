document.addEventListener('DOMContentLoaded', function() {
    // المتغيرات
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
    
    // تغيير حالة الهيدر عند التمرير
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('active');
        }
        
        // تأثير الظهور عند التمرير
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // تبديل القائمة المتنقلة
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // التمرير إلى أعلى الصفحة
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // التمرير السلس إلى الأقسام
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // إغلاق القائمة المتنقلة بعد النقر على رابط
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
    
    // تحديث الروابط النشطة عند التمرير
    function updateActiveLinks() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // إضافة كرة متحركة تتبع المؤشر
    function createFollowingBall() {
        const ball = document.createElement('div');
        ball.classList.add('cursor-ball');
        document.body.appendChild(ball);
        
        // تحديث موضع الكرة عند تحريك المؤشر
        document.addEventListener('mousemove', e => {
            ball.style.left = e.clientX + 'px';
            ball.style.top = e.clientY + 'px';
        });
        
        // إضافة تأثيرات CSS للكرة
        const style = document.createElement('style');
        style.textContent = `
            .cursor-ball {
                position: fixed;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--primary), var(--accent));
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                opacity: 0.6;
                filter: blur(5px);
                transition: transform 0.1s ease;
            }
            
            a:hover ~ .cursor-ball,
            button:hover ~ .cursor-ball {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة شريط تقدم في أعلى الصفحة
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        document.body.appendChild(progressBar);
        
        // تحديث شريط التقدم عند التمرير
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollPosition / totalHeight) * 100;
            
            progressBar.style.width = progress + '%';
        });
        
        // إضافة تأثيرات CSS لشريط التقدم
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--primary), var(--accent));
                z-index: 1001;
                width: 0%;
                transition: width 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // تنفيذ محاكاة الكتابة في العنوان الرئيسي
    function typeWriterEffect() {
        const titles = document.querySelectorAll('.hero-content h1 span');
        if (titles.length > 0) {
            titles.forEach((title, index) => {
                const originalText = title.textContent;
                title.textContent = '';
                
                let i = 0;
                const speed = 100; // سرعة الكتابة
                const delay = index * 1000; // تأخير بين العناصر
                
                setTimeout(() => {
                    function typeWriter() {
                        if (i < originalText.length) {
                            title.textContent += originalText.charAt(i);
                            i++;
                            setTimeout(typeWriter, speed);
                        }
                    }
                    typeWriter();
                }, delay);
            });
        }
    }
    
    // إضافة مستمعي الأحداث
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveLinks);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // تنفيذ الوظائف عند تحميل الصفحة
    handleScroll(); // للتأكد من تحديث الحالة الأولية
    updateActiveLinks(); // للتأكد من تحديد الرابط النشط الأولي
    createFollowingBall(); // إضافة كرة متحركة تتبع المؤشر
    createProgressBar(); // إضافة شريط تقدم في أعلى الصفحة
    setTimeout(typeWriterEffect, 500); // تأخير قليل قبل بدء تأثير الكتابة
    
    // محاكاة إرسال النموذج
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // إظهار رسالة نجاح
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-success');
            successMessage.innerHTML = '<p>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>';
            
            // إضافة تأثيرات CSS لرسالة النجاح
            successMessage.style.backgroundColor = 'var(--secondary-light)';
            successMessage.style.color = 'var(--secondary)';
            successMessage.style.padding = '1rem';
            successMessage.style.borderRadius = 'var(--border-radius)';
            successMessage.style.marginTop = '1rem';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontWeight = 'bold';
            
            // إضافة رسالة النجاح وإعادة تعيين النموذج
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            // إزالة رسالة النجاح بعد 5 ثوانٍ
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});
