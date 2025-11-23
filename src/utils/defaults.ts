import { ComplexDataEntry, ComplexDataType, DataEntry, DataType, DescriptorFactory } from 'url-safe-bitpacking';

export const getDefaultDescriptorForType = (
  t: DataType | ComplexDataType,
  name: string
): DataEntry | ComplexDataEntry => {
  switch (t) {
    case 'VERSION':
      return DescriptorFactory.VERSION(0, 8, name);
    case 'BOOLEAN':
      return DescriptorFactory.BOOLEAN(false, name);
    case 'ENUM':
      return DescriptorFactory.ENUM(0, ['a', 'b', 'c', 'd'], name);
    case 'INT':
      return DescriptorFactory.INT(5, 0, 10, name);
    case 'FLOAT':
      return DescriptorFactory.FLOAT(0.1, 0.01, 1, 2, name);
    case 'ENUM_ARRAY':
      return DescriptorFactory.ENUM_ARRAY([0, 1, 2, 3, 4], 'ABCDEFGHIJ', 1, 20, name);
    case 'OPTIONAL':
      return DescriptorFactory.OPTIONAL([null, [getDefaultDescriptorForType('INT', 'an int')]], true, name);
    case 'ENUM_OPTIONS':
      return DescriptorFactory.ENUM_OPTIONS(
        [null, [], [getDefaultDescriptorForType('ENUM_ARRAY', 'some string')]],
        1,
        name
      );
    case 'ARRAY':
      return DescriptorFactory.ARRAY(
        [getDefaultDescriptorForType('BOOLEAN', 'a flag'), getDefaultDescriptorForType('INT', 'an int')],
        2,
        0,
        5,
        name
      );
  }
};
