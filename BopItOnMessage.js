class BopItOnMessage {
  constructor() {
    this.cmdModules = require("fs").readdirSync("./commands").toString("utf8").split(",");
    this.cmds = this.LoadCommands.bind(this)();
  }
  OnMessage(msg) {
    if (msg.author.bot || !msg.guild) return;
    msg.rank = this.getRankById(msg.author.id);
    msg.args = msg.cleanContent.split(" ");
    msg.input = n => msg.args.slice(n).join(" ");
    msg.command = msg.args[0].startsWith(this.cmdChar) ? msg.args[0].split(this.cmdChar).slice(1).join(this.cmdChar) : null;

    //dad jokes
    if (this.dadMode) {
      let newText = msg.cleanContent;
      function getLastIndexofIm(s) {
        let im = s.toLowerCase().lastIndexOf(" im ");
        let imm = s.toLowerCase().lastIndexOf(" i'm ");
        let immm = s.toLowerCase().lastIndexOf(" i’m ");

        return Math.min(...[im, imm, immm].filter((num) => num !== -1));
      }
      if (msg.cleanContent.toLowerCase().includes(" im ") || msg.cleanContent.toLowerCase().includes(" i'm ") || msg.cleanContent.toLowerCase().includes(" i’m ")) {
        newText = ("i'm " + msg.cleanContent.substring(getLastIndexofIm(msg.cleanContent) + 4, msg.cleanContent.length)).trim()
      }
      if (newText.toLowerCase().startsWith("i'm ") || newText.toLowerCase().startsWith("im ") || newText.toLowerCase().startsWith("i’m ")) {
        msg.channel.send(`Hello ${newText.substring(newText.toLowerCase().indexOf("m") +2, newText.length)}, I'm ${Array.from(msg.guild.members.cache.values())[Math.floor(Math.random() * Array.from(msg.guild.members.cache.values()).length)].user.username}!`);
        return;
      }
    }

    if (!msg.command) return;
    let command = this.bopitonmessage.cmds.find((c) => c.name == `${msg.command}.js`)
    if (command) {
      command = command.cmd(this, msg);
      if ((msg.rank.id >= command.minRank)) {
        command.func();
      } else {
        if (msg.rank.name == "Banned") {
          msg.channel.send(this.banmsg);
          return;
        } else {
          switch (this.getRankNameByRankid(command.minrank)) {
            case "Owner": {
              msg.channel.send(`Sorry, you must be the owner to use this command.`);
              break;
            }
            default: {
              msg.channel.send(`Sorry, you must be a ${this.getRankNameByRankid(command.minRank)} or higher to use this command.`);
            }
          }
          return;
        }
      }

    } else {
      msg.channel.send("Command not found.")
    }
  }
  LoadCommands() {
    let cmds = [];
    for (let cmd of this.cmdModules) {
      cmds.push({
        cmd: require(`./commands/${cmd}`),
        name: cmd
      });
    }
    return cmds;
  }
}
module.exports = BopItOnMessage;