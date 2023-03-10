import * as Vue from 'vue';
import Vue__default, { VueConstructor, ComponentOptions as ComponentOptions$1, VNode, AsyncComponent } from 'vue';
import { VueConstructor as VueConstructor$1 } from 'vue/types/umd';

declare type Data = {
    [key: string]: unknown;
};

declare type ComponentPropsOptions<P = Data> = ComponentObjectPropsOptions<P> | string[];
declare type ComponentObjectPropsOptions<P = Data> = {
    [K in keyof P]: Prop<P[K]> | null;
};
declare type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
declare type DefaultFactory<T> = () => T | null | undefined;
interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
    validator?(value: unknown): boolean;
}
declare type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
declare type PropConstructor<T> = {
    new (...args: any[]): T & object;
} | {
    (): T;
} | {
    new (...args: string[]): Function;
};
declare type RequiredKeys<T> = {
    [K in keyof T]: T[K] extends {
        required: true;
    } | {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? K : never;
}[keyof T];
declare type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
declare type ExtractFunctionPropType<T extends Function, TArgs extends Array<any> = any[], TResult = any> = T extends (...args: TArgs) => TResult ? T : never;
declare type ExtractCorrectPropType<T> = T extends Function ? ExtractFunctionPropType<T> : Exclude<T, Function>;
declare type InferPropType<T> = T extends null ? any : T extends {
    type: null | true;
} ? any : T extends ObjectConstructor | {
    type: ObjectConstructor;
} ? Record<string, any> : T extends BooleanConstructor | {
    type: BooleanConstructor;
} ? boolean : T extends DateConstructor | {
    type: DateConstructor;
} ? Date : T extends FunctionConstructor ? Function : T extends Prop<infer V, infer D> ? unknown extends V ? D : ExtractCorrectPropType<V> : T;
declare type ExtractPropTypes<O> = O extends object ? {
    [K in RequiredKeys<O>]: InferPropType<O[K]>;
} & {
    [K in OptionalKeys<O>]?: InferPropType<O[K]>;
} : {
    [K in string]: any;
};
declare type DefaultKeys<T> = {
    [K in keyof T]: T[K] extends {
        default: any;
    } ? K : never;
}[keyof T];
declare type ExtractDefaultPropTypes<O> = O extends object ? {
    [K in DefaultKeys<O>]: InferPropType<O[K]>;
} : {};

declare type ComponentInstance = InstanceType<VueConstructor>;
declare type ComponentRenderProxy<P = {}, // props type extracted from props option
B = {}, // raw bindings returned from setup()
D = {}, // return from data()
C extends ComputedOptions = {}, M extends MethodOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false> = {
    $data: D;
    $props: Readonly<MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps>;
    $attrs: Data;
} & Readonly<P> & ShallowUnwrapRef<B> & D & M & ExtractComputedReturns<C> & Omit<Vue__default, '$data' | '$props' | '$attrs'>;
declare type VueConstructorProxy<PropsOptions, RawBindings, Data, Computed extends ComputedOptions, Methods extends MethodOptions> = VueConstructor & {
    new (...args: any[]): ComponentRenderProxy<ExtractPropTypes<PropsOptions>, ShallowUnwrapRef<RawBindings>, Data, Computed, Methods, ExtractPropTypes<PropsOptions>, ExtractDefaultPropTypes<PropsOptions>, true>;
};
declare type DefaultData<V> = object | ((this: V) => object);
declare type DefaultMethods<V> = {
    [key: string]: (this: V, ...args: any[]) => any;
};
declare type DefaultComputed = {
    [key: string]: any;
};
declare type VueProxy<PropsOptions, RawBindings, Data = DefaultData<Vue__default>, Computed extends ComputedOptions = DefaultComputed, Methods extends MethodOptions = DefaultMethods<Vue__default>> = ComponentOptions$1<Vue__default, ShallowUnwrapRef<RawBindings> & Data, Methods, Computed, PropsOptions, ExtractPropTypes<PropsOptions>> & VueConstructorProxy<PropsOptions, RawBindings, Data, Computed, Methods>;

interface SetupContext {
    readonly attrs: Data;
    readonly slots: Readonly<{
        [key in string]?: (...args: any[]) => VNode[];
    }>;
    /**
     * @deprecated not available in Vue 3
     */
    readonly parent: ComponentInstance | null;
    /**
     * @deprecated not available in Vue 3
     */
    readonly root: ComponentInstance;
    /**
     * @deprecated not available in Vue 3
     */
    readonly listeners: {
        [key in string]?: Function;
    };
    /**
     * @deprecated not available in Vue 3
     */
    readonly refs: {
        [key: string]: Vue__default | Element | Vue__default[] | Element[];
    };
    emit(event: string, ...args: any[]): void;
}
declare type ComputedGetter$1<T> = (ctx?: any) => T;
declare type ComputedSetter$1<T> = (v: T) => void;
interface WritableComputedOptions$1<T> {
    get: ComputedGetter$1<T>;
    set: ComputedSetter$1<T>;
}
declare type ComputedOptions = Record<string, ComputedGetter$1<any> | WritableComputedOptions$1<any>>;
interface MethodOptions {
    [key: string]: Function;
}
declare type SetupFunction<Props, RawBindings = {}> = (this: void, props: Props, ctx: SetupContext) => RawBindings | (() => VNode | null) | void;
interface ComponentOptionsBase<Props, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}> extends Omit<ComponentOptions$1<Vue__default, D, M, C, Props>, 'data' | 'computed' | 'method' | 'setup' | 'props'> {
    [key: string]: any;
    data?: (this: Props & Vue__default, vm: Props) => D;
    computed?: C;
    methods?: M;
}
declare type ExtractComputedReturns<T extends any> = {
    [key in keyof T]: T[key] extends {
        get: (...args: any[]) => infer TReturn;
    } ? TReturn : T[key] extends (...args: any[]) => infer TReturn ? TReturn : never;
};
declare type ComponentOptionsWithProps<PropsOptions = ComponentPropsOptions, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Props = ExtractPropTypes<PropsOptions>> = ComponentOptionsBase<Props, D, C, M> & {
    props?: PropsOptions;
    emits?: string[] | Record<string, null | ((emitData: any) => boolean)>;
    setup?: SetupFunction<Props, RawBindings>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M>>;
declare type ComponentOptionsWithArrayProps<PropNames extends string = string, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Props = Readonly<{
    [key in PropNames]?: any;
}>> = ComponentOptionsBase<Props, D, C, M> & {
    props?: PropNames[];
    emits?: string[] | Record<string, null | ((emitData: any) => boolean)>;
    setup?: SetupFunction<Props, RawBindings>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M>>;
declare type ComponentOptionsWithoutProps<Props = unknown, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}> = ComponentOptionsBase<Props, D, C, M> & {
    props?: undefined;
    emits?: string[] | Record<string, null | ((emitData: any) => boolean)>;
    setup?: SetupFunction<Props, RawBindings>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M>>;

declare type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends (<U>() => U extends Right ? 1 : 0) ? true : false;
declare type HasDefined<T> = Equal<T, unknown> extends true ? false : true;

declare function defineComponent<RawBindings, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}>(options: ComponentOptionsWithoutProps<unknown, RawBindings, D, C, M>): VueProxy<unknown, RawBindings, D, C, M>;
declare function defineComponent<PropNames extends string, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, PropsOptions extends ComponentPropsOptions = ComponentPropsOptions>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M>): VueProxy<Readonly<{
    [key in PropNames]?: any;
}>, RawBindings, D, C, M>;
declare function defineComponent<Props, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, PropsOptions extends ComponentPropsOptions = ComponentPropsOptions>(options: HasDefined<Props> extends true ? ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Props> : ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M>): VueProxy<PropsOptions, RawBindings, D, C, M>;

