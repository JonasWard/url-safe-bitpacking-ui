import { DataEntryRenderer } from '@/basetypes/DataEntryRenderer';
import { CardWrapper } from '@/styling/CardWrapper';
import { getDefaultDescriptorForType } from '@/utils/defaults';
import { useState } from 'react';
import {
  ComplexDataEntry,
  ComplexDataType,
  ComplexDataValues,
  DataEntry,
  DataType,
  DataTypeValues,
  NestedData
} from 'url-safe-bitpacking';

const AddDataEntry: React.FC<{ add: (t: DataType | ComplexDataType, name: string) => void }> = ({ add }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<DataType | ComplexDataType>('INT');

  const handleAdd = () => {
    add(type, name);
    setName('');
    setType('ENUM');
  };

  return (
    <CardWrapper className="flex flex-row gap-2 items-center">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value as DataType | ComplexDataType)}>
        {[...Object.values(DataTypeValues), ...Object.values(ComplexDataValues)].map((t) => (
          <option value={t}>{t}</option>
        ))}
      </select>
      <button onClick={handleAdd}>+ Add</button>
    </CardWrapper>
  );
};

export const NestedDataBuilder: React.FC<{ d: NestedData; setData: (d: NestedData) => void }> = ({ d, setData }) => {
  const onAdd = (t: DataType | ComplexDataType, name: string) => setData([...d, getDefaultDescriptorForType(t, name)]);
  const onRemove = (i: number) => setData([...d.slice(0, i), ...d.slice(i + 1)]);
  const onMutateType = (i: number, t: DataType | ComplexDataType) =>
    setData([...d.slice(0, i), getDefaultDescriptorForType(t, d[i].name), ...d.slice(i + 1)]);
  const onChange = (i: number, e: DataEntry | ComplexDataEntry) => setData([...d.slice(0, i), e, ...d.slice(i + 1)]);

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-200 rounded-xl p-2 bg-[#dedede]">
      {d.map((d, i) => (
        <DataEntryRenderer
          key={i}
          d={d}
          onMutate={(e) => onChange(i, e)}
          onMutateType={(t) => onMutateType(i, t)}
          onRemove={() => onRemove(i)}
        />
      ))}
      <AddDataEntry add={onAdd} />
    </div>
  );
};
