// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== TYPING ANIMATION ==========
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ['Front-End Developer', 'UI/UX Designer', 'Web Developer', 'Problem Solver'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start typing animation
    setTimeout(type, newTextDelay + 250);
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuBtn = document.querySelector('.menu-btn');
    const navLink = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLink.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // ========== SKILL BARS ANIMATION ==========
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(skill => {
            // Reset width to 0 first
            skill.style.width = '0';
            
            // Get the target width from the class
            let targetWidth = 0;
            if(skill.classList.contains('html')) targetWidth = '95%';
            else if(skill.classList.contains('css')) targetWidth = '90%';
            else if(skill.classList.contains('js')) targetWidth = '85%';
            else if(skill.classList.contains('react')) targetWidth = '80%';
            else if(skill.classList.contains('git')) targetWidth = '85%';
            else if(skill.classList.contains('figma')) targetWidth = '75%';
            else if(skill.classList.contains('python')) targetWidth = '80%';
            else if(skill.classList.contains('node')) targetWidth = '70%';
            
            // Animate to target width
            setTimeout(() => {
                skill.style.width = targetWidth;
            }, 300);
        });
    }
    
    // Animate skill bars when they come into view
    const skillsSection = document.getElementById('skills');
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);
    
    // ========== PROJECTS DATA AND FILTERING ==========
    const projectsData = [
        {
            id: 1,
            title: "E-Commerce Website",
            description: "A fully responsive e-commerce platform with shopping cart, product filtering, and payment integration.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["web", "design"],
            github: "#",
            live: "#"
        },
        {
            id: 2,
            title: "Weather App",
            description: "Real-time weather application with location detection and 7-day forecast using OpenWeather API.",
            image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["web", "mobile"],
            github: "#",
            live: "#"
        },
        {
            id: 3,
            title: "Task Manager",
            description: "Productivity app with drag-and-drop functionality, task categorization, and progress tracking.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["web", "design"],
            github: "#",
            live: "#"
        },
        {
            id: 4,
            title: "Fitness Tracker",
            description: "Mobile application for tracking workouts, calories, and progress with interactive charts.",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["mobile", "design"],
            github: "#",
            live: "#"
        },
        {
            id: 5,
            title: "Portfolio Website",
            description: "Modern portfolio website with dark/light mode, animations, and responsive design.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["web", "design"],
            github: "#",
            live: "#"
        },
        {
            id: 6,
            title: "Recipe Finder",
            description: "Web application for finding recipes by ingredients with step-by-step instructions.",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["web", "mobile"],
            github: "#",
            live: "#"
        }
    ];
    
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Function to render projects
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.tags.includes(filter));
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.tags.join(' '));
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> Code
                        </a>
                        <a href="${project.live}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Initialize projects
    renderProjects();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            renderProjects(filter);
        });
    });
    
    // ========== FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        
        // Reset form
        this.reset();
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== NEWSLETTER SUBMISSION ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterBtn = newsletterForm.querySelector('button');
    
    newsletterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = newsletterInput.value;
        if (email && validateEmail(email)) {
            alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
            newsletterInput.value = '';
        } else {
            alert('Please enter a valid email address.');
            newsletterInput.focus();
        }
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .skills-category, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.about-content, .skills-category, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ========== THEME TOGGLE (Optional) ==========
    // Uncomment to add dark/light mode toggle
    
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    document.querySelector('.nav-container').appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
    
});