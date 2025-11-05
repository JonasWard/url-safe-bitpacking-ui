import { DataEntry, DataType, getBitsCount } from 'url-safe-bitpacking';

const getTypeString = (type: DataType) => {
  switch (type) {
    case DataType.VERSION:
      return 'Version';
    case DataType.BOOLEAN:
      return 'Boolean';
    case DataType.ENUM:
      return 'Enum';
    case DataType.INT:
      return 'Int';
    case DataType.FLOAT:
      return 'Float';
  }
};

export const BaseEntryWrapper: React.FC<{ children: React.ReactNode; dataEntry: DataEntry }> = ({
  children,
  dataEntry
}) => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 items-center justify-center bg-white p-2 rounded-xl border-2 border-gray-200 text-black">
      <span className="text-right">type</span>
      <span className="flex flex-row gap-2">
        <p>{getTypeString(dataEntry.type)}</p>
        <sub>{dataEntry.name}</sub>
      </span>
      <span className="text-right">name</span>
      <input value={dataEntry.name} />
      <span className="text-right">internal</span>
      <p>{dataEntry.internalName}</p>
      {children}
      {dataEntry.type !== DataType.VERSION && (
        <>
          <span className="text-right">bits</span>
          <p>{getBitsCount(dataEntry, '')}</p>
        </>
      )}
    </div>
  );
};
