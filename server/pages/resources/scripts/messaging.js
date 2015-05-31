var socket;

window.onload = function () {

	socket = io.connect("https://" + window.location.hostname + ":22846");
	// socket = io.connect("https://75.4.22.77:22846");
	socket.on('get auction items', function(items) {
		itemsToLoad = items.length;

		for (var i = items.length - 1; i >= 0; i--) {
			cards[i] = {};
			cards[i].index = i;
			cards[i].ID = items[i]._id;
			cards[i].image = items[i].image;
			cards[i].name = items[i].name;
			cards[i].artist = items[i].artist;
			cards[i].description = items[i].description;
			cards[i].bidHistory = items[i].bidHistory;
			// for (var j = 0; j < cards[i].bidHistory.length; j++) {
				// cards[i].bidHistory[j][0] = parseFloat(cards[i].bidHistory[j][0]);
			// }
			var container = document.getElementById("auctionItems");

			var auctionItem = document.createElement("div");
			auctionItem.className = "auctionItem";
			cards[i].mouseDown = false;
			auctionItem.onclick = createClickHandeler(i);
			auctionItem.onmousedown = createMouseDownHandeler(cards[i], false);
			auctionItem.onmouseenter = createMouseDownHandeler(cards[i], true);
			auctionItem.onmouseup = createMouseUpHandeler(cards[i], false);
			auctionItem.onmouseleave = createMouseUpHandeler(cards[i], true);
			auctionItem.id = "card" + (items.length - 1 - i);

				var info = document.createElement("div");
				info.className = "info";
				auctionItem.insertBefore(info, auctionItem.firstChild);

					var description = document.createElement("div");
					description.className = "description";
					description.innerHTML = cards[i].description;
					info.insertBefore(description, info.firstChild);

					var artist = document.createElement("div");
					artist.className = "artist";
					artist.innerHTML = cards[i].artist;
					info.insertBefore(artist, info.firstChild);

					var name = document.createElement("div");
					name.className = "name";
					name.innerHTML = cards[i].name;
					info.insertBefore(name, info.firstChild);

				var picture = document.createElement("img");
				picture.className = "picture";
				picture.style.backgroundImage = "url(" + cards[i].image + ")";
				auctionItem.insertBefore(picture, auctionItem.firstChild);

			cards[i].dom = container.insertBefore(auctionItem, container.firstChild);
			cards[i].front = cards[i].dom.innerHTML;
			cards[i].posFixed = [];
			cards[i].posFixed[0] = cards[i].dom.offsetLeft + container.offsetLeft - 20;
			cards[i].posFixed[1] = cards[i].dom.offsetTop + container.offsetTop - 20 - window.pageYOffset;
			cards[i].posFixed[2] = window.innerWidth - (cards[i].posFixed[0] + cards[i].dom.offsetWidth) - 55;
			cards[i].posFixed[3] = window.innerHeight - (cards[i].posFixed[1] + cards[i].dom.offsetHeight) - 40 + window.pageYOffset;
			cards[i].calculateDefaultBid = function() {
				var defaultBid = (this.bidHistory.length > 1) ? Math.ceil(parseFloat(this.bidHistory[this.bidHistory.length - 1][0]) + (this.bidHistory[this.bidHistory.length - 1][0] - this.bidHistory[this.bidHistory.length - 2][0])) : Math.ceil(parseFloat(this.bidHistory[this.bidHistory.length - 1][0]) + 1);
				defaultBid = (defaultBid - parseFloat(this.bidHistory[this.bidHistory.length - 1][0]) < 1) ? Math.ceil(parseFloat(this.bidHistory[this.bidHistory.length - 1][0]) + 1) : defaultBid;
				return defaultBid;
			};
			cards[i].calculateDefaultBid();
			var _image = document.createElement("img");
			_image.src = cards[i].image;
			_image.onload = createImageLoadHandeler(_image, i);
		}
	});
	socket.emit('get auction items', "");

	socket.on('new bid', function(text) {
		if (text.itemID != null) {
			msg = {};
			msg.id = text.itemID;
			msg.bid = text.bid;
			msg.bidder = text.bidder;
			cards[msg.id].bidHistory[cards[msg.id].bidHistory.length] = {};
			cards[msg.id].bidHistory[cards[msg.id].bidHistory.length - 1].bid = parseFloat(msg.bid);
			cards[msg.id].bidHistory[cards[msg.id].bidHistory.length - 1].bidder = msg.bidder;
			if (cards[msg.id].dom.innerHTML != cards[msg.id].front) {
				var bidList = document.getElementById("bidHistory");
				var _element = document.createElement("div");
				_element.className = "bidPrice";
				_element.style.backgroundColor = ((cards[msg.id].bidHistory.length - 1) % 2 == 0) ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)";
				_element.innerHTML = cards[msg.id].bidHistory[cards[msg.id].bidHistory.length - 1].bid + "<span class=\"bidderName\">Anonymous " + decideAnonAnimal(cards[msg.id].bidHistory[cards[msg.id].bidHistory.length - 1].bidder) + "</span>";
				bidList.insertBefore(_element, bidList.firstChild);
				document.getElementById("dollarAmount").value = cards[msg.id].calculateDefaultBid();
			}
		}
		else {
			if (text == "failed to authenticate bid")
				logout();
			else
				alert(text);
		}
	});
	socket.on('outbid notification', function(msg) {
		if (localStorage["showNotifications"] == null)
			localStorage["showNotifications"] = "true";
		if (localStorage["showNotifications"] === "true") {
			if (document.getElementById("notificationCount").innerHTML == 0)
				document.getElementById("notificationCount").style.display = "block";
			document.getElementById("notificationCount").innerHTML++;
			var notificationsShade = document.getElementById("notificationsShade");
			var _element = document.createElement("div");
			_element.className = "notification";
			_element.id = "notification" + (notificationsShade.childNodes.length - 5);
			_element.style.backgroundColor = ((notificationsShade.childNodes.length) % 2 == 0) ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)";
			_element.innerHTML = "<core-icon class=\"clear\" icon=\"clear\" onclick=\"dismissNotification(" + (notificationsShade.childNodes.length - 5) + ");\"></core-icon><div>You were outbid by an anon. " + decideAnonAnimal(msg.bidder) + "</div><div>The new high bid for item " + convertDBidToLocalID(msg.item) + " is " + parseFloat(msg.price).formatCurrency() + "</div>";
			_element.onclick = createClickHandeler(convertDBidToLocalID(msg.item));
			notificationsShade.insertBefore(_element, notificationsShade.lastChild);

			animLength = 0.6;
			notificationsIcon = document.getElementById("notificationsIcon");
			if (document.getElementById("header").style.transform == "matrix(1, 0, 0, 1, 0, -60)") {
				TweenLite.to(notificationsIcon, animLength, {transform: "translateY(50px)", onComplete: function() {
					TweenLite.to(notificationsIcon, animLength / 5, {transform: "translateY(50px) rotate(30deg)", onComplete: function() {
						TweenLite.to(notificationsIcon, animLength / 5, {transform: "translateY(50px) rotate(-30deg)", onComplete: function() {
							TweenLite.to(notificationsIcon, animLength / 5, {transform: "translateY(50px) rotate(30deg)", onComplete: function() {
								TweenLite.to(notificationsIcon, animLength / 5, {transform: "translateY(50px) rotate(0deg)", onComplete: function() {
									TweenLite.to(notificationsIcon, animLength, {transform: "translateY(0px)", onComplete: function() {

									}});
								}});
							}});
						}});
					}});
				}});
			}
			else {
				TweenLite.to(notificationsIcon, animLength / 5, {transform: "rotate(30deg)", onComplete: function() {
					TweenLite.to(notificationsIcon, animLength / 5, {transform: "rotate(-30deg)", onComplete: function() {
						TweenLite.to(notificationsIcon, animLength / 5, {transform: "rotate(30deg)", onComplete: function() {
							TweenLite.to(notificationsIcon, animLength / 5, {transform: "rotate(0deg)", onComplete: function() {

							}});
						}});
					}});
				}});
			}
		}
	});
	socket.on('create account', function(msg) {
		var animLength = 0.5;
		if (msg == "username already taken") {
			var username = document.getElementById("createUsername");
			TweenLite.to(username, animLength, {backgroundColor:"rgb(255, 220, 220)"});
			TweenLite.to(username, animLength, {border:"2px solid rgb(255, 100, 100)"});
		}
		else if (msg == "invalid email") {
			var email = document.getElementById("createEmail");
			TweenLite.to(email, animLength, {backgroundColor:"rgb(255, 220, 220)"});
			TweenLite.to(email, animLength, {border:"2px solid rgb(255, 100, 100)"});
		}
	});
	socket.on('login', function(msg) {
		if (msg.authKey != null) {
			localStorage.setItem("authKey", msg.authKey);
			localStorage.setItem("ID", msg.id);
			localStorage.setItem("username", msg.username);
			document.getElementById("usernameDisplay").innerHTML = localStorage["username"];
			document.getElementById("avatar").src = "https://unicornify.appspot.com/avatar/" + localStorage["ID"] + "?s=128";
			openPreload();
		}
		else {
			localStorage.setItem("authKey", "");
			localStorage.setItem("ID", "");
			showWrongCreds();
			if (msg == "You've failed too many times.") {
				alert("You've failed too many times.");
				console.log("You've failed too many times.");
			}
		}
	});
	socket.on('reconnect', function(msg) {
		if (msg == "rejoined session" || msg.id == localStorage["ID"]) {
			document.getElementById("usernameDisplay").innerHTML = localStorage["username"];
			document.getElementById("avatar").src = "https://unicornify.appspot.com/avatar/" + localStorage["ID"] + "?s=128";
			openPreload();
		}
		else {
			localStorage.setItem("authKey", "");
			localStorage.setItem("ID", "");
			localStorage.setItem("username", "");
			openLogin();
		}
	});
	socket.on('change email', function(msg) {
		if (msg == "Successfully changed email.") {
			closeAccountSettings();
		}
		else {
			var email = document.getElementById("newEmail");
			email.error = msg;
			email.invalid = true;
		}
	});
	socket.on('change password', function(msg) {
		if (msg == "Successfully changed password.") {
			closeAccountSettings();
		}
		else {
			if (msg == "The old password was incorrect.") {
				var password = document.getElementById("oldPassword");
				password.error = msg;
				password.invalid = true;
			}
			else {
				var password = document.getElementById("newPassword");
				password.error = msg;
				password.invalid = true;
				password = document.getElementById("newPasswordAgain");
				password.error = msg;
				password.invalid = true;
			}
		}
	});
};

function rejoinSession() {
	if (localStorage["ID"] != "" && localStorage["authKey"] != "" && localStorage["ID"] != null && localStorage["authKey"] != null) {
		console.log("attempting to rejoin");
		socket.emit('reconnect to session', {id: localStorage["ID"], authKey: localStorage["authKey"]});
		return true;
	}
	else return false;
}

function login() {
	socket.emit('login', {username: document.getElementById("username").value, password: document.getElementById("password").value});
}

function logout() {
	socket.emit('logout', {ID: localStorage["ID"], authKey: localStorage["authKey"]});
	localStorage.clear();
	location.reload();
}

function createAccount() {
	socket.emit('create account', {username: document.getElementById("createUsername").value, email: document.getElementById("createEmail").value, password: document.getElementById("createPassword").value});
}
