class BopItOnMessage {
  constructor(bopit) {
    this.bopit = bopit;
    this.cmdModules = require("fs").readdirSync("./commands").toString("utf8").split(",");
    this.cmds = this.LoadCommands.bind(this)();
  }
  OnMessage(msg) {
    if (msg.author.bot) return;
    msg.args = msg.cleanContent.split(" ");
    msg.input = n => msg.args.slice(n).join(" ");
    msg.command = msg.args[0].split(this.cmdChar).slice(1).join(this.cmdChar);
    if (!msg.command) return;
    let command = this.bopitonmessage.cmds.find((c) => c.name == `${msg.command}.js`)
    if (command) {    
      command.cmd(this, msg).func();
    } else {
      msg.channel.send("Command not found.")
    } 
  }
  LoadCommands() {
    let cmds = [];
    for (let cmd of this.cmdModules) {
      cmds.push({cmd: require(`./commands/${cmd}`), name: cmd});
    }
    return cmds;
  }
}
module.exports = BopItOnMessage;