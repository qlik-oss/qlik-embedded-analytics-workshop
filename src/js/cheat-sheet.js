

const appCheat = document.getElementById("appCheat");
const hostConfigCheat = document.getElementById("hostConfigCheat");
const cheatButton = document.getElementById("cheatButton");
const cheatModal = document.getElementById("cheatModal");
const okBtn = document.getElementById('okBtn');

const config = await fetch("/config", {
    method: "GET",
    headers: {
    "Content-Type": "application/json"
    }
}).then(res => res.json());

const scriptSnip = `<script
    crossorigin="anonymous"
    type="application/javascript"
    src="https://cdn.jsdelivr.net/npm/@qlik/embed-web-components@1.3.0/dist/index.min.js"
    data-host="${config.host}"
    data-auth-type="Oauth2"
    data-client-id="${config.clientId}"
    data-redirect-uri="${config.redirectUri}"
    data-access-token-storage="session"
    data-auto-redirect="true"
    ><\/script>`;

console.log(scriptSnip)

appCheat.textContent = config.appId
hostConfigCheat.textContent = scriptSnip;
hostConfigCheat.value = scriptSnip;

appCheat.appendChild(createButton(config.appId));
hostConfigCheat.appendChild(createButton(hostConfigCheat.value));

// Open modal
cheatButton.addEventListener("click", (e) => {
    cheatModal.showModal();
});

    // Close modal
okBtn.addEventListener('click', (e) => {
    cheatModal.close();
});

function createButton(id) { 
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.dataset.id = id;
    btn.title = "Copy ID";
    btn.textContent = "📋";
    btn.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(id)
        .then(() => {
        btn.textContent = "✅";
        setTimeout(() => (btn.textContent = "📋"), 1000);
        })
        .catch((err) => console.error("Failed to copy!", err));
    });
    return btn;
}