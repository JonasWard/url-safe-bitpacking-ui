import { CardWrapper } from '@/basetypes/shared/CardWrapper';
import { getDefaultNameForType } from '@/utils/defaults';
import { useEffect, useState } from 'react';
import { DataType, ComplexDataType, DataTypeValues, ComplexDataValues } from 'url-safe-bitpacking';
import { isNameValid } from '@/utils/defaults';

const defaultType: DataType | ComplexDataType = 'INT';

export const AddDataEntry: React.FC<{
  add: (t: DataType | ComplexDataType, name: string) => void;
  otherNames: string[];
}> = ({ add, otherNames }) => {
  const [name, setName] = useState(getDefaultNameForType(defaultType, otherNames));
  const [type, setType] = useState<DataType | ComplexDataType>(defaultType);
  const handleNameChange = (t: string | null) => setName(t ?? '');

  const handleTypeChange = (t: DataType | ComplexDataType) => {
    setType(t);
    setName(getDefaultNameForType(t, otherNames));
  };

  const handleAdd = () => {
    if (!isNameValid(name, otherNames)) return;
    add(type, name);
    setName(getDefaultNameForType(type, [...otherNames, name]));
  };

  useEffect(() => {
    setName(getDefaultNameForType(type, otherNames));
  }, [type, otherNames]);

  return (
    <CardWrapper className="foreground grid grid-cols-[1fr_auto_auto] gap-2 justify-between">
      <input
        type="text"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
        className={isNameValid(name, otherNames) ? undefined : 'invalid'}
      />
      <select value={type} onChange={(e) => handleTypeChange(e.target.value as DataType | ComplexDataType)}>
        {[...Object.values(DataTypeValues), ...Object.values(ComplexDataValues)].map((t, i) => (
          <option key={i} value={t} children={t} />
        ))}
      </select>
      <button onClick={handleAdd}>+ Add</button>
    </CardWrapper>
  );
};
