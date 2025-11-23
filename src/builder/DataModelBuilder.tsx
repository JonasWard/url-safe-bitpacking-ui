import { useState } from 'react';
import { DescriptorFactory, StateDescriptor } from 'url-safe-bitpacking';
import { NestedDataBuilder } from './NestedDataBuilder';

export const downloadAsJson = (dataModel: StateDescriptor) => {
  const json = JSON.stringify(dataModel);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data-model.json';
  a.click();
};

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
    <div className="flex flex-col gap-2">
      <span className="flex flex-row gap-2">
        <button onClick={() => downloadAsJson(dataModel)}>Download</button>
        <input type="file" accept="application/json" onChange={(e) => uploadFromJson(e.target, setDataModel)} />
      </span>
      <NestedDataBuilder d={dataModel} setData={(e) => setDataModel(e as StateDescriptor)} />
    </div>
  );
};
