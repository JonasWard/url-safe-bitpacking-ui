import { BooleanDataEntry } from 'url-safe-bitpacking/dist/types';

export const BooleanRenderer: React.FC<{ booleanObject: BooleanDataEntry }> = ({ booleanObject }) => (
  <>
    <span className="text-right">value</span>
    <input checked={booleanObject.value} />
  </>
);
