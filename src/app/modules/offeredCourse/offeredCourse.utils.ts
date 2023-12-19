import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schldule of assignedSchedules) {
    const existingStartTime = new Date(`2005-03-02T${schldule.startTime}`);
    const existingEndTime = new Date(`2005-03-02T${schldule.endTime}`);
    const newStartTime = new Date(`2005-03-02T${newSchedule.startTime}`);
    const newEndTime = new Date(`2005-03-02T${newSchedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
