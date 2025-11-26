import { useState } from 'react';
import {
  ComplexDataEntry,
  complexDataStringifier,
  ComplexDataType,
  ComplexDataValues,
  dataBitsStringifier,
  DataEntry,
  DescriptorFactory,
  StateDescriptor
} from 'url-safe-bitpacking';
import { NestedDataBuilder } from './NestedDataBuilder';
import { BitDataRenderer } from '@/basetypes/shared/BitDataRenderer';

export const downloadAsJson = (dataModel: StateDescriptor) => {
  const json = JSON.stringify(dataModel);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data-model.json';
  a.click();
};

// ToDo export nestedDataStringifier from url-safe-bitpacking
export const nestedDataStringifier = (dataModel: StateDescriptor): string =>
  dataModel
    .map((d) =>
      ComplexDataValues.includes(d.type as ComplexDataType)
        ? complexDataStringifier(d as ComplexDataEntry)
        : dataBitsStringifier(d as DataEntry)
    )
    .join('');

export const uploadFromJson = (t: HTMLInputElement, setDataModel: (dataModel: StateDescriptor) => void) => {
  const file = (t as HTMLInputElement).files?.[0];
  // reading the file
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);
      if (json) setDataModel(json as StateDescriptor);
    };
    fileReader.readAsText(file);
  }
};

export const DescriptorBuilder = () => {
  const [dataModel, setDataModel] = useState<StateDescriptor>([DescriptorFactory.VERSION(1, 8, 'version')]);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <span className="header">
        <span className="grid grid-cols-[10rem_20rem] gap-2">
          <button onClick={() => downloadAsJson(dataModel)}>Download</button>
          <input type="file" accept="application/json" onChange={(e) => uploadFromJson(e.target, setDataModel)} />
        </span>
      </span>
      <div className="pt-16 pb-8 px-6 mr-auto">
        <NestedDataBuilder d={dataModel} setData={(e) => setDataModel(e as StateDescriptor)} />
      </div>
      <span className="fixed bottom-0 left-0 p-1 bg-background">
        <BitDataRenderer bitstring={nestedDataStringifier(dataModel)} showBase64 />
      </span>
    </div>
  );
};
