import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchQuery } from "@/store/jobSlice"

const filterOptions = [
    {
        filterType: "Location",
        locationData: ['All','Delhi','Mumbai','Chennai','Pune','Bangluru','UttarPradesh']
    },
    {
        filterType: "Skill",
        locationData: ['Frontend Developer','Backend Developer','Full Stack Developer','Java Developer','MERN Stack','System Design','AI Expert']
    },
];

const FilterJob = () => {
    const [selectedValue, setSelectedValue] = useState('All');

    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    },[selectedValue,dispatch])

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1>Search By Filter</h1>
            <hr className="mt-3 border-2 border-orange-600" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}  >
                {
                    filterOptions.map((item, index) => (
                        <div key={index}>
                            <h1>{item.filterType}</h1>
                            {
                                item.locationData.map((data,i) => {
                                    const itemId = `id${index}-${i}`;
                                    return (
                                        <div className="cursor-pointer items-center space-x-2 my-2" key={i}>
                                            <RadioGroupItem 
                                                className="border-black" 
                                                value={data} 
                                                id={itemId}
                                                checked={selectedValue === data}
                                                
                                            />
                                            <Label className="cursor-pointer" htmlFor={itemId} >{data}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterJob