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
(function () {
	var app = angular.module("AllTalk", [ ]);
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
	    this.chats[453] = new Chat("The Joker", 453, OnlineStatus.OFFLINE, ChatStatus.NONE, "resources/images/profiles/453.jpg", "now", [{sender: 453, isyou: false, message: "How about a magic trick? I'm gonna make this pencil disappear. Ta-da!", time: "9:31"}, {sender: 457, isyou: true,  message: "Bats frighten me. It's time my enemies shared my dread.", time: "9:32"}, {sender: 453, isyou: false, message: "If you're good at something, never do it for free.", time: "9:32"}, {sender: 453, isyou: false, message: "You see, I'm a guy of simple taste. I enjoy dynamite and gunpowder and gasoline.", time: "9:34"}, {sender: 457, isyou: true,  message: "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.", time: "9:34"}, {sender: 453, isyou: false, message: "You wanna know how I got them? So I had a wife. She was beautiful, like you, who tells me I worry too much, who tells me I ought to smile more, who gambles and gets in deep with the sharks. Hey. One day they carve her face. And we have no money for surgeries. She can't take it. I just wanna see her smile again. I just want her to know that I don't care about the scars. So, I do this to myself. And you know what? She can't stand the sight of me. She leaves. Now I see the funny side. Now I'm always smiling.", time: "9:36"}, {sender: 453, isyou: false, message: "It was a dog. It was a big dog.", time: "9:36"}, {sender: 457, isyou: true,  message: "This isn't a car.", time: "11:12"}, {sender: 453, isyou: false, message: "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.", time: "11:12"}, {sender: 457, isyou: true,  message: "I seek the means to fight injustice. To turn fear against those who prey on the fearful.", time: "11:13"}, {sender: 453, isyou: false, message: "And as for the television's so-called plan, Batman has no jurisdiction.", time: "11:13"}, {sender: 453, isyou: false, message: "I just want my phone call.", time: "11:13"}, {sender: 453, isyou: false, message: "This town deserves a better class of criminal and I'm gonna give it to them. Tell your men they work for me now. This is my city.", time: "11:13"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com/"}]);
	    this.chats[454] = new Chat("Skylar White", 454, OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/profiles/454.jpg", "now", [{sender: 457, isyou: true,  message: "It's complicated and I don't wish to discuss it. It's none of your concern. You know what, let's just say that I have a hell of a lot more on my mind, right now, than thinking about buying a damn car wash. Okay? So if you could just... please. ", time: "16:41"}, {sender: 457, isyou: true,  message: "Stop. Stop! You keep saying that word - danger... danger! No and I have never used that word. I said things were complicated. And then you flew off the handle! ", time: "17:23"}, {sender: 457, isyou: true,  message: "Gus is gonna make his move. I don't know when, I don't know where or how. All I know is it's gonna happen. Powerless to stop him. ", time: "17:25"}, {sender: 457, isyou: true,  message: "I have been waiting. I've been waiting all day. Waiting for Gus to send one of his men to kill me. And it's you. Who do you know, who's okay with using children, Jesse? Who do you know... who's allowed children to be murdered... hmm? Gus! He has, he has been ten steps ahead of me at every turn. And now, the one thing that he needed to finally get rid of me is your consent and boy he's got that now. He's got it. And not only does he have that, but he manipulated you into pulling the trigger for him. ", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
	    this.chats[455] = new Chat("Barack Obama", 455, OnlineStatus.AWAY, ChatStatus.NONE, "resources/images/profiles/455.jpg", "now", [{sender: 455, isyou: false, message: "That they are endowed by their Creator with certain inalienable rights. The hope of a skinny kid with a funny name who believes that America has a place for him, too.", time: "16:41"}, {sender: 457, isyou: true,  message: "Not once in my conversations with him have I heard him talk about any ethnic group in derogatory terms, or treat whites with whom he interacted with anything but courtesy and respect. Washington's been talking about our oil addiction for the last thirty years, and John McCain has been there for twenty-six of them. If your hopes have been dashed again and again, then it's best to stop hoping, and settle for what you already know.", time: "17:23"}, {sender: 455, isyou: false, message: "Born into poverty? Pull yourself up by your own bootstraps - even if you don't have boots. For decades, there has been a stalemate: two peoples with legitimate aspirations, each with a painful history that makes compromise elusive. But I do have an unyielding belief that all people yearn for certain things: the ability to speak your mind and have a say in how you are governed; confidence in the rule of law and the equal administration of justice; government that is transparent and doesn't steal from the people; the freedom to live as you choose. Fear that because of modernity we will lose of control over our economic choices, our politics, and most importantly our identities - those things we most cherish about our communities, our families, our traditions, and our faith.", time: "17:25"}, {sender: 457, isyou: true,  message: "And it's around this time that some pastors I was working with came up to me and asked if I was a member of a church. That is why we will honor our agreement with Iraq's democratically-elected government to remove combat troops from Iraqi cities by July, and to remove all our troops from Iraq by 2012. That is why we are forging service projects in America that bring together Christians, Muslims, and Jews. And while America in the past has focused on oil and gas in this part of the world, we now seek a broader engagement.", time: "17:25"}, {sender: 455, isyou: false, message: "They know they have to work hard to get ahead - and they want to. Ours is a promise that says government cannot solve all our problems, but what it should do is that which we cannot do for ourselves - protect us from harm and provide every child a decent education; keep our water clean and our toys safe; invest in new schools and new roads and new science and technology. And it is that promise that forty five years ago today, brought Americans from every corner of this land to stand together on a Mall in Washington, before Lincoln's Memorial, and hear a young preacher from Georgia speak of his dream. government has gone to court to protect the right of women and girls to wear the hijab, and to punish those who would deny it. Around the world, we can turn dialogue into Interfaith service, so bridges between peoples lead to action - whether it is combating malaria in Africa, or providing relief after a natural disaster. This is important because no development strategy can be based only upon what comes out of the ground, nor can it be sustained while young people are out of work.", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
		this.currentChat = 456;
	});
	app.directive("currentChat", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/current_chat.html",
			controller: function ($scope) {
                chatList = document.getElementById("chats");
				this.switchChat = function (user, chat) {
                    $scope.ctrlMessenger.currentChat = user;
					for (i in chatList.childNodes)
						if (chatList.childNodes[i].className != undefined && chatList.childNodes[i].className.indexOf("chat") !== -1)
							chatList.childNodes[i].removeAttribute("open");
                    $scope.ctrlChatHistory.history = $scope.ctrlMessenger.chats[user].history;
                    chat.setAttribute("open", "");
                    
                    $scope.ctrlRightSidebar.user = $scope.ctrlMessenger.chats[user];

                    $scope.$apply();
                    
					document.getElementById('send_message').focus();
				}
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
	app.directive('sender', function($log, $timeout) {
		return {
	    	restrict: "A",
	    	link: function (scope, element, attrs) {
				if (scope.message.isyou) {
					element[0].setAttribute("sender", "you");
				} else {
					element[0].setAttribute("sender", "other");
				}
	    	}
	  	}
	});
    app.directive('resizeHeight', function ($log, $timeout) {
		return {
	    	restrict: "A",
	    	link: function (scope, element, attrs) {
                scope.$evalAsync(function () {
				    element[0].style.height = element[0].getElementsByClassName("text")[0].offsetHeight + 10;
                });
	    	}
	  	}
    });
	app.directive('ready', function($log, $timeout) {
		return {
	    	restrict: 'A',
	    	link: function(scope, element, attrs) {
				element[0].parentElement.style.height = element[0].offsetHeight + 10;
				element[0].parentElement.parentElement.scrollTop = element[0].parentElement.parentElement.scrollHeight;
	    	}
	  	}
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
	app.directive('chatListClick', function($log, $timeout) {
		return {
	    	restrict: 'A',
	    	link: function(scope, element, attrs) {
				if (scope.chat.user != undefined) {
					element[0].setAttribute("user", scope.chat.id);
				}
				element.on("click", function (event) {
					scope.ctrlChat.switchChat(scope.ctrlMessenger.users[scope.$index], element[0]);
				});
                if (scope.$first) {
                    scope.ctrlChat.switchChat(scope.chat.id, element);
                }
	    	}
	  	}
	});
	app.directive("appToolbar", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/app_toolbar.html"
		};
	});
	app.directive("toolBarMenuItem", function () {
		return {
			restrict: "E",
			templateUrl: "/parts/messaging/toolbar_menu_item.html"
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
            link: function (scope, element, attrs) {
                element.on("change", function (event) {
                    scope.ctrlMessenger.chats[scope.ctrlMessenger.currentChat].chatStatus = (!this.checked ? ChatStatus.MUTED : ChatStatus.NONE);
                    scope.$apply();
                });
            }
        }
    })


})();















//
// var overflowMenu = document.getElementById("overflow");
// var overflowMenuList = document.getElementById("overflow_menu");
// function onload () {
//     // TODO: fill users and chats
//     users = [456, 450, 451, 452, 453, 454, 455];
//     chats[456] = new Chat("Andre Richards", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/456.jpg", "now", [{sender: 456, isyou: false,  message: "Yo! ma homie!", time: "9:32"}, {sender: 456, isyou: false,  message: "how's it going?", time: "9:34"}, {sender: 457, isyou: true,  message: "Wazzup?! I'm feeling pretty pumped to try out All Talk! It seems like it takes all the good parts of the other messaging apps and puts them together into one intuitive place.", time: "9:35"}, {sender: 456, isyou: false,  message: "IKR! I'm really liking how it's got desktop and mobile clients, with overlay views to boot.", time: "9:35"}, {sender: 457, isyou: true,  message: "And, add to that the fact that they won't ever spy on you, I think this thing could really take off!", time: "9:36"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[450] = new Chat("Trevor Blackwell", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/450.jpg", "now", [{sender: 450, isyou: false, message: "Freemium research & development business-to-consumer traction analytics startup learning curve mass market monetization iPhone. Freemium iteration long tail termsheet creative metrics branding prototype bootstrapping alpha product management technology scrum project series A financing.", time: "11:41"}, {sender: 457, isyou: true,  message: "User experience business plan sales customer bandwidth ecosystem. Sales mass market ownership growth hacking leverage channels infrastructure equity long tail seed money infographic vesting period responsive web design buzz.", time: "12:23"}, {sender: 450, isyou: false, message: "Business plan founders graphical user interface disruptive non-disclosure agreement channels market branding ownership freemium user experience.", time: "12:25"}, {sender: 457, isyou: true,  message: "User experience disruptive branding early adopters non-disclosure agreement buzz entrepreneur incubator.", time: "12:30"}, {sender: 450, isyou: false, message: "Social proof buzz twitter channels infrastructure advisor sales holy grail business-to-business. Product management social media creative bandwidth twitter business-to-business burn rate monetization gen-z partnership branding.", time: "14:34"}, {sender: 450, isyou: false, message: "Lean startup startup partnership hypotheses user experience supply chain advisor iteration. Freemium startup paradigm shift network effects conversion iPhone burn rate.", time: "14:47"}, {sender: 457, isyou: true,  message: "Customer buyer conversion A/B testing monetization accelerator ecosystem paradigm shift analytics equity infrastructure success. Ramen innovator social media. Venture paradigm shift entrepreneur freemium client early adopters analytics non-disclosure agreement release influencer.", time: "15:30"}, {sender: 450, isyou: false, message: "Partnership gen-z customer founders MVP social proof ramen ownership. Investor virality direct mailing startup market pitch freemium beta ecosystem assets stealth. Crowdsource user experience partnership partner network early adopters business-to-business influencer backing bootstrapping gamification accelerator prototype MVP. Sales virality funding network effects accelerator startup non-disclosure agreement hackathon crowdfunding partnership ownership niche market.", time: "17:30"}, {sender: 457, isyou: true,  message: "Pitch user experience iPad channels. Monetization virality equity social media deployment technology alpha analytics innovator entrepreneur stock. Traction MVP sales bandwidth early adopters monetization user experience facebook.", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[451] = new Chat("Walter Sobchak", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/451.jpg", "now", [{sender: 457, isyou: true,  message: "Walter, you can't do that. These guys're like me, they're pacifists. Smokey was a conscientious objector. Nihilists! Jesus. Obviously you're not a golfer. Yeah man, it really tied the room together. Fine, Dude. As if it's impossible to get some nail polish, apply it to someone else's toe. Nice marmot. Donny was a good bowler, and a good man. He was… He was one of us. He was a man who loved the outdoors, and bowling, and as a surfer explored the beaches of southern California from Redondo to Calabassos. And he was an avid bowler. And a good friend. He died—he died as so many of his generation, before his time. In your wisdom you took him, Lord. As you took so many bright flowering young men, at Khe San and Lan Doc.", time: "16:41"}, {sender: 451, isyou: false, message: "I spent most of my time occupying various, um, administration buildings, smoking thai-stick, breaking into the ROTC and bowling. Dude, please!… Is this your homework, Larry? Finishing my coffee. But that is up to little Larry here. Isn't it, Larry? I just want to say, sir, that we're both enormous—on a personal level. I don't see any connection to Vietnam, Walter. Yeah man. Well, you know, the Dude abides.", time: "17:23"}, {sender: 451, isyou: false, message: "Another Caucasian, Gary. Ever hear of the Seattle Seven? No ma'am, I didn't mean to give the impression that we're police exactly. We're hoping that it will not be necessary to call the police. I was, uh, one of the authors of the Port Huron Statement —The original Port Huron Statement. Not the compromised second draft. Hello, Pilar? My name is Walter Sobchak, we spoke on the phone, this is my associate Jeffrey Lebowski.", time: "17:25"}, {sender: 457, isyou: true,  message: "Nice marmot. Yeah man. Well, you know, the Dude abides. We wanted to talk about little Larry. May we come in? I was, uh, one of the authors of the Port Huron Statement —The original Port Huron Statement. Not the compromised second draft. No, look. I do mind. The Dude minds. This will not stand, you know, this aggression will not stand, man. No, the, uh, police chief of Malibu. A real reactionary.", time: "17:30"}, {sender: 451, isyou: false, message: "And let's also not forget—let's not forget, Dude—that keeping wildlife, an amphibious rodent, for domestic, you know, within the city —that isn't legal either. Walter, this isn't a First Amendment thing. All right, Plan B. You might want to watch out the front window there, Larry. You're going to enter a world of pain, son. We know that this is your homework. We know you stole a car.", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[452] = new Chat("Grace Fowler", OnlineStatus.ONLINE, ChatStatus.MUTED, "resources/images/452.jpg", "now", [{sender: 452, isyou: false, message: "Our ambitions cross-cultural committed fight against oppression reproductive rights sanitation catalyze gender rights lifting people up advancement sustainability microloans positive social change.", time: "11:41"}, {sender: 452, isyou: false, message: "Assistance public institutions, think tank agency capacity building clean water human rights conflict resolution generosity visionary.", time: "12:23"}, {sender: 457, isyou: true,  message: "Change lives emergency response, informal economies, governance human experience activism contribution social movement thinkers who make change happen women's rights making progress rights-based approach.", time: "12:25"}, {sender: 452, isyou: false, message: "Hack measures, overcome injustice cross-agency coordination working alongside climate change working families partnership.", time: "12:30"}, {sender: 457, isyou: true,  message: "Readiness voice catalyst cornerstone honor crowdsourcing catalytic effect criteria. Amplify process humanitarian relief; natural resources combat malaria inclusive capitalism safety economic development, donation Bloomberg replicable indicator benefit combat poverty. Treatment world problem solving innovation; necessities UNICEF globalization.", time: "12:33"}, {sender: 452, isyou: false, message: "Mobilize; solutions urban collaborative approach growth freedom progressive, UNHCR public service.", time: "14:34"}, {sender: 457, isyou: true,  message: "Promising development, Jane Jacobs; community health workers volunteer livelihoods resourceful Global South; Kickstarter outcomes life-expectancy transform the world altruism social challenges.", time: "14:47"}, {sender: 457, isyou: true,  message: "Involvement equality provide women and children philanthropy change, local solutions NGO global citizens enabler best practices community crisis situation.", time: "15:30"}, {sender: 452, isyou: false, message: "International development results agenda affiliate fellows advocate, Oxfam Cesar Chavez fundraise liberal; development planned giving change-makers. Non-partisan free-speech citizens of change beneficiaries revitalize accelerate progress.", time: "17:30"}, {sender: 457, isyou: true,  message: "Peaceful courageous technology public sector, Millennium Development Goals interconnectivity, developing sustainable Rosa Parks celebrate nonviolent resistance social impact Arab Spring. Minority insurmountable challenges, environmental economic independence, nonprofit sustainable future relief, social entrepreneurship citizenry legal aid effectiveness. Giving, international, gender immunize civic engagement global Gandhi, sharing economy support socio-economic divide.", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[453] = new Chat("The Joker", OnlineStatus.OFFLINE, ChatStatus.NONE, "resources/images/453.jpg", "now", [{sender: 453, isyou: false, message: "How about a magic trick? I'm gonna make this pencil disappear. Ta-da!", time: "9:31"}, {sender: 457, isyou: true,  message: "Bats frighten me. It's time my enemies shared my dread.", time: "9:32"}, {sender: 453, isyou: false, message: "If you're good at something, never do it for free.", time: "9:32"}, {sender: 453, isyou: false, message: "You see, I'm a guy of simple taste. I enjoy dynamite and gunpowder and gasoline.", time: "9:34"}, {sender: 457, isyou: true,  message: "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.", time: "9:34"}, {sender: 453, isyou: false, message: "You wanna know how I got them? So I had a wife. She was beautiful, like you, who tells me I worry too much, who tells me I ought to smile more, who gambles and gets in deep with the sharks. Hey. One day they carve her face. And we have no money for surgeries. She can't take it. I just wanna see her smile again. I just want her to know that I don't care about the scars. So, I do this to myself. And you know what? She can't stand the sight of me. She leaves. Now I see the funny side. Now I'm always smiling.", time: "9:36"}, {sender: 453, isyou: false, message: "It was a dog. It was a big dog.", time: "9:36"}, {sender: 457, isyou: true,  message: "This isn't a car.", time: "11:12"}, {sender: 453, isyou: false, message: "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.", time: "11:12"}, {sender: 457, isyou: true,  message: "I seek the means to fight injustice. To turn fear against those who prey on the fearful.", time: "11:13"}, {sender: 453, isyou: false, message: "And as for the television's so-called plan, Batman has no jurisdiction.", time: "11:13"}, {sender: 453, isyou: false, message: "I just want my phone call.", time: "11:13"}, {sender: 453, isyou: false, message: "This town deserves a better class of criminal and I'm gonna give it to them. Tell your men they work for me now. This is my city.", time: "11:13"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[454] = new Chat("Skylar White", OnlineStatus.ONLINE, ChatStatus.NONE, "resources/images/454.jpg", "now", [{sender: 457, isyou: true,  message: "It's complicated and I don't wish to discuss it. It's none of your concern. You know what, let's just say that I have a hell of a lot more on my mind, right now, than thinking about buying a damn car wash. Okay? So if you could just... please. ", time: "16:41"}, {sender: 457, isyou: true,  message: "Stop. Stop! You keep saying that word - danger... danger! No and I have never used that word. I said things were complicated. And then you flew off the handle! ", time: "17:23"}, {sender: 457, isyou: true,  message: "Gus is gonna make his move. I don't know when, I don't know where or how. All I know is it's gonna happen. Powerless to stop him. ", time: "17:25"}, {sender: 457, isyou: true,  message: "I have been waiting. I've been waiting all day. Waiting for Gus to send one of his men to kill me. And it's you. Who do you know, who's okay with using children, Jesse? Who do you know... who's allowed children to be murdered... hmm? Gus! He has, he has been ten steps ahead of me at every turn. And now, the one thing that he needed to finally get rid of me is your consent and boy he's got that now. He's got it. And not only does he have that, but he manipulated you into pulling the trigger for him. ", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//     chats[455] = new Chat("Barack Obama", OnlineStatus.AWAY, ChatStatus.NONE, "resources/images/455.jpg", "now", [{sender: 455, isyou: false, message: "That they are endowed by their Creator with certain inalienable rights. The hope of a skinny kid with a funny name who believes that America has a place for him, too.", time: "16:41"}, {sender: 457, isyou: true,  message: "Not once in my conversations with him have I heard him talk about any ethnic group in derogatory terms, or treat whites with whom he interacted with anything but courtesy and respect. Washington's been talking about our oil addiction for the last thirty years, and John McCain has been there for twenty-six of them. If your hopes have been dashed again and again, then it's best to stop hoping, and settle for what you already know.", time: "17:23"}, {sender: 455, isyou: false, message: "Born into poverty? Pull yourself up by your own bootstraps - even if you don't have boots. For decades, there has been a stalemate: two peoples with legitimate aspirations, each with a painful history that makes compromise elusive. But I do have an unyielding belief that all people yearn for certain things: the ability to speak your mind and have a say in how you are governed; confidence in the rule of law and the equal administration of justice; government that is transparent and doesn't steal from the people; the freedom to live as you choose. Fear that because of modernity we will lose of control over our economic choices, our politics, and most importantly our identities - those things we most cherish about our communities, our families, our traditions, and our faith.", time: "17:25"}, {sender: 457, isyou: true,  message: "And it's around this time that some pastors I was working with came up to me and asked if I was a member of a church. That is why we will honor our agreement with Iraq's democratically-elected government to remove combat troops from Iraqi cities by July, and to remove all our troops from Iraq by 2012. That is why we are forging service projects in America that bring together Christians, Muslims, and Jews. And while America in the past has focused on oil and gas in this part of the world, we now seek a broader engagement.", time: "17:25"}, {sender: 455, isyou: false, message: "They know they have to work hard to get ahead - and they want to. Ours is a promise that says government cannot solve all our problems, but what it should do is that which we cannot do for ourselves - protect us from harm and provide every child a decent education; keep our water clean and our toys safe; invest in new schools and new roads and new science and technology. And it is that promise that forty five years ago today, brought Americans from every corner of this land to stand together on a Mall in Washington, before Lincoln's Memorial, and hear a young preacher from Georgia speak of his dream. government has gone to court to protect the right of women and girls to wear the hijab, and to punish those who would deny it. Around the world, we can turn dialogue into Interfaith service, so bridges between peoples lead to action - whether it is combating malaria in Africa, or providing relief after a natural disaster. This is important because no development strategy can be based only upon what comes out of the ground, nor can it be sustained while young people are out of work.", time: "19:01"}], [{service: "google-plus", username: "j_appleseed@gmail.com", url: "http://plus.google.com"}, {service: "twitter", username: "@j_appleseed", url: "http://twitter.com/j_appleseed"}, {service: "facebook-box", username: "johnny.appleseed", url: "http://facebook.com/johnny.appleseed"}, {service: "twitch", username: "j_appleseed", url: "http://twitch.com"}]);
//
//     listChats();
//     switchChat(users[0]);
//
//     if (overflowMenu == undefined)
//         overflowMenu = document.getElementById("overflow");
//     if (overflowMenuList == undefined)
//         overflowMenuList = document.getElementById("overflow_menu");
//     overflowMenu.addEventListener("click", function () {
//         expandOverflow();
//     });
//
//     if (FABmain == undefined)
//         FABmain = document.getElementById("FAB");
//     FABmain.addEventListener("click", openNewChatDialog);
// }
//
// var chatList = document.getElementById("chats");
// var fragmentChat = "<div class=\"icon\" style=\"background-image: url({{image}});\"></div><div class=\"status\"></div><div class=\"name\">{{name}}</div><div class=\"lastMessage\">{{lastMessage}}</div><div class=\"time\">{{lastMessageTime}}</div><div class=\"muted\"><i class='mdi mdi-volume-off'></div>";
// function listChats () {
//     if (chatList == undefined)
//         chatList = document.getElementById("chats");
//
//     for (var i = 0; i < users.length; i++) {
//         var newChat = document.createElement("div");
//         newChat.className = "chat";
//         newChat.setAttribute(chats[users[i]].status.toLowerCase(), "");
//         if (chats[users[i]].chatStatus != "")
//             newChat.setAttribute(chats[users[i]].chatStatus.toLowerCase(), "");
//         newChat.innerHTML = fragmentChat.replace("{{name}}", chats[users[i]].name);
//         newChat.innerHTML = newChat.innerHTML.replace("{{image}}", chats[users[i]].image);
//         if (chats[users[i]].history[chats[users[i]].history.length - 1].sender != 457)
//             newChat.innerHTML = newChat.innerHTML.replace("{{lastMessage}}", chats[users[i]].history[chats[users[i]].history.length - 1].message);
//         else
//             newChat.innerHTML = newChat.innerHTML.replace("{{lastMessage}}", chats[users[i]].history[chats[users[i]].history.length - 1].message);
//         newChat.innerHTML = newChat.innerHTML.replace("{{lastMessageTime}}", chats[users[i]].history[chats[users[i]].history.length - 1].time);
//         var userID = users[i];
// //        newChat.addEventListener("click", (function () { switchChat(userID, newChat); }));
//         newChat.onclick = (function(uid, nchat) {return function() {
//             switchChat(uid, nchat);
//         };})(userID, newChat);
//
//         chatList.appendChild(newChat);
//         chats[users[i]].chat = newChat;
//     }
// }
//
// function expandOverflow () {
//     if (overflowMenuList.hasAttribute("open")) {
//         overflowMenuList.removeAttribute("open");
//     } else {
//         overflowMenuList.setAttribute("open", "");
//     }
// }
//
// var shiftDown = false;
// function listenForReturn () {
//     if (event.keyCode === 13 && !shiftDown) {
//         sendMessage(457, you.image, document.getElementById('send_message').value);
//         event.cancelBubble = true;
//         event.returnValue = false;
//         document.getElementById('send_message').value = "";
//         return false;
//     } else if (event.keyCode === 13) {
//         event.cancelBubble = true;
//         event.returnValue = false;
//         document.getElementById('send_message').value += "\n";
//         return false;
//     } else if (event.keyCode === 16) {
//         shiftDown = true;
//     }
// }
// function listenForShiftUp () {
//     if (event.keyCode === 16) {
//         shiftDown = false;
//     }
// }
//
// function sendMessage (sender, image, isyou: false, message) {
//
//     addMessageToCurrentView(sender, image, Date.now(), isyou: false, message);
// }
//
// var chatHistory = document.getElementById("history");
// var rightSidebar = document.getElementById("right_sidebar");
// var fragmentMessage = "<div class=\"icon\" title=\"{{sender}}\" style=\"background-image: url('{{image}}');\"></div><div class=\"text\" title=\"{{time}}\">{{message}}</div>";
// function switchChat (user, chat) {
//     for (i in chatList.childNodes)
//         if (chatList.childNodes[i].className === "chat")
//             chatList.childNodes[i].removeAttribute("open");
//     if (chat == undefined) {
//         for (var i = 0; i <= chatList.childElementCount; i++) {
//             if (chatList.childNodes[i].className === "chat" && chatList.childNodes[i].getElementsByClassName("name")[0].innerHTML === chats[user].name) {
//                 chatList.childNodes[i].setAttribute("open", "");
//                 break;
//             }
//         }
//     } else {
//         chat.setAttribute("open", "");
//     }
//
//     if (chatHistory == undefined)
//         chatHistory = document.getElementById("history");
//     while (chatHistory.firstChild)
//         chatHistory.removeChild(chatHistory.firstChild);
//
//     for (var i = 0; i < chats[user].history.length; i++) {
//         var newMessage = document.createElement("div");
//         newMessage.className = "message";
//         newMessage.innerHTML = fragmentMessage;
//         if (chats[user].history[i].sender === 457) {
//             newMessage.setAttribute(457, "");
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", 457);
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", you.image);
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", chats[user].history[i].time);
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", chats[user].history[i].message);
//         } else {
//             newMessage.setAttribute("other", "");
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", chats[chats[user].history[i].sender].name);
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", chats[chats[user].history[i].sender].image);
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", chats[user].history[i].time);
//             // TODO: this doesn't work with group messaging
//             newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", chats[user].history[i].message);
//         }
//
//         chatHistory.appendChild(newMessage);
//         newMessage.style.height = newMessage.getElementsByClassName("text")[0].offsetHeight + 10;
//     }
//
//     if (rightSidebar == undefined)
//         rightSidebar = document.getElementById("right_sidebar");
//     while (rightSidebar.firstChild) {
//         rightSidebar.removeChild(rightSidebar.firstChild);
//     }
//
//     var icon = document.createElement("div");
//     var status = document.createElement("div");
//     var name = document.createElement("div");
//     var lastActive = document.createElement("div");
//     var icnMute = document.createElement("i");
//     var tglMute = document.createElement("div");
//     var btnCall = document.createElement("button");
//     var profiles = document.createElement("div");
//
//     icon.className = "icon";
//     status.className = "status";
//     name.className = "name";
//     lastActive.className = "lastActive";
//     icnMute.className = "mdi mdi-bell muteIcon";
//     tglMute.className = "material light switch mute";
//     btnCall.className = "material light flat call";
//     profiles.className = "profiles";
//
//     name.innerHTML = chats[user].name;
//     icon.style.backgroundImage = "url('" + chats[user].image + "')";
//     if (chats[user].status === OnlineStatus.ONLINE) {
//         status.setAttribute("online", "");
//         lastActive.innerHTML = "Active Now";
//     } else if (chats[user].status === OnlineStatus.AWAY) {
//         status.setAttribute("away", "");
//         lastActive.innerHTML = "Last Active " + 3 + "m";
//     } else {
//         status.setAttribute("offline", "");
//         lastActive.innerHTML = "Last Active " + 59 + "m";
//     }
//     tglMute.innerHTML = "<input id=\"tglMute\" type=\"checkbox\" " + ((chats[user].chatStatus === ChatStatus.MUTED) ? "" : "checked") + "><label for=\"tglMute\"></label>";
//     btnCall.innerHTML = "<i class='mdi mdi-phone'></i>";
//     tglMute.title = "Mute chat";
//     btnCall.title = "Start call";
//     tglMute.addEventListener("click", (function () {
//         muteChat(user, (chats[user].chatStatus === ChatStatus.MUTED) ? true : false);
//     }));
//     btnCall.addEventListener("click", (function () {
//
//     }));
//
//     for (var i = 0; i < chats[user].profiles.length; i++) {
//         var newProfile = document.createElement("a");
//         newProfile.href = chats[user].profiles[i].url;
//         newProfile.className = "profile";
//         newProfile.innerHTML = "<i class='mdi mdi-" + chats[user].profiles[i].service + "'></i>&nbsp;" + chats[user].profiles[i].username;
//
//         profiles.appendChild(newProfile);
//     }
//
//     rightSidebar.appendChild(icon);
//     rightSidebar.appendChild(status);
//     rightSidebar.appendChild(name);
//     rightSidebar.appendChild(lastActive);
//     rightSidebar.appendChild(icnMute);
//     rightSidebar.appendChild(tglMute);
//     rightSidebar.appendChild(btnCall);
//     rightSidebar.appendChild(profiles);
//
//     document.getElementById('send_message').focus();
// }
//
// function addMessageToCurrentView (sender, image, time, isyou: false, message) {
//     if (chatHistory == undefined)
//         chatHistory = document.getElementById("history");
//
//     var newMessage = document.createElement("div");
//     newMessage.className = "message";
//     newMessage.innerHTML = fragmentMessage;
//     if (sender === 457) {
//         newMessage.setAttribute(457, "");
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", 457);
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", image);
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", time);
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", isyou: false, message);
//     } else {
//         newMessage.setAttribute("other", "");
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{sender}}", name);
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{image}}", image);
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{time}}", time);
//         // TODO: this doesn't work with group messaging
//         newMessage.innerHTML = newMessage.innerHTML.replace("{{message}}", isyou: false, message);
//     }
//
//     chatHistory.appendChild(newMessage);
// }
//
// function changeStatus (user, status) {
//     chats[user].status = status;
// }
//
// function muteChat (user, state) {
//     if (state) {
//         chats[user].chatStatus = ChatStatus.NONE;
//         chats[user].chat.removeAttribute(ChatStatus.MUTED);
//     } else {
//         chats[user].chatStatus = ChatStatus.MUTED;
//         chats[user].chat.setAttribute(chats[user].chatStatus.toLowerCase(), "");
//     }
// }
//
// var FABmain = document.getElementById("FAB");
// var newChatDialogFrame = document.getElementById("popup_new_chat");
// var newChatDialog = document.getElementById("actual_popup_new_chat");
// function openNewChatDialog () {
//     if (FABmain == undefined)
//         FABmain = document.getElementById("FAB");
//     if (newChatDialogFrame == undefined)
//         newChatDialogFrame = document.getElementById("popup_new_chat");
//     if (newChatDialog == undefined)
//         newChatDialog = document.getElementById("actual_popup_new_chat");
//
//     newChatDialogFrame.style.display = "block";
//     newChatDialog.style.position = "absolute";
//     newChatDialog.style.left = FABmain.offsetLeft;
//     newChatDialog.style.width = FABmain.offsetWidth;
//     newChatDialog.style.top = FABmain.offsetTop - 30;
//     newChatDialog.style.height = FABmain.offsetHeight;
//     newChatDialog.style.padding = "0px";
//     newChatDialog.style.borderRadius = "28px";
//
//     var tweenTime = 0.5;
//     TweenLite.to(newChatDialog, tweenTime, {
//         top: "0px",
//         left: (window.innerWidth / 2 - 300) + "px",
//         width: "500px",
//         height: "400px",
//         padding: "30px 50px 30px 50px",
//         borderRadius: "2px"
//     });
//
//
//     newChatDialogFrame.setAttribute("open", "");
// }
//
// //setTimeout(openNewChatDialog, 200);

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
