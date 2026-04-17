/**
 * i18n.js — Internationalization
 * Handles ID/EN translations and toggle logic via APP namespace.
 */
(function () {
    const translations = {
        id: {
            nav_about: "Tentang Saya", nav_skills: "Keahlian", nav_portfolio: "Portfolio", nav_mentoring: "Mentoring", nav_blog: "Blog", nav_contact: "Hubungi Saya",
            hero_badge: "Open for Freelance & Mentoring", hero_greeting: "Halo, saya Putra.", hero_role: "Full Stack Dev", hero_subrole: "& Mentor Code", hero_desc: "Saya membantu bisnis membangun aplikasi web yang modern, cepat, dan scalable. Selain itu, saya bersemangat membimbing developer baru untuk menguasai dunia pemrograman.",
            btn_portfolio: "Lihat Portfolio", btn_learn: "Belajar dengan Saya", stack_title: "Teknologi yang saya gunakan",
            stat_exp: "Tahun Pengalaman", stat_proj: "Proyek Selesai", stat_mentee: "Mentee Dibimbing", stat_satisfaction: "Kepuasan Klien",
            exp_title: "Perjalanan", exp_subtitle: "Karir", exp_desc: "Rekam jejak pengalaman profesional saya dalam pengembangan IT, web development, dan edukasi.",
            exp_1_desc: "Mengajar siswa tentang dasar-dasar pemrograman dan pengembangan aplikasi. Membimbing siswa memahami logika coding, algoritma, dan best practices industri melalui pendekatan berbasis proyek nyata.",
            exp_2_desc: "Membangun aplikasi web dari sisi front-end dan back-end. Menangani fitur keamanan sistem dan pemrosesan data. Berkolaborasi dalam tim untuk pengembangan MVP berbasis Laravel dan React.",
            exp_3_desc: "Mengelola dan merawat peralatan komputer serta jaringan kantor desa. Membantu digitalisasi data kependudukan dan surat-menyurat, serta menangani troubleshooting hardware dan software harian.",
            exp_4_desc: "Mengerjakan berbagai proyek website custom (WordPress, Laravel, React). Berpengalaman membuat profil profesional, profil perusahaan, hingga landing page UMKM dengan desain UI/UX mobile-first yang responsif.",
            projects_title: "Karya &", projects_desc: "Beberapa proyek terpilih yang telah saya kerjakan, mulai dari aplikasi SaaS, dashboard manajemen, hingga landing page interaktif.", projects_link: "Lihat Github Saya",
            proj_1_desc: "Platform kursus bahasa Inggris dengan sistem manajemen pendaftaran dan informasi program terpadu.", proj_2_desc: "Aplikasi menu digital cerdas untuk kafe dan restoran dengan fitur pemesanan interaktif via QR Code.", proj_3_desc: "Platform ujian online (Computer Based Test) modern dengan fitur pengawasan dan analitik nilai real-time.",
            mentor_title_1: "Belajar Coding", mentor_title_2: "Langsung Dari Ahlinya", mentor_desc: "Bosan belajar dari tutorial video yang pasif? Saya menawarkan mentoring 1-on-1 di mana kita akan bedah kode, membangun proyek nyata, dan mempersiapkan karir Anda.",
            mentor_point_1: "Kurikulum disesuaikan dengan level Anda", mentor_point_2: "Code Review mendalam (Clean Code & Best Practice)", mentor_point_3: "Persiapan interview kerja & portofolio", btn_schedule: "Jadwalkan Sesi Gratis",
            testimonial_1: "\"Bang Putra bukan cuma ngajarin syntax, tapi cara berpikir sebagai engineer. Berkat mentoringnya, saya berhasil switch career dalam 3 bulan!\"", testimonial_2: "\"Penjelasan yang sangat jelas dan mudah dipahami. Code review-nya detail banget, saya jadi paham pentingnya clean code.\"",
            blog_title: "Artikel &", blog_subtitle: "Wawasan", blog_desc: "Berbagi pengetahuan seputar teknologi web, tips programming, dan karir developer untuk membantu Anda berkembang.", read_more: "Baca Selengkapnya",
            blog_1_excerpt: "Panduan lengkap meningkatkan Core Web Vitals pada aplikasi Next.js Anda menggunakan image optimization dan dynamic imports.", blog_2_title: "Tips Lolos Interview Full Stack Developer", blog_2_excerpt: "Bocoran pertanyaan teknis yang sering muncul saat interview di startup unicorn dan cara menjawabnya dengan tepat.", blog_3_title: "Mengapa TypeScript Wajib di 2024?", blog_3_excerpt: "Alasan mengapa Anda harus mulai migrasi dari JavaScript ke TypeScript untuk skalabilitas project jangka panjang.",
            contact_title: "Mari Bekerja Sama", contact_desc: "Punya ide proyek menarik? Atau ingin meningkatkan skill coding Anda? Jangan ragu untuk menyapa.", btn_email: "Kirim Email",
            footer_bio: "Full Stack Developer & Mentor.\nMembangun produk digital berkualitas tinggi.", footer_nav: "Navigasi", footer_services: "Layanan", made_with: "Dibuat dengan", and_coffee: "dan Kopi.", status_available: "Available for projects"
        },
        en: {
            nav_about: "About Me", nav_skills: "Skills", nav_portfolio: "Portfolio", nav_mentoring: "Mentoring", nav_blog: "Blog", nav_contact: "Contact Me",
            hero_badge: "Open for Freelance & Mentoring", hero_greeting: "Hello, I'm Putra.", hero_role: "Full Stack Dev", hero_subrole: "& Code Mentor", hero_desc: "I help businesses build modern, fast, and scalable web applications. Additionally, I am passionate about guiding new developers to master the world of programming.",
            btn_portfolio: "View Portfolio", btn_learn: "Learn with Me", stack_title: "Technologies I Use",
            stat_exp: "Years Experience", stat_proj: "Projects Completed", stat_mentee: "Mentees Guided", stat_satisfaction: "Client Satisfaction",
            exp_title: "Career", exp_subtitle: "Journey", exp_desc: "My professional track record in IT development, web development, and education.",
            exp_1_desc: "Teaching students about the basics of programming and application development. Guide students to understand coding logic, algorithms, and industry best practices through a project-based approach.",
            exp_2_desc: "Building web applications from the front-end and back-end. Handling system security features and data processing. Team collaboration for Laravel and React-based MVP development.",
            exp_3_desc: "Manage and maintain village office computer equipment and network. Assist in digitizing population data and correspondence. Handle daily troubleshooting for hardware and software.",
            exp_4_desc: "Working on various custom website projects (WordPress, Laravel, React). Experienced in creating professional profiles, company profiles, to MSME landing pages with responsive, mobile-first UI/UX design.",
            projects_title: "Works &", projects_desc: "Selected projects I've worked on, ranging from SaaS applications, management dashboards, to interactive landing pages.", projects_link: "View My Github",
            proj_1_desc: "English course platform with an integrated registration management and program information system.", proj_2_desc: "Smart digital menu application for cafes and restaurants featuring interactive QR Code ordering.", proj_3_desc: "Modern Computer Based Test (CBT) platform with real-time proctoring and grade analytics features.",
            mentor_title_1: "Learn Coding", mentor_title_2: "Directly from Experts", mentor_desc: "Tired of passive video tutorials? I offer 1-on-1 mentoring where we dissect code, build real projects, and prepare for your career.",
            mentor_point_1: "Curriculum tailored to your level", mentor_point_2: "Deep Code Review (Clean Code & Best Practice)", mentor_point_3: "Job interview preparation & portfolio", btn_schedule: "Schedule Free Session",
            testimonial_1: "\"Putra doesn't just teach syntax, but how to think like an engineer. Thanks to his mentoring, I successfully switched careers in 3 months!\"", testimonial_2: "\"Very clear explanations and easy to understand. The code reviews are very detailed, I now understand the importance of clean code.\"",
            blog_title: "Articles &", blog_subtitle: "Insights", blog_desc: "Sharing knowledge about web technology, programming tips, and developer careers to help you grow.", read_more: "Read More",
            blog_1_excerpt: "Complete guide to improving Core Web Vitals on your Next.js application using image optimization and dynamic imports.", blog_2_title: "Tips to Pass Full Stack Developer Interviews", blog_2_excerpt: "Leaks of technical questions that often appear in unicorn startup interviews and how to answer them correctly.", blog_3_title: "Why TypeScript is a Must in 2024?", blog_3_excerpt: "Reasons why you should start migrating from JavaScript to TypeScript for long-term project scalability.",
            contact_title: "Let's Work Together", contact_desc: "Have an interesting project idea? Or want to improve your coding skills? Don't hesitate to say hello.", btn_email: "Send Email",
            footer_bio: "Full Stack Developer & Mentor.\nBuilding high-quality digital products.", footer_nav: "Navigation", footer_services: "Services", made_with: "Made with", and_coffee: "and Coffee.", status_available: "Available for projects"
        }
    };

    const langBtn = document.getElementById('lang-toggle');

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Skip typewriter managed element
                if (!el.classList.contains('tw-cursor')) {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    // Init
    updateContent(APP.currentLang);
    if (langBtn) langBtn.textContent = APP.currentLang === 'id' ? 'EN' : 'ID';

    // Toggle
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            APP.currentLang = APP.currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('lang', APP.currentLang);
            updateContent(APP.currentLang);
            langBtn.textContent = APP.currentLang === 'id' ? 'EN' : 'ID';
        });
    }
})();
