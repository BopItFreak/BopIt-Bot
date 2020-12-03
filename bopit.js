const Discord = require("discord.js");
const BotBase = require("./botbase.js");
class BopIt extends BotBase {
  constructor() {
    super();
    this.client = new Discord.Client(); 
    this.bopitonmessage = new this.BopItOnMessage();
    this.OnMessage = this.bopitonmessage.OnMessage;
    this.fileDirs =  ["K:/team/electronic_games/"];
    this.validFileExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".wma", ".flac"];
    this.dadMode = false;
    this.breakMode = false;
    this.files = [];
    this.connections = {};
    this.initListeners();
    this.loadFiles();
    this.client.login("");
  }
  initListeners() {
    this.client.on("message", msg => {
      this.OnMessage(msg);
    })
    this.client.on("ready", msg => {
      console.log("Ready")
    })
  }
  verifyFile(file) {
    for (let extension of this.validFileExtensions) {
      if (file.endsWith(extension)) return true;
      else continue;
    }
  }
  loadFiles() {
    this.files = [];
    for (let dir of this.fileDirs) {
      getDirectories(dir, (err, res) => {
        if (err) {
          console.log('Error', err);
        } else {
          for (let file of res) {
            this.files.push(file);
          }
        }
      });
    }
  } 
}
module.exports = BopIt;