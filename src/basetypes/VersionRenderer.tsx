import { VersionDataEntry, VersionRangeType } from 'url-safe-bitpacking';

export const VersionRenderer: React.FC<{
  d: VersionDataEntry;
  onMutate: (d: VersionDataEntry) => void;
}> = ({ d, onMutate }) => (
  <>
    <span className="text-right">value</span>
    <select value={d.value} onChange={(e) => onMutate({ ...d, value: Number(e.target.value) })}>
      {[...Array(2 ** d.bits)].map((_, index) => (
        <option value={index}>{index}</option>
      ))}
    </select>
    <span className="text-right">bit count</span>
    <select value={d.bits} onChange={(e) => onMutate({ ...d, bits: Number(e.target.value) as VersionRangeType })}>
      {[4, 6, 8, 10].map((v) => (
        <option value={v}>{v}</option>
      ))}
    </select>
  </>
);
