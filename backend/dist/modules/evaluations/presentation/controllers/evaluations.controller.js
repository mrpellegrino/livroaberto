"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../../../common/auth/current-user.decorator");
const permissions_decorator_1 = require("../../../../common/authorization/permissions.decorator");
const evaluation_dto_1 = require("../../dtos/evaluation.dto");
const evaluations_usecases_1 = require("../../use-cases/evaluations.usecases");
let EvaluationsController = class EvaluationsController {
    startEvaluationSessionUseCase;
    sendEvaluationMessageUseCase;
    completeEvaluationSessionUseCase;
    listEvaluationResultsUseCase;
    constructor(startEvaluationSessionUseCase, sendEvaluationMessageUseCase, completeEvaluationSessionUseCase, listEvaluationResultsUseCase) {
        this.startEvaluationSessionUseCase = startEvaluationSessionUseCase;
        this.sendEvaluationMessageUseCase = sendEvaluationMessageUseCase;
        this.completeEvaluationSessionUseCase = completeEvaluationSessionUseCase;
        this.listEvaluationResultsUseCase = listEvaluationResultsUseCase;
    }
    startSession(body, user) {
        return this.startEvaluationSessionUseCase.execute(body, user);
    }
    sendMessage(sessionId, body) {
        return this.sendEvaluationMessageUseCase.execute(sessionId, body);
    }
    completeSession(sessionId, user) {
        return this.completeEvaluationSessionUseCase.execute(sessionId, user.sub);
    }
    listResults(activityId) {
        return this.listEvaluationResultsUseCase.execute(activityId);
    }
};
exports.EvaluationsController = EvaluationsController;
__decorate([
    (0, common_1.Post)('sessions/start'),
    (0, permissions_decorator_1.Permissions)({ resource: 'evaluations', action: 'create' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [evaluation_dto_1.StartEvaluationSessionDto, Object]),
    __metadata("design:returntype", void 0)
], EvaluationsController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)('sessions/:id/messages'),
    (0, permissions_decorator_1.Permissions)({ resource: 'evaluations', action: 'update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, evaluation_dto_1.SendEvaluationMessageDto]),
    __metadata("design:returntype", void 0)
], EvaluationsController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('sessions/:id/complete'),
    (0, permissions_decorator_1.Permissions)({ resource: 'evaluations', action: 'update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EvaluationsController.prototype, "completeSession", null);
__decorate([
    (0, common_1.Get)('results'),
    (0, permissions_decorator_1.Permissions)({ resource: 'evaluations', action: 'read' }),
    __param(0, (0, common_1.Query)('activityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvaluationsController.prototype, "listResults", null);
exports.EvaluationsController = EvaluationsController = __decorate([
    (0, common_1.Controller)('evaluations'),
    __metadata("design:paramtypes", [evaluations_usecases_1.StartEvaluationSessionUseCase,
        evaluations_usecases_1.SendEvaluationMessageUseCase,
        evaluations_usecases_1.CompleteEvaluationSessionUseCase,
        evaluations_usecases_1.ListEvaluationResultsUseCase])
], EvaluationsController);
//# sourceMappingURL=evaluations.controller.js.map