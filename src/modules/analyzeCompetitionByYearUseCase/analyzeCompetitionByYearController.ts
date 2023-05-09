import { Request, Response } from "express";
import { AnalyzeCompetitionByYearUseCase } from "./analyzeCompetitionByYearUseCase";


class AnalyzeCompetitionByYearController {
	async handle(req: Request, res: Response) {
		const { competitionId, year, team } = req.params;



		const analyzeCompetitionByYearUseCase = new AnalyzeCompetitionByYearUseCase();

		const result = await analyzeCompetitionByYearUseCase.execute(
			+competitionId,
			+year,
			team
		);
		res.status(result.status).send(result.data);
	}
}

export { AnalyzeCompetitionByYearController };
