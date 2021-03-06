/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/message',
  'locservices/ui/translations/en'
], function($, Message, En) {

  describe('The message', function() {
    'use strict';

    var message,
        translations;

    describe('constructor', function() {

      beforeEach(function() {
        translations = new En();
        message = new Message({
          translations: translations,
          container: $('<div />')
        });
      });

      it('should set this.componentId to "message"', function() {
        expect(message.componentId).toBe('message');
      });

      it('should set this.eventNamespace to "locservices:ui:component:message"', function() {
        expect(message.eventNamespace).toBe('locservices:ui:component:message');
      });
    });

    describe('message', function() {

      var container;

      beforeEach(function() {
        container = $('<div />');
        translations = new En();
        message = new Message({
          translations: translations,
          container: container
        });
      });

      it('should set the content', function() {
        message.set('Sample message');
        expect(message.element.text()).toBe('Sample message');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should remove the content', function() {
        message.set('Sample message');
        expect(message.element.text()).toBe('Sample message');
        message.clear();
        expect(message.element.text()).toBe('');
        expect(message.element.hasClass('ls-ui-active')).toBe(false);
      });

    });

    describe('set', function() {

      it('should return false if the message is not a string', function() {
        var result;
        result = message.set(false);
        expect(result).toBe(false);
      });

      it('should return true if the message is set', function() {
        var result;
        result = message.set('foo');
        expect(result).toBe(true);
      });

    });

    describe('events', function() {

      var container;

      beforeEach(function() {
        container = $('<div />');
        translations = new En();
        message = new Message({
          translations: translations,
          container: container,
          eventNamespace: 'message-test'
        });
      });

      it('should respond to errors', function() {
        expect(message.element.text()).toBe('');
        $.emit('message-test:error', ['An emitted error']);
        expect(message.element.text()).toBe('An emitted error');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should set content on when search results are available', function() {
        message.set('');
        $.emit('message-test:component:search_results:results', [{ searchTerm: 'Cardiff', offset: 0, totalResults: 1 }]);
        expect(message.element.text()).toBe('Showing 1 of 1');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should set content on when search results returns nothing', function() {
        message.set('');
        $.emit('message-test:component:search_results:results', [{ searchTerm: 'Cardiff', totalResults: 0 }]);
        expect(message.element.text()).toBe('We couldn\'t find any results for "Cardiff"');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should call clear on search:start', function() {
        var stub = sinon.stub(message, 'clear');
        $.emit('message-test:component:search:start');
        expect(stub.calledOnce).toBe(true);
      });

      it('should call clear on geolocation:click', function() {
        var stub = sinon.stub(message, 'clear');
        $.emit('message-test:component:geolocation:click');
        expect(stub.calledOnce).toBe(true);
      });

    });

  });
});
