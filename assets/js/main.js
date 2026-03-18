(function(){
    'use strict';
    let twTimer    = null;
    let currentLang = localStorage.getItem('lang') || 'es';

    const phrases = {
        es: ['Desarrollador backend .NET', 'Arquitectura limpia', 'Microservicios', 'Rendimiento de SQL Server', 'Desarrollo de API'],
        en: ['.NET Backend Developer', 'Clean Architecture', 'Microservices',  'SQL Server Performance', 'API Development'],
    };

    /* ═══════════════════════════════════════════════════════
        1. DARK MODE
    ═══════════════════════════════════════════════════════ */
    function applyDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        document.querySelectorAll('.dark-mode-toggle i').forEach(i => {
            i.className = enabled ? 'fas fa-sun' : 'fas fa-moon';
        });
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    }

    applyDarkMode(localStorage.getItem('darkMode') === 'enabled');

    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
        btn.addEventListener('click', () =>
            applyDarkMode(!document.body.classList.contains('dark-mode'))
        );
    });

    /* ═══════════════════════════════════════════════════════
        2. TRANSLATIONS
    ═══════════════════════════════════════════════════════ */
    const T = {
        es: {
            'nav.inicio'       : 'Inicio',
            'nav.experiencia'  : 'Experiencia',
            'nav.habilidades'  : 'Habilidades',
            'nav.portafolio'   : 'Proyectos',
            'nav.contacto'     : 'Contacto',
            'hero.btn.contact' : 'Contáctame',
            'hero.btn.cv'      : 'Descargar CV',
            'hero.btn.certs'   : 'Certificados',
            'section.perfil'   : 'Perfil',
            'section.ventaja'  : 'Ventaja competitiva',
            'section.exp'      : 'Experiencia profesional',
            'section.skills'   : 'Conocimientos técnicos',
            'section.projects' : 'Proyectos destacados',
            'section.education': 'Formación',
            'section.contact'  : 'Contacto',
            'perfil.text'      : 'Desarrollador Backend .NET con más de 3 años de experiencia en el sector asegurador, especializado en el diseño de APIs, procesamiento de datos críticos a gran escala y modernización de sistemas legacy hacia arquitecturas limpias y desacopladas. Experiencia práctica aplicando Clean Architecture, principios SOLID y patrones de microservicios para construir sistemas mantenibles, testables y preparados para escalar. Sólido dominio de SQL Server, incluyendo optimización de consultas complejas y diseño de índices con impacto medible en rendimiento. Integrar Inteligencia Artificial de forma aplicada: desde el uso de modelos de lenguaje para automatizar flujos de negocio (Groq, Twilio) hasta el apoyo en generación de documentación técnica y revisión de código.',
            'adv.ins.title'    : 'Especialización en sistemas críticos del sector asegurador',
            'adv.ins.desc'     : 'Conocimiento profundo de procesos de negocio de seguros (gestión de pólizas masivas, ETL de datos de asegurados, integración multicanal), lo que permite entregar soluciones técnicas alineadas al dominio sin curva de aprendizaje de negocio.',
            'adv.perf.title'   : 'Modernización de sistemas legacy',
            'adv.perf.desc'    : 'Experiencia migrando pipelines ETL basados en SSIS hacia arquitecturas modernas basadas en APIs REST y Clean Architecture, reduciendo deuda técnica y mejorando la mantenibilidad de los sistemas.',
            'adv.ai.title'     : 'Integración aplicada de Inteligencia Artificial',
            'adv.ai.desc'      : 'Experiencia desarrollando prototipos funcionales que integran modelos de lenguaje en flujos de negocio, como automatización de ventas mediante WhatsApp utilizando .NET, Twilio y APIs de IA.',
            //experiencia profesional
            'exp2.title'       : 'Backend Developer .NET',
            'exp2.date'        : 'Ene 2023 – Dic 2025',
            'exp2.b1'          : 'Diseño y mantenimiento de API REST y servicios SOAP para un sistema de gestión de pólizas a gran escala que procesa datos críticos de seguros para miles de asegurados.',
            'exp2.b2'          : 'Optimización de consultas complejas de SQL Server y procedimientos almacenados, reduciendo el tiempo de procesamiento por lotes en aproximadamente un 40% en operaciones de carga masiva de pólizas mediante el análisis del plan de ejecución y el diseño del índice de cobertura.',
            'exp2.b3'          : 'Desarrollo de pipelines ETL mediante SSIS (SQL Server Integration Services) para la ingesta y transformación automatizada de datos.',
            'exp2.b4'          : 'Diseño e implementación de la migración de pipelines ETL legacy basados en SSIS hacia APIs REST desarrolladas en .NET bajo Clean Architecture (Integration, Domain, Infrastructure y WebApi), mejorando el rendimiento, la mantenibilidad y la escalabilidad del sistema.',
            'exp2.b5'          : 'Integración de Google Maps API (Geocoding & Places) en el flujo de ventas de pólizas domiciliarias, garantizando la existencia física del 100% de los domicilios registrados y eliminando errores de ubicación en la emisión de riesgos críticos.',
            'exp2.b6'          : 'Desarrollo de un prototipo de automatización de ventas con IA, utilizando .NET Core, Twilio y modelos de lenguaje (Groq) para procesar datos mínimos requeridos, acelerando la velocidad de emisión de pólizas mediante un flujo conversacional inteligente.',
            'exp2.b7'          : 'Entrega de documentación de API mediante Swagger y gestión de la entrega ágil mediante Jira y Confluence.',
            'exp2.stack'       : 'Entorno tecnológico:',
            'exp2.stack.desc'  : '.NET Framework, .NET Core, C#, SQL Server, SSIS, ASP.NET Web API, SOAP, JavaScript, Bootstrap, Google Maps API, Twilio, Groq AI, Jira, Confluence.',
            'exp1.title'       : 'Practicante - Analista de Documentación',
            'exp1.date'        : 'Ago 2022 – Dic 2022',
            'exp1.b1'          : 'Definición de requisitos funcionales y no funcionales para proyectos de software utilizando la metodología Scrum.',
            'exp1.b2'          : 'Elaboración de diagramas de arquitectura técnica y documentación del sistema alineados con los flujos de trabajo del equipo de desarrollo.',
            'exp1.b3'          : 'Desempeño del cargo de Scrum Master durante un sprint completo (4 semanas), facilitando ceremonias y eliminando obstáculos del equipo.',
            'exp1.b4'          : 'Colaboración con el equipo de desarrollo en la gestión de historias de usuario, backlog y documentación funcional para mejorar la comunicación entre las áreas de negocio y tecnología.',
            'exp1.stack'       : 'Entorno tecnológico:',
            'exp1.stack.desc'  : 'Scrum, Trello, Diagramas de arquitectura, Documentación técnica, Gestión de requisitos.',
            //seccion de skills
            'skills.b1'        : 'Avanzado',
            'skills.b2'        : 'Intermedio',
            'skills.b3'        : 'Básico',
            //proyectos
            'projects.more'    : 'Puedes ver más en mi',
            'filter.all'       : 'Todos',
            'proj.roadmap.desc': 'Ruta de aprendizaje interactiva de 24 semanas. Visualiza semanas de estudio con recursos y ejercicios.',
            'proj.enc.name'    : 'Encriptamiento RSA',
            'proj.enc.desc'    : 'Aplicación de escritorio para encriptar y desencriptar texto usando algoritmos simétricos.',
            'proj.wa.name'     : 'Flujo WhatsApp Agent IA',
            'proj.wa.desc'     : 'Agente automatizado para consultas SOAT vía WhatsApp con integración de APIs y modelos de IA.',
            'proj.pdf.name'    : 'Generador HTML a PDF',
            'proj.pdf.desc'    : 'Utilidad en C# para convertir documentos HTML a PDF. Ideal para reportes y facturas.',
            'proj.port.desc'   : 'Versiones de mi portafolio profesional. Diseño responsive y minimalista.',
            'proj.inv.name'    : 'Invitación de Cumpleaños',
            'proj.inv.desc'    : 'Tarjeta de cumpleaños interactiva y responsive con animaciones CSS suaves.',
            'proj.scinv.name'  : 'Sistema Control Inventario',
            'proj.scinv.desc'  : 'Aplicación web para gestión de inventarios con panel administrativo y base de datos.',
            'proj.eco.name'    : 'Sistema Ecommerce PHP',
            'proj.eco.desc'    : 'Estructura básica de un ecommerce con PHP y CSS. Flujos de compra y sesiones.',
            'proj.laptops.name': 'Venta Laptops JavaWeb',
            'proj.laptops.desc': 'Tienda de laptops con carrito de compras, sesiones y base de datos MySQL.',
            'proj.pension.name': 'Pago pensión JavaSwing',
            'proj.pension.desc': 'Aplicación de escritorio para administrar pagos de pensiones con interfaz Java Swing.',
            'proj.farm.name'   : 'Mini Factura Farmacia Java',
            'proj.farm.desc'   : 'App de escritorio en Java para generar facturas básicas de productos de una farmacia.',
            'proj.py.name'     : 'Ejercicios de Python',
            'proj.py.desc'     : 'Colección de scripts y ejercicios prácticos para afianzar conceptos del lenguaje.',
            //Formación
            'edu.degree'       : 'Técnico en Desarrollo de Software',
            'edu.cert'         : 'Título Profesional',
            //Contacto
            'form.email'       : 'Correo electrónico',
            'form.subject'     : 'Asunto',
            'form.message'     : 'Mensaje',
            'form.send'        : 'Enviar mensaje',
            //Footer           
            'footer.copy'      : '© 2026 Jose Luis Chavesta Rivas · Desarrollador Backend .NET'
        },
        en: {
            'nav.inicio'       : 'Home',
            'nav.experiencia'  : 'Experience',
            'nav.habilidades'  : 'Skills',
            'nav.portafolio'   : 'Projects',
            'nav.contacto'     : 'Contact',
            'hero.btn.contact' : 'Contact Me',
            'hero.btn.cv'      : 'Download CV',
            'hero.btn.certs'   : 'Certificates',
            'section.perfil'   : 'Profile',
            'section.ventaja'  : 'Competitive Edge',
            'section.exp'      : 'Professional Experience',
            'section.skills'   : 'Technical Skills',
            'section.projects' : 'Featured Projects',
            'section.education': 'Education',
            'section.contact'  : 'Contact',
            'perfil.text'      : '.NET Backend Developer with over 3 years of experience in the insurance industry, specializing in API design, large-scale processing of critical data, and the modernization of legacy systems into clean, decoupled architectures. Hands-on experience applying Clean Architecture, SOLID principles, and microservices patterns to build maintainable, testable, and scalable systems. Strong proficiency in SQL Server, including optimizing complex queries and designing indexes with a measurable impact on performance. Integrating Artificial Intelligence in practical applications: from using language models to automate business workflows (Groq, Twilio) to supporting technical documentation generation and code review.',
            'adv.ins.title'    : 'Specialization in Critical Systems in the Insurance Industry',
            'adv.ins.desc'     : 'In-depth knowledge of insurance business processes (bulk policy management, policyholder data ETL, multichannel integration), enabling the delivery of technical solutions tailored to the domain without the need for a business learning curve.',
            'adv.perf.title'   : 'Modernization of legacy systems',
            'adv.perf.desc'    : 'Experience migrating SSIS-based ETL pipelines to modern architectures based on REST APIs and Clean Architecture, reducing technical debt and improving system maintainability.',
            'adv.ai.title'     : 'Applied Artificial Intelligence Integration',
            'adv.ai.desc'      : 'Experience developing functional prototypes that integrate language models into business workflows, such as sales automation via WhatsApp using .NET, Twilio, and AI APIs.',
            //Professional Experience
            'exp2.title'       : 'Backend Developer .NET',
            'exp2.date'        : 'Jan 2023 – Dec 2025',
            'exp2.b1'          : 'Design and maintenance of REST APIs and SOAP services for a large-scale policy management system that processes critical insurance data for thousands of policyholders.',
            'exp2.b2'          : 'Optimization of complex SQL Server queries and stored procedures, reducing batch processing time by approximately 40% in bulk policy loading operations through execution plan analysis and the design of covering indexes.',
            'exp2.b3'          : 'Development of ETL pipelines using SSIS (SQL Server Integration Services) for automated data ingestion and transformation.',
            'exp2.b4'          : 'Design and implementation of the migration of legacy SSIS-based ETL pipelines to REST APIs developed in .NET using Clean Architecture (Integration, Domain, Infrastructure, and WebAPI), improving the system’s performance, maintainability, and scalability.',
            'exp2.b5'          : 'Integration of the Google Maps API (Geocoding & Places) into the sales process for home insurance policies, ensuring that 100% of registered addresses are physically valid and eliminating location errors when underwriting high-risk policies.',
            'exp2.b6'          : 'Development of an AI-powered sales automation prototype using .NET Core, Twilio, and language models (Groq) to process the minimum required data, thereby accelerating policy issuance through an intelligent conversational workflow.',
            'exp2.b7'          : 'Delivery of API documentation via Swagger and agile delivery management using Jira and Confluence.',
            'exp2.stack'       : 'Technology environment:',
            'exp2.stack.desc'  : '.NET Framework, .NET Core, C#, SQL Server, SSIS, ASP.NET Web API, SOAP, JavaScript, Bootstrap, Google Maps API, Twilio, Groq AI, Jira, Confluence.',
            'exp1.title'       : 'Practicing - Documentation Analyst',
            'exp1.date'        : 'Aug 2022 – Dec 2022',
            'exp1.b1'          : 'Defining functional and non-functional requirements for software projects using the Scrum methodology.',
            'exp1.b2'          : 'Development of technical architecture diagrams and system documentation aligned with the development team'+"'"+'s workflows.',
            'exp1.b3'          : 'Served as Scrum Master for an entire sprint (4 weeks), facilitating ceremonies and removing obstacles for the team.',
            'exp1.b4'          : 'Collaborate with the development team on managing user stories, the backlog, and functional documentation to improve communication between the business and technology teams.',
            'exp1.stack'       : 'Technology environment:',
            'exp1.stack.desc'  : 'Scrum, Trello, Architecture diagrams, Technical documentation, Requirements management.',
            //section skills
            'skills.b1'        : 'Advanced',
            'skills.b2'        : 'Intermediate',
            'skills.b3'        : 'Basic',
            //Projects
            'projects.more'    : 'You can see more on my',
            'filter.all'       : 'All',
            'proj.roadmap.desc': 'A 24-week interactive learning path. View the weekly study schedule, including resources and exercises.',
            'proj.enc.name'    : 'RSA encryption',
            'proj.enc.desc'    : 'Desktop application for encrypting and decrypting text using symmetric algorithms.',
            'proj.wa.name'     : 'WhatsApp AI Agent Workflow',
            'proj.wa.desc'     : 'Automated agent for SOAT inquiries via WhatsApp with API integration and AI models.',
            'proj.pdf.name'    : 'HTML to PDF Converter',
            'proj.pdf.desc'    : 'A C# utility for converting HTML documents to PDF. Ideal for reports and invoices.',
            'proj.port.desc'   : 'Versions of my professional portfolio. Responsive and minimalist design.',
            'proj.inv.name'    : 'Birthday Invitation',
            'proj.inv.desc'    : 'An interactive, responsive birthday card with smooth CSS animations.',
            'proj.scinv.name'  : 'Inventory Control System',
            'proj.scinv.desc'  : 'Web application for inventory management with an administrative dashboard and database.',
            'proj.eco.name'    : 'PHP E-commerce System',
            'proj.eco.desc'    : 'Basic structure of an e-commerce site using PHP and CSS. Purchase flows and sessions.',
            'proj.laptops.name': 'LaptopStore JavaWeb',
            'proj.laptops.desc': 'Laptop store with a shopping cart, user accounts, and a MySQL database.',
            'proj.pension.name': 'JavaSwing Pension Payment',
            'proj.pension.desc': 'Desktop application for managing pension payments with a Java Swing interface.',
            'proj.farm.name'   : 'Java Pharmacy Mini Receipt',
            'proj.farm.desc'   : 'A Java desktop app for generating basic invoices for pharmacy products.',
            'proj.py.name'     : 'Python Exercises',
            'proj.py.desc'     : 'A collection of scripts and practical exercises to reinforce language concepts.',
            //Education
            'edu.degree'       : 'Software Development Technician',
            'edu.cert'         : 'Professional Certificate',
            //Contact
            'form.email'       : 'Email address',
            'form.subject'     : 'Subject',
            'form.message'     : 'Message',
            'form.send'        : 'Send Message',
            //Footer           
            'footer.copy'      : '© 2026 Jose Luis Chavesta Rivas · .NET Backend Developer'
        }
    };

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = T[lang][el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const v = T[lang][el.dataset.i18nPh];
            if (v !== undefined) el.placeholder = v;
        });

        document.querySelectorAll('.lang-toggle').forEach(btn => {
            btn.textContent = lang === 'es' ? 'EN' : 'ES';
        });

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = lang === 'en'
            ? 'Backend .NET Developer | Clean Architecture | SQL Server  | Microservices | 3+ years enterprise experience'
            : 'Desarrollador Backend .NET | Arquitectura Limpia | SQL Server | Microservicios | 3+ años experiencia enterprise';

        document.title = lang === 'en'
            ? 'Jose Luis Chavesta Rivas · .NET Backend Developer'
            : 'Jose Luis Chavesta Rivas · Desarrollador Backend .NET';

        initTypewriter(lang);
    }

    document.querySelectorAll('.lang-toggle').forEach(btn =>
        btn.addEventListener('click', () => applyLang(currentLang === 'es' ? 'en' : 'es'))
    );

    applyLang(currentLang);

    /* ═══════════════════════════════════════════════════════
        3. TYPEWRITER
    ═══════════════════════════════════════════════════════ */
    function initTypewriter(lang) {
        const el = document.getElementById('typewriter');
        if (!el) return;
        clearTimeout(twTimer);
        el.textContent = '';
        let idx = 0, charIdx = 0, deleting = false;

        function tick() {
            const list   = phrases[lang] || phrases.es;
            const phrase = list[idx];
            if (deleting) {
                el.textContent = phrase.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) { deleting = false; idx = (idx + 1) % list.length; twTimer = setTimeout(tick, 450); return; }
                twTimer = setTimeout(tick, 38);
            } else {
                el.textContent = phrase.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === phrase.length) { twTimer = setTimeout(() => { deleting = true; tick(); }, 2200); return; }
                twTimer = setTimeout(tick, 75);
            }
        }
        tick();
    }

    /* ═══════════════════════════════════════════════════════
        4. PROJECT TECH FILTER
    ═══════════════════════════════════════════════════════ */
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const projectCols = document.querySelectorAll('.project-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            projectCols.forEach(col => {
                const match = filter === 'all' || (col.dataset.tech || '').split(' ').includes(filter);
                col.classList.toggle('filter-hidden',  !match);
                col.classList.toggle('filter-visible',  match);
            });
        });
    });

    /* ═══════════════════════════════════════════════════════
        5. SKELETON + IMAGE FALLBACK
    ═══════════════════════════════════════════════════════ */
    document.querySelectorAll('.project-carousel').forEach(carousel => {
        const icon  = carousel.dataset.icon || 'fa-code';
        carousel.querySelectorAll('.carousel-item').forEach((item, idx) => {
            const img = item.querySelector('img');
            if (!img) return;
            item.classList.add('img-skeleton');
            const onLoad  = () => item.classList.remove('img-skeleton');
            const onError = () => {
                item.classList.remove('img-skeleton');
                if (idx === 0) {
                    const ph = document.createElement('div');
                    ph.className = 'project-card-placeholder d-flex align-items-center justify-content-center';
                    ph.innerHTML = `<i class="fas ${icon} fa-3x"></i>`;
                    carousel.replaceWith(ph);
                } else {
                    item.remove();
                    rebuildIndicators(carousel);
                }
            };
            img.complete ? (img.naturalWidth === 0 ? onError() : onLoad()) : (img.addEventListener('load', onLoad, {once:true}), img.addEventListener('error', onError, {once:true}));
        });
    });

    function rebuildIndicators(carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const wrap  = carousel.querySelector('.carousel-indicators');
        if (!wrap) return;
        wrap.innerHTML = '';
        items.forEach((_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.bsTarget  = '#' + carousel.id;
            b.dataset.bsSlideTo = i;
            if (i === 0) { b.classList.add('active'); b.setAttribute('aria-current', 'true'); }
            wrap.appendChild(b);
        });
        if (items.length <= 1) wrap.remove();
    }

    /* ═══════════════════════════════════════════════════════
        6. BACK TO TOP
    ═══════════════════════════════════════════════════════ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ═══════════════════════════════════════════════════════
        7. SMOOTH SCROLL + CLOSE MOBILE NAVBAR
    ═══════════════════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#demo') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth' });
            const nav = document.getElementById('navbarNav');
            if (nav && nav.classList.contains('show')) bootstrap.Collapse.getInstance(nav)?.hide();
        });
    });

    /* ═══════════════════════════════════════════════════════
        8. CONTACT FORM
    ═══════════════════════════════════════════════════════ */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fb = document.getElementById('formFeedback');
            fetch(contactForm.action, {
                method : contactForm.method,
                body   : new FormData(contactForm),
                headers: { Accept: 'application/json' }
            }).then(res => {
                contactForm.reset();
                fb.className  = 'mt-3 text-center ' + (res.ok ? 'text-success' : 'text-danger');
                fb.textContent = res.ok
                    ? (currentLang === 'en' ? 'Thanks! I\'ll get back to you soon.' : 'Gracias por contactarme, te escribiré pronto.')
                    : (currentLang === 'en' ? 'Error sending message. Please try again.' : 'Error al enviar. Inténtalo de nuevo.');
            }).catch(() => {
                const fb2 = document.getElementById('formFeedback');
                fb2.className  = 'mt-3 text-center text-danger';
                fb2.textContent = currentLang === 'en' ? 'Network error.' : 'Error de red.';
            });
        });
    }

})();