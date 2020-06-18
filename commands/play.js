module.exports = ((bopit, msg) => {
  return {
    command: "play",
    description: "Plays a file.",
    func: () => {
      let files = bopit.files.filter((file) => bopit.verifyFile);
      if (bopit.connections[msg.guild.id] && bopit.connections[msg.guild.id].status == 0) {
        if (!bopit.connections[msg.guild.id].autoplay) {
          if (msg.args.length > 1) {
            search = files.filter((f) => (f.toLowerCase().includes(msg.input(1).toLowerCase())) && bopit.verifyFile(f));
            let file = search[Math.floor(Math.random() * search.length)];
            if (file) {
              msg.channel.send(`Playing ${file}`)
              bopit.connections[msg.guild.id].play(file);
            } else {
              msg.channel.send("File not found.");
            }
          } else {
            msg.channel.send(`Incorrect usage. Usage: ${bopit.cmdChar}${msg.command} <search query>`)
          }
        } else {
          msg.channel.send("This command is disabled while autoplay is enabled.");
        }
      } else {
        msg.channel.send("Please use !join to add me to a voice channel first.");
      }
    }
  }
})