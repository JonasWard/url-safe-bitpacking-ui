import { VersionDataEntry } from 'url-safe-bitpacking';

export const VersionRenderer: React.FC<{ versionObject: VersionDataEntry }> = ({ versionObject }) => (
  <>
    <span className="text-right">value</span>
    <select value={versionObject.value}>
      {[...Array(2 ** versionObject.bits)].map((_, index) => (
        <option value={index}>{index}</option>
      ))}
    </select>
    <span className="text-right">bit count</span>
    <select value={versionObject.bits}>
      {[4, 6, 8, 10].map((v) => (
        <option value={v}>{v}</option>
      ))}
    </select>
  </>
);
