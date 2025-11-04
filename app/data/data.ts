import { Constants } from "~/types/database.types";
const Enums = Constants['public']['Enums'];

export const role_options = Enums['club_role'].map(o => ({text: o, value: o}));

export const hierarchy_options = Enums['hierarchy'];

export const attendance_options = Enums['attendance_status'];

export const grade_options = Enums['grade'].map(o => ({text: o, value: o}));

export const event_recurrence_options = Enums['event_recurrence'];