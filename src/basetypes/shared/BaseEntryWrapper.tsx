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
import { useFileStore } from '@/state/useFileStore';

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
  const showBits = useFileStore((state) => state.bitsShown);
  const showTitle = useFileStore((state) => state.titleShown);

  return (
    <CardWrapper className={`foreground grid ${showTitle ? 'grid-cols-[5rem_1fr]' : 'grid-cols-[1fr]'} gap-2 relative`}>
      {showTitle ? <span className="text-right">type</span> : null}
      <span className="flex flex-row gap-1 justify-between">
        <select value={d.type} onChange={(e) => onMutateType(e.target.value as DataType | ComplexDataType)}>
          {[...Object.values(DataTypeValues), ...Object.values(ComplexDataValues)].map((type, i) => (
            <option key={i} value={type as string} children={type} />
          ))}
        </select>
        <input value={d.name} onChange={(e) => onMutate({ ...d, name: e.target.value } as any as DataEntry)} />
        <button onClick={onRemove}>-</button>
      </span>
      {showTitle ? <span className="text-right font-bold">value</span> : null}
      {children}
      {showBits ? (
        <>
          {ComplexDataValues.includes(d.type as ComplexDataType) ? (
            <>
              {showTitle ? <span className="text-right">state bits</span> : null}
              <BitDataRenderer bitstring={complexDataStateStringifierWrapper(d as ComplexDataEntry)} />
              {showTitle ? <span className="text-right">data bits</span> : null}
              <BitDataRenderer bitstring={complexDataStringifierWrapper(d as ComplexDataEntry)} />
            </>
          ) : (
            <>
              {showTitle ? <span className="text-right">bits</span> : null}
              <BitDataRenderer bitstring={dataBitsStringifierWrapper(d as DataEntry)} />
            </>
          )}
        </>
      ) : null}
    </CardWrapper>
  );
};
