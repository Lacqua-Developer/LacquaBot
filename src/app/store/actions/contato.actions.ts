import { createAction, props } from '@ngrx/store';

export const AddContatoChat = createAction(
  '[AddContatoChat] Adiciona contato pelo chat',
  props<{IdContato: string }>()
);
