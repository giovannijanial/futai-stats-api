import { JsonToolkit, createJsonAgent } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";

import { JsonSpec } from "langchain/tools";
import { competitionStatsRequester } from "../../utils";

class AnalyzeCompetitionByYearUseCase {
	async execute(competitionId: number, year: number, team: string) {
		const competitionStatsRequesterResponse = await competitionStatsRequester(
			competitionId,
			year
		);

		if (competitionStatsRequesterResponse?.status !== 200) {
			return { status: 400, data: "error" };
    }

		const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
    const input = `Get to know the relevant stats of a team and extract some static data from that team`;


    const filteredData = competitionStatsRequesterResponse.data.filter(
			(season: any) => season.TeamSeasons[0].TeamId === 509
    );
    
    console.log(filteredData[0].TeamSeasons[0]);
    
 
		const toolkit = new JsonToolkit(
			new JsonSpec(filteredData[0].TeamSeasons[0])
		);
		const executor = createJsonAgent(model, toolkit);
		const result = await executor.call({ input });

		console.log(
			`Got intermediate steps ${JSON.stringify(
				result.intermediateSteps,
				null,
				2
			)}`
		);

		return result.output;
	}
}

export { AnalyzeCompetitionByYearUseCase };
