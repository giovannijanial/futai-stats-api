import { Router, Request, Response } from "express";
import { AnalyzeCompetitionByYearController } from "../modules/analyzeCompetitionByYearUseCase/analyzeCompetitionByYearController";


const route = Router();
const analyzeCompetitionByYearController = new AnalyzeCompetitionByYearController();

route.get(
	"/analyze/:competitionId/:year/:team",
	analyzeCompetitionByYearController.handle
);

export { route }