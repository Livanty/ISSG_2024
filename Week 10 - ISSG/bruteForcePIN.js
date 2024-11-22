const crypto = require('crypto');

const targetHash = '5531a5834816222280f20d1ef9e95f69';

function generateMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

// Fungsi untuk melakukan brute force attack
function bruteForcePIN() {
    for (let i = 0; i < 10000; i++) {
        // Format angka menjadi 4 digit, misalnya 9 -> "0009"
        const pin = i.toString().padStart(4, '0');
        const hash = generateMD5(pin);

        if (hash === targetHash) {
            return pin; // Mengembalikan PIN jika ditemukan
        }
    }
    return null; // Jika tidak ditemukan
}

// Eksekusi brute force attack
const result = bruteForcePIN();

if (result) {
    console.log(`PIN Alice adalah: ${result}`);
} else {
    console.log('PIN tidak ditemukan.');
}
