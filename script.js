// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Function to validate Belarus phone number
    function validateBelarusPhone(phone) {
        if (!phone) return false;
        
        // Remove all spaces, dashes, parentheses, and plus signs for validation
        const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
        
        // Extract only digits
        const digitsOnly = cleaned.replace(/\D/g, '');
        
        // Check if it starts with 375 (Belarus country code) or 8 (local format)
        // Belarus numbers: +375 (XX) XXX-XX-XX or 8 (0XX) XXX-XX-XX
        let phoneDigits = digitsOnly;
        
        // If starts with 8, convert to international format (8 -> 375)
        if (phoneDigits.startsWith('8') && phoneDigits.length === 11) {
            phoneDigits = '375' + phoneDigits.substring(1);
        }
        
        // Check if it starts with 375 (Belarus country code)
        if (!phoneDigits.startsWith('375')) {
            return false;
        }
        
        // Check if it has exactly 12 digits (375 + 9 digits)
        // Belarus format: 375 + 2-3 digits (operator/area code) + 6-7 digits
        if (phoneDigits.length !== 12) {
            return false;
        }
        
        // Additional check: ensure all digits after 375 are valid (not all zeros, etc.)
        const numberPart = phoneDigits.substring(3);
        if (numberPart === '000000000' || numberPart.length !== 9) {
            return false;
        }
        
        return true;
    }

    // Phone input formatting function
    function formatPhoneInput(input) {
        let value = input.value.replace(/\D/g, ''); // Remove all non-digits
        
        // If starts with 8, replace with 375
        if (value.startsWith('8') && value.length <= 11) {
            value = '375' + value.substring(1);
        }
        
        // If empty or doesn't start with 375, ensure it starts with 375
        if (value.length === 0) {
            value = '375';
        } else if (!value.startsWith('375')) {
            // If user typed something that doesn't start with 375, prepend it
            if (value[0] === '3' && value[1] === '7' && value[2] === '5') {
                // Already has 375
            } else {
                value = '375' + value;
            }
        }
        
        // Limit to 12 digits (375 + 9 digits)
        if (value.length > 12) {
            value = value.substring(0, 12);
        }
        
        // Format: +375 (XX) XXX-XX-XX
        let formatted = '+375';
        if (value.length > 3) {
            const operatorCode = value.substring(3, 5);
            formatted += ' (' + operatorCode;
            if (value.length > 5) {
                const firstPart = value.substring(5, 8);
                formatted += ') ' + firstPart;
                if (value.length > 8) {
                    const secondPart = value.substring(8, 10);
                    formatted += '-' + secondPart;
                    if (value.length > 10) {
                        const thirdPart = value.substring(10, 12);
                        formatted += '-' + thirdPart;
                    }
                }
            }
        }
        
        input.value = formatted;
    }

    // Initialize phone input formatting for all phone inputs
    const phoneInputs = document.querySelectorAll('.phone-input');
    phoneInputs.forEach(function(input) {
        // Format on input
        input.addEventListener('input', function() {
            formatPhoneInput(input);
        });
        
        // Format on focus if empty
        input.addEventListener('focus', function() {
            if (!input.value || input.value === '') {
                input.value = '+375';
            }
        });
        
        // Format on blur if incomplete
        input.addEventListener('blur', function() {
            if (input.value && input.value.length < 8) {
                // If user only typed a few digits, keep +375
                let digits = input.value.replace(/\D/g, '');
                if (digits.length < 12) {
                    input.value = '+375';
                }
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    const headerCta = document.querySelector('.header-cta');

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]')?.value || '';
            const phone = contactForm.querySelector('input[type="tel"]').value;

            // Validate phone (required)
            if (!phone || phone.trim() === '' || phone === '+375') {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            // Validate Belarus phone number
            if (!validateBelarusPhone(phone)) {
                alert('Пожалуйста, введите корректный номер телефона Беларуси.\nФормат: +375 (XX) XXX-XX-XX');
                return;
            }

            // Simulate form submission
            console.log('Form submitted:', { name, phone });
            
            // Redirect to thanks page
            window.location.href = 'thanks.html';
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
            const message = contactsForm.querySelector('textarea')?.value || '';

            // Validate phone (required)
            if (!phone || phone.trim() === '' || phone === '+375') {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            // Validate Belarus phone number
            if (!validateBelarusPhone(phone)) {
                alert('Пожалуйста, введите корректный номер телефона Беларуси.\nФормат: +375 (XX) XXX-XX-XX');
                return;
            }

            console.log('Contacts form submitted:', { phone, message });
            
            // Redirect to thanks page
            window.location.href = 'thanks.html';
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

            // Validate phone (required)
            if (!phone || phone.trim() === '' || phone === '+375') {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            // Validate Belarus phone number
            if (!validateBelarusPhone(phone)) {
                alert('Пожалуйста, введите корректный номер телефона Беларуси.\nФормат: +375 (XX) XXX-XX-XX');
                return;
            }

            console.log('Consultation form submitted:', { phone });
            
            // Redirect to thanks page
            window.location.href = 'thanks.html';
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

            // Validate phone (required)
            if (!phone || phone.trim() === '' || phone === '+375') {
                alert('Пожалуйста, введите номер телефона');
                return;
            }

            // Validate Belarus phone number
            if (!validateBelarusPhone(phone)) {
                alert('Пожалуйста, введите корректный номер телефона Беларуси.\nФормат: +375 (XX) XXX-XX-XX');
                return;
            }

            console.log('Request form submitted:', { phone });
            
            // Redirect to thanks page
            window.location.href = 'thanks.html';
        });
    }
});

