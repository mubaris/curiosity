/**
 * Implement infinite scrolling
 * - Inspired by: http://ravikiranj.net/drupal/201106/code/javascript/how-implement-infinite-scrolling-using-native-javascript-and-yui3
 */

(function () {
    const isIE = /msie/gi.test(navigator.userAgent); // http://pipwerks.com/2011/05/18/sniffing-internet-explorer-via-javascript/

    this.infiniteScroll = function (options) {
        const defaults = {
            callback() {},
            distance: 50,
        };
        // Populate defaults
        for (const key in defaults) {
            if (typeof options[key] === 'undefined') options[key] = defaults[key];
        }

        const scroller = {
            options,
            updateInitiated: false,
        };

        window.onscroll = function (event) {
            handleScroll(scroller, event);
        };
        // For touch devices, try to detect scrolling by touching
        document.ontouchmove = function (event) {
            handleScroll(scroller, event);
        };
    };

    function getScrollPos() {
        // Handle scroll position in case of IE differently
        if (isIE) {
            return document.documentElement.scrollTop;
        }
        return window.pageYOffset;
    }

    let prevScrollPos = getScrollPos();

    // Respond to scroll events
    function handleScroll(scroller, event) {
        if (scroller.updateInitiated) {
            return;
        }
        const scrollPos = getScrollPos();
        if (scrollPos == prevScrollPos) {
            return; // nothing to do
        }

        // Find the pageHeight and clientHeight
        // (the no. of pixels to scroll to make the scrollbar reach max pos)
        const pageHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Check if scroll bar position is just 50px above the max, if yes, initiate an update
        if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
            scroller.updateInitiated = true;

            scroller.options.callback(() => {
                scroller.updateInitiated = false;
            });
        }

        prevScrollPos = scrollPos;
    }
}());
