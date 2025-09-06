/* script.js - OpenLight front-end
   IMPORTANT:
   1) Replace the FIREBASE_CONFIG object below with your Firebase project's config.
   2) In Firebase Console: enable Authentication (Google sign-in recommended) and Firestore.
   3) Add your admin UID to the README instructions and set Firestore rules accordingly.
*/

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // storageBucket, messagingSenderId, appId optional
};

const ADMIN_SECRET = "SuperUltraHardSecretKey2025!@#"; // used by admin.html to reveal admin UI (client-side gate only)

const terminal = document.getElementById('terminal');
const status = document.getElementById('status');
const nameInput = document.getElementById('nameInput');
const goBtn = document.getElementById('goBtn');

function logLine(s, delay=8){
  return new Promise(res=>{
    let i=0;
    const interval = setInterval(()=>{
      terminal.textContent += s[i++] || '';
      terminal.scrollTop = terminal.scrollHeight;
      if(i>=(s.length||0)){ clearInterval(interval); terminal.textContent += '\n'; res(); }
    }, delay);
  });
}

async function getIP(){
  try{
    const r = await fetch('https://ipapi.co/json/');
    if(!r.ok) throw new Error('ipapi error');
    return await r.json();
  }catch(e){
    return {ip:'unknown',city:'-',country_name:'-'};
  }
}

async function initFirebase(){
  if(!window.firebase) { status.textContent='Firebase SDK missing'; return null; }
  firebase.initializeApp(FIREBASE_CONFIG);
  const db = firebase.firestore();
  return db;
}

async function main(){
  status.textContent = 'loading';
  await logLine('Initializing OpenLight...');
  await logLine('Preparing terminal... █████ 100%');
  await logLine('Welcome, stranger. What is your name?');

  goBtn.addEventListener('click', async ()=>{
    const name = nameInput.value.trim() || 'Anonymous';
    await runSession(name);
  });

  nameInput.addEventListener('keydown', async (e)=>{
    if(e.key === 'Enter'){
      const name = nameInput.value.trim() || 'Anonymous';
      await runSession(name);
    }
  });

  status.textContent = 'ready';
}

async function runSession(name){
  status.textContent='running';
  const ipinfo = await getIP();
  await logLine('> Access granted to ' + name);
  await logLine('> Running virus.exe ... (just kidding 😅)');
  await logLine('> Checking IP: ' + (ipinfo.ip || 'unknown'));
  await logLine('> Location: ' + (ipinfo.city || '-') + ', ' + (ipinfo.country_name || '-'));
  await logLine('> Uploading memes to your brain... ✅');
  await logLine('Enjoy the show!');

  // send to Firestore
  try{
    const db = await initFirebase();
    if(db){
      await db.collection('openlight_logs').add({
        name, ip: ipinfo.ip || 'unknown', city: ipinfo.city||'', country: ipinfo.country_name||'', userAgent: navigator.userAgent, time: (new Date()).toISOString()
      });
      status.textContent='logged';
    } else {
      status.textContent='no-firebase';
    }
  }catch(e){
    console.error(e);
    status.textContent='log-failed';
  }
}

main();
