import { Module } from '@nestjs/common';
import { EvaluationsController } from './presentation/controllers/evaluations.controller';
import { EvaluationRepository } from './repositories/evaluation.repository';
import {
  CompleteEvaluationSessionUseCase,
  ListEvaluationResultsUseCase,
  SendEvaluationMessageUseCase,
  StartEvaluationSessionUseCase,
} from './use-cases/evaluations.usecases';

@Module({
  controllers: [EvaluationsController],
  providers: [
    EvaluationRepository,
    StartEvaluationSessionUseCase,
    SendEvaluationMessageUseCase,
    CompleteEvaluationSessionUseCase,
    ListEvaluationResultsUseCase,
  ],
})
export class EvaluationsModule {}
