/**
 * useHttpPayloadDefinition - validate payload against definition
 * @module useHttpPayloadDefinition
 * @param {object} payload - payload to validate
 * @param {object} definition - definition to validate payload against
 */
const useHttpPayloadDefinition = (payload, definition) => {
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

  /**
   * @method
   * Sets default definition for field
   * @param customDefinition - custom definition for field
   * @returns {object} - definition for field
   */
  const setDefaultDefinitionForField = (customDefinition) => ({
    ...defaultDefinitionForField,
    ...customDefinition,
  });

  const payloadDefinition = {};

  Object.keys(definition).forEach((fieldName) => {
    const definitionForField = definition[fieldName];

    payloadDefinition[fieldName] = setDefaultDefinitionForField(definitionForField);
  });

  /**
   * @method
   * Gets value type
   * @param value
   * @returns {"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
   */
  const getValueType = (value) => typeof value;

  /**
   * @method
   * Validates field value against field definition and returns errors
   * @param {string} fieldName - name of field
   * @param {any} value - value of field
   * @param {object} fieldDefinition - definition for field
   * @returns {*[]}
   */
  const validate = (fieldName, value, fieldDefinition) => {
    const validateErrors = [];
    const {
      type,
      required,
      minLength,
      maxLength,
      minValue,
      maxValue,
      regex,
    } = fieldDefinition;

    if (required && !value) {
      validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.REQUIRED}`);
    }

    switch (type) {
      case 'string':
        if (typeof value !== 'string') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} string, ${getValueType(value)} received`);
        }
        break;
      case 'float':
        if (typeof value !== 'number') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} float, ${getValueType(value)} received`);
        }
        break;
      case 'int':
        if (typeof value !== 'number') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} int, ${getValueType(value)} received`);
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} boolean, ${getValueType(value)} received`);
        }
        break;
      case 'object':
        if (typeof value !== 'object') {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} object, ${getValueType(value)} received`);
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          validateErrors.push(`'${fieldName}' ${ERROR_MESSAGES.TYPE} array, ${getValueType(value)} received`);
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

  /**
   * @method
   * Validates definition for field and returns errors
   * @param fieldName
   * @param fieldsDefinition
   * @returns {*[]}
   */
  const validateDefinitionForField = (fieldName, fieldsDefinition) => {
    const definitionErrors = [];
    const definitionKeys = Object.keys(fieldsDefinition);

    requiredDefinitionFields.forEach((requiredDefinitionField) => {
      if (!definitionKeys.includes(requiredDefinitionField)) {
        definitionErrors.push(`'${fieldName}' definition is missing ${requiredDefinitionField} field`);
      }
    });

    return definitionErrors;
  };

  /**
   * @method
   * Validates definition and returns errors
   * @param fieldsDefinition
   * @returns {*[]}
   */
  const validateDefinition = (fieldsDefinition) => {
    const definitionErrors = [];
    const definitionKeys = Object.keys(fieldsDefinition);

    definitionKeys.forEach((defName) => {
      const fieldName = defName;
      const fieldDef = fieldsDefinition[defName];
      const definitionForFieldErrors = validateDefinitionForField(fieldName, fieldDef);

      definitionErrors.push(...definitionForFieldErrors);
    });

    return definitionErrors;
  };

  /**
   * @method
   * Validates payload against definition and returns errors
   * @returns {*[]}
   */
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
