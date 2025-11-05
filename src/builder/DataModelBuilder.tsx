import { useState } from 'react';
import { DataEntryFactory } from 'url-safe-bitpacking';
import { VersionContentDefinition } from 'url-safe-bitpacking';
import { SingleLevelDoubleArrayRenderer } from './SingleLevelRenderer';

export const DataModelBuilder = () => {
  const [dataModel, setDataModel] = useState<VersionContentDefinition>([[DataEntryFactory.createVersion(1)]]);

  return <SingleLevelDoubleArrayRenderer d={dataModel} />;
};
