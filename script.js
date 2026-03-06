

    document.addEventListener("DOMContentLoaded", function(){

    // 1. كود تشغيل الصوت (Play Sound)
    const audio = document.getElementById("myAudio");
    const soundElements = document.querySelectorAll('.play-sound, .nav-links a, .social, .btn-outline');

    soundElements.forEach(element => {
        // تشغيل الصوت عند مرور الماوس (Hover)
        element.addEventListener('mouseenter', () => {
            audio.currentTime = 0; // إعادة الصوت للبداية
            audio.play().catch(e => console.log("Audio play blocked"));
        });

        // تشغيل الصوت عند الضغط (Click)
        element.addEventListener('click', () => {
            audio.currentTime = 0;
            audio.play();
        });
    });

    // 2. كود مراقبة الأقسام (ScrollSpy) - Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // تفعيل المراقبة على كل الأقسام
    document.querySelectorAll('section, .hero').forEach(section => {
        observer.observe(section);
    });






    let hasRotated = false; // مفتاح أمان لمنع التكرار

    function handlePortfolioRotation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const portfolioSection = document.getElementById('portfolio');

        // إذا أصبح الهاتف أفقياً ولم نقم بنقله للأعلى بعد
        if (isLandscape && !hasRotated) {
            
            // التأكد أن المستخدم حالياً في منطقة البورتفوليو
            const rect = portfolioSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                
                const firstImage = portfolioSection.querySelector('.only-landscape');
                if (firstImage) {
                    firstImage.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    hasRotated = true; // "قفل" الميزة: تم النقل بنجاح، لا تكررها ثانية
                }
            }
        } 
        
        // إذا أعاد المستخدم الهاتف للوضع العمودي، نعيد فتح القفل للمرة القادمة
        else if (!isLandscape) {
            hasRotated = false; 
        }
    }

    // الاستماع لتغيير الحجم والتدوير
    window.addEventListener('resize', handlePortfolioRotation);
    window.addEventListener('orientationchange', handlePortfolioRotation);

});