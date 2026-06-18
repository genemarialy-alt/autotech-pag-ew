document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.maxHeight = null;
                    const otherIcon = ans.previousElementSibling.querySelector('i');
                    if (otherIcon) {
                        otherIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                    }
                }
            });

            // Toggle current answer
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Contact Form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Change button text to show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // These IDs from the previous steps
            emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', this)
                .then(() => {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                    contactForm.reset();
                }, (error) => {
                    alert('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo más tarde.\nDetalles: ' + JSON.stringify(error));
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
