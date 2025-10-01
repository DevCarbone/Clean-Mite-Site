// ======================================================================
// ARQUIVO: src/main.ts (Lógica Principal do Frontend)
// FUNÇÃO: Controla a interatividade do menu (fixo e responsivo).
// SINCRONIZAÇÃO: Usa IDs do HTML e manipula classes CSS.
// ======================================================================

// ----------------------------------------------------------------------
// 0. DECLARAÇÃO DE VARIÁVEIS (Capturando Elementos do DOM)
// ----------------------------------------------------------------------

// Captura o elemento <header>. O ' | null' é obrigatório no TypeScript (TS)
const header = document.querySelector('header') as HTMLElement | null;
// Captura o botão hamburger.
const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null;
// Captura o container dos links de navegação.
const navLinks = document.getElementById('nav-links') as HTMLDivElement | null;

// Captura todos os links de navegação.
// Verifica se 'navLinks' existe antes de usar querySelectorAll.
const navItems = navLinks ? navLinks.querySelectorAll('a') : [];

// Ponto de rolagem (em pixels) para ativar o efeito 'scrolled'
const SCROLL_THRESHOLD = 80; 

// ----------------------------------------------------------------------
// 1. NAVEGAÇÃO FIXA (Efeito de Sombra/Fundo no Scroll)
// ----------------------------------------------------------------------

/* * Adiciona ou remove a classe 'scrolled' no <header> com base na posição do scroll.
 * O CSS usa a classe '.scrolled' para aplicar estilos (fundo branco, sombra).
 */
function handleHeaderScroll(): void {
    // Verifica se o header foi encontrado no HTML
    if (header) { 
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Ouve o evento de rolagem da janela para chamar a função
window.addEventListener('scroll', handleHeaderScroll);


// ----------------------------------------------------------------------
// 2. MENU RESPONSIVO (Toggle Hamburger)
// ----------------------------------------------------------------------

/* * Alterna a classe 'active' para mostrar/esconder o menu mobile.
 * O CSS usa a regra '.nav-links.active { display: flex; }'.
 */
function toggleMenu(): void {
    // Verifica se os elementos cruciais (links e botão) existem
    if (navLinks && menuToggle) { 
        navLinks.classList.toggle('active'); 
        
        // Alterna o ícone do botão (☰ para ✖)
        menuToggle.innerHTML = navLinks.classList.contains('active') ? '✖' : '☰';
    }
}

// Adiciona o ouvinte de evento de clique ao botão hamburger
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// ----------------------------------------------------------------------
// 3. FECHAR MENU AO CLICAR EM UM LINK (Usabilidade Mobile)
// ----------------------------------------------------------------------

/* * Garante que o menu mobile feche automaticamente quando o usuário clicar em uma âncora.
 */
navItems.forEach(link => {
    link.addEventListener('click', () => {
        // Verifica se o menu está aberto antes de fechar
        if (navLinks && menuToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰'; // Volta o ícone para hamburger
        }
    });
});


// ----------------------------------------------------------------------
// 4. INICIALIZAÇÃO
// ----------------------------------------------------------------------

// Garante que a lógica de scroll seja aplicada no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll();
    console.log("Clean Mite Interatividade (TypeScript) inicializada.");
});