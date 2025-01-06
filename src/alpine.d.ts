// alpine.d.ts

declare global {
    interface Window {
        Alpine: Alpine;
    }
}

/**
 * Core Alpine.js Interface
 */
interface Alpine {
    /**
     * Starts Alpine.js
     */
    start(): void;

    /**
     * Defines a new Alpine data component.
     */
    data<T>(name: string, callback: () => T): void;

    /**
     * Defines a global Alpine store.
     */
    store<T>(name: string, value: T): void;

    /**
     * Retrieves a store by name.
     */
    store<T>(name: string): T;

    /**
     * Registers a magic property.
     * @param name The name of the magic property (e.g., `$myMagic`).
     * @param callback The callback that returns the magic property.
     */
    magic(
        name: string,
        callback: (
            el: HTMLElement,
            context: {
                Alpine: Alpine;
                effect: (callback: () => void) => void;
                cleanup: (callback: () => void) => void;
            }
        ) => any
    ): void;

    /**
     * Registers a plugin with Alpine.js.
     */
    plugin(plugin: (Alpine: Alpine) => void): void;

    /**
     * Initializes the Alpine tree for a given element.
     */
    initTree(el: HTMLElement): void;

    /**
     * Retrieves Alpine data from a specific DOM node.
     */
    $data<T>(el: HTMLElement): T;

    /**
     * Clones an Alpine state.
     */
    clone<T>(state: T): T;

    /**
     * Creates an Alpine reactive effect.
     */
    effect(callback: () => void): void;
}

/**
 * Alpine Magic Properties
 */
interface AlpineMagicProperties {
    $el: HTMLElement;
    $refs: Record<string, HTMLElement>;
    $store: Record<string, any>;
    $data: Record<string, any>;
    $watch: (property: string, callback: (value: any) => void) => void;
    $nextTick: (callback: () => void) => void;
    $dispatch: (event: string, detail?: any) => void;
    $id: (name: string) => string;
    $root: HTMLElement;
}

/**
 * Alpine Directive Syntax
 */
interface AlpineDirectiveHandlers {
    "x-data": object | (() => object);
    "x-model": any;
    "x-show": boolean;
    "x-bind": Record<string, any>;
    "x-if": boolean;
    "x-for": string;
    "x-transition": string;
    "x-ref": string;
    "x-init": () => void | string;
    "x-on": Record<string, (event: Event) => void>;
    "x-html": string;
    "x-text": string;
    "x-cloak": boolean;
}

/**
 * Alpine Store Interface
 */
interface AlpineStore {
    [key: string]: any;
}

/**
 * Alpine Component Interface
 */
interface AlpineComponent<T = any> {
    $el: HTMLElement;
    $data: T;
    $refs: { [key: string]: HTMLElement };
    $store: AlpineStore;
    $watch: (key: string, callback: (value: any) => void) => void;
    $nextTick: (callback: () => void) => void;
    $dispatch: (event: string, detail?: any) => void;
}


/**
 * Alpine Magic Handlers
 */
declare const $el: HTMLElement;
declare const $refs: Record<string, HTMLElement>;
declare const $store: Record<string, any>;
declare const $data: Record<string, any>;
declare const $watch: (property: string, callback: (value: any) => void) => void;
declare const $nextTick: (callback: () => void) => void;
declare const $dispatch: (event: string, detail?: any) => void;
declare const $id: (name: string) => string;
declare const $root: HTMLElement;

/**
 * Alpine Instance on Window
 */
declare const Alpine: Alpine;

export { };