import { BooleanDataEntry } from 'url-safe-bitpacking/dist/types';

export const BooleanRenderer: React.FC<{
  d: BooleanDataEntry;
  onMutate: (d: BooleanDataEntry) => void;
}> = ({ d, onMutate }) => (
  <select
    className="small"
    value={String(d.value)}
    onChange={(e) => onMutate({ ...d, value: e.target.value === 'true' })}
    children={['true', 'false'].map((v, i) => (
      <option key={i} value={v} children={v} />
    ))}
  />
);
