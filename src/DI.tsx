import * as R from 'react'; 

export type Iterator<T> = (o:T,i:number|string)=>void; 

export type Dictionary<T> = {
    [idx:string]:T;
}

export function forEach<T>(obj:Dictionary<T>|T[],iterator:Iterator<T>){
    for(var key in obj){
        iterator(obj[key],key); 
    }
}

export interface DependencyStore {
    get<T>(key:string):T; 
}

export interface DependencyInjectorProps{
    injector:DependencyStore; 
    children?:any;
}

export function inj(store:DependencyStore,el:R.ReactElement<any>|R.ReactElement<any>[]){
    return R.Children.map(el,(c:any)=>{
        let deps = {}; 
        let chld = null; 
        if (c && c.props.children){
            chld = inj(store,c.props.children); 
        }
        if (c && c.props && c.props.deps){
            forEach<string>(c.props.deps,(dep,key)=>{
                deps[dep] = store.get(typeof key === "number"?dep:key); 
            });
        }
        return R.createElement(c.type,{
            ...c.props,
            ...deps
        },chld);
    });
}

export function DI(props:DependencyInjectorProps){
    let cc = R.Children.count(props.children); 
    if (!props.children || cc > 1){
        throw new Error(`DI can only have one root child component. ${cc} was given.`);
    }
    if (!props.injector){
        throw new Error('Please provide a valid implementation of a dependency injection container.');
    }
    let t = inj(props.injector,props.children); 
    return t[0];
}

if (self.document){
    (self as any).StrikeJs = (self as any).StrikeJs || {}; 
    (self as any).StrikeJs.DI = DI; 
}