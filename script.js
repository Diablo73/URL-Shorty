//	https://getpantry.cloud/
//	1554b4c1-7590-43ab-98a9-ec16f375fc86
//	7433c5f3-6ac1-45fd-8172-2b9803598675

PantryID = "c617baa5-7d58-46c2-9a7a-3fc3a6df8ba2";
endpoint = "https://getpantry.cloud/apiv1/pantry/" + PantryID + "/basket/testBasket";
hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
	let request = new XMLHttpRequest();

	request.onload = function () {
		let data = JSON.parse(request.responseText);
		let ans = data[hashh];
		if (ans != undefined) {
			window.location.href = ans;
		}
	};

	request.open("GET", endpoint, true);
	request.send();
}

function shortURL() {
	longURL = getURL();
	getCode();
	sendHTTPRequest();
}

function getURL() {
	var url = document.getElementById("longURL").value;
	if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://")) {
		return url;
	} else {
		return "https://" + url;;
	}
}

function getCode() {
	customCode = document.getElementById("customCode").value;
	if (customCode == "") {
		customCode = getRandomCode();
	}
}

function getRandomCode() {
	var code = "";
	var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++) {
		code += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
	}
	return code;
}

function sendHTTPRequest() {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if (request.readyState == XMLHttpRequest.DONE) {
			console.log(request.responseText);
			var shortURLdiv = document.getElementById("shortURL");
			let shortURLLink = window.location.href + "#" + customCode;
			shortURLdiv.innerHTML = "<a href=" + shortURLLink + ">" + shortURLLink + "</a>";

			copyFunction(shortURLLink);
		}
	};

	request.open("PUT", endpoint, true);
	request.setRequestHeader("Content-Type", "application/json");
	let jsonData = '{"' + customCode + '":"' + longURL + '"}';
	console.log(jsonData);
	request.send(jsonData);
}

function copyFunction(shortURLLink) {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = shortURLLink;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}
