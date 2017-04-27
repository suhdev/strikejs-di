import * as R from 'react'; 

type Iterator<T> = (o:T,i:number|string)=>void; 

type Dictionary<T> = {
    [idx:string]:T;
}

function forEach<T>(obj:Dictionary<T>|T[],iterator:Iterator<T>){
    for(var key in obj){
        iterator(obj[key],key); 
    }
}

interface DependencyStore {
    get<T>(key:string):T; 
}

interface DependencyInjectorProps{
    injector:DependencyStore; 
    children?:any;
}

function inj(store:DependencyStore,el:R.ReactElement<any>|R.ReactElement<any>[]){
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

function DI(props:DependencyInjectorProps){
    let t = inj(props.injector,props.children); 
    return t[0];
}

export = DI; 

if (window){
    (window as any).StrikeJs = (window as any).StrikeJs || {}; 
    (window as any).StrikeJs.DI = DI; 
}