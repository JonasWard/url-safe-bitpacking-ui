import { DataEntryRenderer } from '@/basetypes/DataEntryRenderer';
import { getDefaultDescriptorForType } from '@/utils/defaults';
import { ComplexDataEntry, ComplexDataType, DataEntry, DataType, NestedData } from 'url-safe-bitpacking';
import { AddDataEntry } from './AddDataEntry';
import { getValidatedUpdatedType } from '@/utils/handleUpdate';

export const NestedDataBuilder: React.FC<{ d: NestedData; setData: (d: NestedData) => void; disabled?: boolean }> = ({
  d,
  setData,
  disabled = false
}) => {
  const onAdd = (t: DataType | ComplexDataType, name: string) => setData([...d, getDefaultDescriptorForType(t, name)]);
  const onRemove = (i: number) => setData([...d.slice(0, i), ...d.slice(i + 1)]);
  const onMutateType = (i: number, t: DataType | ComplexDataType) =>
    setData([...d.slice(0, i), getDefaultDescriptorForType(t, d[i].name), ...d.slice(i + 1)]);
  const onChange = (i: number, e: DataEntry | ComplexDataEntry) =>
    setData([...d.slice(0, i), getValidatedUpdatedType(e), ...d.slice(i + 1)]);

  return (
    <div className="background flex flex-col gap-2 border-2 p-2">
      {d.map((d, i) => (
        <DataEntryRenderer
          key={i}
          d={d}
          onMutate={(e) => onChange(i, e)}
          onMutateType={(t) => onMutateType(i, t)}
          onRemove={() => onRemove(i)}
        />
      ))}
      <AddDataEntry key="add-data-entry" add={onAdd} otherNames={d.map((d) => d.name)} disabled={disabled} />
    </div>
  );
};
