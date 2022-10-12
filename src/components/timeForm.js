export const TimeForm = (props, children) => {
    const openedHours = (props.closingTime - props.openingTime);
    const timePerCell = Math.round(openedHours/5);
    const bookableTimes = getBookableTimes(props.openingTime, openedHours);
    console.log(bookableTimes)

    return (
        <table>
            {
                bookableTimes.map((time, i) => {
                    return (
                        <tr>
                            <td>
                                {time}
                            </td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

const getBookableTimes = (openingTime, hours) => {
    let startTime = openingTime
    const bookableHours = [];
    for (let i = 0; i < hours; i++) {
      bookableHours.push(`${startTime}:00`)
      bookableHours.push(`${startTime}:30`)
      startTime++
    }

    return bookableHours;
  } 

