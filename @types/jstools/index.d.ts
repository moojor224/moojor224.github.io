type NonFunctionPropertyNames<T> = {
    [K in keyof T]: // loop through all keys (K) in type (T)
    T[K] extends Function ? // if prop is a function
    (K extends keyof Omit<GlobalEventHandlers, "addEventListener" | "removeEventListener"> ? // check if prop is an event listener
        K : // return event listener property
        never) : // exclude property
    K; // return non-function property
}[keyof T];

type CreateElementOptions<E> = Pick<E, NonFunctionPropertyNames<E>>; // get properties available to set

interface Window {
    createElement<Tag extends keyof HTMLElementTagNameMap>(tagName: Tag, options?: CreateElementOptions<HTMLElementTagNameMap[Tag]>): HTMLElementTagNameMap[Tag];
}

interface HTMLElement {
    add: (...arg0: HTMLElement[]) => this
}

type Without<T, K> = {
    [L in Exclude<keyof T, K>]: T[L];
}

type HTMLTabElement = HTMLDivElement;
type HTMLWarnElement = HTMLDivElement;
type HTMLErrorElement = HTMLDivElement;


interface HTMLElementTagNameMap {
    "warn": HTMLWarnElement
    "error": HTMLErrorElement
    "tab": HTMLTabElement
}