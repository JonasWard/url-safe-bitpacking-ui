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

const complexDataStateStringifierWrapper = (d: ComplexDataEntry) => {
  try {
    return complexDataStateStringifier(d);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const complexDataStringifierWrapper = (d: ComplexDataEntry) => {
  try {
    return complexDataStringifier(d);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const dataBitsStringifierWrapper = (d: DataEntry) => {
  try {
    return dataBitsStringifier(d);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

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
            <BitDataRenderer bitstring={complexDataStateStringifierWrapper(d as ComplexDataEntry)} />
            <span className="text-right">data bits</span>
            <BitDataRenderer bitstring={complexDataStringifierWrapper(d as ComplexDataEntry)} />
          </>
        ) : (
          <>
            <span className="text-right">bits</span>
            <BitDataRenderer bitstring={dataBitsStringifierWrapper(d as DataEntry)} />
          </>
        )}
      </>
    </CardWrapper>
  );
};
