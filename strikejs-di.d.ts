declare module "strikejs-di" {
    export type Iterator<T> = (o:T,i:number|string)=>void; 

    export type Dictionary<T> = {
        [idx:string]:T;
    }

    export function forEach<T>(obj:Dictionary<T>|T[],iterator:Iterator<T>):void;

    export interface DependencyStore {
        get<T>(key:string):T; 
    }

    export interface DependencyInjectorProps {
        injector:DependencyStore; 
        children?:any;
    }

    export function DI(props:DependencyInjectorProps):React.ReactElement<any>;
}