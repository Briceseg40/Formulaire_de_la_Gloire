document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('impossibleForm');
    const nameInput = document.getElementById('name');
    const msgInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const bgLayer = document.querySelector('.bg-layer');
    const trollBox = document.getElementById('u-message');
    const modal = document.getElementById('modal');

    nameInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        
        if (val.includes('cage')) {
            document.body.classList.add('cage-mode');
            bgLayer.style.backgroundImage = "url('https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif')";
            bgLayer.style.opacity = "1";
            trollBox.style.display = "block";
            trollBox.innerText = "NOT THE BEES! NOT THE BEES!";
            trollBox.style.backgroundColor = "gold";
            document.body.style.cursor = "help"; 
        } else {
            document.body.classList.remove('cage-mode');
            bgLayer.style.opacity = "0.3";
            bgLayer.style.backgroundImage = "none";
            trollBox.style.display = "none";
            document.body.style.cursor = "default";
        }
    });

    msgInput.addEventListener('keydown', () => {
        const random = Math.random();
        if(random > 0.7) {
            msgInput.classList.add('comic-mode');
            msgInput.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
        } else if (random < 0.3) {
            msgInput.classList.remove('comic-mode');
            msgInput.style.transform = "scale(1.05)";
            setTimeout(() => msgInput.style.transform = "scale(1)", 100);
        }
    });

    let dodgeCount = 0;
    const maxDodges = 6; 

    submitBtn.addEventListener('mouseover', () => {
        if(document.body.classList.contains('cage-mode')) return;
        if(submitBtn.classList.contains('defeated')) return;

        if (dodgeCount < maxDodges) {
            submitBtn.style.position = 'fixed';
            
            const randomX = Math.floor(Math.random() * 80) + 10;
            const randomY = Math.floor(Math.random() * 80) + 10;
            
            submitBtn.style.left = randomX + '%';
            submitBtn.style.top = randomY + '%';
            
            trollBox.style.display = "block";
            const phrases = ["Trop lent !", "Je suis là-bas !", "Raté !", "Essaie encore...", "Oups !"];
            trollBox.innerText = phrases[dodgeCount % phrases.length];
            
            dodgeCount++;
        } else {
            submitBtn.classList.add('defeated');
            submitBtn.innerText = "OK... TU GAGNES.";
            submitBtn.style.position = 'relative';
            submitBtn.style.left = 'auto';
            submitBtn.style.top = 'auto';
            
            trollBox.innerText = "C'est bon, clique...";
            trollBox.style.background = "#55efc4";
        }
    });

    document.getElementById('subject').addEventListener('change', (e) => {
        if(e.target.value === "complaint") {
            alert("Votre plainte a été envoyée directement à la corbeille.");
            e.target.value = "";
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6c5ce7', '#fdcb6e'] });
            confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6c5ce7', '#fdcb6e'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    });

    document.getElementById('closeBtn').addEventListener('click', () => {
        window.location.reload();
    });
});