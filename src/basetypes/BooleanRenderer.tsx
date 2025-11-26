import { BooleanDataEntry } from 'url-safe-bitpacking/dist/types';

export const BooleanRenderer: React.FC<{
  d: BooleanDataEntry;
  onMutate: (d: BooleanDataEntry) => void;
}> = ({ d, onMutate }) => <input checked={d.value} onChange={(e) => onMutate({ ...d, value: e.target.checked })} />;
