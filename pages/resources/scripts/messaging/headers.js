var OnlineStatus = Object.freeze({ // jshint ignore:line
    ONLINE: 'Online',
    AWAY: 'Away',
    OFFLINE: 'Offline'
});

var ChatStatus = Object.freeze({ // jshint ignore:line
    MUTED: 'Muted',
    NONE: ''
});

function Chat (name, id, status, chatStatus, image, lastActive, history, profiles) { // jshint ignore:line
    this.name = name;
    this.id = id;
    this.status = status;
    this.chatStatus = chatStatus;
    this.image = image;
    this.lastActive = lastActive;
    this.history = history;
    this.profiles = profiles;
    this.draftText = '';
}

function Message (sender, isyou, message, attachment, time) { // jshint ignore:line
    this.sender = sender;
    this.isyou = isyou;
    this.message = message;
    this.attachment = attachment;
    this.time = time;
}
