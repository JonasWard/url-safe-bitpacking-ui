import { DoubleLevelContentType } from 'url-safe-bitpacking';
import {
  ArrayEntryDataType,
  EnumEntryDataType,
  NestedContentDataType,
  OptionalEntryDataType
} from 'url-safe-bitpacking';
import { BaseDataModelWrapper } from './BaseDataModelWrapper';
import { NestedRenderer } from './NestedRenderer';

const NestedContentRenderer: React.FC<{ d: NestedContentDataType }> = ({ d }) => {
  const [name, nestedContent] = d;
  return (
    <BaseDataModelWrapper>
      <span>{name}</span>
      <NestedRenderer d={nestedContent} />
    </BaseDataModelWrapper>
  );
};

const ArrayRenderer: React.FC<{ d: ArrayEntryDataType }> = ({ d }) => {
  return null;
};

const EnumRenderer: React.FC<{ d: EnumEntryDataType }> = ({ d }) => {
  return null;
};

const OptionalRenderer: React.FC<{ d: OptionalEntryDataType }> = ({ d }) => {
  return null;
};

export const DoubleLevelRenderer: React.FC<{ d: DoubleLevelContentType }> = ({ d }) => {
  // @ts-ignore
  const isOptional = doubleLevelContentTypeIsOptionalEntryDataType(d);
  // @ts-ignore
  const isArray = doubleLevelContentTypeIsArrayDefinitionType(d);
  // @ts-ignore
  const isEnum = doubleLevelContentTypeIsEnumEntryDataType(d);

  if (isOptional) return <OptionalRenderer d={d as OptionalEntryDataType} />;
  if (isArray) return <ArrayRenderer d={d as ArrayEntryDataType} />;
  if (isEnum) return <EnumRenderer d={d as EnumEntryDataType} />;
};
