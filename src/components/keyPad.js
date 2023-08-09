import { Box } from "@mui/system"

export const KeyPad = (props) => {    

    // useEffect(() => {
    //     if(props.personNumber.length === 8) {
    //         props.setPersonNumber((oldValue) => {
    //             console.log(oldValue)
    //             return oldValue + '-'
    //         })
    //     }
    // }, [props.personNumber])

    const handlePersonNumberInput = (newValue) => {
        props.setPersonNumber(oldValue => oldValue + newValue)
    }

    const handleBackSpace = () => {
        const personNumberArr = [...props.personNumber];
        personNumberArr.splice(personNumberArr.length - 1, 1);
        props.setPersonNumber(personNumberArr.join(''));
    }

    const handleClear = () => {
        props.setPersonNumber('');
    }

    const styles = {
        container: {
            margin: 'auto',
            width: '70%',
            padding: '17px',
        },

        table: {
            width: '100%',
            margin: '5px',
            textAlign: 'center',
            border: 'none'
        }
    }

    return (
        <>
            <Box style={{margin: '0px 20px 0 20px'}} >
                <div style={styles.container}>
                    <input type={'text'} className='pnInput' value={props.personNumber} placeholder='ÅÅÅÅMMDDXXXX' readOnly={true} />
                        {
                            props.employeeNotFound ? <p style={{color: 'red'}}>Personnummer is not registered</p> : null
                        }
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <td style={{border: 'none'}}>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(1)}>1</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(2)}>2</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(3)}>3</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{border: 'none'}}>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(4)}>4</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(5)}>5</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(6)}>6</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{border: 'none'}}>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(7)}>7</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(8)}>8</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(9)}>9</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{border: 'none'}}>
                                        <button className="keypadDials" onClick={handleClear}>C</button>
                                        <button className="keypadDials" onClick={() => handlePersonNumberInput(0)}>0</button>
                                        <button className="keypadDials" onClick={handleBackSpace}>Del</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </Box>
        </>

    )
}
