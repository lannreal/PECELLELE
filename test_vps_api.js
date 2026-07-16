const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Port default dari app.js lu itu 3000, bukan 1628
const API_URL = "https://motionhubapi.lanncodex.biz.id/api"; 

// Fungsi untuk bertanya di terminal (Promise)
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function runInteractiveTest() {
    console.log("=============================================");
    console.log("🚀 INTERACTIVE API TESTER VPS");
    console.log(`📡 Target Server : ${API_URL}`);
    console.log("=============================================\n");

    // 1. Input Email
    const targetEmail = await askQuestion("📧 Masukkan Email target: ");
    
    if (!targetEmail) {
        console.log("❌ Email tidak boleh kosong! Batal.");
        rl.close();
        return;
    }

    console.log(`\n⏳ Mengirim request /api/send untuk: ${targetEmail}...`);
    
    // 2. Eksekusi API /send
    try {
        const sendResponse = await fetch(`${API_URL}/send`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Bypass-Tunnel-Reminder": "true" 
            },
            body: JSON.stringify({ email: targetEmail })
        });
        
        const sendData = await sendResponse.json();
        
        if (sendData.success) {
            console.log("✅ Berhasil! Silakan cek inbox email lu (dan folder spam).");
        } else {
            console.log("⚠️ Peringatan (Bisa jadi butuh waktu):", sendData);
        }
    } catch (e) {
        console.error("❌ Error koneksi ke /api/send:", e.message);
        console.log("👉 Pastikan IP, Port bener dan bot VPS jalan pakai 'pm2 logs pecellele-bot'.");
        console.log("💡 (Port default dari VPS lu itu 3000. Kalau API lu jalan di 1628, ganti const API_URL di script ini)");
        rl.close();
        return;
    }

    // 3. Input Magic Link
    console.log("\n---------------------------------------------");
    console.log("⏳ Menunggu Magic Link dari email...");
    const magicLink = await askQuestion("🔗 Paste Magic Link di sini: ");
    
    if (!magicLink) {
        console.log("❌ Magic Link kosong! Batal eksekusi verify.");
        rl.close();
        return;
    }

    console.log(`\n⏳ Mengirim request /api/verify... (Bot VPS lagi nge-bypass Cloudflare)`);

    // 4. Eksekusi API /verify
    try {
        const verifyResponse = await fetch(`${API_URL}/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: targetEmail, magicLink: magicLink })
        });
        
        const verifyData = await verifyResponse.json();
        
        console.log("\n=============================================");
        console.log("📊 HASIL VERIFIKASI DARI VPS");
        console.log("=============================================");
        
        // 5. Cek otomatis status sukses/gagal dari response JSON
        if (verifyData.success || verifyData.status === 'success') {
            console.log("🎉 STATUS: SUKSES! Bypass & Claim Berhasil!");
            if (verifyData.message) console.log("💬 Pesan :", verifyData.message);
        } else {
            console.log("❌ STATUS: GAGAL!");
            console.log("💬 Error :", verifyData.error || verifyData.message || JSON.stringify(verifyData));
        }
        
    } catch (e) {
        console.error("❌ Error koneksi ke /api/verify:", e.message);
    }

    console.log("\n✅ Testing Selesai.");
    rl.close();
}

// Jalankan aplikasi
runInteractiveTest();
