import { ComplexDataEntry, DataEntry, DescriptorFactory, getOptionsFromMaxAndMapping } from 'url-safe-bitpacking';

const rawValidatedUpdatedType = (d: DataEntry | ComplexDataEntry): DataEntry | ComplexDataEntry => {
  switch (d.type) {
    case 'VERSION':
      return DescriptorFactory.VERSION(d.value, d.bits, d.name);
    case 'BOOLEAN':
      return DescriptorFactory.BOOLEAN(d.value, d.name);
    case 'ENUM':
      return DescriptorFactory.ENUM(d.value, getOptionsFromMaxAndMapping(d), d.name);
    case 'INT':
      return DescriptorFactory.INT(d.value, d.min, d.max, d.name);
    case 'FLOAT':
      return DescriptorFactory.FLOAT(d.value, d.min, d.max, d.precision, d.name);
    case 'ENUM_ARRAY':
      return DescriptorFactory.ENUM_ARRAY(d.value, getOptionsFromMaxAndMapping(d), d.minCount, d.maxCount, d.name);
    case 'OPTIONAL':
      return DescriptorFactory.OPTIONAL(d.descriptor, d.state, d.name);
    case 'ENUM_OPTIONS':
      return DescriptorFactory.ENUM_OPTIONS(d.descriptor, d.state, d.name);
    case 'ARRAY':
      return DescriptorFactory.ARRAY(d.descriptor, d.state, d.minCount, d.maxCount, d.name);
  }
};

export const getValidatedUpdatedType = (d: DataEntry | ComplexDataEntry): DataEntry | ComplexDataEntry => {
  try {
    return rawValidatedUpdatedType(d);
  } catch (error) {
    console.warn(error);
    return d;
  }
};
