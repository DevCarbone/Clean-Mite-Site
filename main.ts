// ======================================================================
// ARQUIVO: src/main.ts (Lógica Principal do Frontend - Clean Mite)
// FUNÇÃO: Controla a interatividade e os efeitos visuais no Header e nos Botões.
// ======================================================================

// ----------------------------------------------------------------------
// 0. DECLARAÇÃO DE VARIÁVEIS (Capturando Elementos do DOM)
// ----------------------------------------------------------------------

// Captura o elemento <header>. O '| null' é obrigatório no TypeScript (TS)
const header = document.querySelector('header') as HTMLElement | null;
// Captura o botão hamburger.
const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null;
// Captura o container dos links de navegação.
const navLinks = document.getElementById('nav-links') as HTMLDivElement | null;

// Captura todos os links de navegação.
const navItems = navLinks ? navLinks.querySelectorAll('a') : [];

// Ponto de rolagem (em pixels) para ativar o efeito 'scrolled'
const SCROLL_THRESHOLD = 80; 

// ----------------------------------------------------------------------
// 1. NAVEGAÇÃO FIXA (Efeito de Sombra/Fundo no Scroll)
// ----------------------------------------------------------------------

/*
 * Adiciona ou remove a classe 'scrolled' no <header> com base na posição do scroll.
 * O CSS usa a classe '.scrolled' para aplicar estilos.
 */
function handleHeaderScroll(): void {
    if (header) { 
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', handleHeaderScroll);


// ----------------------------------------------------------------------
// 2. MENU RESPONSIVO (Toggle Hamburger)
// ----------------------------------------------------------------------

/*
 * Alterna a classe 'active' para mostrar/esconder o menu mobile.
 * O CSS usa a regra '.nav-links.active { display: flex; }'.
 */
function toggleMenu(): void {
    if (navLinks && menuToggle) { 
        navLinks.classList.toggle('active'); 
        
        // Alterna o ícone do botão (☰ para ✖)
        menuToggle.innerHTML = navLinks.classList.contains('active') ? '✖' : '☰';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// ----------------------------------------------------------------------
// 3. FECHAR MENU AO CLICAR EM UM LINK (Usabilidade Mobile)
// ----------------------------------------------------------------------

/*
 * Garante que o menu mobile feche automaticamente quando o usuário clicar em uma âncora.
 */
navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && menuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰'; // Volta o ícone para hamburger
        }
    });
});


// ----------------------------------------------------------------------
// 4. NOVA INTERAÇÃO: EFEITO 'PRESSED' (Clique) NOS BOTÕES
// ----------------------------------------------------------------------

/*
 * Aplica um efeito visual de compressão (classe '.pressed') nos botões CTA.
 * Isso melhora a interação e feedback tátil ao usuário.
 */
function setupButtonInteractions(): void {
    // Captura todos os botões que precisam do efeito (WhatsApp e Formulário)
    // Seletores: .btn-whatsapp (orçamento) e .btn-primary (enviar formulário)
    const ctaButtons = document.querySelectorAll('.btn-whatsapp, .btn-primary');

    ctaButtons.forEach(button => {
        const btnElement = button as HTMLElement;
        
        // 1. Efeito de Pressionar (Mouse Down)
        btnElement.addEventListener('mousedown', () => {
            btnElement.classList.add('pressed');
        });

        // 2. Efeito de Soltar/Resetar (Mouse Up ou Mouse Sair)
        btnElement.addEventListener('mouseup', () => {
            btnElement.classList.remove('pressed');
        });
        
        // 3. Resetar caso o mouse saia do botão enquanto pressionado
        btnElement.addEventListener('mouseleave', () => {
            btnElement.classList.remove('pressed');
        });
    });
}


// ----------------------------------------------------------------------
// 5. INICIALIZAÇÃO
// ----------------------------------------------------------------------

// Garante que a lógica seja aplicada após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll(); // Inicia a lógica do header fixo
    setupButtonInteractions(); // Inicia a lógica dos efeitos de botão
    
    console.log("Clean Mite Interatividade (TypeScript) inicializada.");
});