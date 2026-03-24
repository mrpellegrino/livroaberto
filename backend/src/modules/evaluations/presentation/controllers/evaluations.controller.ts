import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CurrentUser } from '../../../../common/auth/current-user.decorator';
import type { JwtPayload } from '../../../../common/auth/jwt-payload.interface';
import { Permissions } from '../../../../common/authorization/permissions.decorator';
import {
  SendEvaluationMessageDto,
  StartEvaluationSessionDto,
} from '../../dtos/evaluation.dto';
import {
  CompleteEvaluationSessionUseCase,
  ListEvaluationResultsUseCase,
  SendEvaluationMessageUseCase,
  StartEvaluationSessionUseCase,
} from '../../use-cases/evaluations.usecases';

@Controller('evaluations')
export class EvaluationsController {
  constructor(
    private readonly startEvaluationSessionUseCase: StartEvaluationSessionUseCase,
    private readonly sendEvaluationMessageUseCase: SendEvaluationMessageUseCase,
    private readonly completeEvaluationSessionUseCase: CompleteEvaluationSessionUseCase,
    private readonly listEvaluationResultsUseCase: ListEvaluationResultsUseCase,
  ) {}

  @Post('sessions/start')
  @Permissions({ resource: 'evaluations', action: 'create' })
  startSession(
    @Body() body: StartEvaluationSessionDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.startEvaluationSessionUseCase.execute(body, user);
  }

  @Post('sessions/:id/messages')
  @Permissions({ resource: 'evaluations', action: 'update' })
  sendMessage(@Param('id') sessionId: string, @Body() body: SendEvaluationMessageDto) {
    return this.sendEvaluationMessageUseCase.execute(sessionId, body);
  }

  @Post('sessions/:id/complete')
  @Permissions({ resource: 'evaluations', action: 'update' })
  completeSession(@Param('id') sessionId: string, @CurrentUser() user: JwtPayload) {
    return this.completeEvaluationSessionUseCase.execute(sessionId, user.sub);
  }

  @Get('results')
  @Permissions({ resource: 'evaluations', action: 'read' })
  listResults(@Query('activityId') activityId?: string) {
    return this.listEvaluationResultsUseCase.execute(activityId);
  }
}
