import { NestedDataBuilder } from '@/builder/NestedDataBuilder';
import { useState } from 'react';
import { ArrayDataEntry } from 'url-safe-bitpacking/dist/types';

export const ArrayRenderer: React.FC<{ d: ArrayDataEntry; onMutate: (d: ArrayDataEntry) => void }> = ({
  d,
  onMutate
}) => {
  const [showDescriptor, setShowDescriptor] = useState(false);

  return (
    <>
      <span className="text-right">descriptor</span>
      {showDescriptor ? (
        <div>
          <button onClick={() => setShowDescriptor(false)}>hide descriptor</button>
          <NestedDataBuilder d={d.descriptor} setData={(descriptor) => onMutate({ ...d, descriptor })} />
        </div>
      ) : (
        <button onClick={() => setShowDescriptor(true)}>show descriptor</button>
      )}
      <span className="text-right">minCount</span>
      <input
        type="number"
        placeholder="minCount"
        value={d.minCount}
        onChange={(e) => onMutate({ ...d, minCount: Math.round(Number(e.target.value)) })}
      />
      <span className="text-right">maxCount</span>
      <input
        type="number"
        placeholder="maxCount"
        value={d.maxCount}
        onChange={(e) => onMutate({ ...d, maxCount: Math.round(Number(e.target.value)) })}
      />
      <span className="text-right">state</span>
      <input
        type="number"
        placeholder="value"
        min={d.minCount}
        max={d.maxCount}
        value={d.state}
        onChange={(e) =>
          onMutate({
            ...d,
            state: Math.round(Number(e.target.value)),
            value: [...Array(Math.round(Number(e.target.value)))].map(() => d.descriptor)
          })
        }
      />
    </>
  );
};
