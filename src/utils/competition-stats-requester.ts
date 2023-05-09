import axios from "axios"

export const competitionStatsRequester = async (competition: number, year: number) => {
	const TOKEN = process.env.SPORTS_DATA_TOKEN;
	try {
		const { status, data } = await axios.get(
      `https://api.sportsdata.io/v4/soccer/scores/json/TeamSeasonStats/${competition}/${year}?key=${TOKEN}`
		);

		return { status, data };
	} catch (error) {
		console.log(error);
	}
};