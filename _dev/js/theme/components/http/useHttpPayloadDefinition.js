const useHttpPayloadDefinition = (payload, definition) => {
  const errors = [];
  const ERROR_MESSAGES = {
    REQUIRED: 'field is required',
    TYPE: 'field must be of type',
    MIN_LENGTH: 'field must be at least',
    MAX_LENGTH: 'field must be at most',
    MIN_VALUE: 'field must be at least',
    MAX_VALUE: 'field must be at most',
    REGEX: 'field must match the following regex',
  };

  const defaultDefinitionForField = {
    required: false,
    minLength: null,
    maxLength: null,
    minValue: null,
    maxValue: null,
    regex: null,
  };

  const requiredDefinitionFields = [
    'type',
  ];

  if (!definition) {
    throw new Error('Payload definition is required');
  }

  if (!payload) {
    throw new Error('Payload is required');
  }

  const setDefaultDefinitionForField = (definition) => ({
    ...defaultDefinitionForField,
    ...definition,
  });

  const payloadDefinition = {};

  Object.keys(definition).forEach((fieldName) => {
    const definitionForField = definition[fieldName];

    payloadDefinition[fieldName] = setDefaultDefinitionForField(definitionForField);
  });

  const validate = (fieldName, value, definition) => {
    const validateErrors = [];
    const {
      type,
      required,
      minLength,
      maxLength,
      minValue,
      maxValue,
      regex,
    } = definition;

    if (required && !value) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.REQUIRED}`);
    }

    switch (type) {
      case 'string':
        if (typeof value !== 'string') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} string`);
        }
        break;
      case 'float':
        if (typeof value !== 'number') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} float`);
        }
        break;
      case 'int':
        if (typeof value !== 'number') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} int`);
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} boolean`);
        }
        break;
      case 'object':
        if (typeof value !== 'object') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} object`);
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} array`);
        }
        break;
      default:
        break;
    }

    if (minLength && value.length < minLength) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.MIN_LENGTH} ${minLength}`);
    }

    if (maxLength && value.length > maxLength) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.MAX_LENGTH} ${maxLength}`);
    }

    if (minValue && value < minValue) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.MIN_VALUE} ${minValue}`);
    }

    if (maxValue && value > maxValue) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.MAX_VALUE} ${maxValue}`);
    }

    if (regex && !regex.test(value)) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.REGEX} ${regex}`);
    }

    return validateErrors;
  };

  const validateDefinitionForField = (fieldName, definition) => {
    const definitionErrors = [];
    const definitionKeys = Object.keys(definition);

    requiredDefinitionFields.forEach((requiredDefinitionField) => {
      if (!definitionKeys.includes(requiredDefinitionField)) {
        definitionErrors.push(`'${fieldName}' definition is missing ${requiredDefinitionField} field`);
      }
    });

    return definitionErrors;
  };

  const validateDefinition = (definition) => {
    const definitionErrors = [];
    const definitionKeys = Object.keys(definition);

    definitionKeys.forEach((defName) => {
      const fieldName = defName;
      const fieldDef = definition[defName];
      const definitionForFieldErrors = validateDefinitionForField(fieldName, fieldDef);

      definitionErrors.push(...definitionForFieldErrors);
    });

    return definitionErrors;
  };

  const validatePayload = () => {
    const payloadErrors = [];
    const definitionErrors = validateDefinition(payloadDefinition);

    if (definitionErrors.length) {
      payloadErrors.push(...definitionErrors);
    }

    Object.keys(payloadDefinition).forEach((fieldName) => {
      const definitionForField = payloadDefinition[fieldName];

      const definitionForFieldErrors = validate(fieldName, payload[fieldName], definitionForField);

      payloadErrors.push(...definitionForFieldErrors);
    });

    return payloadErrors;
  };

  return {
    validatePayload,
  };
};

export default useHttpPayloadDefinition;
