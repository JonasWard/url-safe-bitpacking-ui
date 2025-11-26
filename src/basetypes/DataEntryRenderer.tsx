import { ComplexDataType, DataEntry, DataType } from 'url-safe-bitpacking';
import {
  ArrayDataEntry,
  BooleanDataEntry,
  ComplexDataEntry,
  EnumArrayDataEntry,
  EnumDataEntry,
  EnumOptionsDataEntry,
  FloatDataEntry,
  IntDataEntry,
  OptionalDataEntry,
  VersionDataEntry
} from 'url-safe-bitpacking/dist/types';
import { VersionRenderer } from './VersionRenderer';
import { BooleanRenderer } from './BooleanRenderer';
import { EnumRenderer } from './EnumRenderer';
import { BaseEntryWrapper } from './shared/BaseEntryWrapper';
import { FloatRenderer } from './FloatRenderer';
import { IntRenderer } from './IntRenderer';
import { EnumArrayRenderer } from './EnumArrayRenderer';
import { EnumOptionsRenderer } from './EnumOptionsRenderer';
import { ArrayRenderer } from './ArrayRenderer';
import { OptionalRenderer } from './OptionalRenderer';

type DataEntryRendererSplitterProps<T extends DataEntry | ComplexDataEntry> = {
  d: T;
  onMutate: (dataEntry: T) => void;
};

type DataEntryRendererProps = DataEntryRendererSplitterProps<DataEntry | ComplexDataEntry> & {
  onMutateType: (t: DataType | ComplexDataType) => void;
  onRemove: () => void;
};

const DataEntryRendererSplitter: React.FC<DataEntryRendererSplitterProps<DataEntry | ComplexDataEntry>> = (props) => {
  switch (props.d.type) {
    case 'VERSION':
      return <VersionRenderer {...(props as DataEntryRendererSplitterProps<VersionDataEntry>)} />;
    case 'BOOLEAN':
      return <BooleanRenderer {...(props as DataEntryRendererSplitterProps<BooleanDataEntry>)} />;
    case 'ENUM':
      return <EnumRenderer {...(props as DataEntryRendererSplitterProps<EnumDataEntry>)} />;
    case 'INT':
      return <IntRenderer {...(props as DataEntryRendererSplitterProps<IntDataEntry>)} />;
    case 'FLOAT':
      return <FloatRenderer {...(props as DataEntryRendererSplitterProps<FloatDataEntry>)} />;
    case 'ENUM_ARRAY':
      return <EnumArrayRenderer {...(props as DataEntryRendererSplitterProps<EnumArrayDataEntry>)} />;
    case 'ENUM_OPTIONS':
      return <EnumOptionsRenderer {...(props as DataEntryRendererSplitterProps<EnumOptionsDataEntry>)} />;
    case 'ARRAY':
      return <ArrayRenderer {...(props as DataEntryRendererSplitterProps<ArrayDataEntry>)} />;
    case 'OPTIONAL':
      return <OptionalRenderer {...(props as DataEntryRendererSplitterProps<OptionalDataEntry>)} />;
  }
};

export const DataEntryRenderer: React.FC<DataEntryRendererProps> = ({ onMutateType, onRemove, ...props }) => (
  <BaseEntryWrapper
    onMutateType={onMutateType}
    onRemove={onRemove}
    children={<DataEntryRendererSplitter {...props} />}
    {...props}
  />
);
