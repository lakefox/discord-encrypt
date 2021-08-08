chrome.runtime.onMessage.addListener(function(request) {
    decrypt(findEncryptedMessages(), request.password);
})

function findEncryptedMessages() {
    let xpath = `//*[text()[contains(., 'encrypt_begin ')]]`;
    let encryptedMessages = [];
    let results = document.evaluate(xpath, document.body, null, XPathResult.ANY_TYPE, null);
    while (result = results.iterateNext()) {
        encryptedMessages.push(result);
    }
    return encryptedMessages;
}

function decrypt(elements, password) {
    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        msg = element.innerHTML.toString().replace("encrypt_begin ", "").replace(" encrypt_end", "");
        element.innerHTML = `${unCipherHash(msg, password)}`;
    }
}