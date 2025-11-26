import { CardWrapper } from '@/basetypes/shared/CardWrapper';
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
import { BitDataRenderer } from './BitDataRenderer';

export const BaseEntryWrapper: React.FC<{
  children: React.ReactNode;
  d: DataEntry | ComplexDataEntry;
  onMutate: (dataEntry: DataEntry | ComplexDataEntry) => void;
  onMutateType: (t: DataType | ComplexDataType) => void;
  onRemove: () => void;
}> = ({ children, d, onMutate, onMutateType, onRemove }) => {
  return (
    <CardWrapper className="foreground grid grid-cols-[4.5rem_1fr] relative">
      <span className="text-right">type</span>
      <span className="flex flex-row gap-1 justify-between">
        <select value={d.type} onChange={(e) => onMutateType(e.target.value as DataType | ComplexDataType)}>
          {[...Object.values(DataTypeValues), ...Object.values(ComplexDataValues)].map((type, i) => (
            <option key={i} value={type as string} children={type} />
          ))}
        </select>
        <input value={d.name} onChange={(e) => onMutate({ ...d, name: e.target.value } as any as DataEntry)} />
        <button onClick={onRemove}>-</button>
      </span>
      {children}
      <>
        {ComplexDataValues.includes(d.type as ComplexDataType) ? (
          <>
            <span className="text-right">state bits</span>
            <BitDataRenderer bitstring={complexDataStateStringifier(d as ComplexDataEntry)} />
            <span className="text-right">data bits</span>
            <BitDataRenderer bitstring={complexDataStringifier(d as ComplexDataEntry)} />
          </>
        ) : (
          <>
            <span className="text-right">bits</span>
            <BitDataRenderer bitstring={dataBitsStringifier(d as DataEntry)} />
          </>
        )}
      </>
    </CardWrapper>
  );
};
