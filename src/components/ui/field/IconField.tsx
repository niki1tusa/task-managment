// IconField.tsx
'use client';

import clsx from 'clsx';
import type { FieldValues, PathValue } from 'react-hook-form';
import { ICON_NAMES, MODAL_ICON, type IconName } from '@/shared/data/icon.data';
import type { IIconField } from '../form/form.types';

export function IconField<T extends FieldValues>({ setValue, watch, fieldName }: IIconField<T>) {
  const current = watch(fieldName) as unknown as IconName | string | undefined;

  const handlePick = (name: IconName) => {
    // привести к типу значения по пути (PathValue<T, typeof fieldName>)
    setValue(fieldName, name as PathValue<T, typeof fieldName>, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="mb-5 flex items-center gap-2">
      <label className="text-sm font-medium 2xl:text-lg">Icon:</label>
      <div className="flex gap-3">
        {ICON_NAMES.map((name) => {
          const Icon = MODAL_ICON[name];
          return (
            <button
              key={name}
              type="button"
              onClick={() => handlePick(name)}
              className={clsx(
                'bg-primary hover:bg-primary/50 rounded-sm p-2 text-white transition-all',
                { 'shadow-lg ring-2 shadow-indigo-400/40 ring-indigo-500 ring-offset-2': current === name }
              )}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

