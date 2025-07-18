/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from 'inversify';
import { HistoryService, Operation } from '@flowgram.ai/history';
import { type WorkflowContentChangeEvent } from '@flowgram.ai/free-layout-core';
import { type PluginContext } from '@flowgram.ai/core';

import { type IHandler } from '../types';
import changes from '../changes';

@injectable()
export class ChangeContentHandler implements IHandler<WorkflowContentChangeEvent> {
  @inject(HistoryService)
  private _historyService: HistoryService;

  handle(event: WorkflowContentChangeEvent, ctx: PluginContext) {
    if (!this._historyService.undoRedoService.canPush()) {
      return;
    }

    const change = changes.find((c) => c.type === event.type);
    if (!change) {
      return;
    }
    const operation: Operation | undefined = change.toOperation(event, ctx);
    if (!operation) {
      return;
    }

    this._historyService.pushOperation(operation, { noApply: true });
  }
}
