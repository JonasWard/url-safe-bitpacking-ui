import { NestedData, OptionalDataEntry } from 'url-safe-bitpacking/dist/types';
import { OptionsRenderer } from './shared/OptionsRenderer';
import { ComplexContentWrapper } from './shared/ComplexContentWrapper';

const getValidStates = (d: OptionalDataEntry['descriptor']): [boolean, boolean] => [
  !Boolean(d[0] && d[0].length > 0),
  !Boolean(d[1] && d[1].length > 0)
];

const descriptorParsing = (
  current: OptionalDataEntry['descriptor'],
  d: (NestedData | null)[]
): OptionalDataEntry['descriptor'] => {
  const [c0, c1] = getValidStates(current);
  const [n0, n1] = getValidStates(d as OptionalDataEntry['descriptor']);

  if (n0 !== n1) return [n0 ? null : d[0], n1 ? null : d[1]] as OptionalDataEntry['descriptor'];
  if (n0 === true) return [c0 ? current[1] : null, c1 ? current[0] : null] as OptionalDataEntry['descriptor'];
  // if (n0 === false)
  return [c0 ? null : current[0], c1 ? null : current[1]] as OptionalDataEntry['descriptor'];
};

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
        setData={(e) => onMutate({ ...d, descriptor: descriptorParsing(d.descriptor, e) })}
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
