function onload () {

}

function openMessaging () {
    var header = document.getElementsByTagName("header");
    var card = document.getElementById("main");
    var tweenTime = 0.5;

    TweenLite.to(header, tweenTime, {
        height: "0px"
    });
    TweenLite.to(card, tweenTime, {
        top: "-535px",
        onComplete: function () {
            window.location.href = "messaging";
        }
    });
}

function submitForm (form) {
	if (checkInputForErrors(form)) {
        switch (form) {
            case "login" :
                var username = document.getElementById("login_username");
                var password = document.getElementById("login_password");
                
                var xmlhttp;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        if (xmlhttp.responseText.includes("success")) {
                            openMessaging();
                        } else {
                            username.setAttribute("error", "");
                            username.nextSibling.innerHTML = "Bad login";
                            password.setAttribute("error", "");
                            password.nextSibling.innerHTML = "Bad login";
                        }
                    }
                };
                xmlhttp.open("POST","/signup", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xmlhttp.send("username=" + username.value + "&password=" + password.value);
                break;
            case "signup" :
                
                break;
        }
	}
}

function checkInputForErrors (form) {
    switch (form) {
        case "login" :
            var hasError = false;

            var username = document.getElementById("login_username");
            var password = document.getElementById("login_password");

            if (password.value === "") {
                password.setAttribute("error", "");
                password.nextSibling.innerHTML = "Can't be blank";
                password.focus();
                hasError = true;
            } else {
                password.removeAttribute("error");
                password.nextSibling.innerHTML = "We're all good";
            }
            if (username.value === "") {
                username.setAttribute("error", "");
                username.nextSibling.innerHTML = "Can't be blank";
                username.focus();
                hasError = true;
            } else {
                username.removeAttribute("error");
                username.nextSibling.innerHTML = "We're all good";
            }
            return !hasError;
        case "signup" :
            /*var*/ hasError = false;

            var email = document.getElementById("signup_email");
            /*var*/ username = document.getElementById("signup_username");
            /*var*/ password = document.getElementById("signup_password");
            var passwordAgain = document.getElementById("signup_password_again");

            if (password.value === "") {
                password.setAttribute("error", "");
                password.nextSibling.innerHTML = "Can't be blank";
                password.focus();
                hasError = true;
            } else {
                password.removeAttribute("error");
                password.nextSibling.innerHTML = "We're all good";
            }
            if (password.value != passwordAgain.value) {
                password.setAttribute("error", "");
                password.nextSibling.innerHTML = "Passwords don't match";
                passwordAgain.setAttribute("error", "");
                passwordAgain.nextSibling.innerHTML = "Passwords don't match";
                password.focus();
                hasError = true;
            } else if (password.value !== "") {
                password.removeAttribute("error");
                password.nextSibling.innerHTML = "We're all good";
                passwordAgain.removeAttribute("error");
                passwordAgain.nextSibling.innerHTML = "We're all good";
            }
            if (email.value === "") {
                email.setAttribute("error", "");
                email.nextSibling.innerHTML = "Can't be blank";
                email.focus();
                hasError = true;
            } else if (!isEmail(email.value)) {
                email.setAttribute("error", "");
                email.nextSibling.innerHTML = "Enter a valid email";
                email.focus();
                hasError = true;
            } else {
                email.removeAttribute("error");
                email.nextSibling.innerHTML = "We're all good";
            }
            if (username.value === "") {
                username.setAttribute("error", "");
                username.nextSibling.innerHTML = "Can't be blank";
                username.focus();
                hasError = true;
            } else {
                username.removeAttribute("error");
                username.nextSibling.innerHTML = "We're all good";
            }
            return !hasError;
    }
}

function isEmail (email) {
	return (email.length >= 5 && email.indexOf(" ") == -1 && email.split("@").length == 2 && email.split(".").length == 2 && email.indexOf("@") < email.indexOf(".") - 1 && email.indexOf("@") !== 0 && email.indexOf(".") != email.length - 1);
}
function SpecialScroll (applyTo, relativeSpeed) {
	this.relativeSpeed = relativeSpeed;
    this.applyTo = applyTo;
	this.onscroll = function (scroll) {
	    if (!window.mobilecheck()) {
	        var newPos = scroll * -this.relativeSpeed;
	        this.applyTo.style.transform = "translateY(" + (newPos) + "px)";
	        this.applyTo.style.webkitTransform = "translateY(" + (newPos) + "px)";
	    }
	};
}
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

