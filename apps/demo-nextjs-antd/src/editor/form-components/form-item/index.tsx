/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { TypeTag } from '../type-tag';

import './index.css';
import { Tooltip, Typography } from 'antd';

import React, { useCallback } from 'react';

const { Text } = Typography;

interface FormItemProps {
  children: React.ReactNode;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  labelWidth?: number;
}
export function FormItem({
  children,
  name,
  required,
  description,
  type,
  labelWidth,
}: FormItemProps): JSX.Element {
  const renderTitle = useCallback(
    (showTooltip?: boolean) => (
      <div style={{ width: '0', display: 'flex', flex: '1' }}>
        <Text style={{ width: '100%' }}>{name}</Text>
        {required && <span style={{ color: '#f93920', paddingLeft: '2px' }}>*</span>}
      </div>
    ),
    []
  );
  return (
    <div
      style={{
        fontSize: 12,
        marginBottom: 6,
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: labelWidth || 118,
          position: 'relative',
          display: 'flex',
          columnGap: 4,
          flexShrink: 0,
        }}
      >
        <TypeTag className="form-item-type-tag" type={type} />
        {description ? <Tooltip title={description}>{renderTitle()}</Tooltip> : renderTitle(true)}
      </div>

      <div
        style={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
