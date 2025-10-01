// ======================================================================
// ARQUIVO: src/main.ts (Lógica Principal do Frontend - Clean Mite)
// FUNÇÃO: Controla a interatividade com otimização (Throttling, ARIA, Touch).
// ======================================================================

// ----------------------------------------------------------------------
// 0. VARIÁVEIS E CONFIGURAÇÕES
// ----------------------------------------------------------------------

const header = document.querySelector('header') as HTMLElement | null;
const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null;
const navLinks = document.getElementById('nav-links') as HTMLDivElement | null;
const navItems = navLinks ? navLinks.querySelectorAll('a') : [];

const SCROLL_THRESHOLD = 80;
const THROTTLE_INTERVAL = 150; // Limita a execução do scroll para 150ms
let isThrottled = false;

// ----------------------------------------------------------------------
// FUNÇÃO AUXILIAR: THROTTLING
// ----------------------------------------------------------------------

// Essa função auxilia o evento de rolagem (scroll)
function handleHeaderScroll(): void {
    if (header) {
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Ouve o evento de rolagem da janela e aplica o Throttling
window.addEventListener('scroll', () => {
    if (!isThrottled) {
        handleHeaderScroll();
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
        }, THROTTLE_INTERVAL);
    }
});


// ----------------------------------------------------------------------
// 2. MENU RESPONSIVO (Toggle Hamburger com Acessibilidade ARIA)
// ----------------------------------------------------------------------

function toggleMenu(): void {
    if (navLinks && menuToggle) {
        const isActive = navLinks.classList.toggle('active');

        // Alterna o ícone (☰ para ✖)
        menuToggle.innerHTML = isActive ? '✖' : '☰';

        // Acessibilidade (ARIA): Atualiza o estado de expansão
        menuToggle.setAttribute('aria-expanded', isActive.toString());
    }
}

// Adiciona o ouvinte de clique
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// ----------------------------------------------------------------------
// 3. FECHAR MENU E RESETAR ARIA AO CLICAR EM UM LINK
// ----------------------------------------------------------------------

navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && menuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰'; // Volta o ícone para hamburger
            
            // Reset de Acessibilidade (ARIA)
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});


// ----------------------------------------------------------------------
// 4. INTERAÇÃO TÁTIL: EFEITO 'PRESSED' (Touch Support)
// ----------------------------------------------------------------------

function setupButtonInteractions(): void {
    // Captura botões CTA e Primary
    const ctaButtons = document.querySelectorAll('.btn-whatsapp, .btn-primary');

    ctaButtons.forEach(button => {
        const btnElement = button as HTMLElement;
        
        // Eventos de clique (Desktop)
        btnElement.addEventListener('mousedown', () => btnElement.classList.add('pressed'));
        btnElement.addEventListener('mouseup', () => btnElement.classList.remove('pressed'));
        btnElement.addEventListener('mouseleave', () => btnElement.classList.remove('pressed'));
        
        // NOVO: Eventos de toque (Mobile)
        btnElement.addEventListener('touchstart', () => btnElement.classList.add('pressed'));
        btnElement.addEventListener('touchend', () => btnElement.classList.remove('pressed'));
        // touchend lida com a maioria dos casos de soltar o toque
    });
}


// ----------------------------------------------------------------------
// 5. INICIALIZAÇÃO
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll(); // Garante o estado inicial do header
    setupButtonInteractions(); // Ativa os efeitos de botão
    console.log("Clean Mite Interatividade otimizada inicializada.");
});
