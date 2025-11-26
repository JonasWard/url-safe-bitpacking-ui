import { OptionsSelector } from './shared/OptionsSelector';
import { DescriptorFactory, getOptionsFromMaxAndMapping, EnumDataEntry, EnumOptionsType } from 'url-safe-bitpacking';

export const EnumRenderer: React.FC<{
  d: EnumDataEntry;
  onMutate: (d: EnumDataEntry) => void;
}> = ({ d, onMutate }) => {
  const handleSetOptions = (options: EnumOptionsType) => {
    const newEnum = DescriptorFactory.ENUM(d.value, options, d.name);
    onMutate(newEnum);
  };
  const handleSetValue = (value: number) =>
    onMutate(DescriptorFactory.ENUM(value, getOptionsFromMaxAndMapping(d), d.name));

  return (
    <>
      <select value={d.value} onChange={(e) => handleSetValue(Number(e.target.value))}>
        {[...Array(d.max + 1)].map((_, index) => (
          <option key={index} value={index} children={d.mapping[index] as string | number} />
        ))}
      </select>
      <OptionsSelector optionsObject={getOptionsFromMaxAndMapping(d)} setOptions={(v) => handleSetOptions(v)} />
    </>
  );
};
