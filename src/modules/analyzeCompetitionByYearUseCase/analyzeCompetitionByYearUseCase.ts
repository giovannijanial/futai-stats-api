import { JsonToolkit, createJsonAgent } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";

import { JsonSpec } from "langchain/dist/tools/json";
import { competitionStatsRequester } from "../../utils";


class AnalyzeCompetitionByYearUseCase {
  async execute(competitionId: number, year: number) {  
    const competitionStatsRequesterResponse = await competitionStatsRequester(competitionId, year);

    if (competitionStatsRequesterResponse?.status !== 200) {
      return { status: 400, data: "error" }
    }

    const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
    const input =
			`Get to know some premier league relevant statistics, and extract some of them from this premier league statics data`;
    
    const toolkit = new JsonToolkit(
			new JsonSpec(competitionStatsRequesterResponse.data)
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

export { AnalyzeCompetitionByYearUseCase }
