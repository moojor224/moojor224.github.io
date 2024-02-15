type NonFunctionPropertyNames<T> = {
    [K in keyof T]: // loop through all keys (K) in type (T)
    T[K] extends Function ? // if prop is a function
    (K extends keyof Omit<GlobalEventHandlers, "addEventListener" | "removeEventListener"> ? // check if prop is an event listener
        K : // return event listener property
        never) : // exclude property
    K; // return non-function property
}[keyof T];

type CreateElementOptions<T> = Pick<T, NonFunctionPropertyNames<T>>;
// type CreateElementOptions<T> = CreateElementOptions<T>;

interface Window {
    createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: CreateElementOptions<HTMLElementTagNameMap[K]>): HTMLElementTagNameMap[K];
}