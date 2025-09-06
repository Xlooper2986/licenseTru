// ذخیره لاگ‌ها در localStorage
document.getElementById('generate-btn').addEventListener('click', () => {
    const license = 'OPENLIGHT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById('license-output').innerText = license;

    let logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push({license: license, time: new Date().toLocaleString()});
    localStorage.setItem('logs', JSON.stringify(logs));
});

document.getElementById('admin-login-btn').addEventListener('click', () => {
    const pass = document.getElementById('admin-pass').value;
    if(pass === 'B)=VhN)p-(iK#=FqR$jWrSl(m-!s6@YG') {
        window.location.href = 'admin.html';
    } else {
        alert('Incorrect password!');
    }
});