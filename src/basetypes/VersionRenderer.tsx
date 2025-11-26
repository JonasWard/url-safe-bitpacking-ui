import { VersionDataEntry, VersionRangeType } from 'url-safe-bitpacking';

export const VersionRenderer: React.FC<{
  d: VersionDataEntry;
  onMutate: (d: VersionDataEntry) => void;
}> = ({ d, onMutate }) => (
  <>
    <span className="grid grid-cols-[1fr_auto_auto] gap-2">
      <select className="small" value={d.value} onChange={(e) => onMutate({ ...d, value: Number(e.target.value) })}>
        {[...Array(2 ** d.bits)].map((_, index) => (
          <option key={index} value={index} children={index} />
        ))}
      </select>
      <span className="text-right">bit count</span>
      <select
        className="small"
        value={d.bits}
        onChange={(e) => onMutate({ ...d, bits: Number(e.target.value) as VersionRangeType })}
      >
        {[4, 6, 8, 10].map((v, i) => (
          <option key={i} value={v} children={v} />
        ))}
      </select>
    </span>
  </>
);
