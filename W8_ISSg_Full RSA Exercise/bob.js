const crypto = require("crypto");

const bobPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBP9XoOereJzvA
mJ36yyHUp94ND55a55XGtqKZ+77iWcaxu/xIeLH9fHA3i8/AZJezMeZpvxkIhZLb
dnXvradAccgflhsZFn1MkEha78kPpP/fpDlqxzHbhI4L1U4zPLwCQBlhqw39Btbr
LzGT6GtsXnMAiLYqi7zSP/UL2HN6Zs1hccqJeamD0IASrotr2IVNICx4DeUDZkDi
8hj6to3G3c6+IoDUj7z4iIXFbHRNqXEUzAZXG13EayK37RMaGSj9PuTy6mk5lKTB
wv9VKFekBHBSK6CzDyIxruweZUtaxWNN1i/bqtZaIU7lZIf9sWY/qdjsFBm5Nn9o
QwhFVqGLAgMBAAECggEAAfzIFGVUFwjMQoTPSx7/sBIx5Gx+smyjS7HhJjhClE1c
D8PhKlWjbvnypX+YmV/vd3ZR6lB+z2mgQwWK3PYqPC1vY3PFv5JNo5XwSI8iwDhw
MTqdJI3740gPtetxrHE5dcR2/lwl/q4tU6nelqjTQgAOqri9Nt7NCFSEDqUhOucD
JQm4G2HOdivlraVah6GlNzrh2VdifFL+Mn34/zaQvS4eWAijnhZArmSeGjiLMt+n
DqJrxdKIi21Dl/HCGbET8uUXni+PNhlUkKEg9dxdcojIxGbw4Q+1Mn1FFCJ98+dI
I/ZsQwKwvXFSY+6Z5nr64y83GLIW6CI2fAbtec5MAQKBgQD8lk9Ku7nhxBIc43Wz
o6Ladfesh/2ZGq8t1v+vJAq7gwrOX+f96e/Jwi9PvzxmDXShkqwHAPOCPFrl5B8a
6QDT/B5iW4cyb28r6DQtfNcQsAGlAISmUKUVUDBUFFHM78o9O2XwTOE/0vhKJFbt
6UIujSCyFmSrmmox/eIbUmoHAQKBgQDD3EdJc2JnSFfkf1ozUyhufwCWpGPsTfIg
6nVEKmXzyTIjQP0c2TPJ8j8x6FDw2JJF51sYT/ZXXlsOB7TiXvxcnHVlPU1p0McG
KK1ce+WrpOuCs8HWrifc8sn2dhvREaJA8lHG/VV1DZf9cOn2WHfQUsgYb3FKVREx
+iyy7/jUiwKBgC5zJdnEdAaEnCAb5EVIzmYGU6myyHwjYBu58gMvSZn6Gz6gfHVB
VAtyXmj37g+GYfBknKYdEqrcloq4TNASEUjqkFveIRqxS2xzo0TKNHKpK2RAmCRN
qE4nFPwhUHmzjyl7ht+OA85M6cQYsrPFtZoB8gVOAO1d1DGlUrNbkIwBAoGAE9vg
6oSlhJ1kNAnppmyXG+UKtTuD2jDpDQdYzomR/s72o3Zyc5teUeqbF79bfaAn7KiR
pvxsmN07VEfZwl4pLma6zIITuFfv5iL3uPnjBq1ZJ858J/1Ok2uWqMO+/ErSbc1k
F04WfSDcuVjakBzWQSwzl66tCQFpFe0s3RPR4hMCgYANV+OIonGVYKPUbWW9hH58
rSZ0y0UeB2dK9wK4utTcaZY2Dt2E7AiffN7qZvgsrRSBzALpHR4KTLylthW/2hK2
BGNucL95j1GmAfsgX90LFriSoHvwFVmqGamXBRPqwuXtLgKX7Stbol6fFUzhAMQv
8JU/Po3EYju/VHfcJFg30w==
-----END PRIVATE KEY-----`;

const alicePublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5n5JAm5X2UY+zaZsx/zv
Om+u3cmxGVZ+rKXndOcCdiQjbrRRnVnW8PJfMtXuK8jYnVughycQjK3iQc8VrMQH
XMQfVAi/d9ZJ3MbCriSls4y/W3mgPJOA2jb+SCAuqLqeXLD7oBMhOCQwKNO6Vdr5
fUPhK+4Q/6zamkuw9efkM/U9rOXvcHtFqHszXoWwZ3LtyJ81L93DV/dnflAICCdZ
PtKPFqEJWmkAQUlFMKgTDI4N5E3zR2P7h1TT/DMc1LlamvsBuln8OrVL2nUSZnaG
gA/Fm9OADKNve6Y3eCA0vPZmUk4ihsyevSLEri7b4nbFmCSC0CugPUZp+tJqMy1D
jwIDAQAB
-----END PUBLIC KEY-----`;

