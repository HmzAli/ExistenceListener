/**
 * wfe.js
 * version : 0.0.1
 * author : Hamza Ali <hamza.ishak.ali@gmail.com>
 * description : Notifies when an element is added to the DOM
 * license : MIT
 */
(function () {
    function Wfe(selector, handler, config) {
        this._observer = null;
        this._config = !!config ? config : {
            rootElement: document.querySelector('html, body')
        };

        if (!!this._getElement(selector)) {
            handler.call(null, this._getElement(selector));
        } else {
            this._waitFor(selector)
            .then(element => {
                handler.call(null, element);
            });
        }
    }

    Wfe.prototype._getElement = function (selector) {
        if (!!this._element) {
            return this._element;
        }
        return document.querySelector(selector);
    }

    Wfe.prototype._waitFor = function (selector) {
        let self = this;

        return new Promise(function (resolve) {
            const observerConfig = {
                childList: true,
                attributes: false,
                subtree: true
            };

            self._observer = new MutationObserver(function (mutationList, observer) {
                if (!!self._getElement(selector)) {
                    resolve(self._getElement(selector));
                }
            });
            self._observer.observe(self._config.rootElement, observerConfig);
        });
    }
    window.Wfe = Wfe;
})();