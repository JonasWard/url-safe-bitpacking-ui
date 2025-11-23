import { useState } from 'react';
import { EnumOptionsDataEntry, NestedData } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './OptionsRenderer';

export const EnumOptionsRenderer: React.FC<{
  d: EnumOptionsDataEntry;
  onMutate: (d: EnumOptionsDataEntry) => void;
}> = ({ d, onMutate }) => {
  const [showDescriptor, setShowDescriptor] = useState(false);

  return (
    <>
      <>
        <span className="text-right">descriptor</span>
        {showDescriptor ? (
          <div>
            <button onClick={() => setShowDescriptor(false)}>hide descriptor</button>
            <OptionsRenderer
              d={d.descriptor as (NestedData | null)[]}
              setData={(e) => onMutate({ ...d, descriptor: e as EnumOptionsDataEntry['descriptor'] })}
            />
          </div>
        ) : (
          <button onClick={() => setShowDescriptor(true)}>show descriptor</button>
        )}
      </>
      <span className="text-right">state</span>
      <select
        value={d.state}
        onChange={(e) =>
          onMutate({ ...d, state: Number(e.target.value), value: d.descriptor[Number(e.target.value)] ?? [] })
        }
      >
        {d.descriptor.map((_, i) => (
          <option value={i}>{i}</option>
        ))}
      </select>
    </>
  );
};
