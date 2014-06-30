/*global define */

define(function() {

  'use strict';

  function Component() {}

  Component.prototype.setComponentOptions = function(options) {

    options = options || {};

    if (undefined === options.translations) {
      throw new Error('Component requires a translations parameter.');
    } else {
      this.translations = options.translations;
    }

    if (undefined === options.container) {
      throw new Error('Component requires container parameter.');
    } else {
      this.container = options.container;
    }

    this.componentId = options.componentId || 'component';

    this.eventNamespaceBase = 'locservices:ui';
    if (options.eventNamespace) {
      this.eventNamespaceBase = options.eventNamespace;
    }
    this.eventNamespace = this.eventNamespaceBase + ':component:' + this.componentId;

  };

  return Component;
});