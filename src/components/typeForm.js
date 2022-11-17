import axios from "../axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const TypeForm = (props) => {
    const { companyId } = useParams()

    console.log(props.companyInfo)

    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        props.setStepCount(2);
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