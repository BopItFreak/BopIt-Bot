module.exports = ((bopit, msg) => {
  return {
    command: "eval", 
    description: "Executes code.",
    func: () => {
      if (msg.author.id == "246799235775725569") {
        msg.channel.send(String(eval(msg.input(1))));
      }
    }
  }
})