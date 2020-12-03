module.exports = ((bopit, msg) => {
  return {
    command: "eval", 
    description: "Executes code.",
    minRank: 3,
    func: () => {
      if (msg.author.id == "246799235775725569") {
        try {
          msg.channel.send(String(eval(msg.input(1))), {split: {char: " "}});
        } catch(e) {
          msg.channel.send(e.toString());
        }
      }
    }
  }
})