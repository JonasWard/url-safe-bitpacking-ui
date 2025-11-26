import { FloatDataEntry, PrecisionRangeType } from 'url-safe-bitpacking/dist/types';

const getStep = (d: FloatDataEntry) => 10 ** -d.precision;

export const FloatRenderer: React.FC<{
  d: FloatDataEntry;
  onMutate: (d: FloatDataEntry) => void;
}> = ({ d, onMutate }) => (
  <>
    <span className="text-right font-bold">value</span>
    <span className="flex flex-row gap-1 justify-between">
      <input
        className="small w-27"
        type="number"
        value={d.min}
        onChange={(e) => onMutate({ ...d, min: Number(e.target.value) })}
      />
      {'<'}
      <input
        className="small w-27"
        type="number"
        value={d.value}
        step={getStep(d)}
        min={d.min}
        max={d.max}
        onChange={(e) => onMutate({ ...d, value: Number(e.target.value) })}
      />
      {'<'}
      <input
        className="small w-27"
        type="number"
        value={d.max}
        onChange={(e) => onMutate({ ...d, max: Number(e.target.value) })}
      />
      <select
        className="small"
        value={d.precision}
        onChange={(e) => onMutate({ ...d, precision: Number(e.target.value) as PrecisionRangeType })}
      >
        {Array.from({ length: 7 }, (_, i) => i - 3).map((precision, i) => (
          <option key={i} value={precision} children={10 ** -precision} />
        ))}
      </select>
    </span>
  </>
);
