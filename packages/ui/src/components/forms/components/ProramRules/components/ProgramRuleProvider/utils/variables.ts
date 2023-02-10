import type {Event} from '@hisptz/dhis2-utils';
import {filter, find, head, last, sortBy} from 'lodash';
import {MetaValues} from '../../../interfaces';

export function getPreviousEvent(meta: MetaValues): Event | undefined {
    const { event, trackedEntityInstance, program } = meta;
    const enrollment = find(trackedEntityInstance?.enrollments, ['program', program.id]);
    if (!enrollment) {
        return undefined;
    }

    const sortedEvents = sortBy(
        filter(enrollment.events, (e) => e.event !== event?.event),
        ['created', 'eventDate']
    );

    return last(
        sortedEvents.filter(
            (e) =>
                new Date(e.eventDate) < new Date(event?.created) ||
                new Date(e?.eventDate) < new Date(event?.eventDate ?? '')
        )
    );
}

export function getNewestProgramStageEvent({
    trackedEntityInstance,
    program,
    programStage,
}: MetaValues): Event | undefined {
    const enrollment = trackedEntityInstance?.enrollments?.find(
        (enrollment) => enrollment?.program === program.id
    );
    const programStageEvents = enrollment?.events?.filter(
        (event) => programStage === event?.programStage
    );
    const sortedEvents = sortBy(
        programStageEvents,
        (event: Event) => new Date(event?.eventDate)
    );
    return head(sortedEvents);
}

export function getNewestProgramEvent(metaValues: MetaValues): Event | undefined {
    const enrollment = metaValues.trackedEntityInstance?.enrollments?.find(
        (enrollment) => enrollment?.program === metaValues.program.id
    );
    const sortedEvents = sortBy(
        enrollment?.events,
        (eventDate: Event) => new Date(eventDate?.eventDate)
    );
    return head(sortedEvents);
}
