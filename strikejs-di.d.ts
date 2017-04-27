declare module "strikejs-di" {
    type Iterator<T> = (o:T,i:number|string)=>void; 

    type Dictionary<T> = {
        [idx:string]:T;
    }

    function forEach<T>(obj:Dictionary<T>|T[],iterator:Iterator<T>):void;

    interface DependencyStore {
        get<T>(key:string):T; 
    }

    interface DependencyInjectorProps {
        injector:DependencyStore; 
        children?:any;
    }

    function DI(props:DependencyInjectorProps):React.ReactElement<any>;

    export = DI;
}