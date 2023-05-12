import { LoadingVisual } from './Loading';

export const TimeForm = (props) => {
    // useEffect(() => {
    //     axios.get(`/api/booking_instructions/${companyId}`).then(response => {
    //         response.data.map(item => {
    //             if(item.booking_type === props.selectedType) {
    //                 setStartTime(item.booking_type_start)
    //                 setEndTime(item.booking_type_end)
    //             }
    //         })
    //     })
    // }, [])

    const timeAvailable = (time) => {
        const now = new Date();
        const selectedDate = new Date(props.selectedDate)
        const selectedTime = parseInt(time.split(':')[0]);

        if(selectedDate.toLocaleDateString() === now.toLocaleDateString()) {

            if(selectedTime - 3 >= now.getHours()) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }
 
    const handleOnClick = ({target}) => {
        // const now = new Date();
        // const selectedDate = new Date(props.selectedDate)
        // const selectedTime = new Date(`${selectedDate.getMonth() + 1} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${target.innerText} `)

        // if(selectedDate.toLocaleDateString() === now.toLocaleDateString()) {

        //     if(selectedTime.getHours() - 3 >= now.getHours()) {
        //         props.setSelectedTime(target.innerText);
        //         props.setStepCount(5);
        //         return;
        //     } else {
        //         alert('Vald tid är inte tillgänglig')
        //         return;
        //     }
        // }
        if(timeAvailable(target.innerText)) {
            props.setSelectedTime(target.innerText);
            props.setStepCount(5);
        } else {
            alert('Vald tid är inte tillgänglig')
            return;
        }
    }

    if(props.timeArr.length > 0) {
        return (
            <div className='formContainer' >
                <h1>Välj tid</h1>
                <div className='input'>
                    {                     
                        props.timeArr ? props.timeArr.map(time => <span className='floatingTabs' onClick={handleOnClick} style={{backgroundColor: timeAvailable(time) ? null : 'lightgrey' }} >{time}</span>) : null
                    }
                </div>
            </div>
        )
    } else {
        return <LoadingVisual />
    }

}

