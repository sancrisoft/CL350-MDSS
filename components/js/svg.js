  // SVG related DOM manipulations custom methods
    SVGElement.prototype.hasClass = function (className) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
    };

    SVGElement.prototype.addClass = function (className) {
        if (!this.hasClass(className)) {
            var currentClasses = typeof this.getAttribute('class') !== "object" ? this.getAttribute('class') : "";
            if (currentClasses.length) {
                this.setAttribute('class', currentClasses + ' ' + className);
            }
            else {
                this.setAttribute('class', className);
            }
        }
    };

    SVGElement.prototype.removeClass = function (className) {
        if (this.hasClass(className)) {
            var removedClass = this.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
            var classList = this.getClassList();
            // console.log('classList: ' + classList);
            if (classList != null && classList.length <= 1 ) {
                this.removeAttribute('class');
            }
            else {
                var newClass = removedClass.trim();
                this.setAttribute('class', newClass);
            }
        }
    };

    SVGElement.prototype.replaceClass = function (className) {
        var currentClass =  this.getAttribute('class');
        if (currentClass != className) {
            if (this.hasAttribute('class')) {
                this.setAttribute('class', '');
            }
            this.addClass(className);
        }

    };

    SVGElement.prototype.toggleClass = function (className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
    };

    SVGElement.prototype.getClassList = function () {
        var classList = this.classList;
        if (classList && classList.length) {
            return this.classList;
        }
        else { // when no support like IE*/
            var classes = this.className.baseVal;
            classList = classes.split(" ");
            // returns an array -not empty item - or object with no length
            return classList != null && classList.length && classList[0].length ? classList : { length: 0 };
    }
    };