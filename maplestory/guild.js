
function getGuildId(guildName) {
  let r = fetch('/id', { 'guild_name': guildName });
  Logger.log(r);
  return r;
}