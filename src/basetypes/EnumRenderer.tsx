import { EnumDataEntry } from 'url-safe-bitpacking/dist/types';

export const EnumRenderer: React.FC<{ enumObject: EnumDataEntry }> = ({ enumObject }) => (
  <>
    <span className="text-right">value</span>
    <select value={enumObject.value}>
      {[...Array(enumObject.max)].map((_, index) => (
        <option value={index}>{index}</option>
      ))}
    </select>
  </>
);
