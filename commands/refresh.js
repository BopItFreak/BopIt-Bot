module.exports = ((bopit, msg) => {
  return {
    command: "refresh", 
    description: "Refreshes the file list.",
    minRank: 0,
    func: () => {
      bopit.loadFiles();
      msg.channel.send("Refreshing file list. Please wait up to 15 seconds for this process to complete.");
    }
  }
})