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
    return R.Children.map(el,(child:any)=>{
        let deps = {}; 
        let children = null; 
        if (child && child.props.children){
            children = inj(store,child.props.children); 
        }
        if (child && child.props && child.props.deps){
            forEach<string>(child.props.deps,(dep,key)=>{
                deps[dep] = store.get(typeof key === "number"?dep:key); 
            });
        }
        return R.createElement(child.type,{
            ...child.props,
            ...deps
        },children);
    });
}

function DI(props:DependencyInjectorProps){
    let t = inj(props.injector,props.children); 
    return t[0];
}

export = DI; 