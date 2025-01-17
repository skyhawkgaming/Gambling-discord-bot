const log = require('../Tools/logs');
const redis = require('../Tools/redis');
const config = require("../config.json");
const replies = require('../replies');
const {progressBar} = require("../Tools/progressBar");
const uniqid = require('uniqid');
const prediction = require('../modules/prediction');

module.exports = {
	name: "bet",
	aliases: [ "gamba", "predict" ],
	desc: "Create a bet",
	async run(client, message, args) {
		log.info(`${message.author.username} is trying to place a bet`);
		if (args.lenght < 3) {
			log.ko(`Invalid Parameter for prediction: ${config.prefix}bet <choice #>`);
			message.reply(replies.PredictInvalidArguments, {
				tts: config.bet.tts,
			});
			return;
		}
		prediction.addNewPrediction({
			totalBet: 0,
			author_id: message.author.id,
			channel_id: message.channel.id,
			question: args.at[0],
			options_lenght: args.lenght - 1,
			props: args.at.splice(1)
		}, message);
	}
}