declare type ComponentOptions = ComponentOptionsWithoutProps | ComponentOptionsWithArrayProps | ComponentOptionsWithProps;
declare type Component = VueProxy<any, any, any, any, any>;
declare type ComponentOrComponentOptions = ComponentOptions | Component;
declare type AsyncComponentResolveResult<T = ComponentOrComponentOptions> = T | {
    default: T;
};
declare type AsyncComponentLoader = () => Promise<AsyncComponentResolveResult>;
interface AsyncComponentOptions {
    loader: AsyncComponentLoader;
    loadingComponent?: ComponentOrComponentOptions;
    errorComponent?: ComponentOrComponentOptions;
    delay?: number;
    timeout?: number;
    suspensible?: boolean;
    onError?: (error: Error, retry: () => void, fail: () => void, attempts: number) => any;
}
declare function defineAsyncComponent(source: AsyncComponentLoader | AsyncComponentOptions): AsyncComponent;

declare const Plugin: {
    install: (Vue: VueConstructor) => void;
};

declare const _refBrand: unique symbol;
interface Ref<T = any> {
    readonly [_refBrand]: true;
    value: T;
}
declare type ToRefs<T = any> = {
    [K in keyof T]: Ref<T[K]>;
};
declare type CollectionTypes = IterableCollections | WeakCollections;
declare type IterableCollections = Map<any, any> | Set<any>;
declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;
declare type BaseTypes = string | number | boolean | Node | Window;
declare type ShallowUnwrapRef<T> = {
    [K in keyof T]: T[K] extends Ref<infer V> ? V : T[K];
};
declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
declare type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref ? T : T extends Array<any> ? {
    [K in keyof T]: UnwrapRefSimple<T[K]>;
} : T extends object ? UnwrappedObject<T> : T;
declare type SymbolExtract<T> = (T extends {
    [Symbol.asyncIterator]: infer V;
} ? {
    [Symbol.asyncIterator]: V;
} : {}) & (T extends {
    [Symbol.hasInstance]: infer V;
} ? {
    [Symbol.hasInstance]: V;
} : {}) & (T extends {
    [Symbol.isConcatSpreadable]: infer V;
} ? {
    [Symbol.isConcatSpreadable]: V;
} : {}) & (T extends {
    [Symbol.iterator]: infer V;
} ? {
    [Symbol.iterator]: V;
} : {}) & (T extends {
    [Symbol.match]: infer V;
} ? {
    [Symbol.match]: V;
} : {}) & (T extends {
    [Symbol.replace]: infer V;
} ? {
    [Symbol.replace]: V;
} : {}) & (T extends {
    [Symbol.search]: infer V;
} ? {
    [Symbol.search]: V;
} : {}) & (T extends {
    [Symbol.species]: infer V;
} ? {
    [Symbol.species]: V;
} : {}) & (T extends {
    [Symbol.split]: infer V;
} ? {
    [Symbol.split]: V;
} : {}) & (T extends {
    [Symbol.toPrimitive]: infer V;
} ? {
    [Symbol.toPrimitive]: V;
} : {}) & (T extends {
    [Symbol.toStringTag]: infer V;
} ? {
    [Symbol.toStringTag]: V;
} : {}) & (T extends {
    [Symbol.unscopables]: infer V;
} ? {
    [Symbol.unscopables]: V;
} : {});
declare type UnwrappedObject<T> = {
    [P in keyof T]: UnwrapRef<T[P]>;
} & SymbolExtract<T>;
interface RefOption<T> {
    get(): T;
    set?(x: T): void;
}
declare class RefImpl<T> implements Ref<T> {
    readonly [_refBrand]: true;
    value: T;
    constructor({ get, set }: RefOption<T>);
}
declare function createRef<T>(options: RefOption<T>, readonly?: boolean): RefImpl<T>;
declare function ref<T extends object>(raw: T): T extends Ref ? T : Ref<UnwrapRef<T>>;
declare function ref<T>(raw: T): Ref<UnwrapRef<T>>;
declare function ref<T = any>(): Ref<T | undefined>;
declare function isRef<T>(value: any): value is Ref<T>;
declare function unref<T>(ref: T): T extends Ref<infer V> ? V : T;
declare function toRefs<T extends object>(obj: T): ToRefs<T>;
declare type CustomRefFactory<T> = (track: () => void, trigger: () => void) => {
    get: () => T;
    set: (value: T) => void;
};
declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>;
declare function toRef<T extends object, K extends keyof T>(object: T, key: K): Ref<T[K]>;
declare function shallowRef<T extends object>(value: T): T extends Ref ? T : Ref<T>;
declare function shallowRef<T>(value: T): Ref<T>;
declare function shallowRef<T = any>(): Ref<T | undefined>;
declare function triggerRef(value: any): void;
declare function proxyRefs<T extends object>(objectWithRefs: T): ShallowUnwrapRef<T>;

