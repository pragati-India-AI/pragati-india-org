// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class and observe elements
const animateElements = document.querySelectorAll(
    '.service-card, .solution-card, .testimonial-card, .process-step, .feature'
);

animateElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i % 3 * 0.1}s, transform 0.5s ease ${i % 3 * 0.1}s`;
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Contact form handling — submits to backend server to send email
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Collect form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('entry.2020993141'),
        email: formData.get('entry.1766187341'),
        phone: formData.get('entry.1435237760'),
        inquiry: formData.get('entry.366736841'),
        message: formData.get('entry.838248928')
    };

    try {
        const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            btn.textContent = 'Inquiry Sent!';
            btn.style.background = '#22c55e';
            btn.style.borderColor = '#22c55e';
            contactForm.reset();
        } else {
            btn.textContent = 'Error! Try Again';
            btn.style.background = '#ef4444';
            btn.style.borderColor = '#ef4444';
        }
    } catch (err) {
        btn.textContent = 'Error! Try Again';
        btn.style.background = '#ef4444';
        btn.style.borderColor = '#ef4444';
    }

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
    }, 3000);
});

// Animate metric bars on scroll
const metricsCard = document.querySelector('.metrics-card');
if (metricsCard) {
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.metric-fill').forEach(fill => {
                    fill.style.animation = 'none';
                    fill.offsetHeight; // trigger reflow
                    fill.style.animation = 'fillBar 1.5s ease-out forwards';
                });
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    metricsObserver.observe(metricsCard);
}
