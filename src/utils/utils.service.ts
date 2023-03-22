import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  formatedPayloadSubprocess(arrayProcess: any): any[] {
    return arrayProcess.map((subprocess) => {
      const { tasks, ...rest } = subprocess;
      const payloadTask = tasks.map((task) => {
        const { users, ...rest } = task;
        const connect = users.map((userId) => userId);

        return { ...rest, users: { connect } };
      });
      return { ...rest, tasks: { create: payloadTask } };
    });
  }

  formatedPayloadTask(arrayTask) {
    return arrayTask.map((task) => {
      const { users, ...rest } = task;
      const connect = users.map((userId) => userId);

      return { ...rest, users: { connect } };
    });
  }
}
