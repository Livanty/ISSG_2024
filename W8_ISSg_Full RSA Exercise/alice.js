const crypto = require("crypto");

const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDmfkkCblfZRj7N
pmzH/O86b67dybEZVn6sped05wJ2JCNutFGdWdbw8l8y1e4ryNidW6CHJxCMreJB
zxWsxAdcxB9UCL931kncxsKuJKWzjL9beaA8k4DaNv5IIC6oup5csPugEyE4JDAo
07pV2vl9Q+Er7hD/rNqaS7D15+Qz9T2s5e9we0WoezNehbBncu3InzUv3cNX92d+
UAgIJ1k+0o8WoQlaaQBBSUUwqBMMjg3kTfNHY/uHVNP8MxzUuVqa+wG6Wfw6tUva
dRJmdoaAD8Wb04AMo297pjd4IDS89mZSTiKGzJ69IsSuLtvidsWYJILQK6A9Rmn6
0mozLUOPAgMBAAECggEAAYu0QqNpzGe3sRpeHWM5WXt5QTyChwh49gBw0mxgLFmm
sS3dZEA/fEMr10PvAnUo2rlMFMvyxPa/jzBr1UpFQF6CVUZvvkZ+HVBp6tANGmyl
td/VbsKQeSYoQ2SP24rQ2A9JyLOII/++IO/2jm/W/3uOjYRdsdE/cAx05dlFwwFt
Q6lY8MVWIL/fBcUjDVQr6WKSgTZG3gG059oOQhmxxQgl2X9tUJc1ijExATZMKTa7
Ni/nIbnlrmk3FFUpqKkO3Tth8sX6eBUDjXvkPXH6UaBNNm0aV1APyIt4krIS7jdY
pw2SY+Wm6aEsjoMU0Ag6vw+COINlOt63/+ekjA6ZoQKBgQD4vSbI35lrr0mkqe6X
q2MliaKtlHTizOosWPh+ZAruH2HIkqM9grT+STxIR78DPGH9TJwKToccDh5S50dn
B8MdSfqfBfet+VkS7BfwWjvHJdjKI0HmnbH2IWNKXm34LG335n4yv2g3dDkwnZIQ
zk6gZXfz0SeTlUYoSLAPKDf0LwKBgQDtOMhpMOcnGhquqNkFPdMQcMw/gVNHeh3h
/gwK3FkSdD1LhwiuasPzLFbZJLrUGjW4GmUg0KehQoUlBaKdJfR6TtGuoJ9TK9GD
fWUoQkXztwzYrkOuvjebXZuvjTug35bHTtlKFNZjoDvkDCnbB+Z0PwyBAPygc5uQ
QjcPyVfuoQKBgQDehDgiEwWos9Lpn6t1uzii6BHDvr8h9ba3nZAPYWf1xdUwHR4z
dK59nP50mtpiBq6SbupYvg9YJbky6PuTS/pcRUYS5L/BvwLUTqjLt60qZs0dZ5UY
vZHqYcv1R6yRCw4FawkSVPDiSvKubwewSR9FlgBM+ZqyCCQO/Zeit5P2uQKBgQDl
jFHaAFldbBQvuPGv8cBgo1XxibpFazSpb8TFaa3DfrmlcTiEVongsKIlozYqcmZT
DS+Yjm/3SsA+L/LIMGcfR0/9tC4YNEmb/GY7i83W5OXIcvDJkgWLEQzK1lbB+DoW
CQWYewtuAiqSJPcHnOBy0mPOHV9YACajdH+FhibRoQKBgQDp2DW3w/iaZ9AUGA2j
5x/OTn+xcvbYuDabM4asMn10l9VtamgAxWzGMJai7tMrgyhtUy5AV4Lu73NUINKA
RnBhWUiCrUj1gsEIwdpVF7Ti2btBry+U5O62dzv49geUQUuk9432fbI0UarVjWw9
my07QdCO2dOFXO30n9Ztjswy/w==
-----END PRIVATE KEY-----`;

const bobPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwT/V6Dnq3ic7wJid+ssh
1KfeDQ+eWueVxraimfu+4lnGsbv8SHix/XxwN4vPwGSXszHmab8ZCIWS23Z1762n
QHHIH5YbGRZ9TJBIWu/JD6T/36Q5ascx24SOC9VOMzy8AkAZYasN/QbW6y8xk+hr
bF5zAIi2Kou80j/1C9hzembNYXHKiXmpg9CAEq6La9iFTSAseA3lA2ZA4vIY+raN
xt3OviKA1I+8+IiFxWx0TalxFMwGVxtdxGsit+0TGhko/T7k8uppOZSkwcL/VShX
pARwUiugsw8iMa7sHmVLWsVjTdYv26rWWiFO5WSH/bFmP6nY7BQZuTZ/aEMIRVah
iwIDAQAB
-----END PUBLIC KEY-----`;

// Pesan yang ingin dikirimkan oleh Alice
const message = "I want some apples";

// Membuat tanda tangan digital dari pesan menggunakan kunci privat Alice
const signer = crypto.createSign("sha256");
signer.update(message); // Menambahkan pesan ke objek signer untuk di-hash
signer.end(); // Menyelesaikan proses hashing
const signature = signer.sign(alicePrivateKeyPem, "hex"); // Menandatangani pesan dan mengubah tanda tangan ke format heksadesimal

// Mengenkripsi pesan menggunakan kunci publik Bob
const encryptedMessage = crypto.publicEncrypt(
    bobPublicKeyPem,
    Buffer.from(message) // Mengubah pesan ke dalam buffer agar dapat dienkripsi
);

console.log("Signature:", signature); // Tanda tangan digital pesan
console.log("Message:", encryptedMessage.toString("hex")); // Pesan terenkripsi dalam format heksadesimal