// Signature dan pesan terenkripsi dari Alice
const signature = "658ca84efe6fe14dfad4f405ad71294f6ee478d071e76d642808d05af57e2b9bdea222094aa31e2342b093106b6b9fad6b926608eb3c5a2420d3c06168fac63281a897c34ace4ecb22607ded157fa2faa74f4e8a9a6de8dbd6b7ed9383e5c406854c3723e4021ed72688ad8551cdc29d05a0e877982e406e123270d03ee0cb8e5a9caf902cd7c36937c0e5f2d2f35356ad1580416a45e56c4d560d4657c1f3087bb9018ae5b503f0732b87a353a000c4b4788c65aad8be101b5f1a38187f90e249d5e1ed7099edf78fc44b6fcf6bb11c82e77665f6166d75eb96cf09848485e59949fd097796476f5bad519d1e408cc7692aa4b87e861d809f8f212bbcd6d4a1"; // Gantilah dengan output dari alice.js
const encryptedMessageHex = "a03d3304c40527817f97b9ce8cc7da543b75d0899f526b60b1afb6ce551c14d4c1f9961d75da8fba779c51bb4b39ea58f93d73c3ddc8fd9ccb99f02dc95fab6dba94f998d23b192225a36f4922d7d31240d1a8498419aed24a33a0f8ce9c7bd769836aa86be8e83308f4c5bdbb19473ec20981501c527a9997056e86c59017e8f28a60be3ed263b5975c53a2896beda99ecc13bc467406868326359245d0e950e3494004bc75954975ec782b502f46a599c49e6556079a48f1e353bdab2fa984204b5af953a55830156ec306b50fb512607e961b130c721a75de1c8eba507ed80f8f5de710ae79187f294f12da7649a33d250fc75ace522e439a08fff2928df1"; // Gantilah dengan output dari alice.js
const encryptedMessage = Buffer.from(encryptedMessageHex, "hex");

// Fungsi untuk mendekripsi pesan menggunakan kunci privat Bob
function decryptMessage(encryptedMessageHex) {
    const encryptedMessage = Buffer.from(encryptedMessageHex, 'hex'); 
    const decryptedMessage = crypto.privateDecrypt(bobPrivateKeyPem, encryptedMessage);
    return decryptedMessage.toString(); 
}

// Fungsi untuk memverifikasi tanda tangan menggunakan kunci publik Alice
function verifySignature(message, signature) {
    const verifier = crypto.createVerify("sha256"); 
    verifier.update(message); 
    const signatureBuffer = Buffer.from(signature, "hex"); 
    return verifier.verify(alicePublicKeyPem, signatureBuffer);
}

// Mendekripsi pesan yang diterima
const decryptedMessage = decryptMessage(encryptedMessageHex);
const isVerified = verifySignature(decryptedMessage, signature);

console.log("Signature Verification:", isVerified);
console.log("Message:", decryptedMessage);


