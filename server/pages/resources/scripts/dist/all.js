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
var users = [];
var chats = {};
var you = {
    name: "Clarence Meyer",
    id: 457,
    image: "resources/images/profile.png"
}

var overflowMenu = document.getElementById("overflow");
var overflowMenuList = document.getElementById("overflow_menu");
function onload () {
    // TODO: fill users and chats
    users = [450, 451, 452, 453, 454, 455, 456];
    chats[450] = new Chat("Isaiah Mcdonalid", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/450.jpg", "now", [{sender: 450, message: "Yo! ma homie!", time: "9:32"}, {sender: 450, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 450, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[451] = new Chat("Johnny Appleseed", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/451.jpg", "now", [{sender: 451, message: "Yo! ma homie!", time: "9:32"}, {sender: 451, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 451, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[452] = new Chat("Grace Fowler", OnlineStatus.ONLINE, ChatStatus.MUTED, "resources/images/452.jpg", "now", [{sender: 452, message: "Yo! ma homie!", time: "9:32"}, {sender: 452, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 452, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[453] = new Chat("Dylan Nichols", OnlineStatus.OFFLINE, ChatStatus.NONE, "resources/images/453.jpg", "now", [{sender: 453, message: "Yo! ma homie!", time: "9:32"}, {sender: 453, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 453, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[454] = new Chat("Katie Price", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/454.jpg", "now", [{sender: 454, message: "Yo! ma homie!", time: "9:32"}, {sender: 454, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 454, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[455] = new Chat("Andrea Rodriquez", OnlineStatus.AWAY, ChatStatus.NONE, "resources/images/455.jpg", "now", [{sender: 455, message: "Yo! ma homie!", time: "9:32"}, {sender: 455, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 455, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    chats[456] = new Chat("Andre Richards", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/456.jpg", "now", [{sender: 456, message: "Yo! ma homie!", time: "9:32"}, {sender: 456, message: "how's it going?", time: "9:34"}, {sender: "You", message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 456, message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: "You", message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
    
    listChats();
    switchChat(users[0]);
    
    if (overflowMenu == undefined)
        overflowMenu = document.getElementById("overflow");
    if (overflowMenuList == undefined)
        overflowMenuList = document.getElementById("overflow_menu");
    overflowMenu.addEventListener("click", function () {
        expandOverflow();
    });
    
    if (FABmain == undefined)
        FABmain = document.getElementById("FAB");
    FABmain.addEventListener("click", openNewChatDialog);
}

var chatList = document.getElementById("chats");
var fragmentChat = "<div class=\"icon\" style=\"background-image: url({{image}});\"></div><div class=\"status\"></div><div class=\"name\">{{name}}</div><div class=\"lastMessage\">{{lastMessage}}</div><div class=\"time\">{{lastMessageTime}}</div><div class=\"muted\"><i class='mdi mdi-volume-off'></div>";
function listChats () {
    if (chatList == undefined)
        chatList = document.getElementById("chats");
    
    for (var i = 0; i < users.length; i++) {
        var newChat = document.createElement("div");
        newChat.className = "chat";
        newChat.setAttribute(chats[users[i]].status.toLowerCase(), "");
        if (chats[users[i]].chatStatus != "")
            newChat.setAttribute(chats[users[i]].chatStatus.toLowerCase(), "");
        newChat.innerHTML = fragmentChat.replace("{{name}}", chats[users[i]].name);
        newChat.innerHTML = newChat.innerHTML.replace("{{image}}", chats[users[i]].image);
        if (chats[users[i]].history[chats[users[i]].history.length - 1].sender != "You")
            newChat.innerHTML = newChat.innerHTML.replace("{{lastMessage}}", chats[users[i]].history[chats[users[i]].history.length - 1].message);
        else
            newChat.innerHTML = newChat.innerHTML.replace("{{lastMessage}}", chats[users[i]].history[chats[users[i]].history.length - 1].message);
        newChat.innerHTML = newChat.innerHTML.replace("{{lastMessageTime}}", chats[users[i]].history[chats[users[i]].history.length - 1].time);
        var userID = users[i];
//        newChat.addEventListener("click", (function () { switchChat(userID, newChat); }));
        newChat.onclick = (function(uid, nchat) {return function() {
            switchChat(uid, nchat);
        };})(userID, newChat);
        
        chatList.appendChild(newChat);
        chats[users[i]].chat = newChat;
    }
}

function expandOverflow () {
    if (overflowMenuList.hasAttribute("open")) {
        overflowMenuList.removeAttribute("open");
    } else {
        overflowMenuList.setAttribute("open", "");
    }
}

var shiftDown = false;
function listenForReturn () {
    if (event.keyCode === 13 && !shiftDown) {
        sendMessage('You', you.image, document.getElementById('send_message').value);
        event.cancelBubble = true;
        event.returnValue = false;
        document.getElementById('send_message').value = "";
        return false;
    } else if (event.keyCode === 13) {
        event.cancelBubble = true;
        event.returnValue = false;
        document.getElementById('send_message').value += "\n";
        return false;
    } else if (event.keyCode === 16) {
        shiftDown = true;
    }
}
function listenForShiftUp () {
    if (event.keyCode === 16) {
        shiftDown = false;
    }
}

function sendMessage (sender, image, message) {
    
    addMessageToCurrentView(sender, image, Date.now(), message);
}

var chatHistory = document.getElementById("history");
var rightSidebar = document.getElementById("right_sidebar");
var fragmentMessage = "<div class=\"icon\" title=\"{{sender}}\" style=\"background-image: url('{{image}}');\"></div><div class=\"text\" title=\"{{time}}\">{{message}}</div>";
function switchChat (user, chat) {
    for (i in chatList.childNodes)
        if (chatList.childNodes[i].className === "chat")
            chatList.childNodes[i].removeAttribute("open");
    if (chat == undefined) {
        for (var i = 0; i <= chatList.childElementCount; i++) {
            if (chatList.childNodes[i].className === "chat" && chatList.childNodes[i].getElementsByClassName("name")[0].innerHTML === chats[user].name) {
                chatList.childNodes[i].setAttribute("open", "");
                break;
            }
        }
    } else {
        chat.setAttribute("open", "");
    }
    
    if (chatHistory == undefined)
        chatHistory = document.getElementById("history");
    while (chatHistory.firstChild)
        chatHistory.removeChild(chatHistory.firstChild);
        
    for (var i = 0; i < chats[user].history.length; i++) {
        var newMessage = document.createElement("div");
        newMessage.className = "message";
        newMessage.innerHTML = fragmentMessage;
        if (chats[user].history[i].sender === "You") {
            newMessage.setAttribute("you", "");
            newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", "You");
            newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", you.image);
            newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", chats[user].history[i].message);
        } else {
            newMessage.setAttribute("other", "");
            newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", chats[chats[user].history[i].sender].name);
            newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", chats[chats[user].history[i].sender].image);
            // TODO: this doesn't work with group messaging
            newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", chats[user].history[i].message);
        }
        
        chatHistory.appendChild(newMessage);
    }
        
    if (rightSidebar == undefined)
        rightSidebar = document.getElementById("right_sidebar");
    while (rightSidebar.firstChild) {
        rightSidebar.removeChild(rightSidebar.firstChild);
    }
    
    var icon = document.createElement("div");
    var status = document.createElement("div");
    var name = document.createElement("div");
    var lastActive = document.createElement("div");
    var icnMute = document.createElement("i");
    var tglMute = document.createElement("div");
    var btnCall = document.createElement("button");
    var profiles = document.createElement("div");
    
    icon.className = "icon";
    status.className = "status";
    name.className = "name";
    lastActive.className = "lastActive";
    icnMute.className = "mdi mdi-bell muteIcon";
    tglMute.className = "material light switch mute";
    btnCall.className = "material light flat call";
    profiles.className = "profiles";

    name.innerHTML = chats[user].name;
    icon.style.backgroundImage = "url('" + chats[user].image + "')";
    if (chats[user].status === OnlineStatus.ONLINE) {
        status.setAttribute("online", "");
        lastActive.innerHTML = "Active Now";
    } else if (chats[user].status === OnlineStatus.AWAY) {
        status.setAttribute("away", "");
        lastActive.innerHTML = "Last Active " + 3 + "m";
    } else {
        status.setAttribute("offline", "");
        lastActive.innerHTML = "Last Active " + 59 + "m";
    }
    tglMute.innerHTML = "<input id=\"tglMute\" type=\"checkbox\" " + ((chats[user].chatStatus === ChatStatus.MUTED) ? "" : "checked") + "><label for=\"tglMute\"></label>";
    btnCall.innerHTML = "<i class='mdi mdi-phone'></i>";
    tglMute.title = "Mute chat";
    btnCall.title = "Start call";
    tglMute.addEventListener("click", (function () {
        muteChat(user, (chats[user].chatStatus === ChatStatus.MUTED) ? true : false);
    }));
    btnCall.addEventListener("click", (function () {
        
    }));
    
    for (var i = 0; i < chats[user].profiles.length; i++) {
        var newProfile = document.createElement("a");
        newProfile.href = chats[user].profiles[i].url;
        newProfile.className = "profile";
        newProfile.innerHTML = "<i class='mdi mdi-" + chats[user].profiles[i].service + "'></i>&nbsp;" + chats[user].profiles[i].username;
        
        profiles.appendChild(newProfile);
    }

    rightSidebar.appendChild(icon);
    rightSidebar.appendChild(status);
    rightSidebar.appendChild(name);
    rightSidebar.appendChild(lastActive);
    rightSidebar.appendChild(icnMute);
    rightSidebar.appendChild(tglMute);
    rightSidebar.appendChild(btnCall);
    rightSidebar.appendChild(profiles);
}

function addMessageToCurrentView (sender, image, time, message) {
    if (chatHistory == undefined)
        chatHistory = document.getElementById("history");

    var newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.innerHTML = fragmentMessage;
    if (sender === "You") {
        newMessage.setAttribute("you", "");
        newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", "You");
        newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", image);
        newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", time);
        newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", message);
    } else {
        newMessage.setAttribute("other", "");
        newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", name);
        newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", image);
        newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", time);
        // TODO: this doesn't work with group messaging
        newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", message);
    }

    chatHistory.appendChild(newMessage);
}

function changeStatus (user, status) {
    chats[user].status = status;
}

function muteChat (user, state) {
    if (state) {
        chats[user].chatStatus = ChatStatus.NONE;
        chats[user].chat.removeAttribute(ChatStatus.MUTED);
    } else {
        chats[user].chatStatus = ChatStatus.MUTED;
        chats[user].chat.setAttribute(chats[user].chatStatus.toLowerCase(), "");
    }
}

var FABmain = document.getElementById("FAB");
var newChatDialogFrame = document.getElementById("popup_new_chat");
var newChatDialog = document.getElementById("actual_popup_new_chat");
function openNewChatDialog () {
    if (FABmain == undefined)
        FABmain = document.getElementById("FAB");
    if (newChatDialogFrame == undefined)
        newChatDialogFrame = document.getElementById("popup_new_chat");
    if (newChatDialog == undefined)
        newChatDialog = document.getElementById("actual_popup_new_chat");
    
    newChatDialog.style.display = "block";
    newChatDialog.style.left = FABmain.offsetLeft;
    newChatDialog.style.width = FABmain.offsetWidth;
    newChatDialog.style.top = FABmain.offsetTop + 70;
    newChatDialog.style.height = FABmain.offsetHeight;
    newChatDialog.style.borderRadius = "28px";
    
    var tweenTime = 0.5;
    TweenLite.to(newChatDialog, tweenTime, {
        top: "0px",
        left: "0px",
        width: "500px",
        height: "400px",
        borderRadius: "2px";
    });

    
    newChatDialogFrame.setAttribute("open", "");
}

setTimeout(openNewChatDialog, 200);
var OnlineStatus = Object.freeze({
    ONLINE : "Online",
    AWAY : "Away",
    OFFLINE : "Offline"
});

var ChatStatus = Object.freeze({
    MUTED : "Muted",
    NONE : ""
});


function Chat (name, status, chatStatus, image, lastActive, history, profiles) {
    this.name = name;
    this.status = status;
    this.chatStatus = chatStatus;
    this.image = image;
    this.lastActive = lastActive;
    this.history = history;
    this.profiles = profiles;
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
