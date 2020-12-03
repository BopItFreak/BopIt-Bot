module.exports = ((bopit, msg) => {
  return {
    command: "ban",
    description: "Bans a user.",
    minRank: 2,
    func: () => {
      let user = bopit.getUsersByNameOrId(msg.guild, msg.args[1]);
      if (user.length <= 0) {
      msg.channel.send("User Not found.");
      return;
      }
      user = user[Math.floor(Math.random() * user.length)];
      if (bopit.getRankById(user.user.id).name == "Banned") {
        msg.channel.send(`${user.user.username} is already Banned.`);
        return;
      } else if (bopit.getRankById(user.user.id).name == "Owner") {
        msg.channel.send(`You cannot ban the Owner.`);
        return;
      } else {
        bopit.updateBan(user.id, true).then(() => {
          msg.channel.send(`Banned ${user.user.username}.`);
        }).catch((err) => {
          throw err;
        })
      }
    }
  }
})