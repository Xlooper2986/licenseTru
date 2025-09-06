document.getElementById('generate-btn').addEventListener('click', () => {
const license = 'OPENLIGHT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
document.getElementById('license-output').innerText = license;
});

document.getElementById('admin-login-btn').addEventListener('click', () => {
const pass = document.getElementById('admin-pass').value;
if(pass === 'admin123'){
alert('Admin login successful!\nRedirecting to Admin Panel...');
// در نسخه واقعی اینجا میریم به admin.html
} else {
alert('Incorrect password!');
}
});