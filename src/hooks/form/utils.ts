export enum FormTransformFieldProperty {
  String = 'string',
  File = 'file',
}

export interface FormTransformField {
  origin: FormTransformFieldProperty;
  transform: FormTransformFieldProperty;
  fileProperty?: string;
}

export function transformModelToFormValue<T>(
  transformData: T,
  transformFields?: Record<string, FormTransformField>,
) {
  const result = { ...transformData };
  if (!transformFields) {
    return result;
  }
  Object.keys(transformFields).forEach((key) => {
    if (transformFields[key].transform === FormTransformFieldProperty.File) {
      result[key] = [
        {
          name: result[key],
          status: 'done',
        },
      ];
    }
  });
  return result;
}

export function transformFormValueToModel<T>(
  transformData: T,
  transformFields?: Record<string, FormTransformField>,
) {
  const result = { ...transformData };
  if (!transformFields) {
    return result;
  }
  Object.keys(transformFields).forEach((key) => {
    if (!result[key]) {
      return;
    }
    if (transformFields[key].transform === 'file') {
      const value = transformData[key][0];
      result[key] = value.name;
      if (transformFields[key].fileProperty) {
        result[transformFields[key].fileProperty!] = value.originFileObj;
      }
    }
  });
  return result;
}
