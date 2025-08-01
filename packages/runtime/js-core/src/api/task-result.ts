/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { TaskResultInput, TaskResultOutput } from '@flowgram.ai/runtime-interface';

import { WorkflowApplication } from '@application/workflow';

export const TaskResultAPI = async (input: TaskResultInput): Promise<TaskResultOutput> => {
  const app = WorkflowApplication.instance;
  const { taskID } = input;
  const output: TaskResultOutput = app.result(taskID);
  return output;
};
