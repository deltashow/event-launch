let guests = [
    { code: "#1001", name: "أحمد منصور", tier: "VVIP", checkedIn: false },
    { code: "#1002", name: "سارة السيد", tier: "VIP", checkedIn: true }
];

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderGuestTable();

    document.getElementById("inviteForm").addEventListener("submit", (e) => {
        e.preventDefault();
        generateInvite();
    });
});

function initNavigation() {
    const btns = document.querySelectorAll(".nav-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const tab = btn.dataset.tab;
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(tab + "Tab").classList.add("active");
        });
    });
}

function generateInvite() {
    const name = document.getElementById("guestName").value;
    const tier = document.getElementById("guestTier").value;
    const code = "#" + Math.floor(1000 + Math.random() * 9000);

    // Update Ticket View
    document.getElementById("tGuestName").textContent = name;
    document.getElementById("tTier").textContent = tier;
    document.getElementById("tCode").textContent = code;

    // Generate QR
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: `PROPTECH-EVENT|${code}|${name}|${tier}`,
        width: 128,
        height: 128
    });

    document.getElementById("ticketView").classList.remove("hidden");

    // Add to Store
    guests.push({ code, name, tier, checkedIn: false });
    renderGuestTable();
}

function renderGuestTable() {
    const tbody = document.getElementById("guestTableBody");
    tbody.innerHTML = "";

    let checkedInCount = 0;

    guests.forEach(g => {
        if(g.checkedIn) checkedInCount++;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${g.code}</td>
            <td>${g.name}</td>
            <td>${g.tier}</td>
            <td><span style="color: ${g.checkedIn ? '#10b981' : '#f59e0b'}">${g.checkedIn ? 'تم الدخول' : 'لم يحضر'}</span></td>
            <td>
                ${!g.checkedIn ? `<button onclick="checkIn('${g.code}')" style="background:#10b981; color:#000; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-weight:bold;">تسجيل دخول</button>` : '-'}
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("confirmedCount").textContent = guests.length;
    document.getElementById("checkedInCount").textContent = checkedInCount;
}

function checkIn(code) {
    const guest = guests.find(g => g.code === code);
    if(guest) {
        guest.checkedIn = true;
        renderGuestTable();
    }
}