(function () {
	var app = angular.module("AllTalk", []);
	app.controller("MessengerController", function () {
		this.users = [];
		this.chats = {};
		this.you = {
			name: "Clarence Meyer",
			id: 457,
			image: "resources/images/457.jpg"
		};
		this.users = [456, 450, 451, 452, 453, 454, 455];
		this.chats[456] = new Chat("Andre Richards", 456, OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/profiles/456.jpg", "now", [{sender: 456, isyou: false,  message: "Yo! ma homie!", time: 1431048720}, {sender: 456, isyou: false,  message: "how's it going?", time: 1431168720}, {sender: 457, isyou: true,  message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: 1431108720}, {sender: 456, isyou: false,  message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: 1431128720}, {sender: 457, isyou: true,  message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: 1431188720}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
		this.chats[450] = new Chat("Trevor Blackwell", 450, OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/profiles/450.jpg", "now", [{sender: 450, isyou: false, message: "Freemium research & development business-to-consumer traction analytics startup learning curve mass market monetization iPhone. Freemium iteration long tail termsheet creative metrics branding prototype bootstrapping alpha product management technology scrum project series A financing.", time: 1431027660}, {sender: 457, isyou: true,  message: "User experience business plan sales customer bandwidth ecosystem. Sales mass market ownership growth hacking leverage channels infrastructure equity long tail seed money infographic vesting period responsive web design buzz.", time: 1431030192}, {sender: 450, isyou: false, message: "Business plan founders graphical user interface disruptive non-disclosure agreement channels market branding ownership freemium user experience.", time: 1431030312}, {sender: 457, isyou: true,  message: "User experience disruptive branding early adopters non-disclosure agreement buzz entrepreneur incubator.", time: 1431030612}, {sender: 450, isyou: false, message: "Social proof buzz twitter channels infrastructure advisor sales holy grail business-to-business. Product management social media creative bandwidth twitter business-to-business burn rate monetization gen-z partnership branding.", time: 1431030852}, {sender: 450, isyou: false, message: "Lean startup startup partnership hypotheses user experience supply chain advisor iteration. Freemium startup paradigm shift network effects conversion iPhone burn rate.", time: 1431031632}, {sender: 457, isyou: true,  message: "Customer buyer conversion A/B testing monetization accelerator ecosystem paradigm shift analytics equity infrastructure success. Ramen innovator social media. Venture paradigm shift entrepreneur freemium client early adopters analytics non-disclosure agreement release influencer.", time: 1431041412}, {sender: 450, isyou: false, message: "Partnership gen-z customer founders MVP social proof ramen ownership. Investor virality direct mailing startup market pitch freemium beta ecosystem assets stealth. Crowdsource user experience partnership partner network early adopters business-to-business influencer backing bootstrapping gamification accelerator prototype MVP. Sales virality funding network effects accelerator startup non-disclosure agreement hackathon crowdfunding partnership ownership niche market.", time: 1431055812}, {sender: 457, isyou: true,  message: "Pitch user experience iPad channels. Monetization virality equity social media deployment technology alpha analytics innovator entrepreneur stock. Traction MVP sales bandwidth early adopters monetization user experience facebook.", time: 1431057672}], [{service: "google-plus", username: "a_richards@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@a_richards", url: "http://twitter.com/a_richards"}, {service: "facebook-box", username: "andre.richards", url: "http://facebook.com/andre.richards"}, {service: "twitch", username: "a_richards", url: "http://twitch.com/a_richards"}]);
		this.chats[451] = new Chat("Walter Sobchak", 451, OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/profiles/451.jpg", "now", [{sender: 457, isyou: true,  message: "Walter, you can't do that. These guys're like me, they're pacifists. Smokey was a conscientious objector. Nihilists! Jesus. Obviously you're not a golfer. Yeah man, it really tied the room together. Fine, Dude. As if it's impossible to get some nail polish, apply it to someone else's toe. Nice marmot. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.", time: 1430613686}, {sender: 451, isyou: false, message: "I spent most of my time occupying various, um, administration buildings, smoking thai-stick, breaking into the ROTC and bowling. Dude, please!… Is this your homework, Larry? Finishing my coffee. But that is up to little Larry here. Isn't it, Larry? I just want to say, sir, that we're both enormous—on a personal level. I don't see any connection to Vietnam, Walter. Yeah man. Well, you know, the Dude abides.", time: 1430619806}, {sender: 451, isyou: false, message: "Another Caucasian, Gary. Ever hear of the Seattle Seven? No ma'am, I didn't mean to give the impression that we're police exactly. We're hoping that it will not be necessary to call the police. I was, uh, one of the authors of the Port Huron Statement —The original Port Huron Statement. Not the compromised second draft. Hello, Pilar? My name is Walter Sobchak, we spoke on the phone, this is my associate Jeffrey Lebowski.", time: 1430619926}, {sender: 457, isyou: true,  message: "Nice marmot. Yeah man. Well, you know, the Dude abides. We wanted to talk about little Larry. May we come in? I was, uh, one of the authors of the Port Huron Statement —The original Port Huron Statement. Not the compromised second draft. No, look. I do mind. The Dude minds. This will not stand, you know, this aggression will not stand, man. No, the, uh, police chief of Malibu. A real reactionary.", time: 1430620226}, {sender: 451, isyou: false, message: "And let's also not forget—let's not forget, Dude—that keeping wildlife, an amphibious rodent, for domestic, you know, within the city —that isn't legal either. Walter, this isn't a First Amendment thing. All right, Plan B. You might want to watch out the front window there, Larry. You're going to enter a world of pain, son. We know that this is your homework. We know you stole a car.", time: 1430622086}], [{service: "google-plus", username: "w_sobchak@gmail.com", url: "http://plus.google.com/w_sobchak"}, {service: "twitter", username: "@w_sobchak", url: "http://twitter.com/w_sobchak"}, {service: "facebook-box", username: "walter.sobchak", url: "http://facebook.com/walter.sobchak"}, {service: "twitch", username: "w_sobchak", url: "http://twitch.com/w_sobchak"}]);
		this.chats[452] = new Chat("Grace Fowler", 452, OnlineStatus.ONLINE, ChatStatus.MUTED, "resources/images/profiles/452.jpg", "now", [{sender: 452, isyou: false, message: "Our ambitions cross-cultural committed fight against oppression reproductive rights sanitation catalyze gender rights lifting people up advancement sustainability microloans positive social change.", time: 1430956223}, {sender: 452, isyou: false, message: "Assistance public institutions, think tank agency capacity building clean water human rights conflict resolution generosity visionary.", time: 1430956403}, {sender: 457, isyou: true,  message: "Change lives emergency response, informal economies, governance human experience activism contribution social movement thinkers who make change happen women's rights making progress rights-based approach.", time: 1430956463}, {sender: 452, isyou: false, message: "Hack measures, overcome injustice cross-agency coordination working alongside climate change working families partnership.", time: 1430957663}, {sender: 457, isyou: true,  message: "Readiness voice catalyst cornerstone honor crowdsourcing catalytic effect criteria. Amplify process humanitarian relief; natural resources combat malaria inclusive capitalism safety economic development, donation Bloomberg replicable indicator benefit combat poverty. Treatment world problem solving innovation; necessities UNICEF globalization.", time: 1430957663}, {sender: 452, isyou: false, message: "Mobilize; solutions urban collaborative approach growth freedom progressive, UNHCR public service.", time: 1430957720}, {sender: 457, isyou: true,  message: "Promising development, Jane Jacobs; community health workers volunteer livelihoods resourceful Global South; Kickstarter outcomes life-expectancy transform the world altruism social challenges.", time: 1430957840}, {sender: 457, isyou: true,  message: "Involvement equality provide women and children philanthropy change, local solutions NGO global citizens enabler best practices community crisis situation.", time: 1430957861}, {sender: 452, isyou: false, message: "International development results agenda affiliate fellows advocate, Oxfam Cesar Chavez fundraise liberal; development planned giving change-makers. Non-partisan free-speech citizens of change beneficiaries revitalize accelerate progress.", time: 1430957921}, {sender: 457, isyou: true,  message: "Peaceful courageous technology public sector, Millennium Development Goals interconnectivity, developing sustainable Rosa Parks celebrate nonviolent resistance social impact Arab Spring. Minority insurmountable challenges, environmental economic independence, nonprofit sustainable future relief, social entrepreneurship citizenry legal aid effectiveness. Giving, international, gender immunize civic engagement global Gandhi, sharing economy support socio-economic divide.", time: 1430958281}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com/"}]);
		this.chats[453] = new Chat("The Joker", 453, OnlineStatus.OFFLINE, ChatStatus.NONE, "resources/images/profiles/453.jpg", "now", [{sender: 453, isyou: false, message: "How about a magic trick? I'm gonna make this pencil disappear. Ta-da!", time: "9:31"}, {sender: 457, isyou: true,  message: "Bats frighten me. It's time my enemies shared my dread.", time: "9:32"}, {sender: 453, isyou: false, message: "If you're good at something, never do it for free.", time: "9:32"}, {sender: 453, isyou: false, message: "You see, I'm a guy of simple taste. I enjoy dynamite and gunpowder and gasoline.", time: "9:34"}, {sender: 457, isyou: true,  message: "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.", time: "9:34"}, {sender: 453, isyou: false, message: "You wanna know how I got them? So I had a wife. She was beautiful, like you, who tells me I worry too much, who tells me I ought to smile more, who gambles and gets in deep with the sharks. Hey. One day they carve her face. And we have no money for surgeries. She can't take it. I just wanna see her smile again. I just want her to know that I don't care about the scars. So, I do this to myself. And you know what? She can't stand the sight of me. She leaves. Now I see the funny side. Now I'm always smiling.", time: "9:36"}, {sender: 453, isyou: false, message: "It was a dog. It was a big dog.", time: "9:36"}, {sender: 457, isyou: true,  message: "This isn't a car.", time: "11:12"}, {sender: 453, isyou: false, message: "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.", time: "11:12"}, {sender: 457, isyou: true,  message: "I seek the means to fight injustice. To turn fear against those who prey on the fearful.", time: "11:13"}, {sender: 453, isyou: false, message: "And as for the television's so-called plan, Batman has no jurisdiction.", time: "11:13"}, {sender: 453, isyou: false, message: "I just want my phone call.", time: "11:13"}, {sender: 453, isyou: false, message: "This town deserves a better class of criminal and I'm gonna give it to them. Tell your men they work for me now. This is my city.", time: 1431048720}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com/"}]);
		this.chats[454] = new Chat("Skylar White", 454, OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/profiles/454.jpg", "now", [{sender: 457, isyou: true,  message: "It's complicated and I don't wish to discuss it. It's none of your concern. You know what, let's just say that I have a hell of a lot more on my mind, right now, than thinking about buying a damn car wash. Okay? So if you could just... please. ", time: "16:41"}, {sender: 457, isyou: true,  message: "Stop. Stop! You keep saying that word - danger... danger! No and I have never used that word. I said things were complicated. And then you flew off the handle! ", time: "17:23"}, {sender: 457, isyou: true,  message: "Gus is gonna make his move. I don't know when, I don't know where or how. All I know is it's gonna happen. Powerless to stop him. ", time: "17:25"}, {sender: 457, isyou: true,  message: "I have been waiting. I've been waiting all day. Waiting for Gus to send one of his men to kill me. And it's you. Who do you know, who's okay with using children, Jesse? Who do you know... who's allowed children to be murdered... hmm? Gus! He has, he has been ten steps ahead of me at every turn. And now, the one thing that he needed to finally get rid of me is your consent and boy he's got that now. He's got it. And not only does he have that, but he manipulated you into pulling the trigger for him. ", time: 1430957720}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
		this.chats[455] = new Chat("Barack Obama", 455, OnlineStatus.AWAY, ChatStatus.NONE, "resources/images/profiles/455.jpg", "now", [{sender: 455, isyou: false, message: "That they are endowed by their Creator with certain inalienable rights. The hope of a skinny kid with a funny name who believes that America has a place for him, too.", time: "16:41"}, {sender: 457, isyou: true,  message: "Not once in my conversations with him have I heard him talk about any ethnic group in derogatory terms, or treat whites with whom he interacted with anything but courtesy and respect. Washington's been talking about our oil addiction for the last thirty years, and John McCain has been there for twenty-six of them. If your hopes have been dashed again and again, then it's best to stop hoping, and settle for what you already know.", time: "17:23"}, {sender: 455, isyou: false, message: "Born into poverty? Pull yourself up by your own bootstraps - even if you don't have boots. For decades, there has been a stalemate: two peoples with legitimate aspirations, each with a painful history that makes compromise elusive. But I do have an unyielding belief that all people yearn for certain things: the ability to speak your mind and have a say in how you are governed; confidence in the rule of law and the equal administration of justice; government that is transparent and doesn't steal from the people; the freedom to live as you choose. Fear that because of modernity we will lose of control over our economic choices, our politics, and most importantly our identities - those things we most cherish about our communities, our families, our traditions, and our faith.", time: "17:25"}, {sender: 457, isyou: true,  message: "And it's around this time that some pastors I was working with came up to me and asked if I was a member of a church. That is why we will honor our agreement with Iraq's democratically-elected government to remove combat troops from Iraqi cities by July, and to remove all our troops from Iraq by 2012. That is why we are forging service projects in America that bring together Christians, Muslims, and Jews. And while America in the past has focused on oil and gas in this part of the world, we now seek a broader engagement.", time: "17:25"}, {sender: 455, isyou: false, message: "They know they have to work hard to get ahead - and they want to. Ours is a promise that says government cannot solve all our problems, but what it should do is that which we cannot do for ourselves - protect us from harm and provide every child a decent education; keep our water clean and our toys safe; invest in new schools and new roads and new science and technology. And it is that promise that forty five years ago today, brought Americans from every corner of this land to stand together on a Mall in Washington, before Lincoln's Memorial, and hear a young preacher from Georgia speak of his dream. government has gone to court to protect the right of women and girls to wear the hijab, and to punish those who would deny it. Around the world, we can turn dialogue into Interfaith service, so bridges between peoples lead to action - whether it is combating malaria in Africa, or providing relief after a natural disaster. This is important because no development strategy can be based only upon what comes out of the ground, nor can it be sustained while young people are out of work.", time: 1430619806}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
		this.currentChat = 456;

		this.toolbarItems = [{icon: "account-plus", title: "Add people", importance: 0}, {icon: "history", title: "Turn history off", importance: 1}, {icon: "package", title: "Archive", importance: 2}, {icon: "rename-box", title: "Rename", importance: 3}, {icon: "delete", title: "Delete", importance: 4}];
	});
	app.directive("currentChat", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/current_chat.html",
			controller: function ($scope) {
				this.chatList = document.getElementById("chats");
				this.switchChat = function (user, chat) {
					$scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].draftText = document.getElementById("send_message").value;
					$scope.ctrlMessenger.currentChat = user;
					for (var i in this.chatList.childNodes) {
						if (this.chatList.childNodes[i].className !== undefined && this.chatList.childNodes[i].className.indexOf("chat") !== -1) {
							this.chatList.childNodes[i].removeAttribute("open");
						}
					}
					$scope.ctrlChatHistory.history = $scope.ctrlMessenger.chats[user].history;
					chat.setAttribute("open", "");

					$scope.ctrlRightSidebar.user = $scope.ctrlMessenger.chats[user];

					$scope.$apply();

					document.getElementById("send_message").value = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].draftText;
					document.getElementById("send_message").focus();
				};
				this.sendMessage = function (message, attachment) {
					$scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].history.push(new Message($scope.ctrlMessenger.you.id, true, message, attachment, Date.now()));
					$scope.$apply();
				};
			},
			controllerAs: "ctrlChat"
		};
	});
	app.directive("chatHistory", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/chat_history.html",
			controller: function ($scope) {
//                this.history = [];
				 this.history = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].history;
			},
			controllerAs: "ctrlChatHistory"
		};
	});
	app.directive("sender", function() {
		return {
			restrict: "A",
			link: function (scope, element) {
				if (scope.message.isyou) {
					element[0].setAttribute("sender", "you");
				} else {
					element[0].setAttribute("sender", "other");
				}
			}
		};
	});
	app.directive("resizeHeight", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				scope.$evalAsync(function () {
					element[0].style.height = element[0].getElementsByClassName("text")[0].offsetHeight + 10;
					var tweenTime = 0.5;
					TweenLite.to(element[0].parentElement, tweenTime, {
						scrollTop: element[0].parentElement.scrollHeight
					});
				});
			}
		};
	});
	app.directive("keyListener", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("keypress", function (event) {
					if (event.keyCode === 13 && !scope.shiftDown) {
						event.preventDefault();
						send_submit.click();
					}
				});
				element.on("keydown", function (event) {
					if (event.keyCode === 16) {
						scope.shiftDown = true;
					}
				});
				element.on("keyup", function (event) {
					if (event.keyCode === 16) {
						scope.shiftDown = false;
					}
				});
			}
		};
	});
	app.directive("sendMessage", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("click", function (event) {
					event.preventDefault();
					if ((scope.message !== "" && /\S/.test(scope.message)) || (scope.attachment && scope.attachment.length > 0)) {
						scope.ctrlChat.sendMessage(scope.message, scope.attachment);
						scope.attachment = "";
						scope.message = "";
						send_media_dialogue.removeAttribute("open");
						send_media_dialogue.removeAttribute("previewing");
						send_media_dialogue_preview_img.style.backgroundImage = "url(" + event.target.result + ")";
						if (send_attachment_input.files.length > 0) {
							for (var i = 0; i < send_attachment_input.files.length; i++) {
								send_attachment_input.files[i] = undefined;
							}
						}
						scope.$apply();
					}
					send_message.focus();
				});
			}
		};
	});
	app.directive("attachMessage", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("click", function (event) {
					event.preventDefault();
					if (send_media_dialogue.getAttribute("open") !== "") {
						send_media_dialogue.setAttribute("open", "");
					}
					else {
						send_media_dialogue.removeAttribute("open");
					}
				});
			}
		};
	});
	app.directive("attachDialogue", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("change", function (event) {
					// event.preventDefault();
					if (event.srcElement.files && event.srcElement.files[0]) {
			            var reader = new FileReader();
			            reader.onload = function (e) {
							send_media_dialogue_preview_img.style.backgroundImage = "url(" + e.target.result + ")";
							element[0].parentElement.parentElement.setAttribute("previewing", "");
							scope.attachment = e.target.result;
			            };
			            reader.readAsDataURL(event.srcElement.files[0]);
			        }
				});
			}
		};
	});
	app.directive("cancelAttachDialogue", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("click", function () {
					element[0].parentElement.removeAttribute("previewing");
				});
			}
		};
	});
	app.directive("chatsList", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/chats_list.html",
			controller: function ($scope) {
//                this.chats = [];
				this.chats = $scope.ctrlMessenger.chats;
			},
			controllerAs: "ctrlChatList"
		};
	});
	app.directive("chatListClick", function() {
		return {
	    	restrict: "A",
	    	link: function(scope, element, attrs) {
				if (scope.chat.user !== undefined) {
					attrs.user = scope.chat.id;
					// element[0].setAttribute("user", scope.chat.id);
				}
				element.on("click", function () {
					scope.ctrlChat.switchChat(scope.chat.id, element[0]);
				});
				// TODO: change to set the actual current chat active
                if (scope.chat.id === scope.ctrlMessenger.currentChat) {
					attrs.open = "";
                    // element[0].setAttribute("open", "");
                }
	    	}
		};
	});
	app.directive("appToolbar", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/app_toolbar.html"
		};
	});
	app.directive("toolbarMenuItem", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/toolbar_menu_item.html"
		};
	});
	app.directive("openOverflow", function () {
		return {
			restrict: "A",
			link: function (scope, element) {
				element.on("click", function () {
					var overflowMenuList = document.getElementById("overflow_menu");
					if (overflowMenuList.hasAttribute("open")) {
						overflowMenuList.removeAttribute("open");
					} else {
						overflowMenuList.setAttribute("open", "");
					}
				});
			}
		};
	});


	app.directive("rightSidebar", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/right_sidebar.html",
            controller: function ($scope) {
//                this.user = {};
                this.user = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat];
            },
            controllerAs: "ctrlRightSidebar"
		};
	});
    app.directive("chatStatusSetter", function () {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.on("change", function () {
                    scope.ctrlMessenger.chats[scope.ctrlMessenger.currentChat].chatStatus = (!this.checked ? ChatStatus.MUTED : ChatStatus.NONE);
                    scope.$apply();
                });
            }
        };
    });


    app.directive("fab", function () {
        return {
            restrict: "E",
            template: "<input id=\"FAB\" class=\"material light floating\" value=\"+\" type=\"button\">",
            // controller: function ($scope) {
            //     this.openPopup
            // },
            controllerAs: "ctrlFAB"
        };
    });
    app.directive("popupNewChat", function () {
        return {
            restrict: "E",
            templateUrl: "/parts/messaging/popup_new_chat.html",
            controller: function ($scope) {
                this.users = $scope.ctrlMessenger.chats;
                // TODO: replace open and close with good Angular.JS
                this.open = function () {
                    var FABmain = document.getElementById("FAB");
                    var newChatDialogFrame = document.getElementById("popup_new_chat");
                    var newChatDialog = document.getElementById("actual_popup_new_chat");

                    newChatDialogFrame.style.display = "block";
                    newChatDialog.style.position = "absolute";
                    newChatDialog.style.left = FABmain.offsetLeft;
                    newChatDialog.style.width = FABmain.offsetWidth;
                    newChatDialog.style.top = FABmain.offsetTop - 30;
                    newChatDialog.style.height = FABmain.offsetHeight;
                    newChatDialog.style.padding = "0px";
                    newChatDialog.style.borderRadius = "28px";

					FABmain.style.display = "none";

                    var tweenTime = 0.3;
                    TweenLite.to(newChatDialog, tweenTime, {
                        top: "0px",
                        left: (window.innerWidth / 2 - 300) + "px",
                        width: "500px",
                        height: "400px",
                        padding: "30px 50px 30px 50px",
                        borderRadius: "2px"
                    });

                    newChatDialogFrame.setAttribute("open", "");
                };
                this.close = function () {
                    var FABmain = document.getElementById("FAB");
                    var newChatDialogFrame = document.getElementById("popup_new_chat");
                    var newChatDialog = document.getElementById("actual_popup_new_chat");

					FABmain.style.display = "block";
					var _top = FABmain.offsetTop - 80;
					var _left = FABmain.offsetLeft;
					var _width = FABmain.offsetWidth;
					var _height = FABmain.offsetHeight;
					FABmain.style.display = "none";

                    var tweenTime = 0.3;
                    TweenLite.to(newChatDialog, tweenTime, {
                        top: _top,
                        left: _left,
                        width: _width,
                        height: _height,
                        padding: "0px",
                        borderRadius: "28px",

                        onComplete: function () {
                            newChatDialogFrame.style.display = "none";
							FABmain.style.display = "block";
                        }
                    });

                    newChatDialogFrame.removeAttribute("open");
                };
            },
            controllerAs: "ctrlPopupNewChat"
        };
    });
    app.directive("popupNewChatOpen", function () {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.on("click", function () {
                    scope.ctrlPopupNewChat.open();
                });
            }
        };
    });
    app.directive("popupNewChatClose", function () {
        return {
            restrict: "A",
            link: function (scope, element) {
                element.on("click", function () {
                    scope.ctrlPopupNewChat.close();
                });
            }
        };
    });
})();

