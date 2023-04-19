export const PeopleForm = (props) => {
    
    const handleOnClick = (e) => {
        props.setPeopleAmount(e.target.innerText)
        props.setStepCount(3);
    }

    return (
        <div className='formContainer'>
            <h1>Välj antal personer</h1>
            {/* <div style={{display: 'inline-flex', fontSize: 30, margin: '0% 25% 0% 20%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'}  min={0} max={maxPeople} id='peopleAmount' value={props.peopleAmount} onChange={handleOnChange} required />
            </div>
            <br/>
            <input type='submit' className='Next' value={'Next'} onClick={handleOnClick} /> */}
            <div className='input'>
                {props.peopleArr ? props.peopleArr.map(num => {
                    return(
                        <span className='floatingTabs' onClick={e => handleOnClick(e)} >{num}</span>
                    )
                }): null}
            </div>
            <p className='people'>More than {props.peopleArr ? props.peopleArr.length : null} people? Send a mail to <a href={'https'}>{props.companyInfo.company_email}</a> </p>
        </div>
    )
}