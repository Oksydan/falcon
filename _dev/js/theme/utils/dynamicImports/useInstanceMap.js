const componentsInstancesMap = new Map();

/**
 * Manages a map for component instances associated with specific elements or keys.
 *
 * @module useInstanceMap
 * @description Creates and manages an instance map for component instances.
 * @param {string} key - The key for the component instances map.
 * @return {{
 *   getInstanceFromMap: function(HTMLElement): (object|null),
 *   setInstanceInMap: function(HTMLElement, object): void,
 *   removeInstanceFromMap: function(HTMLElement): void,
 *   getAllInstancesForComponent: function(): (object|null)
 * }}
 */
const useInstanceMap = (key) => {
  if (!key) {
    throw new Error('Key is required');
  }

  /**
   * Retrieves the component instance from the map for a specific element.
   *
   * @method getInstanceFromMap
   * @description Gets the component instance from the map for a specified element.
   * @public
   * @param {HTMLElement} element - The component element.
   * @return {object|null} - The component instance or null if not found.
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
   * Sets the component instance in the map for a specific element.
   *
   * @method setInstanceInMap
   * @description Sets the component instance in the map for a specified element.
   * @public
   * @param {HTMLElement} element - The component element.
   * @param {object} instance - The component instance.
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
   * Removes the component instance from the map for a specific element.
   *
   * @method removeInstanceFromMap
   * @description Removes the component instance from the map for a specified element.
   * @public
   * @param {HTMLElement} element - The component element.
   * @return {void}
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

  /**
   * Retrieves all component instances for the component.
   *
   * @method getAllInstancesForComponent
   * @description Gets all component instances associated with the component.
   * @public
   * @return {object|null} - All component instances for the component or null if none.
   */
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
