import { useState } from 'react';

type EnumOptionsType = string | number | (string | number | object)[];

export const getOptionsFromMaxAndMapping = (v: {
  max: number;
  mapping: (string | number | object)[];
}): EnumOptionsType => {
  if (v.mapping.every((option) => typeof option === 'string' && option.length === 1)) return v.mapping.join('');
  if (Array.from({ length: v.max + 1 }, (_, i) => i).every((option, i) => option === v.mapping[i])) return v.max;

  return v.mapping;
};

const SubOption: React.FC<{
  option: string | number;
  setOption: (option: string | number | null) => void;
  onRemove?: () => void;
}> = ({ option, setOption, onRemove }) => {
  const [type, setType] = useState<'string' | 'number'>('string');
  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        checked={type === 'string'}
        onChange={(v) => setType(v.target.checked ? 'string' : 'number')}
      />
      <input
        type={type === 'string' ? 'text' : 'number'}
        value={type === 'string' ? option : Number(option) ?? 0}
        onChange={(e) => setOption(e.target.value)}
      />
      {onRemove ? <button onClick={onRemove}>Remove</button> : null}
    </div>
  );
};

export const OptionsSelector: React.FC<{
  optionsObject: EnumOptionsType;
  setOptions: (enumOptions: EnumOptionsType) => void;
}> = ({ optionsObject, setOptions }) => {
  const [isArray, setIsArray] = useState(Array.isArray(optionsObject));

  const toggleIsArray = (currentOptions: EnumOptionsType) => {
    const currentlyArray = Array.isArray(currentOptions);
    setIsArray(!currentlyArray);
    if (currentlyArray) {
      if (currentOptions.every((option) => typeof option === 'string' && option.length === 1))
        setOptions(currentOptions.join(''));
      else setOptions(currentOptions.length);
    } else {
      if (typeof currentOptions === 'string') setOptions([currentOptions.split('')]);
      else setOptions(new Array(currentOptions).fill(''));
    }
  };

  return (
    <>
      <span className="text-right">options</span>
      <span className="flex flex-row gap-2">
        <button onClick={() => toggleIsArray(optionsObject)}>Toggle Array</button>
        {isArray ? (
          (optionsObject as (string | number)[]).map((option, i) => (
            <SubOption
              key={i}
              option={option}
              setOption={(v) =>
                v === null
                  ? setOptions([
                      ...(optionsObject as (string | number)[]).slice(0, i),
                      ...(optionsObject as (string | number)[]).slice(i + 1)
                    ])
                  : setOptions([
                      ...(optionsObject as (string | number)[]).slice(0, i),
                      v,
                      ...(optionsObject as (string | number)[]).slice(i + 1)
                    ])
              }
              onRemove={() =>
                setOptions([
                  ...(optionsObject as (string | number)[]).slice(0, i),
                  ...(optionsObject as (string | number)[]).slice(i + 1)
                ])
              }
            />
          ))
        ) : (
          <SubOption option={optionsObject as string | number} setOption={(v) => setOptions(v === null ? 1 : v)} />
        )}
      </span>
    </>
  );
};
