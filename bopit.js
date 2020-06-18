const Discord = require("discord.js");
class BopIt {
  constructor() {
    this.client = new Discord.Client(); 
    this.BopItOnMessage = require("./BopItOnMessage.js")
    this.bopitonmessage = new this.BopItOnMessage(this);
    this.OnMessage = this.bopitonmessage.OnMessage;
    this.cmdChar = '!';
    this.fileDir = "../../Bop It/Bop It Sounds/EG Hub/";
    this.validFileExtensions = [".mp3", ".wav", ".ogg", ".m4a"]
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
  }
  verifyFile(file) {
    for (let extension of this.validFileExtensions) {
      if (file.endsWith(extension)) return true;
      else continue;
      return false;
    }
  }
  loadFiles() {
    getDirectories(this.fileDir, (err, res) => {
      if (err) {
        console.log('Error', err);
      } else {
        this.files = res;
      }
    });
  }
}
module.exports = BopIt;