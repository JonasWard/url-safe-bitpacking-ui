import { EnumOptionsDataEntry, NestedData } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './shared/OptionsRenderer';
import { ComplexContentWrapper } from './shared/ComplexContentWrapper';

export const EnumOptionsRenderer: React.FC<{
  d: EnumOptionsDataEntry;
  onMutate: (d: EnumOptionsDataEntry) => void;
}> = ({ d, onMutate }) => (
  <ComplexContentWrapper
    descriptorContent={
      <OptionsRenderer
        d={d.descriptor as (NestedData | null)[]}
        setData={(e) => onMutate({ ...d, descriptor: e as EnumOptionsDataEntry['descriptor'] })}
      />
    }
    stateContent={
      <select
        className="small"
        value={d.state}
        onChange={(e) =>
          onMutate({ ...d, state: Number(e.target.value), value: d.descriptor[Number(e.target.value)] ?? [] })
        }
      >
        {d.descriptor.map((_, i) => (
          <option key={i} value={i} children={i} />
        ))}
      </select>
    }
  />
);