declare function isRaw(obj: any): boolean;
declare function isReactive(obj: any): boolean;
declare function shallowReactive<T extends object = any>(obj: T): T;
/**
 * Make obj reactivity
 */
declare function reactive<T extends object>(obj: T): UnwrapRef<T>;
/**
 * Make sure obj can't be a reactive
 */
declare function markRaw<T extends object>(obj: T): T;
declare function toRaw<T>(observed: T): T;

declare function isReadonly(obj: any): boolean;
declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
declare type Builtin = Primitive | Function | Date | Error | RegExp;
declare type DeepReadonly<T> = T extends Builtin ? T : T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>> : T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>> : T extends Promise<infer U> ? Promise<DeepReadonly<U>> : T extends {} ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : Readonly<T>;
declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>;
/**
 * **In @vue/composition-api, `reactive` only provides type-level readonly check**
 *
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
declare function readonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>>;
declare function shallowReadonly<T extends object>(obj: T): Readonly<T>;

/**
 * Set a property on an object. Adds the new property, triggers change
 * notification and intercept it's subsequent access if the property doesn't
 * already exist.
 */
declare function set<T>(target: any, key: any, val: T): T;

/**
 * Delete a property and trigger change if necessary.
 */
declare function del(target: any, key: any): void;

declare const onBeforeMount: (callback: Function) => void;
declare const onMounted: (callback: Function) => void;
declare const onBeforeUpdate: (callback: Function) => void;
declare const onUpdated: (callback: Function) => void;
declare const onBeforeUnmount: (callback: Function) => void;
declare const onUnmounted: (callback: Function) => void;
declare const onErrorCaptured: (callback: Function) => void;
declare const onActivated: (callback: Function) => void;
declare const onDeactivated: (callback: Function) => void;
declare const onServerPrefetch: (callback: Function) => void;

