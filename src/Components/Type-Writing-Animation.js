import { useState, useEffect } from "react";

const Phase = Object.freeze({
    Typing: "Typing",
    Pausing: "Pausing",
    Deleting: "Deleting"
});
const Typing_Interval = 150;
const Pause_Interval = 1000;
const Deleting_Interval = 50;
export const useTypedDepartments = (dept) => {
    const [currIndex, setcurrIndex] = useState(0);
    const [phase, setPhase] = useState(Phase.Typing);  
    const [DepartmentsToType, setDepartmentsToType] = useState('');
        useEffect(() => {
            switch(phase){
                case Phase.Typing:{
                    const nextDepartmentToType = dept[currIndex].slice(0, DepartmentsToType.length+1);
                    if(nextDepartmentToType === DepartmentsToType){
                        setPhase(Phase.Pausing);
                        return
                    }
                    const timeout = setTimeout(() => {
                        setDepartmentsToType(nextDepartmentToType);
                        // setPhase(Phase.Deleting);
                    }, Typing_Interval);
                    return () => clearTimeout(timeout);
                }
                
                case Phase.Pausing:
                    const timeout1 = setTimeout(() => {
                        setPhase(Phase.Deleting);
                    }, Pause_Interval);
                    return () => clearTimeout(timeout1);
                
                case Phase.Deleting: {
                    if(!DepartmentsToType){
                        const nextIndex = currIndex+1;
                        setcurrIndex(dept[nextIndex]?nextIndex:0);
                        setPhase(Phase.Typing);
                        return
                    }
                    const nextDepartmentToDelete = dept[currIndex].slice(0, DepartmentsToType.length-1);
                    const timeout = setTimeout(() => {
                        setDepartmentsToType(nextDepartmentToDelete);
                        // setPhase(Phase.Deleting);
                    }, Deleting_Interval);
                    return () => clearTimeout(timeout);
                }

                default:
                    // const timeout = setTimeout(() => {
                    //     setPhase(Phase.Deleting);
                    // }, Pause_Interval);
                    return
            }
        }, [dept, DepartmentsToType, currIndex, phase]);
        return DepartmentsToType;
    };