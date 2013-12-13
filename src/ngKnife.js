/**
 * loads sub modules and wraps them up into the main module
 */
define([
  'angular',
  // modules
  'filters/iif',
  'filters/positiveNegative',
  'filters/sign',
  'filters/truncate',
  'services/debounce',
], function (ng) {
  'use strict';

  return ng.module('ngKnife', [
    'ngKnife.filters',
    'ngKnife.services'
  ]);
});