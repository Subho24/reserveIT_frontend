import { BsPeople } from 'react-icons/bs';

export const PeopleForm = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>How many people?</h1>
            <div style={{display: 'flex', fontSize: 30, margin: '0% 25% 0% 25%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'} style={{fontSize: 25}} max={6} />
            </div>
            <div className='Next'>Next</div>
        </div>
    )
}