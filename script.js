document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const body = document.body;
    const container = document.getElementById('app-container');
    const form = document.getElementById('ultimateForm');
    const inputs = document.querySelectorAll('input, textarea, select');
    const trollMsg = document.getElementById('troll-msg');
    const modal = document.getElementById('modal-overlay');
    const submitBtn = document.getElementById('submitBtn');

    // --- 1. CHAOS DE LA FRAPPE (SHAKE + COULEURS) ---
    document.addEventListener('keydown', () => {
        // Ajoute la classe de tremblement
        body.classList.add('shaking');
        
        // Génère une couleur fluo aléatoire
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.documentElement.style.setProperty('--primary-color', randomColor);

        // Retire le tremblement après 150ms
        setTimeout(() => {
            body.classList.remove('shaking');
        }, 150);
    });

    // --- 2. IA TROLL (MESSAGE PASSIF-AGRESSIF) ---
    const insults = [
        "Tu tapes avec des moufles ?",
        "C'est ta vitesse max ça ?",
        "Ma grand-mère hacke mieux que toi.",
        "Arrête de trembler, c'est gênant.",
        "ERROR 404: TALENT NOT FOUND",
        "T'as vraiment cru que j'allais lire ça ?",
        "Appuie sur Alt+F4 pour gagner du temps."
    ];

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            // Affiche une insulte aléatoire quand on quitte un champ
            if(Math.random() > 0.3) { // 70% de chance d'insulter
                const randomInsult = insults[Math.floor(Math.random() * insults.length)];
                trollMsg.innerText = `> SYSTEME: "${randomInsult}"`;
            }
        });
    });

    // --- 3. EASTER EGG : NICOLAS CAGE ---
    document.getElementById('name').addEventListener('input', (e) => {
        if (e.target.value.toUpperCase() === "CAGE") {
            body.style.backgroundImage = "url('https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif')";
            body.style.backgroundSize = "cover";
            trollMsg.innerText = "> ALERTE : MODE NICOLAS CAGE ACTIVÉ";
            trollMsg.style.color = "yellow";
        }
    });

    // --- 4. EASTER EGG : KONAMI CODE (MATRIX) ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let kIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[kIndex]) {
            kIndex++;
            if (kIndex === konamiCode.length) {
                activateMatrixMode();
                kIndex = 0;
            }
        } else {
            kIndex = 0;
        }
    });

    function activateMatrixMode() {
        alert("WAKE UP NEO...");
        document.documentElement.style.setProperty('--primary-color', '#0f0'); // Force vert
        body.style.fontFamily = "'Courier New', monospace";
        inputs.forEach(i => i.value = "THE MATRIX HAS YOU");
    }

    // --- 5. SOUMISSION (AUTO-DESTRUCTION) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Change le texte du bouton
        const btnText = document.querySelector('.btn-text');
        btnText.innerText = "AUTO-DESTRUCTION...";
        submitBtn.style.background = "red";
        submitBtn.style.color = "white";

        // Animation : Le site tourne et rétrécit
        container.style.transition = "all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
        container.style.transform = "rotate(720deg) scale(0)";
        container.style.opacity = "0";

        // Après 2 secondes (fin de l'animation)
        setTimeout(() => {
            showVictory();
        }, 2000);
    });

    function showVictory() {
        modal.classList.remove('hidden');
        
        // Lance les confettis en boucle
        const end = Date.now() + (3 * 1000);
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }

    // --- RESET ---
    document.getElementById('closeModal').addEventListener('click', () => {
        location.reload(); // Recharge la page brutalement
    });
});