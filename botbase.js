const Discord = require("discord.js");
class BotBase {
  constructor() {
    this.client = new Discord.Client(); 
    this.BopItOnMessage = require("./BopItOnMessage.js");
    this.cmdChar = '!';
    this.banmsg = "HAHAHA. YOU'RE BANNNED! 😂";
    this.ranks = require("./db/ranks.json");
    this.client.login("");
  }
  getRankById(_id) {
    if (this.ranks.owner._id == _id) {
      return {
        id: 3,
        name: "Owner"
      };
    } else if (this.ranks.banned.hasOwnProperty(_id)) { //banned after owner so owner no ban.
      return {
        id: -1,
        name: "Banned"
      }
    } else if (this.ranks.admins.hasOwnProperty(_id)) {
      return {
        id: 2,
        name: "Admin"
      };
    } else if (this.ranks.helpers.hasOwnProperty(_id)) {
      return {
        id: 1,
        name: "Helper"
      };
    } else {
      return {
        id: 0,
        name: "User"
      };
    }
  }

  getRankNameByRankid(id) {
    switch (id) {
      case 3:
        return "Owner";
      case -1:
        return "Banned"; //same thing here
      case 2:
        return "Admin";
      case 1:
        return "Helper";
      default:
        return "User";
    }
  }

  getRankIdByRankName(id) {
    switch (id) {
      case "Owner":
        return 3;
      case "Banned":
        return -1; //same thing here
      case "Admin":
        return 2;
      case "Helper":
        return 1;
      default:
        return 0;
    }
  }
  getUsersByNameOrId(guild, user) {
    let usr = [...guild.members.cache.values()].filter((a) => a.user.id == user || a.user.username.toLowerCase().includes(user.toLowerCase()) || a.nickname?.toLowerCase()?.includes(user?.toLowerCase()))
    return usr;
  }
  getUsersByName(guild, user) {
    let usr = [...guild.members.cache.values()].filter((a) => a.user.username.toLowerCase().includes(user.toLowerCase()) || a.nickname?.toLowerCase()?.includes(user?.toLowerCase()))
    return usr;
  }
  getUsersById(guild, user) {
    let usr = [...guild.members.cache.values()].filter((a) => a.user.id == user)
    return usr;
  }
  async updateBan(_id, ban) {
    if (!this.ranks["banned"].hasOwnProperty(_id) && ban == true) {
      this.ranks["banned"][_id] = _id
      this.updatedb();
    } else if (this.ranks["banned"].hasOwnProperty(_id) && ban == false) {
      delete this.ranks["banned"][_id];
      this.updatedb();
    }
  }
  async updatedb() {
    await require("util").promisify(fs.writeFile)('db/ranks.json', JSON.stringify(this.ranks, null, 2), (err) => {
      if (err) {
        throw err;
      }
    });
  }
  async changeRank(_id, rank) {
    //db.push("./ranks.json", {rank: {_id: _id} })
    for (let rankname of Object.keys(this.ranks)) {
      //remove _id from all ranks.
      if (this.ranks[rankname].hasOwnProperty(_id)) {
        delete this.ranks[rankname][_id]
        this.updatedb()
        // console.log(this.ranks);
      }
    }
    if (rank == "users") {
      this.updatedb();
      return this.getRankById(_id).name;

    } else {
      //give new rank
      if (!this.ranks[rank].hasOwnProperty(_id)) {
        this.ranks[rank][_id] = _id
        this.updatedb();
      } else {
        console.log("Nope!");
      }
      return this.getRankById(_id).name;
    }
  }
}
module.exports = BotBase;