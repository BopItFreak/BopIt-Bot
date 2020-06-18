module.exports = ((bopit, msg) => {
  return {
    command: "autoplay",
    description: "Plays a random sound one after another automatically.",
    func: () => {
      let files = bopit.files.filter((file) => bopit.verifyFile);
      if (bopit.connections[msg.guild.id] && bopit.connections[msg.guild.id].status == 0) {
        bopit.connections[msg.guild.id].autoplay = !bopit.connections[msg.guild.id].autoplay;

        function playFile() {
          if (bopit.connections[msg.guild.id].autoplay) {
            let file = files[Math.floor(Math.random() * files.length)];
            console.log(file)
            let dispatcher = bopit.connections[msg.guild.id].play(file);
            dispatcher.on("finish", () => {
              if (bopit.connections[msg.guild.id].delay) {
                setTimeout(() => {
                  playFile();
                }, bopit.connections[msg.guild.id].delay * 1000)
              } else {
                setTimeout(() => {
                  playFile();
                }, 1000 * 32)
              }
            })
          }
        }
        if (bopit.connections[msg.guild.id].autoplay) {
          msg.channel.send("Autoplay enabled.");
          playFile();
        } else {
          msg.channel.send("Autoplay disabled.");
        }
      } else {
        msg.channel.send("Please use !join to add me to a voice channel first.");
      }
    }
  }
})