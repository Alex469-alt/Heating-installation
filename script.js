// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const headerCta = document.querySelector('.header-cta');

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;

            // Simple validation
            if (!name || !phone) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }

            // Simulate form submission
            console.log('Form submitted:', { name, phone });
            
            // Show success message
            alert('Спасибо! Ваша заявка принята. Инженер свяжется с вами в течение 10 минут.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Function to scroll to form
    function scrollToForm() {
        const formCard = document.querySelector('.form-card');
        if (formCard) {
            formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Focus on first input after a short delay
            setTimeout(function() {
                const firstInput = document.querySelector('.input-field');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 500);
        }
    }

    // Handle header CTA button click
    if (headerCta) {
        headerCta.addEventListener('click', function() {
            const requestModal = document.getElementById('requestModal');
            if (requestModal) {
                requestModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Phone number click handler (for mobile devices)
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) {
        phoneNumber.addEventListener('click', function(e) {
            // On mobile, this will trigger the phone dialer
            // On desktop, it will just be a link
        });
    }

    // Handle contacts form submission
    const contactsForm = document.getElementById('contactsForm');
    if (contactsForm) {
        contactsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = contactsForm.querySelector('input[type="tel"]').value;
            const message = contactsForm.querySelector('textarea').value;

            if (!phone) {
                alert('Пожалуйста, заполните поле "Телефон"');
                return;
            }

            console.log('Contacts form submitted:', { phone, message });
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            contactsForm.reset();
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(function(faqItem) {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Certificate Modal
    const modal = document.getElementById('certificateModal');
    const certificateItems = document.querySelectorAll('.certificate-item');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('#certificateModal .modal-close');

    certificateItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const certId = item.getAttribute('data-cert');
            const certificateImg = item.querySelector('.certificate-image');
            if (certificateImg) {
                modalImage.src = certificateImg.src;
                modalImage.alt = certificateImg.alt || 'Сертификат ' + certId;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Portfolio Modal
    const portfolioModal = document.getElementById('portfolioModal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModalImage = document.getElementById('portfolioModalImage');
    const portfolioModalClose = document.querySelector('.portfolio-modal-close');

    portfolioItems.forEach(function(item) {
        const imageWrapper = item.querySelector('.portfolio-image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('click', function() {
                const portfolioImg = item.querySelector('.portfolio-image');
                if (portfolioImg) {
                    portfolioModalImage.src = portfolioImg.src;
                    portfolioModalImage.alt = portfolioImg.alt || 'Пример работы';
                    portfolioModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Close portfolio modal
    if (portfolioModalClose) {
        portfolioModalClose.addEventListener('click', function() {
            portfolioModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close portfolio modal when clicking outside
    if (portfolioModal) {
        window.addEventListener('click', function(event) {
            if (event.target === portfolioModal) {
                portfolioModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close portfolio modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && portfolioModal.style.display === 'block') {
                portfolioModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Consultation Modal
    const consultationModal = document.getElementById('consultationModal');
    const consultationButtons = document.querySelectorAll('.consultation-button');
    const consultationClose = document.querySelector('.consultation-close');
    const consultationForm = document.getElementById('consultationForm');

    // Open consultation modal for all consultation buttons
    consultationButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (consultationModal) {
                consultationModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close consultation modal
    if (consultationClose) {
        consultationClose.addEventListener('click', function() {
            if (consultationModal) {
                consultationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (consultationModal) {
        window.addEventListener('click', function(event) {
            if (event.target === consultationModal) {
                consultationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle consultation form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = consultationForm.querySelector('input[type="tel"]').value;

            if (!phone) {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            console.log('Consultation form submitted:', { phone });
            alert('Спасибо! Наш инженер перезвонит вам в течение 10 минут.');
            consultationForm.reset();
            if (consultationModal) {
                consultationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Request Modal
    const requestModal = document.getElementById('requestModal');
    const requestClose = document.querySelector('.request-close');
    const requestForm = document.getElementById('requestForm');

    // Close request modal
    if (requestClose) {
        requestClose.addEventListener('click', function() {
            if (requestModal) {
                requestModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (requestModal) {
        window.addEventListener('click', function(event) {
            if (event.target === requestModal) {
                requestModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle request form submission
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = requestForm.querySelector('input[type="tel"]').value;

            if (!phone) {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            console.log('Request form submitted:', { phone });
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            requestForm.reset();
            if (requestModal) {
                requestModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

