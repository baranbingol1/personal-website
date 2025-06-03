// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(0)';
        navbar.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
});

// Research projects data
const researchProjects = [
    {
        title: "Hittite Cuneiform Tablet Reader",
        description: "Developed an AI system to automatically transcribe Hittite cuneiform tablets and build a syllable dictionary.",
        achievements: [
            "Designed a cuneiform sign classifier achieving 93.5% accuracy on 181 labels",
            "Integrated object detection models for recognizing cuneiform signs, contributing to the automation of an ancient script's transcription process"
        ],
        links: [
            {
                text: "Read Paper",
                url: "https://dergipark.org.tr/en/download/article-file/3718064",
                icon: "fas fa-file-pdf"
            }
        ],
        tags: ["Deep Learning", "Computer Vision", "Historical AI"]
    },
    {
        title: "Face Shape Detection System",
        description: "Developed a state-of-the-art face shape detection system that was implemented in a college AI community event.",
        achievements: [
            "Created an accurate face shape classification system",
            "Successfully deployed in a real-world AI community event"
        ],
        links: [
            {
                text: "View Code",
                url: "https://github.com/baranbingol1/face-and-face-shape-detection",
                icon: "fab fa-github"
            }
        ],
        tags: ["Computer Vision", "Deep Learning", "Face Detection"]
    },
    {
        title: "IMDB Top 250 Movies Sentiment Analysis",
        description: "Conducted sentiment analysis on IMDB Top 250 Movies quotes, contributing to cross-disciplinary academic research.",
        achievements: [
            "Analyzed sentiment patterns in top-rated movie quotes",
            "Research published in academic journal"
        ],
        links: [
            {
                text: "Read Paper",
                url: "https://dergipark.org.tr/en/pub/veri/issue/81532/1285391",
                icon: "fas fa-file-alt"
            }
        ],
        tags: ["NLP", "Sentiment Analysis", "Data Science"]
    }
];

// Populate research grid
const researchGrid = document.querySelector('.research-grid');
researchProjects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'research-item';
    
    const achievementsList = project.achievements
        .map(achievement => `<li>${achievement}</li>`)
        .join('');
        
    const linksList = project.links
        .map(link => `
            <a href="${link.url}" target="_blank" class="project-link">
                <i class="${link.icon}"></i> ${link.text}
            </a>
        `)
        .join('');

    projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="achievements-list">
            ${achievementsList}
        </ul>
        <div class="project-links">
            ${linksList}
        </div>
        <div class="tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    researchGrid.appendChild(projectElement);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
});
