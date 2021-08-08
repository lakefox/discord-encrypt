let template = `
<div style="position: fixed; z-index: 10000;">
    <div id="password-modal" style="display: none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 10000;">
        <div style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #010101; opacity: 0.7;"></div>
        <div id="password-alert" style="display: flex; align-items: center; align-content: center; justify-content: space-between; position: absolute; top: -100px; transition: 300ms ease; left: 50%; transform: translateX(-50%); background-color: #edf2f4; width: 300px; border-radius: 5px; text-align: center;">
            <span style="flex-grow: 1; font-family: monospace; font-size: 20px; padding: 20px 10px; border-right: 1px solid #f27f7d; background-color: #ef6461; color: white; border-radius: 5px 0 0 5px;">!</span>
            <h1 style="flex-grow: 2; font-family: sans-serif; color: #212121;">You Must Enter a Password!</h1>
        </div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; padding: 10px; background-color: #edf2f4; border-radius: 5px;">
            <input type="password" placeholder="Password" id="password" style="box-sizing: border-box; width: 100%; resize: none; padding: 10px 7px; color: 2F3737; outline: none; font-size: 14px; border: none; border-radius: 5px; font-family: sans-serif;">
            <div style="display: flex; align-items: center; align-content: center; justify-content: space-around; margin-top: 10px;">
                <input type="button" value="Continue" id="password-continue" style="width: 100%; flex-grow: 1; cursor: pointer; outline: none; border-radius: 5px 0 0 5px; border: none; font-family: sans-serif; font-size: 14px; padding: 10px 0; background-color: #06d6a0; color: white;">
            </div>
        </div>
    </div>
    <div id="modal" style="display: none; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 10000;">
        <div style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #010101; opacity: 0.7;"></div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 500px; padding: 10px; background-color: #edf2f4; border-radius: 5px;">
            <textarea placeholder="Message..." id="message" autofocus style="box-sizing: border-box; width: 100%; resize: none; padding: 10px 7px; color: 2F3737; outline: none; font-size: 14px; border: none; border-radius: 5px; font-family: sans-serif; height: 125px;"></textarea>
            <div style="display: flex; align-items: center; align-content: center; justify-content: space-around; margin-top: 10px;">
                <input type="button" value="Continue" id="continue" style="width: 75%; flex-grow: 1; cursor: pointer; outline: none; border-radius: 5px 0 0 5px; border: none; font-family: sans-serif; font-size: 14px; padding: 15px 0; background-color: #06d6a0; color: white;">
                <input type="button" value="Close" id="close" style="width: 25%; flex-grow: 1; cursor: pointer; outline: none; border-radius: 0 5px 5px 0; border: none; font-family: sans-serif; font-size: 14px; padding: 15px 0; background-color: #ef6461; color: white;">
            </div>
        </div>
    </div>
    <div style="width: 200px; position: fixed; bottom: 0; right: 0; margin: 0 20px 10px 0; padding: 5px; box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; border-radius: 5px; background-color: #edf2f4;">
        <input type="button" value="Encrypt a New Message" id="encrypt" style="width: 100%; margin: 5px 0; padding: 10px 30px; border: none; border-radius: 5px; background-color: #5899e2; color: white; cursor: pointer;">
        <input type="button" value="Decrypt Page" id="decrypt" style="width: 100%; margin: 5px 0; padding: 10px 30px; border: none; border-radius: 5px; background-color: #293241; color: white; cursor: pointer;">
        <input type="button" value="Encrypt Page" id="encrypt-page" style="display: none; width: 100%; margin: 5px 0; padding: 10px 30px; border: none; border-radius: 5px; background-color: #ef6461; color: white; cursor: pointer;">
    </div>
</div>`;

let parser = new DOMParser();

let d = parser.parseFromString(template, "text/html");

document.body.appendChild(d.body.children[0]);

document.getElementById("password-modal").style.display = 'block';

document.getElementById("password").focus();

let passphrase;

document.querySelector("#password-continue").addEventListener('click', () => {
    if (document.getElementById("password").value.length == 0) {
        document.getElementById("password-alert").style.top = '10px';
        document.getElementById("password").focus();
    } else {
        passphrase = document.querySelector("#password").value;
        document.getElementById("password-modal").style.display = 'none';
    }
})

document.querySelector("#encrypt-page").addEventListener('click', () => {
    encryptedMessages = updateEncryptedMessages(encryptedMessages);
    document.getElementById('encrypt-page').style.display = 'none';
    encrypt(encryptedMessages, passphrase);
})

document.querySelector("#password").addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("#password-continue").click();
    }
})

document.querySelector("#password").addEventListener("input", () => {
    document.getElementById("password-alert").style.top = "-100px";
})

document.querySelector("#encrypt").addEventListener('click', () => {
    document.getElementById("modal").style.display = "block";
    document.querySelector("#message").focus();
})

document.querySelector("#decrypt").addEventListener('click', () => {
    let x = findEncryptedMessages();
    if (x.length > encryptedMessages.length) {
        for (i = 0; i < x.length; i++) {
            encryptedMessages.push(x[i]);
        }
    } else if (x.length < encryptedMessages.length) {
        for (i = 0; i < x.length; i++) {
            encryptedMessages.push(x[i]);
        }
    } else if (x.length == 0) {
        // Do nothing
    }
    document.getElementById("encrypt-page").style.display = 'block';
    decrypt(findEncryptedMessages(), passphrase);
})

document.querySelector("#continue").addEventListener('click', () => {
    let message = document.querySelector("#message").value;
    let encrypted = `encrypt_begin ${cipherHash(message, passphrase)} encrypt_end`;
    document.querySelector("#message").value = encrypted;
    document.getElementById("message").select();
    document.execCommand("copy");
    document.querySelector("#continue").value = "Text Copied ✓";
    setTimeout(() => {
        document.getElementById("modal").style.display = 'none'
        resetModal();
    }, 500);
})

document.querySelector("#message").addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("#continue").click();
    }
})

document.querySelector("#close").addEventListener('click', () => {
    document.getElementById("modal").style.display = 'none';
})

function resetModal() {
    document.querySelector("#message").value = "";
    document.querySelector("#continue").value = "Continue";
}

let encryptedMessages = findEncryptedMessages();

function updateEncryptedMessages(arr) {
    updatedMessages = findEncryptedMessages();
    for (var i = 0; i < updatedMessages.length; i++) {
        if (arr.includes(updatedMessages[i])) {
            break;
        } else {
            arr.push(updatedMessages[i]);
        }
    }
    return arr;
}

function findEncryptedMessages() {
    let xpath = `//*[text()[contains(., 'encrypt_begin ')]]`;
    let encryptedMessages = [];
    let results = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null);
    while (result = results.iterateNext()) {
        encryptedMessages.push(result);
    }
    return encryptedMessages;
}

/*
SAVE FOR LATER WE MIGHT NEED IT FOR SOMETHING
function findElementByContent(content) {
    let xpath = `//*[text()='${content}']`
    let result = document.evaluate(xpath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return result;
}
*/

function decrypt(elements, password) {
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        msg = element.innerHTML.toString().replace("encrypt_begin ", "").replace(" encrypt_end", "");
        element.innerHTML = `${unCipherHash(msg, password)}`;
    }
}


function encrypt(elements, password) {
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.innerHTML.includes("encrypt_begin ")) {
            // Do nothing
        } else {
            element.innerHTML = `encrypt_begin ${cipherHash(element.innerHTML.toString(), password)} encrypt_end`;
        }
    }
}