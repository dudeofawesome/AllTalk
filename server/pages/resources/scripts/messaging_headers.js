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
