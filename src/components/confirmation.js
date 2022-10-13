export const Confirmation = (props) => {
    return (
        <div className="detailsContainer" >
            <p className="confirmType" >Type: {props.selectedType} </p>
            <p className="confirmPeople" >Number of people: {props.peopleAmount} </p>
            <p className="confirmDate" >Date: {props.selectedDate} </p>
            <p className="confirmTime" >Time: {props.selectedTime} </p>
        </div>
    )
}