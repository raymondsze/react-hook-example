# Introduction 
React MVVM architecture powered by pure React Hook.

### Disclaimer
Thanks [gaplo917](https://github.com/gaplo917) demostrate the strength of Mobx in Show-Me-The-Code event in Hong Kong.  
This example is a hook version of a simple crypto-currency price feed application https://github.com/gaplo917/mobx-react-mvvm-example.  
It is not full replacement to Mobx (At least it is not an observer pattern), if you want to use Mobx like what we could do in React Hook, please check out https://github.com/mobxjs/mobx-react-lite.  

### Objective:
* Demostrate how to write MVVM architecture using React Hook.
* Demostrate the possibility of pure React Hook to replace Mobx, we could still sepearate the 'View Model'.

### The Heart of MVVM (Same as what [gaplo917](https://github.com/gaplo917) mentioned)
* A ViewModel Hook should have **NO** dependency of React and should have no idea what the view looks like. (*Hook is perfect solution we could handle any side-effect that does not require any UI rendering*)
* A correct implementation of MVVM architecture should achieve 100% decoupled business logic / data flow from views.
* A pure VM is much easier to test than a "React components with state logic". (PS: I didn't write any unit test, but it should be easily achieved. See https://medium.com/@dawchihliou/testing-react-hooks-6d3ae95cd838.)
* VMs should be light & cheap and be easily re-implemented with the same interface that consumed by the view.

### Why Not Mobx ?
* Mobx is very powelful tool for state/flow managment. However, it **track the getter/setter to forceUpdate your react component**.
By this way, it is no longer the unidirectional flux pattern which Facebook recommend. If you are fan of Flux pattern, you may not want it.
* Mobx hack the **getter/setter** which you may get trouble for enumerable / serialzable issue. (i.e you may want pass the whole object with { ...observableObj }, but it won't work)
* Mobx use decorator and class heavily, you may feel bad if you are not fan of OOP pattern. (PS: https://github.com/mobxjs/mobx-react-lite introduce the possibility to use mobx like hook in pure functional component)

### Run in local
```
yarn install
yarn start

// go to http://localhost:3000
```

### Credit
[mobx-react-mvvm-example](https://github.com/gaplo917/mobx-react-mvvm-example) - [gaplo917](https://github.com/gaplo917)
