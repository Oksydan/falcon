import exposeToWindow from '../utils/misc/exposeToWindow';
import {
  on, one, off, trigger,
} from '../utils/event/eventHandler';
import useHttpRequest from '../utils/http/useHttpRequest';
import useDefaultHttpRequest from '../utils/http/useDefaultHttpRequest';
import useHttpController from '../utils/http/useHttpController';
import useHttpPayloadDefinition from '../utils/http/useHttpPayloadDefinition';
import {
  isElementVisible, each, DOMReady, parseToHtml,
} from '../utils/DOM/DOMHelpers';
import { getAllSiblingsBeforeElement, getAllSiblingsAfterElement } from '../utils/DOM/DOMSelectorsHelper';
import { fromSerializeObject, fromSerialize, formSerializeArray } from '../utils/form/formSerialize';
import useToggleDisplay from '../utils/display/useToggleDisplay';

exposeToWindow('eventHandlerOn', on);
exposeToWindow('eventHandlerOne', one);
exposeToWindow('eventHandlerOff', off);
exposeToWindow('eventHandlerTrigger', trigger);
exposeToWindow('useHttpRequest', useHttpRequest);
exposeToWindow('useDefaultHttpRequest', useDefaultHttpRequest);
exposeToWindow('useHttpController', useHttpController);
exposeToWindow('useHttpPayloadDefinition', useHttpPayloadDefinition);
exposeToWindow('isElementVisible', isElementVisible);
exposeToWindow('each', each);
exposeToWindow('DOMReady', DOMReady);
exposeToWindow('parseToHtml', parseToHtml);
exposeToWindow('getAllSiblingsBeforeElement', getAllSiblingsBeforeElement);
exposeToWindow('getAllSiblingsAfterElement', getAllSiblingsAfterElement);
exposeToWindow('fromSerializeObject', fromSerializeObject);
exposeToWindow('fromSerialize', fromSerialize);
exposeToWindow('formSerializeArray', formSerializeArray);
exposeToWindow('useToggleDisplay', useToggleDisplay);
