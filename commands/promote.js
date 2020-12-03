module.exports = ((bopit, msg) => {
  return {
    command: "promote",
    description: "Promotes or Demotes a user to a different rank.",
    minRank: 3,
    func: () => {
      let user = bopit.getUsersByNameOrId(msg.guild, msg.args[1]);
      if (user.length <= 0) {
        msg.channel.send("User Not found.");
        return;
      }
      user = user[Math.floor(Math.random() * user.length)];
      if (bopit.getRankById(user.user.id).name == "Banned") {
        msg.channel.send("❌ Cannot promote user. User is banned.");
        return;
      }
      switch (msg.args[2]) {
        case "User":
        case "Helper":
        case "Admin": {
          let oldrank = bopit.getRankById(user.user.id);
          let prm = "Promoted";
          if (oldrank.id == bopit.getRankIdByRankName(msg.args[2])) {
            msg.channel.send(`${user.user.username} is already a ${oldrank.name}.`)
            break;
          }
          bopit.changeRank(user.id, msg.args[2].toLowerCase() + "s").then((tonq) => {
            if (oldrank.id > bopit.getRankById(user.user.id).id /* new rank */ )
              prm = "Demoted";
              msg.channel.send(`${prm} ${user.user.username} from ${oldrank.name} to ${tonq}.`)
          }).catch((err) => {
            throw err;
          })
          break;
        }
        case "Owner": {
          msg.channel.send(`You cannot promote someone to Owner.`);
        }
        default: {
          let tosend = `❌ There is no rank '${msg.args[2]}'. Ranks: `;
          Object.keys(bopit.ranks).forEach((rank) => {
            switch (rank) {
              case "owner": {
                break;
              }
              case "admins": {
                tosend += "Admin, ";
                break;
              }
              case "helpers": {
                tosend += "Helper, User.";
                break;
              }
            }
          })
          msg.channel.send(tosend)
          break;
        }
      }
    }
  }
})