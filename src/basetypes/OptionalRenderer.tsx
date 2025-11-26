import { NestedData, OptionalDataEntry } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './shared/OptionsRenderer';
import { ComplexContentWrapper } from './shared/ComplexContentWrapper';
import { getDefaultDescriptorForType } from '@/utils/defaults';

const descriptorParsing = (d: (NestedData | null)[]): OptionalDataEntry['descriptor'] =>
  d[0] && d[0].length > 0 ? [d[0], null] : [null, d[1] ?? [getDefaultDescriptorForType('INT', 'an int')]];

const getDisabledMask = (d: OptionalDataEntry): boolean[] =>
  d.descriptor[0] && d.descriptor[0].length > 0 ? [false, true] : [true, false];

export const OptionalRenderer: React.FC<{ d: OptionalDataEntry; onMutate: (d: OptionalDataEntry) => void }> = ({
  d,
  onMutate
}) => (
  <ComplexContentWrapper
    descriptorContent={
      <OptionsRenderer
        d={d.descriptor as (NestedData | null)[]}
        setData={(e) => onMutate({ ...d, descriptor: descriptorParsing(e) })}
        disableEditAmount
        disabledMask={getDisabledMask(d)}
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
