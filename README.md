# strikejs-di

A declarative way to manage dependencies in ReactJS applications. A ReactJS component written in TyepScript to manage dependencies. 

```jsx

//ES6 imports 
import * as DI from 'strikejs-di'; 
import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 

//commonjs imports 

const DI = require('strikejs-di');
const React = require('react'); 
const ReactDOM = require('react-dom'); 

function makeStore(){
    let obj = {}; 
    return {
        set(key:string,val:any){
            obj[key] = val; 
            return this; 
        },
        get(key:string){
            return obj[key]; 
        }
    };
}

const store = makeStore(); 
store.set('test1','Just a test')
    .set('test2',2)
    .set('test3',{
        firstName:"John",
        lastName:"Doe"
    }}); 


class C1 extends React.Component<any,any>{
    render(){
        return (
            <div className="test">
                <div>{this.props.dep1}</div>
                <div className="test-1">{this.props.dep2}</div>
            </div>
        ); 
    }
}

class C2 extends React.Component<any,any>{
    render(){
        return (
            <div className="test-2">
                <div>{this.props.test1}</div>
                <div className="test-1">{this.props.test2}</div>
                {this.props.children}
            </div>
        ); 
    }
}

let div = documet.createElement('div'); 
document.querySelector('body').appendChild(div); 

ReactDOM.render(
    <DI injector={store}>
        <C1 deps={{test1:'dep1',test2:'dep2'}} />
        <C2 deps={['test1','test2']}>
            <C1 deps={['test1','test3']} />
        </C2>
    </DI>,div);


```