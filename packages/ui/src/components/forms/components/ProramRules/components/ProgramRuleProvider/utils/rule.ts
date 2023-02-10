import {ProgramRuleExecutionVariables, ProgramRuleOptions, Rule} from '../../../interfaces';
import {executeCondition} from '../../../utils/programRules/utils';
import {compact, flatten, map} from 'lodash';
import {getAction, RunnableAction} from './actions';

export const evaluateRule = function (
    rule: Rule,
    triggerValues: Record<string, any>,
    {
        variableValues,
        options,
    }: { variableValues: ProgramRuleExecutionVariables; options: ProgramRuleOptions }
): RunnableAction[] {
    try {
        const shouldRunActions = executeCondition(rule.condition, {
            triggers: rule.triggers,
            triggerValues,
            options,
            variables: variableValues,
        });
        const actionOptions = {
            triggerValues,
            triggers: rule.triggers,
            options,
            variableValues,
        };

        return flatten(
            compact(
                map(rule.actions, (action) =>
                    getAction(shouldRunActions, action, actionOptions)
                )
            )
        );
    } catch (e) {
        console.error(`Error evaluating rule ${rule.id}: ${e}`);
        return [];
    }
};

export function evaluateRules(
    rules: Rule[],
    triggerValues: Record<string, any>,
    {
        variableValues,
        options,
    }: { variableValues: ProgramRuleExecutionVariables; options: ProgramRuleOptions }
): RunnableAction[] {
    return flatten(
        map(rules, (rule) => evaluateRule(rule, triggerValues, { variableValues, options }))
    );
}
