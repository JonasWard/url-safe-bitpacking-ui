import { useState } from 'react';
import { NestedData, OptionalDataEntry } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './OptionsRenderer';

export const OptionalRenderer: React.FC<{ d: OptionalDataEntry; onMutate: (d: OptionalDataEntry) => void }> = ({
  d,
  onMutate
}) => {
  const [showDescriptor, setShowDescriptor] = useState(false);

  return (
    <>
      <>
        <span className="text-right">descriptor</span>
        {showDescriptor ? (
          <div className="justify-center flex flex-col gap-2">
            <button onClick={() => setShowDescriptor(false)}>hide descriptor</button>
            <OptionsRenderer
              d={d.descriptor as (NestedData | null)[]}
              setData={(e) => onMutate({ ...d, descriptor: e as OptionalDataEntry['descriptor'] })}
              disableEditAmount
            />
          </div>
        ) : (
          <button onClick={() => setShowDescriptor(true)}>show descriptor</button>
        )}
      </>
      <span className="text-right">state</span>
      <span>{JSON.stringify(d.state)}</span>
    </>
  );
};
