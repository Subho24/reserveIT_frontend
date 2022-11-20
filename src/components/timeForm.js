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

    const handleOnClick = (e) => {
        props.setSelectedTime(e.target.innerText);
        props.setStepCount(5);
    }

    if(props.timeArr.length > 0) {
        return (
            <div className='formContainer' >
                <h1>Which time?</h1>
                <div className='input'>
                    {/* <BsClock className='clockIcon'/>
                    < Select 
                        backspaceRemovesValue = {true}
                        isClearable={false}
                        isSearchable={false}
                        options={availableTimes}
                        isDisabled={false}
                        onChange={(e) => inputValue = e.value}
                    /> */}
                    {                     
                        props.timeArr ? props.timeArr.map(time => <span className='floatingTabs' onClick={handleOnClick} >{time}</span>) : null
                    }
                </div>
            </div>
        )
    } else {
        return <LoadingVisual />
    }

}

