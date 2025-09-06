document.getElementById("genLicense").addEventListener("click", function(){
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        let ip = data.ip;
        let hwid = crypto.randomUUID();
        let license = ip + "-" + hwid;
        document.getElementById("licenseCode").textContent = license;
    })
    .catch(err => {
        let hwid = crypto.randomUUID();
        let license = "127.0.0.1-" + hwid;
        document.getElementById("licenseCode").textContent = license;
    });
});