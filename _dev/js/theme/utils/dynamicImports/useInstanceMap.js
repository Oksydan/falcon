const componentsInstancesMap = new Map();

/**
 * @module useInstanceMap
 * @description create instance map
 * @param {string} key - map key
 * @return {{
 * getInstanceFromMap: (function(HTMLElement): (null|object)),
 * setInstanceInMap: (function(HTMLElement, object): (void)),
 * removeInstanceFromMap: (function(HTMLElement): (void))
 * }}
 */
const useInstanceMap = (key) => {
  if (!key) {
    throw new Error('Key is required');
  }

  /**
   * @method getInstanceFromMap
   * @description get component instance from map
   * @public
   * @param {HTMLElement} element - component element
   * @return {object|null} - component instance or null
   */
  const getInstanceFromMap = (element) => {
    if (!componentsInstancesMap.has(key)) {
      return null;
    }

    const instancesMap = componentsInstancesMap.get(key);

    if (!instancesMap.has(element)) {
      return null;
    }

    return instancesMap.get(element);
  };

  /**
   * @method setInstanceInMap
   * @description set component instance in map
   * @public
   * @param {HTMLElement} element - component element
   * @param {object} instance - component instance
   * @return {void}
   */
  const setInstanceInMap = (element, instance) => {
    if (!componentsInstancesMap.has(key)) {
      componentsInstancesMap.set(key, new Map());
    }

    const instancesMap = componentsInstancesMap.get(key);

    instancesMap.set(element, instance);
  };

  /**
   * @method removeInstanceFromMap
   * @description remove component instance from map
   * @public
   * @param {HTMLElement} element - component element
   */
  const removeInstanceFromMap = (element) => {
    if (!componentsInstancesMap.has(key)) {
      return;
    }

    const instancesMap = componentsInstancesMap.get(key);

    if (!instancesMap.has(element)) {
      return;
    }

    instancesMap.delete(element);

    if (instancesMap.size === 0) {
      componentsInstancesMap.delete(key);
    }
  };

  const getAllInstancesForComponent = () => {
    if (!componentsInstancesMap.has(key)) {
      return null;
    }

    return componentsInstancesMap.get(key);
  };

  return {
    getInstanceFromMap,
    setInstanceInMap,
    removeInstanceFromMap,
    getAllInstancesForComponent,
  };
};

export default useInstanceMap;
