export const Confirmation = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Type: {props.selectedType} </h1>
            <h1>Number of people: {props.peopleAmount} </h1>
            <h1>Date: {props.selectedDate} </h1>
            <h1>Time: {props.selectedTime} </h1>
        </div>
    )
}