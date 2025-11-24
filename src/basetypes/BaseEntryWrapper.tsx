import { CardWrapper } from '@/styling/CardWrapper';
import {
  ComplexDataEntry,
  complexDataStateStringifier,
  complexDataStringifier,
  ComplexDataType,
  ComplexDataValues,
  dataBitsStringifier,
  DataEntry,
  DataType,
  DataTypeValues
} from 'url-safe-bitpacking';

export const BaseEntryWrapper: React.FC<{
  children: React.ReactNode;
  d: DataEntry | ComplexDataEntry;
  onMutate: (dataEntry: DataEntry | ComplexDataEntry) => void;
  onMutateType: (t: DataType | ComplexDataType) => void;
  onRemove: () => void;
}> = ({ children, d, onMutate, onMutateType, onRemove }) => {
  return (
    <CardWrapper className="grid grid-cols-[4.5rem_1fr]">
      <span className="text-right">type</span>
      <span className="flex flex-row gap-2">
        <select value={d.type} onChange={(e) => onMutateType(e.target.value as DataType | ComplexDataType)}>
          {[...Object.values(DataTypeValues), ...Object.values(ComplexDataValues)].map((type) => (
            <option value={type as string}>{type}</option>
          ))}
        </select>
        <sub>{d.name}</sub>
      </span>
      <span className="text-right">name</span>
      <input value={d.name} onChange={(e) => onMutate({ ...d, name: e.target.value } as any as DataEntry)} />
      {children}

      <>
        <span className="text-right">bits</span>
        {ComplexDataValues.includes(d.type as ComplexDataType) ? (
          <span className="flex flex-col gap-2 px-1">
            <span className="grid grid-cols-[1fr_auto] gap-2">
              <p>{complexDataStateStringifier(d as ComplexDataEntry).length}</p>
              <p className="truncate max-w-[500px]">{complexDataStateStringifier(d as ComplexDataEntry)}</p>
            </span>
            <span className="grid grid-cols-[1fr_auto] gap-2">
              <p>{complexDataStringifier(d as ComplexDataEntry).length}</p>
              <p className="truncate max-w-[500px]">{complexDataStringifier(d as ComplexDataEntry)}</p>
            </span>
          </span>
        ) : (
          <span className="grid grid-cols-[1fr_auto] gap-2">
            <p>{dataBitsStringifier(d as DataEntry).length}</p>
            <p className="truncate max-w-[500px]">{dataBitsStringifier(d as DataEntry)}</p>
          </span>
        )}
      </>
    </CardWrapper>
  );
};
  