interface ComputedRef<T = any> extends WritableComputedRef<T> {
    readonly value: T;
}
interface WritableComputedRef<T> extends Ref<T> {
}
declare type ComputedGetter<T> = (ctx?: any) => T;
declare type ComputedSetter<T> = (v: T) => void;
interface WritableComputedOptions<T> {
    get: ComputedGetter<T>;
    set: ComputedSetter<T>;
}
declare function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;
declare function computed<T>(options: WritableComputedOptions<T>): WritableComputedRef<T>;

declare type WatchEffect = (onInvalidate: InvalidateCbRegistrator) => void;
declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
declare type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onInvalidate: InvalidateCbRegistrator) => any;
declare type MapSources<T> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never;
};
declare type MapOldSources<T, Immediate> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : never;
};
interface WatchOptionsBase {
    flush?: FlushMode;
}
declare type InvalidateCbRegistrator = (cb: () => void) => void;
declare type FlushMode = 'pre' | 'post' | 'sync';
interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
    immediate?: Immediate;
    deep?: boolean;
}
interface VueWatcher {
    lazy: boolean;
    get(): any;
    teardown(): void;
    run(): void;
    value: any;
}
declare type WatchStopHandle = () => void;
declare function watchEffect(effect: WatchEffect, options?: WatchOptionsBase): WatchStopHandle;
declare function watch<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(sources: T, cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T extends object, Immediate extends Readonly<boolean> = false>(source: T, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate>): WatchStopHandle;

interface InjectionKey<T> extends Symbol {
}
declare function provide<T>(key: InjectionKey<T> | string, value: T): void;
declare function inject<T>(key: InjectionKey<T> | string): T | undefined;
declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T, treatDefaultAsFactory?: boolean): T;

