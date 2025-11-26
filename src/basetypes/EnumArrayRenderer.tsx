import { EnumArrayDataEntry } from 'url-safe-bitpacking';

import { OptionsSelector } from './shared/OptionsSelector';
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
      <span className="flex flex-row gap-1">
        {d.value.map((v, i) => (
          <select
            className="small"
            key={i}
            value={v}
            onChange={(e) => handleSetValue([...d.value.slice(0, i), Number(e.target.value), ...d.value.slice(i + 1)])}
          >
            {[...Array(d.max + 1)].map((_, index) => (
              <option key={index} value={index} children={d.mapping[index] as string | number} />
            ))}
          </select>
        ))}
        <span className="flex flex-col gap-1">
          <button className="h-max-[1rem] p-[0] !important" onClick={() => handleSetValue([...d.value, 0])}>
            +
          </button>
          <button className="h-max-[1rem] p-[0]" onClick={() => handleSetValue(d.value.slice(0, -1))}>
            -
          </button>
        </span>
      </span>
      <OptionsSelector optionsObject={getOptionsFromMaxAndMapping(d)} setOptions={(v) => handleSetOptions(v)} />
    </>
  );
};
