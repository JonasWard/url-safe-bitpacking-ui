import { FloatDataEntry } from 'url-safe-bitpacking/dist/types';

const getStep = (floatObject: FloatDataEntry) => 10 ** -floatObject.precision;

export const FloatRenderer: React.FC<{ floatObject: FloatDataEntry }> = ({ floatObject }) => (
  <>
    <span className="text-right">value</span>
    <input
      type="number"
      value={floatObject.value}
      step={getStep(floatObject)}
      min={floatObject.min}
      max={floatObject.max}
    />
    <span className="text-right">min</span>
    <input type="number" value={floatObject.min} />
    <span className="text-right">max</span>
    <input type="number" value={floatObject.max} />
    <span className="text-right">precision</span>
    <select value={floatObject.precision}>
      {Array.from({ length: 7 }, (_, i) => i - 3).map((precision) => (
        <option value={precision}>{10 ** -floatObject.precision}</option>
      ))}
    </select>
  </>
);