var OnlineStatus = Object.freeze({
    ONLINE : "Online",
    AWAY : "Away",
    OFFLINE : "Offline"
});

var ChatStatus = Object.freeze({
    MUTED : "Muted",
    NONE : ""
});


function Chat (name, id, status, chatStatus, image, lastActive, history, profiles) {
    this.name = name;
    this.id = id;
    this.status = status;
    this.chatStatus = chatStatus;
    this.image = image;
    this.lastActive = lastActive;
    this.history = history;
    this.profiles = profiles;
    this.draftText = "";
}

function Message (sender, isyou, message, attachment, time) {
    this.sender = sender;
    this.isyou = isyou;
    this.message = message;
    this.attachment = attachment;
    this.time = time;
}

/** smooth-scroll v5.3.3, by Chris Ferdinandi | http://github.com/cferdinandi/smooth-scroll | Licensed under MIT: http://gomakethings.com/mit/ */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.smoothScroll = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var smoothScroll = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings, eventTimeout, fixedHeader, headerHeight;

	// Default settings
	var defaults = {
		speed: 500,
		easing: 'easeInOutCubic',
		offset: 0,
		updateURL: false,
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Get the closest matching element up the DOM tree
	 * @param {Element} elem Starting element
	 * @param {String} selector Selector to match against (class, ID, or data attribute)
	 * @return {Boolean|Element} Returns false if not match found
	 */
	var getClosest = function (elem, selector) {
		var firstChar = selector.charAt(0);
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( firstChar === '.' ) {
				if ( elem.classList.contains( selector.substr(1) ) ) {
					return elem;
				}
			} else if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			} else if ( firstChar === '[' ) {
				if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
					return elem;
				}
			}
		}
		return false;
	};

	/**
	 * Get the height of an element
	 * @private
	 * @param  {Node]} elem The element
	 * @return {Number}     The element's height
	 */
	var getHeight = function (elem) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	/**
	 * Escape special characters for use with querySelector
	 * @private
	 * @param {String} id The anchor ID to escape
	 * @author Mathias Bynens
	 * @link https://github.com/mathiasbynens/CSS.escape
	 */
	var escapeCharacters = function ( id ) {
		var string = String(id);
		var length = string.length;
		var index = -1;
		var codeUnit;
		var result = '';
		var firstCodeUnit = string.charCodeAt(0);
		while (++index < length) {
			codeUnit = string.charCodeAt(index);
			// Note: there’s no need to special-case astral symbols, surrogate
			// pairs, or lone surrogates.

			// If the character is NULL (U+0000), then throw an
			// `InvalidCharacterError` exception and terminate these steps.
			if (codeUnit === 0x0000) {
				throw new InvalidCharacterError(
					'Invalid character: the input contains U+0000.'
				);
			}

			if (
				// If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
				// U+007F, […]
				(codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
				// If the character is the first character and is in the range [0-9]
				// (U+0030 to U+0039), […]
				(index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
				// If the character is the second character and is in the range [0-9]
				// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
				(
					index === 1 &&
					codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
					firstCodeUnit === 0x002D
				)
			) {
				// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
				result += '\\' + codeUnit.toString(16) + ' ';
				continue;
			}

			// If the character is not handled by one of the above rules and is
			// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
			// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
			// U+005A), or [a-z] (U+0061 to U+007A), […]
			if (
				codeUnit >= 0x0080 ||
				codeUnit === 0x002D ||
				codeUnit === 0x005F ||
				codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
				codeUnit >= 0x0041 && codeUnit <= 0x005A ||
				codeUnit >= 0x0061 && codeUnit <= 0x007A
			) {
				// the character itself
				result += string.charAt(index);
				continue;
			}

			// Otherwise, the escaped character.
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);

		}
		return result;
	};

	/**
	 * Calculate the easing pattern
	 * @private
	 * @link https://gist.github.com/gre/1650294
	 * @param {String} type Easing pattern
	 * @param {Number} time Time animation should take to complete
	 * @returns {Number}
	 */
	var easingPattern = function ( type, time ) {
		var pattern;
		if ( type === 'easeInQuad' ) pattern = time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuad' ) pattern = time * (2 - time); // decelerating to zero velocity
		if ( type === 'easeInOutQuad' ) pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( type === 'easeInCubic' ) pattern = time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutCubic' ) pattern = (--time) * time * time + 1; // decelerating to zero velocity
		if ( type === 'easeInOutCubic' ) pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( type === 'easeInQuart' ) pattern = time * time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuart' ) pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( type === 'easeInOutQuart' ) pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( type === 'easeInQuint' ) pattern = time * time * time * time * time; // accelerating from zero velocity
		if ( type === 'easeOutQuint' ) pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( type === 'easeInOutQuint' ) pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
		return pattern || time; // no easing, no acceleration
	};

	/**
	 * Calculate how far to scroll
	 * @private
	 * @param {Element} anchor The anchor element to scroll to
	 * @param {Number} headerHeight Height of a fixed header, if any
	 * @param {Number} offset Number of pixels by which to offset scroll
	 * @returns {Number}
	 */
	var getEndLocation = function ( anchor, headerHeight, offset ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = location - headerHeight - offset;
		return location >= 0 ? location : 0;
	};

	/**
	 * Determine the document's height
	 * @private
	 * @returns {Number}
	 */
	var getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	};

	/**
	 * Convert data-options attribute into an object of key/value pairs
	 * @private
	 * @param {String} options Link-specific options as a data attribute string
	 * @returns {Object}
	 */
	var getDataOptions = function ( options ) {
		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
	};

	/**
	 * Update the URL
	 * @private
	 * @param {Element} anchor The element to scroll to
	 * @param {Boolean} url Whether or not to update the URL history
	 */
	var updateUrl = function ( anchor, url ) {
		// if ( history.pushState && (url || url === 'true') ) {
		// 	history.pushState( null, null, [root.location.protocol, '//', root.location.host, root.location.pathname, root.location.search, anchor].join('') );
		// }
	};

	var getHeaderHeight = function ( header ) {
		return header === null ? 0 : ( getHeight( header ) + header.offsetTop );
	};

	/**
	 * Start/stop the scrolling animation
	 * @public
	 * @param {Element} toggle The element that toggled the scroll event
	 * @param {Element} anchor The element to scroll to
	 * @param {Object} options
	 */
	smoothScroll.animateScroll = function ( toggle, anchor, options ) {

		// Options and overrides
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var overrides = getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
		settings = extend( settings, overrides );
		anchor = '#' + escapeCharacters(anchor.substr(1)); // Escape special characters and leading numbers

		// Selectors and variables
		var anchorElem = anchor === '#' ? document.documentElement : document.querySelector(anchor);
		var startLocation = root.pageYOffset; // Current location on the page
		if ( !fixedHeader ) { fixedHeader = document.querySelector('[data-scroll-header]'); }  // Get the fixed header if not already set
		if ( !headerHeight ) { headerHeight = getHeaderHeight( fixedHeader ); } // Get the height of a fixed header if one exists and not already set
		var endLocation = getEndLocation( anchorElem, headerHeight, parseInt(settings.offset, 10) ); // Scroll to location
		var animationInterval; // interval timer
		var distance = endLocation - startLocation; // distance to travel
		var documentHeight = getDocumentHeight();
		var timeLapsed = 0;
		var percentage, position;

		// Update URL
		updateUrl(anchor, settings.updateURL);

		/**
		 * Stop the scroll animation when it reaches its target (or the bottom/top of page)
		 * @private
		 * @param {Number} position Current position on the page
		 * @param {Number} endLocation Scroll to location
		 * @param {Number} animationInterval How much to scroll on this loop
		 */
		var stopAnimateScroll = function (position, endLocation, animationInterval) {
			var currentLocation = root.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (root.innerHeight + currentLocation) >= documentHeight ) ) {
				clearInterval(animationInterval);
				anchorElem.focus();
				settings.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
			}
		};

		/**
		 * Loop scrolling animation
		 * @private
		 */
		var loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / parseInt(settings.speed, 10) );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * easingPattern(settings.easing, percentage) );
			root.scrollTo( 0, Math.floor(position) );
			stopAnimateScroll(position, endLocation, animationInterval);
		};

		/**
		 * Set interval timer
		 * @private
		 */
		var startAnimateScroll = function () {
			settings.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
			animationInterval = setInterval(loopAnimateScroll, 16);
		};

		/**
		 * Reset position to fix weird iOS bug
		 * @link https://github.com/cferdinandi/smooth-scroll/issues/45
		 */
		if ( root.pageYOffset === 0 ) {
			root.scrollTo( 0, 0 );
		}

		// Start scrolling animation
		startAnimateScroll();

	};

	/**
	 * If smooth scroll element clicked, animate scroll
	 * @private
	 */
	var eventHandler = function (event) {
		var toggle = getClosest(event.target, '[data-scroll]');
		if ( toggle && toggle.tagName.toLowerCase() === 'a' ) {
			event.preventDefault(); // Prevent default click event
			smoothScroll.animateScroll( toggle, toggle.hash, settings); // Animate scroll
		}
	};

	/**
	 * On window scroll and resize, only run events at a rate of 15fps for better performance
	 * @private
	 * @param  {Function} eventTimeout Timeout function
	 * @param  {Object} settings
	 */
	var eventThrottler = function (event) {
		if ( !eventTimeout ) {
			eventTimeout = setTimeout(function() {
				eventTimeout = null; // Reset timeout
				headerHeight = getHeaderHeight( fixedHeader ); // Get the height of a fixed header if one exists
			}, 66);
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	smoothScroll.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove event listeners
		document.removeEventListener( 'click', eventHandler, false );
		root.removeEventListener( 'resize', eventThrottler, false );

		// Reset varaibles
		settings = null;
		eventTimeout = null;
		fixedHeader = null;
		headerHeight = null;
	};

	/**
	 * Initialize Smooth Scroll
	 * @public
	 * @param {Object} options User settings
	 */
	smoothScroll.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		smoothScroll.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		fixedHeader = document.querySelector('[data-scroll-header]'); // Get the fixed header
		headerHeight = getHeaderHeight( fixedHeader );

		// When a toggle is clicked, run the click handler
		document.addEventListener('click', eventHandler, false );
		if ( fixedHeader ) { root.addEventListener( 'resize', eventThrottler, false ); }

	};


	//
	// Public APIs
	//

	return smoothScroll;

});
