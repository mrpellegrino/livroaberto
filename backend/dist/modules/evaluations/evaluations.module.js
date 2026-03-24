"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationsModule = void 0;
const common_1 = require("@nestjs/common");
const evaluations_controller_1 = require("./presentation/controllers/evaluations.controller");
const evaluation_repository_1 = require("./repositories/evaluation.repository");
const evaluations_usecases_1 = require("./use-cases/evaluations.usecases");
let EvaluationsModule = class EvaluationsModule {
};
exports.EvaluationsModule = EvaluationsModule;
exports.EvaluationsModule = EvaluationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [evaluations_controller_1.EvaluationsController],
        providers: [
            evaluation_repository_1.EvaluationRepository,
            evaluations_usecases_1.StartEvaluationSessionUseCase,
            evaluations_usecases_1.SendEvaluationMessageUseCase,
            evaluations_usecases_1.CompleteEvaluationSessionUseCase,
            evaluations_usecases_1.ListEvaluationResultsUseCase,
        ],
    })
], EvaluationsModule);
//# sourceMappingURL=evaluations.module.js.map