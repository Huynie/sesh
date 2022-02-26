import * as React from 'react';
import {
  Col,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  InputGroup,
} from 'reactstrap';

const Hours = ({save}) => {
  const days = React.useState(["sun", "mon", "tues", "wed", "thurs", "fri", "sat"]);
  const [hours, setHours] = React.useState({});
  const [isFocused, setIsFocused] = React.useState();

  React.useEffect(()=> {
    const newHours = {};
    days.forEach((day) => {
      const time = hours[day] ? `${hours[day]?.start} - ${hours[day]?.end}` : null;
      newHours[day] = time;
    });
    save(newHours);
  },[hours, days]);

  const toggleDay = (day) => {
    if(hours[day]) {
      if(isFocused === day) {
        setHours({...hours, [day]: null})
        return
      }
      setIsFocused(day);
      return
    }
    setHours({
      ...hours,
      [day]: {
        start: hours[day]?.start ?? '12:00 PM',
        end: hours[day]?.start ?? '12:00 AM'
      }
    });
    setIsFocused(day);
  }

  const TimeOptions = () => {
    const standardHours = [12,1,2,3,4,5,6,7,8,9,10,11];
    return (
      <React.Fragment>
        <option value="--:-- --">--:-- --</option>
        {
          standardHours.map((hour)=>{
            return (
              <React.Fragment key={hour}>
                <option value={`${hour}:00 AM`}>{hour}:00 AM</option>
                <option value={`${hour}:30 AM`}>{hour}:30 AM</option>
              </React.Fragment>
            )
          })
        }
        {
          standardHours.map((hour)=>{
            return (
              <React.Fragment key={hour}>
                <option value={`${hour}:00 PM`}>{hour}:00 PM</option>
                <option value={`${hour}:30 PM`}>{hour}:30 PM</option>
              </React.Fragment>
            )
          })
        }
      </React.Fragment>
    )
  } 

  return (
    <FormGroup>
      <Label>Days</Label>
      <ButtonGroup className="w-100 mb-3">
        {
          days.map((day, idx) => {
            return(
              <Button
                key={day}
                id={day}
                onClick={(e) => toggleDay(day)}
                color="primary"
                outline
                active={hours[day] ? true : false}
                children={day}
              />
            )
          })
        }
      </ButtonGroup>
      <InputGroup>
        <Col className="pe-2">
          <Label>Start</Label>
          <Input
            type="select"
            name="start"
            id="start"
            onChange={ e => setHours({...hours, [isFocused]: {...hours[isFocused], start: e.target.value}})}
            value={hours[isFocused]?.start ?? "--:-- --"}
          >
           <TimeOptions/>
          </Input>
        </Col>
        <Col className="ps-2">
          <Label>End</Label>
          <Input
            type="select"
            name="end"
            id="end"
            onChange={ e => setHours({...hours, [isFocused]: {...hours[isFocused], end: e.target.value}})}
            value={hours[isFocused]?.end ?? "--:-- --"}
          >
            <TimeOptions/>
          </Input>
        </Col>
      </InputGroup>
    </FormGroup>
  )
};

export default Hours;
