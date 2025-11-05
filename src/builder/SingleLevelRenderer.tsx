import { DataEntryRenderer } from '@/basetypes/DataEntryRenderer';
import { SingleLevelContentType, DataEntry } from 'url-safe-bitpacking';
import { BaseDataModelWrapper } from './BaseDataModelWrapper';
import { isDataEntry } from 'url-safe-bitpacking';

export const SingleLevelDoubleArrayRenderer: React.FC<{ d: SingleLevelContentType[][] }> = ({ d }) => (
  <BaseDataModelWrapper>
    {d.map((d, index) => (
      <SingleLevelArrayRenderer d={d as SingleLevelContentType[]} key={index} />
    ))}
  </BaseDataModelWrapper>
);

export const SingleLevelArrayRenderer: React.FC<{ d: SingleLevelContentType[] }> = ({ d }) => (
  <BaseDataModelWrapper>
    {d.map((d, index) => (
      <SingleLevelRenderer d={d as SingleLevelContentType} key={index} />
    ))}
  </BaseDataModelWrapper>
);

export const SingleLevelRenderer: React.FC<{ d: SingleLevelContentType }> = ({ d }) => {
  const isDataEntryType = isDataEntry(d);

  return (
    <BaseDataModelWrapper>
      {isDataEntryType ? (
        <DataEntryRenderer d={d as DataEntry} />
      ) : (
        <SingleLevelRenderer d={d as SingleLevelContentType} />
      )}
    </BaseDataModelWrapper>
  );
};
