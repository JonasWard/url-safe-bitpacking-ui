import { DataEntry, DataType } from 'url-safe-bitpacking';
import {
  BooleanDataEntry,
  EnumDataEntry,
  FloatDataEntry,
  IntDataEntry,
  VersionDataEntry
} from 'url-safe-bitpacking/dist/types';
import { VersionRenderer } from './VersionRenderer';
import { BooleanRenderer } from './BooleanRenderer';
import { EnumRenderer } from './EnumRenderer';
import { BaseEntryWrapper } from './BaseEntryWrapper';
import { FloatRenderer } from './FloatRenderer';
import { IntRenderer } from './IntRenderer';

const DataEntryRendererSplitter: React.FC<{ d: DataEntry }> = ({ d }) => {
  switch (d.type) {
    case DataType.VERSION:
      return <VersionRenderer versionObject={d as VersionDataEntry} />;
    case DataType.BOOLEAN:
      return <BooleanRenderer booleanObject={d as BooleanDataEntry} />;
    case DataType.ENUM:
      return <EnumRenderer enumObject={d as EnumDataEntry} />;
    case DataType.INT:
      return <IntRenderer intObject={d as IntDataEntry} />;
    case DataType.FLOAT:
      return <FloatRenderer floatObject={d as FloatDataEntry} />;
  }
};

export const DataEntryRenderer: React.FC<{ d: DataEntry }> = ({ d }) => (
  <BaseEntryWrapper dataEntry={d} children={<DataEntryRendererSplitter d={d} />} />
);
