import { NestedContentType, DoubleLevelContentType } from 'url-safe-bitpacking';
import { BaseDataModelWrapper } from './BaseDataModelWrapper';
import { DoubleLevelRenderer } from './DoubleLevelContent';
import { isDoubleLevelContentType } from 'url-safe-bitpacking';

export const NestedRenderer: React.FC<{ d: NestedContentType }> = ({ d }) => {
  // @ts-ignore
  const isDoubleLeveContentType = isDoubleLevelContentType(d);

  return isDoubleLeveContentType ? (
    <DoubleLevelRenderer d={d as DoubleLevelContentType} />
  ) : (
    <BaseDataModelWrapper>
      {d.map((d, index) => (
        <NestedRenderer d={d as NestedContentType} key={index} />
      ))}
    </BaseDataModelWrapper>
  );
};
