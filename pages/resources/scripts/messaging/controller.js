(function () {
    var app = angular.module('AllTalk', []);
    app.controller('MessengerController', function () {
        this.chats = {};
        this.you = {};
        this.currentChat = '555ad069d279374e636b3bd6';

        this.toolbarItems = [{icon: 'account-plus', title: 'Add people', importance: 0}, {icon: 'history', title: 'Turn history off', importance: 1}, {icon: 'package', title: 'Archive', importance: 2}, {icon: 'rename-box', title: 'Rename', importance: 3}, {icon: 'delete', title: 'Delete', importance: 4}];
    });
    app.directive('currentChat', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/current_chat.html',
            controller: function ($scope) {
                this.sounds = {
                    newMessage: new Audio('/resources/audio/new-message.mp3')
                };
                this.sounds.newMessage.volume = 0.5;

                this.chatList = document.getElementById('chats');
                this.switchChat = function (user, chat) {
                    $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].draftText = document.getElementById('send_message').value;
                    $scope.ctrlMessenger.currentChat = user;
                    for (var i in this.chatList.childNodes) {
                        if (this.chatList.childNodes[i].className !== undefined && this.chatList.childNodes[i].className.indexOf('chat') !== -1) {
                            this.chatList.childNodes[i].removeAttribute('open');
                        }
                    }
                    chat.setAttribute('open', '');

                    $scope.ctrlRightSidebar.user = $scope.ctrlMessenger.chats[user].users[0];

                    $scope.$apply();

                    document.getElementById('send_message').value = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].draftText;
                    document.getElementById('send_message').focus();
                };
                this.sendMessage = function (message, attachment) {
                    model.sendMessage({conversationID: $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].id, sender: $scope.ctrlMessenger.you.id, message: message, time: Date.now()});
                    $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].history.push(new Message($scope.ctrlMessenger.you.id, true, message, attachment, Date.now()));
                    $scope.$apply();
                };
                this.addMessage = function (msg) {
                    // TODO check is sender is really not you // (msg.sender === scope.ctrlMessenger.you.id) ? true : false
                    $scope.ctrlMessenger.chats[msg.conversationID].history.push(new Message(msg.sender, false, msg.message, msg.attachment, msg.time));
                    $scope.$apply();
                    document.title = 'All Talk - new message';
                    // TODO don't play notification sound excesively
                    if ($scope.ctrlMessenger.chats[msg.conversationID].chatStatus !== ChatStatus.MUTED) {
                        this.sounds.newMessage.play();
                    }
                };

                window.addEventListener('resize', function () {
                    // TODO change this to be more efficient, and to work when an animation is occuring that changes the side of the current chat
                    $scope.ctrlChatHistory.history = [];
                    $scope.$apply();
                    $scope.ctrlChatHistory.history = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].history;
                    $scope.$apply();
                });
            },
            controllerAs: 'ctrlChat'
        };
    });
    app.directive('navigationDrawer', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/navigation_drawer.html',
            controller: function ($scope, $element) {
                var navDrawerExpanded = false;
                var navigationDrawer = $element[0];
                this.toggleNavDrawer = function () {
                    if (navDrawerExpanded) {
                        navigationDrawer.removeAttribute('open');
                        navDrawerExpanded = false;
                    } else {
                        navigationDrawer.setAttribute('open', '');
                        navDrawerExpanded = true;
                    }
                };
            },
            controllerAs: 'ctrlNavDrawer'
        };
    });
    app.directive('chatHistory', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/chat_history.html',
            controller: function ($scope) {
                if ($scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat]) {
                    this.history = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].history;
                }
            },
            controllerAs: 'ctrlChatHistory'
        };
    });
    app.directive('sender', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (scope.ctrlMessenger.chats[scope.ctrlMessenger.currentChat].users[0]._id == scope.message.sender) {
                    element[0].setAttribute('sender', 'other');
                } else {
                    element[0].setAttribute('sender', 'you');
                }
            }
        };
    });
    app.directive('resizeHeight', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                scope.$evalAsync(function () {
                    element[0].style.height = element[0].getElementsByClassName('text')[0].offsetHeight + 10;
                    var tweenTime = 0.5;
                    TweenLite.to(element[0].parentElement, tweenTime, {
                        scrollTop: element[0].parentElement.scrollHeight
                    });
                });
            }
        };
    });
    app.directive('keyListener', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('keypress', function (event) {
                    if (event.keyCode === 13 && !scope.shiftDown) {
                        event.preventDefault();
                        send_submit.click();
                    }
                });
                element.on('keydown', function (event) {
                    if (event.keyCode === 16) {
                        scope.shiftDown = true;
                    }
                });
                element.on('keyup', function (event) {
                    if (event.keyCode === 16) {
                        scope.shiftDown = false;
                    }
                });
            }
        };
    });
    app.directive('sendMessage', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.preventDefault();
                    if ((scope.message !== '' && /\S/.test(scope.message)) || (scope.attachment && scope.attachment.length > 0)) {
                        scope.ctrlChat.sendMessage(scope.message, scope.attachment);
                        scope.attachment = '';
                        scope.message = '';
                        send_media_dialogue.removeAttribute('open');
                        send_media_dialogue.removeAttribute('previewing');
                        send_media_dialogue_preview_img.style.backgroundImage = 'url(' + event.target.result + ')';
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
    app.directive('attachMessage', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function (event) {
                    event.preventDefault();
                    if (send_media_dialogue.getAttribute('open') !== '') {
                        send_media_dialogue.setAttribute('open', '');
                    } else {
                        send_media_dialogue.removeAttribute('open');
                    }
                });
            }
        };
    });
    app.directive('attachDialogue', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('change', function (event) {
                    // event.preventDefault();
                    if (event.srcElement.files && event.srcElement.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            send_media_dialogue_preview_img.style.backgroundImage = 'url(' + e.target.result + ')';
                            element[0].parentElement.parentElement.setAttribute('previewing', '');
                            scope.attachment = e.target.result;
                        };
                        reader.readAsDataURL(event.srcElement.files[0]);
                    }
                });
            }
        };
    });
    app.directive('cancelAttachDialogue', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function () {
                    element[0].parentElement.removeAttribute('previewing');
                });
            }
        };
    });
    app.directive('chatsList', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/chats_list.html',
            // controller: function ($scope) {
            //     this.chats = $scope.ctrlMessenger.chats;
            // },
            controllerAs: 'ctrlChatList'
        };
    });
    app.directive('chatListClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.chat.user !== undefined) {
                    attrs.user = scope.chat.id;
                    // element[0].setAttribute('user', scope.chat.id);
                }
                element.on('click', function () {
                    scope.ctrlChat.switchChat(scope.chat.id, element[0]);
                });
                // TODO: change to set the actual current chat active
                if (scope.chat.id === scope.ctrlMessenger.currentChat) {
                    attrs.open = '';
                    // element[0].setAttribute('open', '');
                }
            }
        };
    });
    app.directive('appToolbar', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/app_toolbar.html',
            controller: function ($scope) {
                nav_drawer_icon.addEventListener('click', function () {
                    $scope.ctrlNavDrawer.toggleNavDrawer();
                });
            },
            controllerAs: 'ctrlAppToolbar'
        };
    });
    app.directive('toolbarMenuItem', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/toolbar_menu_item.html'
        };
    });

    app.directive('rightSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/right_sidebar.html',
            controller: function ($scope) {
                // this.user = $scope.ctrlMessenger.chats[$scope.ctrlMessenger.currentChat].users[0];
            },
            controllerAs: 'ctrlRightSidebar'
        };
    });
    app.directive('chatStatusSetter', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('change', function () {
                    scope.ctrlMessenger.chats[scope.ctrlMessenger.currentChat].status = (!this.checked ? ChatStatus.MUTED : ChatStatus.NONE);
                    scope.$apply();
                });
            }
        };
    });

    app.directive('fab', function () {
        return {
            restrict: 'E',
            template: '<input id=\'FAB\' class=\'material light floating\' value=\'+\' type=\'button\'>',
            // controller: function ($scope) {
            //     this.openPopup
            // },
            controllerAs: 'ctrlFAB'
        };
    });
    app.directive('popupNewChat', function () {
        return {
            restrict: 'E',
            templateUrl: '/parts/messaging/popup_new_chat.html',
            controller: function ($scope) {
                this.users = $scope.ctrlMessenger.chats;
                // TODO: replace open and close with good Angular.JS
                this.open = function () {
                    var FABmain = document.getElementById('FAB');
                    var newChatDialogFrame = document.getElementById('popup_new_chat');
                    var newChatDialog = document.getElementById('actual_popup_new_chat');

                    newChatDialogFrame.style.display = 'block';
                    newChatDialog.style.position = 'absolute';
                    newChatDialog.style.left = FABmain.offsetLeft;
                    newChatDialog.style.width = FABmain.offsetWidth;
                    newChatDialog.style.top = FABmain.offsetTop - 30;
                    newChatDialog.style.height = FABmain.offsetHeight;
                    newChatDialog.style.padding = '0px';
                    newChatDialog.style.borderRadius = '28px';

                    FABmain.style.display = 'none';

                    var tweenTime = 0.3;
                    TweenLite.to(newChatDialog, tweenTime, {
                        top: '0px',
                        left: (window.innerWidth / 2 - 300) + 'px',
                        width: '500px',
                        height: '400px',
                        padding: '30px 50px 30px 50px',
                        borderRadius: '2px'
                    });

                    newChatDialogFrame.setAttribute('open', '');
                };
                this.close = function () {
                    var FABmain = document.getElementById('FAB');
                    var newChatDialogFrame = document.getElementById('popup_new_chat');
                    var newChatDialog = document.getElementById('actual_popup_new_chat');

                    FABmain.style.display = 'block';
                    var _top = FABmain.offsetTop - 80;
                    var _left = FABmain.offsetLeft;
                    var _width = FABmain.offsetWidth;
                    var _height = FABmain.offsetHeight;
                    FABmain.style.display = 'none';

                    var tweenTime = 0.3;
                    TweenLite.to(newChatDialog, tweenTime, {
                        top: _top,
                        left: _left,
                        width: _width,
                        height: _height,
                        padding: '0px',
                        borderRadius: '28px',

                        onComplete: function () {
                            newChatDialogFrame.style.display = 'none';
                            FABmain.style.display = 'block';
                        }
                    });

                    newChatDialogFrame.removeAttribute('open');
                };
            },
            controllerAs: 'ctrlPopupNewChat'
        };
    });
    app.directive('popupNewChatOpen', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function () {
                    scope.ctrlPopupNewChat.open();
                });
            }
        };
    });
    app.directive('popupNewChatClose', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function () {
                    scope.ctrlPopupNewChat.close();
                });
            }
        };
    });

    window.addEventListener('resize', function () {

    });
})();
