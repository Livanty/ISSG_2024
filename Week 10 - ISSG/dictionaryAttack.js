const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

function generateMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function dictionaryAttack(dictionaryFile) {
    const words = fs.readFileSync(dictionaryFile, 'utf8').split('\n');
    for (const word of words) {
        const hash = generateMD5(word.trim());
        if (hash === targetHash) {
            return word.trim(); // Mengembalikan password jika ditemukan
        }
    }
    return null; // Jika tidak ditemukan
}

// Nama file sementara untuk dictionary
const dictionaryFile = '500-worst-passwords.txt';

// Unduh file dictionary
https.get('https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt', (response) => {
    const file = fs.createWriteStream(dictionaryFile);
    response.pipe(file);

    file.on('finish', () => {
        file.close(() => {
            console.log('File dictionary berhasil diunduh.');

            // Lakukan dictionary attack
            const result = dictionaryAttack(dictionaryFile);

            if (result) {
                console.log(`Password Bob adalah: ${result}`);
            } else {
                console.log('Password tidak ditemukan.');
            }
        });
    });
}).on('error', (err) => {
    console.error(`Gagal mengunduh file dictionary: ${err.message}`);
});
