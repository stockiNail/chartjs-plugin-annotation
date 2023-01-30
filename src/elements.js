import {Animations} from 'chart.js';
import {isObject, defined, _capitalize} from 'chart.js/helpers';
import {eventHooks} from './events';
import {elementHooks} from './hooks';
import {annotationTypes} from './types';

const directUpdater = {
  update: Object.assign
};

const hooks = eventHooks.concat(elementHooks);

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").UpdateMode } UpdateMode
 * @typedef { import('../../types/options').AnnotationPluginOptions } AnnotationPluginOptions
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

/**
 * Resolve the annotation type, checking if is supported.
 * @param {string} [type=line] - annotation type
 * @returns {string} resolved annotation type
 */
export function resolveType(type = 'line') {
  if (annotationTypes[type]) {
    return type;
  }
  console.warn(`Unknown annotation type: '${type}', defaulting to 'line'`);
  return 'line';
}

/**
 * @param {Chart} chart
 * @param {Object} state
 * @param {AnnotationPluginOptions} options
 * @param {UpdateMode} mode
 */
export function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotationOptions = annotations[i];
    const element = getOrCreateElement(elements, i, annotationOptions.type);
    updateElement(chart, element, annotationOptions, animations);
  }
}

/**
 * @param {Chart} chart
 * @param {Object} state
 * @param {AnnotationPluginOptions} options
 * @param {AnnotationElement[]} elements
 */
export function hoverElements(chart, state, options, elements) {
  const animations = resolveAnimations(chart, options.animations, 'active');

  elements.forEach(function(el) {
    const index = state.elements.indexOf(el);
    updateElement(chart, el, state.annotations[index], animations);
  });
}

function updateElement(chart, element, options, animations) {
  const resolver = options.setContext(getContext(chart, element, options));
  const properties = element.resolveElementProperties(chart, resolver);

  properties.skip = toSkip(properties);

  if ('elements' in properties) {
    updateSubElements(element, properties, resolver, animations);
    // Remove the sub-element definitions from properties, so the actual elements
    // are not overwritten by their definitions
    delete properties.elements;
  }

  if (!defined(element.x)) {
    // If the element is newly created, assing the properties directly - to
    // make them readily awailable to any scriptable options. If we do not do this,
    // the properties retruned by `resolveElementProperties` are available only
    // after options resolution.
    Object.assign(element, properties);
  }

  properties.options = resolveAnnotationOptions(resolver, element.active);

  animations.update(element, properties);
}

function toSkip(properties) {
  return isNaN(properties.x) || isNaN(properties.y);
}

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function updateSubElements(mainElement, {elements, initProperties}, resolver, animations) {
  const subElements = mainElement.elements || (mainElement.elements = []);
  subElements.length = elements.length;
  for (let i = 0; i < elements.length; i++) {
    const definition = elements[i];
    const properties = definition.properties;
    const subElement = getOrCreateElement(subElements, i, definition.type, initProperties);
    const subResolver = resolver[definition.optionScope].override(definition);
    properties.options = resolveAnnotationOptions(subResolver, mainElement.active);
    animations.update(subElement, properties);
  }
}

function getOrCreateElement(elements, index, type, initProperties) {
  const elementClass = annotationTypes[resolveType(type)];
  let element = elements[index];
  if (!element || !(element instanceof elementClass)) {
    element = elements[index] = new elementClass();
    if (isObject(initProperties)) {
      Object.assign(element, initProperties);
    }
  }
  return element;
}

function resolveAnnotationOptions(resolver, active) {
  const elementClass = annotationTypes[resolveType(resolver.type)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result,
    resolveObj(resolver, elementClass.defaults, active),
    resolveObj(resolver, elementClass.defaultRoutes, active));
  for (const hook of hooks) {
    result[hook] = resolver[hook];
  }
  return result;
}

function resolveObj(resolver, defs, active) {
  const result = {};
  for (const prop of Object.keys(defs)) {
    const optDefs = defs[prop];
    const hoverProp = active ? 'hover' + _capitalize(prop) : prop;
    const value = resolver[hoverProp] || resolver[prop];
    result[prop] = isObject(optDefs) ? resolveObj(value, optDefs, active) : value;
  }
  return result;
}

function getContext(chart, element, annotation) {
  return element.$context || (element.$context = Object.assign(Object.create(chart.getContext()), {
    element,
    id: annotation.id,
    type: 'annotation'
  }));
}

function resyncElements(elements, annotations) {
  const count = annotations.length;
  const start = elements.length;

  if (start < count) {
    const add = count - start;
    elements.splice(start, 0, ...new Array(add));
  } else if (start > count) {
    elements.splice(count, start - count);
  }
  return elements;
}
