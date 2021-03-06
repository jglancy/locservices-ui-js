/*global describe, beforeEach, it:false*/

define([
  'locservices/ui/component/component',
  'locservices/ui/translations/en',
  'jquery'
], function(Component, En, $) {

  describe('The component module', function() {
    'use strict';

    var component;
    var translations;

    beforeEach(function() {
      component = new Component();
    });

    describe('emit()', function() {
      it('uses eventNamespaceBase for errors', function() {
        var stub = sinon.stub($, 'emit');
        component.eventNamespaceBase = 'foo';
        component.emit('error', []);
        expect(stub.calledWith('foo:error', [])).toBe(true);
        stub.restore();
      });
      it('uses eventNamespace for any other event name', function() {
        var stub = sinon.stub($, 'emit');
        component.eventNamespace = 'foobar';
        component.emit('geolocation:location', []);
        expect(stub.calledWith('foobar:geolocation:location', [])).toBe(true);
        stub.restore();
      });
    });

    describe('on()', function() {
      it('uses eventNamespaceBase for errors', function() {
        var stub = sinon.stub($, 'on');
        var fn = function() {};
        component.eventNamespaceBase = 'foo';
        component.on('error', fn);
        expect(stub.calledWith('foo:error', fn)).toBe(true);
        stub.restore();
      });
      it('uses eventNamespace for any other event name', function() {
        var stub = sinon.stub($, 'on');
        var fn = function() {};
        component.eventNamespace = 'foobar';
        component.on('geolocation:location', fn);
        expect(stub.calledWith('foobar:geolocation:location', fn)).toBe(true);
        stub.restore();
      });
    });

    describe('setComponentOptions()', function() {

      beforeEach(function() {
        translations = new En();
        component.setComponentOptions({
          translations: translations,
          container: null
        });
      });

      // event namespace

      it('should default to eventNamespaceBase "locservices:ui"', function() {
        expect(component.eventNamespaceBase).toBe('locservices:ui');
      });

      it('should set eventNamespaceBase from options.eventNamespace', function() {
        var eventNamespace = 'foo:bar';
        component.setComponentOptions({
          translations: translations,
          eventNamespace: eventNamespace,
          container: null
        });
        expect(component.eventNamespaceBase).toBe(eventNamespace);
      });

      it('should default to eventNamespace "locservices:ui:component:component"', function() {
        expect(component.eventNamespace).toBe('locservices:ui:component:component');
      });

      it('should set eventNamespace from options.eventNamespace', function() {
        var eventNamespace = 'foo:bar';
        var expectedValue = eventNamespace + ':component:component';
        component.setComponentOptions({
          translations: translations,
          eventNamespace: eventNamespace,
          container: null
        });
        expect(component.eventNamespace).toBe(expectedValue);
      });

      // componentId

      it('should default this.componentId to "component"', function() {
        expect(component.componentId).toBe('component');
      });

      it('should set this.componentId from options.componentId', function() {
        var expectedValue = 'foo';
        component.setComponentOptions({
          translations: translations,
          componentId: expectedValue,
          container: null
        });
        expect(component.componentId).toBe(expectedValue);
      });

      // translations

      it('should throw an exception if no trnslation module option', function() {
        var failure = function() {
          component.setComponentOptions({
            container: null
          });
        };
        expect(failure).toThrow(new Error('Component requires a translations parameter.'));
      });

      it('should set this.tranlations from options.translations', function() {
        expect(component.translations).toEqual(translations);
      });

      // container

      it('should throw an exception if options do not container an element', function() {
        var failure = function() {
          component.setComponentOptions({
            translations: translations
          });
        };
        expect(failure).toThrow(new Error('Component requires container parameter.'));
      });

    });

  });
});
