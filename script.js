let licenseLogs = [];

// ----------------------
// تولید لایسنس ساده (UUID)
function generateLicense() {
  return crypto.randomUUID();
}

// گرفتن IP واقعی
async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "Unknown";
  }
}

// ----------------------
// index.html logic
const genBtn = document.getElementById("generateBtn");
if (genBtn) {
  genBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value || "Unknown";
    const hwid = crypto.randomUUID();
    const licenseCode = generateLicense();
    const ip = await getIP();
    const timestamp = new Date().toLocaleString();

    licenseLogs.push({name: username, ip, hwid, license: licenseCode, timestamp});

    document.getElementById("licenseCode").innerText = `لایسنس شما: ${licenseCode}`;
  });
}

// ----------------------
// admin.html logic
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  const ADMIN_PASSWORDS = ["P@ssword123!", "L1censeKey!", "Adm!nOpenLight$"];
  loginBtn.addEventListener("click", () => {
    const pass = document.getElementById("adminPass").value;
    if (!ADMIN_PASSWORDS.includes(pass)) {
      alert("پسورد اشتباه است!");
      return;
    }
    document.getElementById("logs").style.display = "block";
    const table = document.getElementById("logTable");

    // حذف سطرهای قدیمی
    table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

    licenseLogs.forEach(log => {
      const row = table.insertRow();
      row.insertCell(0).innerText = log.name;
      row.insertCell(1).innerText = log.ip;
      row.insertCell(2).innerText = log.hwid;
      row.insertCell(3).innerText = log.license;
      row.insertCell(4).innerText = log.timestamp;
    });
  });
}