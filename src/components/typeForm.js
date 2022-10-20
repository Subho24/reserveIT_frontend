import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const TypeForm = (props) => {
    const { companyId } = useParams()

    const handleOnClick = ({target}) => {
        props.setSelectedType(target.innerText)
        props.setStepCount(2);
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/booking_instructions/${companyId}/?custom=booking_type`).then(response => {
            const typesArray = response.data.map(type => type.booking_type);
            props.setAvailableTypes(typesArray)
        })
    }, [])

    const types = props.AvailableTypes;
    return (
        <div className="typeContainer" style={{marginTop: 100}} >
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