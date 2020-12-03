module.exports = ((bopit, msg) => {
  return {
    command: "unban",
    description: "Unbans a user.",
    minRank: 2,
    func: () => {
      let user = bopit.getUsersByNameOrId(msg.guild, msg.args[1]);
      if (user.length <= 0) {
        msg.channel.send("User Not found.");
        return;
      }
      user = user[Math.floor(Math.random() * user.length)];
      if (bopit.getRankById(user.user.id).name != "Banned") {
        msg.channel.send(`${user.user.username} isn't Banned.`);
        return;
      } else if (bopit.getRankById(user.user.id).name == "Owner") {
        msg.channel.send(`:thinking: Unbanned the Owner.`);
        return;
      } else {
        bopit.updateBan(user.user.id, false).then(() => {
          msg.channel.send(`Unbanned ${user.user.username}.`);
        }).catch((err) => {
          throw err;
        })
      }
    }
  }
})