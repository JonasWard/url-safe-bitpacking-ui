import { EnumArrayDataEntry } from 'url-safe-bitpacking';

import { OptionsSelector } from './OptionsSelector';
import { DescriptorFactory, getOptionsFromMaxAndMapping, EnumDataEntry, EnumOptionsType } from 'url-safe-bitpacking';

export const EnumArrayRenderer: React.FC<{
  d: EnumArrayDataEntry;
  onMutate: (d: EnumArrayDataEntry) => void;
}> = ({ d, onMutate }) => {
  const handleSetOptions = (options: EnumOptionsType) => {
    const newEnum = DescriptorFactory.ENUM_ARRAY(d.value, options, d.minCount, d.maxCount, d.name);
    onMutate(newEnum);
  };
  const handleSetValue = (value: number[]) =>
    onMutate(DescriptorFactory.ENUM_ARRAY(value, getOptionsFromMaxAndMapping(d), d.minCount, d.maxCount, d.name));

  return (
    <>
      <span className="text-right">value</span>
      <span className="flex flex-row gap-1">
        {d.value.map((v, i) => (
          <select
            key={i}
            value={v}
            onChange={(e) => handleSetValue([...d.value.slice(0, i), Number(e.target.value), ...d.value.slice(i + 1)])}
          >
            {[...Array(d.max + 1)].map((_, index) => (
              <option value={index}>{d.mapping[index] as string | number}</option>
            ))}
          </select>
        ))}
        <button onClick={() => handleSetValue([...d.value, 0])}>+</button>
        <button onClick={() => handleSetValue(d.value.slice(0, -1))}>-</button>
      </span>
      <OptionsSelector optionsObject={getOptionsFromMaxAndMapping(d)} setOptions={(v) => handleSetOptions(v)} />
    </>
  );
};
