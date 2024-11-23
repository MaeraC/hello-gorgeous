
// Configuration web push 

const webpush           = require('web-push');
const fs                = require('fs');

// Vérifie si les clés existent déjà dans un fichier
const VAPID_KEYS_FILE   = './vapid-keys.json';

// Si les clés n'existent pas, génère-les et les stocke
let vapidKeys;

if (fs.existsSync(VAPID_KEYS_FILE)) {
    vapidKeys = JSON.parse(fs.readFileSync(VAPID_KEYS_FILE, 'utf8'));
} 
else {
    vapidKeys = webpush.generateVAPIDKeys();
    // Sauvegarde les clés dans un fichier JSON pour les réutiliser
    fs.writeFileSync(VAPID_KEYS_FILE, JSON.stringify(vapidKeys), 'utf8');
    console.log('Clés VAPID générées et sauvegardées !');
}

// Configure web-push avec les clés générées
webpush.setVapidDetails(
    'mailto:dev.mc.studio@gmail.com', // Ton email
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

module.exports = { webpush, vapidKeys };

