import { JsonToolkit, createJsonAgent } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";

import { JsonSpec, JsonListKeysTool } from "langchain/tools";
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
    const input = `Know some relevant statistics of a football league and extract some of them from the data of the teams in that league`;

		try {
			console.log('analyze starting...');
			
			const toolkit = new JsonToolkit(
				new JsonSpec(competitionStatsRequesterResponse.data[0].TeamSeasons)
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

			return { status: 200, data: result.output }
		} catch (error) {
			console.log("error: ", error);
			return { status: 400, data: "error" };
		}
		
	}
}

export { AnalyzeCompetitionByYearUseCase };
