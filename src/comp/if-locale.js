import {
    BoundViewFactory,
    ViewSlot,
    customAttribute,
    templateController
} from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { TaskQueue } from 'aurelia-task-queue';
import { I18N } from 'aurelia-i18n';

/**
 * 根据国际化locale判断元素是否应该显示.
 */
@customAttribute('if-locale')
@templateController
@inject(BoundViewFactory, ViewSlot, TaskQueue, I18N)
export class IfLocale {
    constructor(viewFactory, viewSlot, taskQueue, i18n) {
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
        this.showing = false;
        this.taskQueue = taskQueue;
        this.view = null;
        this.$parent = null;
        this.i18n = i18n;
        this.locale = this.i18n.getLocale();
    }

    bind(bindingContext) {
        // Store parent bindingContext, so we can pass it down
        this.$parent = bindingContext;
        this.valueChanged(this.value);
    }

    valueChanged(newValue) {

        var lang = this.locale.replace(/["']/g, '');
        if (!_((_(newValue).isString() ? newValue.split('|') : [])).contains(lang)) {
            if (this.view !== null && this.showing) {
                this.taskQueue.queueMicroTask(() => {
                    let viewOrPromise = this.viewSlot.remove(this.view);
                    if (viewOrPromise instanceof Promise) {
                        viewOrPromise.then(() => this.view.unbind());
                    } else {
                        this.view.unbind();
                    }
                });
            }

            this.showing = false;
            return;
        }

        if (this.view === null) {
            this.view = this.viewFactory.create(this.$parent);
        }

        if (!this.showing) {
            this.showing = true;

            if (!this.view.isBound) {
                this.view.bind(this.$parent);
            }

            this.viewSlot.add(this.view);
        }
    }

    unbind() {
        if (this.view !== null && this.viewFactory.isCaching) {
            if (this.showing) {
                this.showing = false;
                this.viewSlot.remove(this.view, true, true);
            } else {
                this.view.returnToCache();
            }

            this.view = null;
        }
    }
}
