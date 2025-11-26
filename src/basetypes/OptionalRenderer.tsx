import { NestedData, OptionalDataEntry } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './shared/OptionsRenderer';
import { ComplexContentWrapper } from './shared/ComplexContentWrapper';

export const OptionalRenderer: React.FC<{ d: OptionalDataEntry; onMutate: (d: OptionalDataEntry) => void }> = ({
  d,
  onMutate
}) => (
  <ComplexContentWrapper
    descriptorContent={
      <OptionsRenderer
        d={d.descriptor as (NestedData | null)[]}
        setData={(e) => onMutate({ ...d, descriptor: e as OptionalDataEntry['descriptor'] })}
        disableEditAmount
      />
    }
    stateContent={
      <select
        className="small"
        value={String(d.state)}
        onChange={(e) => onMutate({ ...d, state: e.target.value === 'true' })}
        children={['true', 'false'].map((v, i) => (
          <option key={i} value={v} children={v} />
        ))}
      />
    }
  />
);
