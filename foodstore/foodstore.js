var xmlHttp = createXmlHttpRequestObject();
var inProcess = false, timer, lastInput = '', inputType, lastType = '';

function createXmlHttpRequestObject() {
	var xmlHttp;

	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xmlHttp = false;
		}
	} else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			xmlHttp = false;
		}
	}

	if (!xmlHttp)
		alert("Could not create request object!");
	else
		return xmlHttp;
}

function process(type) {
	if (!inProcess) {
		inProcess = true;

		timer = setTimeout(function () {
			var userInput = document.getElementById(
				type === 'food' ? 'foodInput' : 'staffInput'
			)
				.value.trim();

			if ((lastInput !== userInput) || (type !== lastType)) {
				lastInput = userInput;
				lastType = type;
				search(userInput);
			}
		}, 1500)
	} else {
		inProcess = false;

		clearTimeout(timer);
		process(type);
	}
}

function search(userInput) {
	if (xmlHttp.readyState === 0 || xmlHttp.readyState === 4) {
		inProcess = true;
		var input = encodeURIComponent(userInput);

		try {
			if (lastType === 'food')
				xmlHttp.open("GET", "foodstore.php?food=" + input, true);
			else
				xmlHttp.open("GET", "foodstore.xml", true);

			xmlHttp.onreadystatechange = handleServerResponse;
			xmlHttp.send(null);
		} catch (e) {
			alert(e.toString());
		}
	}
}

function handleServerResponse() {
	if (xmlHttp.readyState === 4) {
		if (xmlHttp.status === 200) {
			try {
				var xmlRespone = xmlHttp.responseXML;
				var xmlDocumentElement = xmlRespone.documentElement;
				var messageField;
				var message;

				if (lastType === 'food') {
					messageField = document.getElementById("belowInputFood");
					message = xmlDocumentElement.firstChild.data;
				} else {
					messageField = document.getElementById("belowInputStaff");

					if (lastInput) {
						var names = xmlDocumentElement
							.getElementsByTagName('name');

						var ssns = xmlDocumentElement
							.getElementsByTagName('ssn');

						message = "";

						for (var i = 0; i < names.length; i++) {
							var name = names.item(i).firstChild.data;
							var ssn = ssns.item(i).firstChild.data;

							if (
								(name.toLowerCase()
									.indexOf(lastInput) !== -1) ||
								(ssn.toLowerCase().indexOf(lastInput) !== -1)
							) {
								message += name + ' - ' + ssn + "<br>";
							}
						}

						message = message.length ?
							message :
							'No such staff found!';
					} else {
						message = 'Enter name of a staff member.';
					}
				}

				messageField.innerHTML = '<span style="color: blue;">'
					+ message + '</span>';

				inProcess = false;
			} catch (e) {
				alert(e.toString());
			}
		} else {
			alert(xmlHttp.statusText ? xmlHttp.statusText : 'Request failed!');
		}
	}
}
