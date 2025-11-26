import { NestedDataBuilder } from '@/builder/NestedDataBuilder';
import { ArrayDataEntry } from 'url-safe-bitpacking/dist/types';
import { ComplexContentWrapper } from './shared/ComplexContentWrapper';

export const ArrayRenderer: React.FC<{ d: ArrayDataEntry; onMutate: (d: ArrayDataEntry) => void }> = ({ d, onMutate }) => (
  <ComplexContentWrapper
    descriptorContent={<NestedDataBuilder d={d.descriptor} setData={(descriptor) => onMutate({ ...d, descriptor })} />}
    stateContent={
      <span className="flex flex-row gap-1 justify-between">
        <input
          className="small w-33"
          type="number"
          placeholder="minCount"
          value={d.minCount}
          onChange={(e) => onMutate({ ...d, minCount: Math.round(Number(e.target.value)) })}
        />
        {'<'}
        <input
          className="small w-33"
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
        {'<'}
        <input
          className="small w-33"
          type="number"
          placeholder="maxCount"
          value={d.maxCount}
          onChange={(e) => onMutate({ ...d, maxCount: Math.round(Number(e.target.value)) })}
        />
      </span>
    }
  />
);
