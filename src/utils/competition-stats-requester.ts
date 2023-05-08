import axios from "axios"

export const competitionStatsRequester = (competition: number, year: number) => {
  const TOKEN = process.env.SPORTS_DATA_TOKEN;
  const teste = axios.create({
		baseURL: `https://api.sportsdata.io/v4/soccer/scores/json/TeamSeasonStats/${competition}/${year}?key=${TOKEN}`,
	});
}