declare const useCssModule: (name?: string) => Record<string, string>;
/**
 * @deprecated use `useCssModule` instead.
 */
declare const useCSSModule: (name?: string) => Record<string, string>;

interface App {
    config: VueConstructor$1['config'];
    use: VueConstructor$1['use'];
    mixin: VueConstructor$1['mixin'];
    component: VueConstructor$1['component'];
    directive: VueConstructor$1['directive'];
    mount: Vue__default['$mount'];
    unmount: Vue__default['$destroy'];
}
declare function createApp(rootComponent: any, rootProps?: any): App;

declare type NextTick = Vue__default['$nextTick'];
declare const nextTick: NextTick;

declare const createElement: Vue.CreateElement;

/**
 * Displays a warning message (using console.error) with a stack trace if the
 * function is called inside of active component.
 *
 * @param message warning message to be displayed
 */
declare function warn(message: string): void;

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

declare type Slot = (...args: any[]) => VNode[];
declare type InternalSlots = {
    [name: string]: Slot | undefined;
};
declare type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>;
declare type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{
    [key in Event]: Options[key] extends (...args: infer Args) => any ? (event: key, ...args: Args) => void : (event: key, ...args: any[]) => void;
}[Event]>;
/**
 * We expose a subset of properties on the internal instance as they are
 * useful for advanced external libraries and tools.
 */
declare interface ComponentInternalInstance {
    uid: number;
    parent: ComponentInternalInstance | null;
    root: ComponentInternalInstance;
    /**
     * Vnode representing this component in its parent's vdom tree
     */
    vnode: VNode;
    /**
     * Root vnode of this component's own vdom tree
     */
    /**
     * The reactive effect for rendering and patching the component. Callable.
     */
    update: Function;
    data: Data;
    props: Data;
    attrs: Data;
    refs: Data;
    emit: EmitFn;
    slots: InternalSlots;
    emitted: Record<string, boolean> | null;
    proxy: ComponentInstance;
    isMounted: boolean;
    isUnmounted: boolean;
    isDeactivated: boolean;
}
declare function getCurrentInstance(): ComponentInternalInstance | null;

declare const version: string;

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue__default> {
        setup?: SetupFunction<Data, Data>;
    }
}

export default Plugin;
export { App, ComponentInstance, ComponentInternalInstance, ComponentRenderProxy, ComputedGetter, ComputedRef, ComputedSetter, Data, DeepReadonly, ExtractDefaultPropTypes, ExtractPropTypes, FlushMode, InjectionKey, PropOptions, PropType, Ref, SetupContext, SetupFunction, ShallowUnwrapRef, ToRefs, UnwrapRef, VueWatcher, WatchCallback, WatchEffect, WatchOptions, WatchOptionsBase, WatchSource, WatchStopHandle, WritableComputedOptions, WritableComputedRef, computed, createApp, createRef, customRef, defineAsyncComponent, defineComponent, del, getCurrentInstance, createElement as h, inject, isRaw, isReactive, isReadonly, isRef, markRaw, nextTick, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onServerPrefetch, onUnmounted, onUpdated, provide, proxyRefs, reactive, readonly, ref, set, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, useCSSModule, useCssModule, version, warn, watch, watchEffect };
