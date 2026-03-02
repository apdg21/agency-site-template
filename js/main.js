// Main JavaScript file for InboxIgnite

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('nav-open');
        });
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('nav-open');
    });
    
    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
}

// Template preview functionality (used on templates page)
function initTemplatePreview() {
    const bothBtn = document.getElementById('viewBothBtn');
    const mobBtn = document.getElementById('viewMobileBtn');
    const deskBtn = document.getElementById('viewDesktopBtn');
    const previewArea = document.getElementById('templatePreviewArea');
    
    if (!bothBtn || !mobBtn || !deskBtn || !previewArea) return;
    
    // Email content generator
    function renderEmailContent() {
        return `
            <div class="email-preview">
                <div class="email-header">
                    <span class="email-logo"><i class="fas fa-bolt"></i> FLASHSALE</span>
                    <span style="color:#526e85;">✨ 30% off everything</span>
                </div>
                <div class="email-body">
                    <h2>your weekly edit</h2>
                    <p style="font-size: 16px;">Hi Olivia, new arrivals just dropped. And yes — they're all on sale.</p>
                    <div class="product-grid">
                        <div class="product-item"><i class="fas fa-tshirt"></i> <br><strong>Linen tee</strong></div>
                        <div class="product-item"><i class="fas fa-shoe-prints"></i> <br><strong>Runners</strong></div>
                        <div class="product-item"><i class="fas fa-hat-cowboy"></i> <br><strong>Cap</strong></div>
                    </div>
                    <a href="#" class="button">SHOP THE SALE →</a>
                    <div class="footer-note">
                        <p>you're receiving this because you're awesome. <a href="#">unsubscribe</a></p>
                        <p>© 2025 InboxIgnite Demo</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function mobileFrame() {
        return `<div class="mockup-iphone"><div class="mockup-screen">${renderEmailContent()}</div></div>`;
    }
    
    function desktopFrame() {
        return `<div class="desktop-frame">${renderEmailContent()}</div>`;
    }
    
    function renderTemplates(viewMode) {
        if (viewMode === 'both') {
            previewArea.innerHTML = mobileFrame() + desktopFrame();
        } else if (viewMode === 'mobile') {
            previewArea.innerHTML = mobileFrame();
        } else if (viewMode === 'desktop') {
            previewArea.innerHTML = desktopFrame();
        }
    }
    
    // Set active button
    const setActive = (btn) => {
        [bothBtn, mobBtn, deskBtn].forEach(b => b.classList.remove('active-view'));
        btn.classList.add('active-view');
    };
    
    // Event listeners
    bothBtn.onclick = () => { 
        setActive(bothBtn); 
        renderTemplates('both'); 
    };
    
    mobBtn.onclick = () => { 
        setActive(mobBtn); 
        renderTemplates('mobile'); 
    };
    
    deskBtn.onclick = () => { 
        setActive(deskBtn); 
        renderTemplates('desktop'); 
    };
    
    // Initial render
    renderTemplates('both');
}

// Contact form handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('📨 Thank you for your message! (Demo: this would be sent to the agency)');
        contactForm.reset();
    });
}

// Set active navigation based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    setActiveNav();
    initTemplatePreview();
    initContactForm();
    
    // Add smooth scrolling ONLY for internal anchor links that aren't modal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip if it's the modal link or has btn-full class
        if (anchor.id === 'fullTemplateLink' || anchor.classList.contains('btn-full')) {
            return; // Skip this anchor
        }
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});