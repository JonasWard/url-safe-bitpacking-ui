import { IntDataEntry } from 'url-safe-bitpacking/dist/types';

export const IntRenderer: React.FC<{ intObject: IntDataEntry }> = ({ intObject }) => (
  <>
    <span className="text-right">value</span>
    <input type="number" value={intObject.value} min={intObject.min} max={intObject.max} step={1} />
    <span className="text-right">min</span>
    <input type="number" value={intObject.min} />
    <span className="text-right">max</span>
    <input type="number" value={intObject.max} />
  </>
);
