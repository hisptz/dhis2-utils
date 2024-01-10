import { DateTime } from "luxon";
import { find } from "lodash";
import { BuiltInVariable, BuiltInVariableValueOptions } from "../interfaces";

export {};
export const builtInVariables: BuiltInVariable[] = [
	{
		id: "eventDate",
		value: (value) => value?.event?.eventDate,
		key: "event_date",
	},
	{
		id: "currentDate",
		value: () => DateTime.now().startOf("day").toFormat("yyyy-MM-dd"),
		key: "current_date",
	},
	{
		id: "enrollmentDate",
		value: ({ trackedEntityInstance }) =>
			trackedEntityInstance?.enrollments?.[0]?.enrollmentDate,
		key: "enrollment_date",
	},
	{
		id: "event",
		value: (value) => value.event,
		key: "event_id",
	},
	{
		id: "eventCount",
		key: "event_count",
		value: ({
			trackedEntityInstance,
			program,
		}: BuiltInVariableValueOptions): number => {
			const enrollment = find(trackedEntityInstance?.enrollments, [
				"program",
				program?.id,
			]);
			if (enrollment) {
				return enrollment.events?.length ?? 0;
			}
			return 0;
		},
	},
];
