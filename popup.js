document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#dfsgyu8769sa").addEventListener("click", () => {
		if (typeof password == "undefined") {
			if (document.getElementById("password-field").value.length == 0) {
				document.getElementById("password-alert").style.display = 'block';
			} else {
				password = document.getElementById("password-field").value;
			}
		}

		console.log(password);
		chrome.tabs.query({ active: true, currentWindow: true }, function(activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { passphrase: password})
			chrome.tabs.executeScript(activeTabs[0].id, { file: 'encryption.js' })
			chrome.tabs.executeScript(activeTabs[0].id, { file: 'content.js' })
        })
		window.close();
	})

    document.querySelector("#hjgdfnshkjyu").addEventListener("click", () => {
		if (typeof password == "undefined") {
			if (document.getElementById("password-field").value.length == 0) {
				document.getElementById("password-alert").style.display = 'block';
			} else {
				password = document.getElementById("password-field").value;
			}
		}
		document.querySelector('#jvhktuy45346').value = `encrypt_begin ${cipherHash(document.querySelector("#jvhktuy45346").value, password)} encrypt_end`;
		document.querySelector("#jvhktuy45346").select();
		document.execCommand("copy");
		document.getElementById("alert").style.display = "block";
		setTimeout(() => {
			document.getElementById("jvhktuy45346").value = '';
			document.getElementById("alert").style.display = 'none';
			window.close();
		}, 800)
	})

	document.querySelector("#password-field").addEventListener('input', () => {
		document.getElementById("password-alert").style.display = 'none';
	})

	document.querySelector("#main").addEventListener("click", () => {
		if (document.querySelector("#main").classList.contains("active-left")) {
			// Do nothing
		} else {
			document.querySelector("#main").classList.add("active-left");
			document.querySelector("#single-use").classList.remove("active-right");
			document.getElementById("main-tab").style.display = "block";
			document.getElementById("single-use-tab").style.display = "none";
		}
	})

	document.querySelector("#single-use").addEventListener("click", () => {
		if (document.querySelector("#single-use-tab").classList.contains("active-right")) {
			// Do nothing
		} else {
			document.querySelector("#single-use").classList.add("active-right");
			document.querySelector("#main").classList.remove("active-left");
			document.getElementById("single-use-tab").style.display = "block";
			document.getElementById("main-tab").style.display = "none";
		}
	})

	document.querySelector("#inject").addEventListener("click", () => {
		window.close();
		chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
			chrome.tabs.executeScript(activeTabs[0].id, { file: 'encryption.js' });
			chrome.tabs.executeScript(activeTabs[0].id, { file: 'inject.js' });
		})
	})
})