import { IntDataEntry } from 'url-safe-bitpacking/dist/types';

export const IntRenderer: React.FC<{ d: IntDataEntry; onMutate: (d: IntDataEntry) => void }> = ({ d, onMutate }) => (
  <>
    <span className="text-right">value</span>
    <input
      className="small"
      type="number"
      value={d.value}
      min={d.min}
      max={d.max}
      step={1}
      onChange={(e) => onMutate({ ...d, value: Number(e.target.value) })}
    />
    <span className="text-right">min</span>
    <input
      className="small"
      type="number"
      value={d.min}
      onChange={(e) => onMutate({ ...d, min: Number(e.target.value) })}
    />
    <span className="text-right">max</span>
    <input
      className="small"
      type="number"
      value={d.max}
      onChange={(e) => onMutate({ ...d, max: Number(e.target.value) })}
    />
  </>
);
