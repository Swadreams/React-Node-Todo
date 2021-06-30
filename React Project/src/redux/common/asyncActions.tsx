import { AnyAction, PayloadAction } from '@reduxjs/toolkit';

export const anyPendingAction = (
  action: AnyAction
): action is PayloadAction => {
  const { type } = action as PayloadAction;
  return !!type.endsWith('/pending');
};

export const anyFulfilledAction = (
  action: AnyAction
): action is PayloadAction => {
  const { type } = action as PayloadAction;
  return !!type.endsWith('/fulfilled');
};

export const anyLoadAction = (action: AnyAction): action is any => {
  const { type } = action as any;
  return !!type.endsWith('/PERSIST');
  // || !!type.endsWith('/REHYDRATE');
};
