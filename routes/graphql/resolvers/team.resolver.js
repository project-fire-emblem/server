const Team = require('../../../models/team.model');
const User = require('../../../models/user.model');

const { transformTeam } = require('./merge.resolver');

// ---------------------- Resolvers -----------------------

module.exports = {
  teams: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    try {
      const teams = await Team.find();
      return teams.map(team => transformTeam(team));
    } catch (err) {
      throw err;
    }
  },

  createTeam: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    const team = new Team({
      name: args.teamInput.name,
      roster: ['5c9c39d18e16c12acde82b91', '5c9c39d18e16c12acde82bb7', '5c9c39d18e16c12acde82b95'],
      creator: req.userId,
    });
    let createdTeam;
    try {
      const result = await team.save();
      createdTeam = transformTeam(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User was not found.');
      }
      creator.createdTeams.push(team);
      await creator.save();

      return createdTeam;
    } catch (err) {
      throw err;
    }
  },
};
