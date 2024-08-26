import {Sprint} from '../../api/project'
export const RoleProjectUser = {
    ADMIN: "ADMIN",
    EDIT: "EDIT", 
    VIEWER: "VIEWER"
}

export const TaskStatus = {
    TODO: "TODO", 
    IN_PROGRESS: "IN_PROGRESS", 
    READY_FOR_TEST: "READY_FOR_TEST", 
    DONE: "DONE"
}

export const SprintStatus = {
    TODO: "TODO",
    START: "START",
    COMPLETE: "COMPLETE"
}

export const UserActionStatus = {
    LOGGED_ACCEPTED: "LOGGED_ACCEPTED", 
    ACCEPTED: "ACCEPTED", 
    UNREGISTERED: "UNREGISTERED"
}
const statusOrder: { [key: string]: number } = {
    [SprintStatus.COMPLETE]: 0,
    [SprintStatus.START]: 1,
    [SprintStatus.TODO]: 2
};

export function sortSprints(sprints: Sprint[]): Sprint[] {
    return sprints.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}