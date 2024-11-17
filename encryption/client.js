const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto"); // impor modul

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout,
  prompt: "> ",
});

let targetUsername = "";
let username = "";
const users = new Map();
let privateKey = "";
let publicKey = "";

// untuk menghasilkan pasangan kunci RSA (publicKey dan privateKey).
function generateKeyPair() { 
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // standart min keamanan RSA
    publicKeyEncoding: { type: "spki", format: "pem" },  // SPKI (Subject Public Key Info) PKCS8 Standart
    privateKeyEncoding: { type: "pkcs8", format: "pem" }, //  menyimpan dalam format base64 yang dapat dibaca manusia.
  });
  return { publicKey, privateKey };
}

// mengenkripsi pesan menggunakan kunci publik target,
function encryptMessage(message, targetPublicKey) {
  return crypto.publicEncrypt(targetPublicKey, Buffer.from(message)).toString("base64");
}

// mendekripsi pesan yang diterima menggunakan kunci privat pengirim.
function decryptMessage(ciphertext) {
  try {
    return crypto.privateDecrypt(privateKey, Buffer.from(ciphertext, "base64")).toString();
  } catch (err) {
    return "Failed to decrypt message.";
  }
}

({ publicKey, privateKey } = generateKeyPair());  // generate

socket.on("connect", () => {
  console.log("Connected to the server");

  socket.on("init", (keys) => {
    keys.forEach(([user, key]) => users.set(user, key));
    console.log(`\nThere are currently ${users.size} users in the chat`);
    rl.prompt();

    rl.question("Enter your username: ", (input) => {
      username = input;
      console.log(`Welcome, ${username} to the chat`);

      socket.emit("registerPublicKey", {
        username,
        publicKey,
      });

      rl.prompt();

      rl.on("line", (message) => {
        if (message.trim()) {
          if ((match = message.match(/^!secret (\w+)$/))) {
            targetUsername = match[1];
            console.log(`Now secretly chatting with ${targetUsername}`);
          } else if (message.match(/^!exit$/)) {
            console.log(`No more secretly chatting with ${targetUsername}`);
            targetUsername = "";
          } else {
            let encryptedMessage = message;
            if (targetUsername) {
              // Mencari public key dari target
              const targetPublicKey = users.get(targetUsername); 
              if (targetPublicKey) {
                encryptedMessage = encryptMessage(message, targetPublicKey); 
                // di encrypt menggunakan public key target
              } else {
                console.log(`Public key for ${targetUsername} not found.`);
              }
            }
            // dikirim pesan yang udah di encrypt
            socket.emit("message", { username, message: encryptedMessage, targetUsername });  
          }
        }
        rl.prompt();
      });
    });
  });
});

socket.on("newUser", (data) => {
  const { username, publicKey } = data;
  users.set(username, publicKey);
  console.log(`${username} joined the chat`);
  rl.prompt();
});

socket.on("message", (data) => {
  const { username: senderUsername, message: senderMessage, targetUsername } = data;

  if (username === senderUsername && targetUsername) {
    return;
    // tidak menampilkan ciphertext di pengirim
  }

  if (targetUsername && targetUsername !== username) { 
    console.log(`${senderUsername}: ${senderMessage}`);  // munculin ciphertext
  } 
  else {
    let outputMessage;
    if (targetUsername === username) { 
      outputMessage = decryptMessage(senderMessage); // pesan di decrypt
    } else {  // bukan mode secret
      outputMessage = senderMessage;
    }

    console.log(`${senderUsername}: ${outputMessage}`); // menampilkan pesan
  }

  rl.prompt();
});



socket.on("disconnect", () => {
  console.log("Server disconnected, Exiting...");
  rl.close();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});