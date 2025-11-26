import { NestedDataBuilder } from '@/builder/NestedDataBuilder';
import { NestedData } from 'url-safe-bitpacking';

export const OptionsRenderer: React.FC<{
  d: (NestedData | null)[];
  setData: (newValue: (NestedData | null)[]) => void;
  disableEditAmount?: boolean;
  disabledMask?: boolean[];
}> = ({ d, setData, disableEditAmount = false, disabledMask = [] }) => {
  return (
    <div className="flex flex-col gap-2">
      {d.map((subd, i) => (
        <NestedDataBuilder
          key={i}
          d={subd ?? []}
          setData={(e) => setData([...d.slice(0, i), e.length === 0 ? null : e, ...d.slice(i + 1)])}
          disabled={disabledMask?.[i] ?? false}
        />
      ))}
      {!disableEditAmount ? (
        <span className="flex flex-row gap-2">
          <button onClick={() => setData([...d, null])}>+</button>
          <button onClick={() => setData(d.slice(0, -1))}>-</button>
        </span>
      ) : null}
    </div>
  );
};
