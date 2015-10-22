/*!
 * AspectRatioFit 1.0
 *
 * Copyright 2015, Erik Lindebratt
 * Released under the MIT license - http://eriklindebratt.mit-license.org/
 *
 */
;(function(window, document) {
  'use strict';

  /**
   * @public
   * @class
   * @param {DOMElement} elem
   * @param {Object} options (Optional) Pass custom options
   */
  var AspectRatioFit = function(elem, options) {
    if (!elem) {
      return null;
    }

    this.elem = elem;
    this.options = {
      wrapperClassName: 'aspect-ratio-wrapper',
      stylesheetIdentifier: 'aspect-ratio-fit-styles'
    };

    // extend `this.options`
    if (options && typeof(options) === 'object') {
      for (var i in options) {
        if (options.hasOwnProperty(i)) {
          this.options[i] = options[i];
        }
      }
    }


    var width = parseInt(this.elem.width || this.elem.getAttribute('width'), 10);
    var height = parseInt(this.elem.height || this.elem.getAttribute('height'), 10);
    var aspectRatio = null;

    if (!width || !height) {
      // invalid dimensions - assuming 16:9 in aspect ratio
      aspectRatio = 9/16;
    } else {
      aspectRatio = height / width;
    }

    var wrapperElem = null;
    if (AspectRatioFit.HasClass(this.elem.parentNode, this.options.wrapperClassName)) {
      wrapperElem = this.elem.parentNode;
    } else {
      wrapperElem = document.createElement('div');
      wrapperElem.className = this.options.wrapperClassName;
      wrapperElem.innerHTML = this.elem.outerHTML;
      this.elem.parentNode.insertBefore(wrapperElem, this.elem);
      this.elem.parentNode.removeChild(this.elem);
      this.elem = wrapperElem.firstChild;
    }

    this.setStylesheet_();

    wrapperElem.style.paddingTop = Math.round(aspectRatio * 100) + '%';
  };

  /**
   * @private
   */
  AspectRatioFit.prototype.setStylesheet_ = function() {
    if (document.getElementById(this.options.stylesheetIdentifier)) {
      return;
    }

    var styleElem = document.createElement('style');
    styleElem.id = this.options.stylesheetIdentifier;
    styleElem.innerHTML = [
      '.'+this.options.wrapperClassName+'{',
        'position:relative;',
        'width:100%;',
      '}',
      '.'+this.options.wrapperClassName+'>*{',
        'position:absolute;',
        'left:0;',
        'top:0;',
        'display:block;',
        'width:100%;',
        'height:100%;',
      '}'
    ].join('');
    document.head.appendChild(styleElem);
  };

  /**
   * @private
   * @param {DOMElement} elem
   * @param {String} className
   */
  AspectRatioFit.HasClass = function(elem, className) {
    var classNames = elem.className.split(' ');
    for (var i = 0; i < classNames.length; i++) {
      if (classNames[i].replace(/\s/g, '') === className) {
        return true;
      }
    }
    return false;
  };

  /**
   * @public
   * @param {DOMElement} elem
   * @param {String} className
   */
  AspectRatioFit.AddClass = function(elem, className) {
    if (AspectRatioFit.HasClass(elem, className)) {
      return;
    }

    var classNames = elem.className.split(' ');
    classNames.push(className);
    elem.className = classNames;
  };

  window.AspectRatioFit = AspectRatioFit;
})(window, document);
