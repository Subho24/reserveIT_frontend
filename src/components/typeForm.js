import axios from "../axios";
import { useEffect } from "react";

export const TypeForm = (props) => {
    const companyId = props.companyInfo.company_id;

    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        if(!props.edit) {
            props.setStepCount(2);
        }
    }

    useEffect(() => {
        axios.get(`/api/booking_instructions/${companyId}/?custom=booking_type`, {
            data: JSON.stringify({
                accessKey: process.env.REACT_APP_ACCESS_KEY_2
            })
        }).then(response => {
            const typesArray = response.data.map(type => type.booking_type);
            props.setAvailableTypes(typesArray)
        })
    }, [])

    const types = props.AvailableTypes;
    return (
        <div className="typeContainer" >
            {
                types.map((type) => {
                    return(
                        <div className="type" onClick={handleOnClick} >
                            {type}
                        </div>
                    )
                })
            }
        </div>
    )
}