import React from 'react';
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Col,
} from 'reactstrap';
import Hours from './Hours';

const AddSpotForm = ({spot, setSpot, setHours, setAutocomplete, invalid}) => {
  const addressRef = React.useRef();

  React.useEffect(()=>{
    if(addressRef.current){
      const handlePlaceSelect = () => () => {
        setSpot({...spot, address: addressRef.current.value});
      };
      setAutocomplete('address', addressRef, handlePlaceSelect);
    }
  }, [addressRef, setAutocomplete, spot, setSpot]);

  const phoneEntryFormat = (e) => {
    if(spot.phone.length === 0) {
      setSpot({...spot, phone:`(${e.target.value}`});
      return
    }
    if(spot.phone.length === 3) {
      setSpot({...spot, phone:`${e.target.value}) `});
      return
    }
    if(spot.phone.length === 8) {
      setSpot({...spot, phone:`${e.target.value}-`});
      return
    }
    setSpot({...spot, phone: e.target.value})
  }

  return (
    <Form>
      <FormGroup>
        <Label>Spot Name</Label>
        <Input
          id="name"
          aria-label="name"
          type="text"
          placeholder="Name of this spot?"
          onChange={e => setSpot({ ...spot, name: e.target.value })}
          value={spot.name}
          invalid={invalid.name}
          />
        <FormFeedback>Please fill out this field correctly.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input
          innerRef={addressRef}
          id="address"
          aria-label="address"
          type="text"
          placeholder="Where is this?"
          onChange={e => setSpot({ ...spot, address: e.target.value })}
          value={spot.address}
          invalid={invalid.address}
        />
        <FormFeedback>Please fill out this field correctly.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <Col className="pe-2">
            <Label>Phone</Label>
            <Input
              id="phone"
              aria-label="phone number input"
              type="phone"
              placeholder="Host phone number?"
              onChange={phoneEntryFormat}
              value={spot.phone}
              maxLength={14}
              invalid={invalid.phone}
            />
            <FormFeedback>Please fill out this field correctly.</FormFeedback>
          </Col>
          <Col className="ps-2">
            <Label>Host</Label>
            <Input
              id="host"
              aria-label="host"
              type="text"
              placeholder="Name of host?"
              onChange={e => setSpot({...spot, host: e.target.value})}
              value={spot.host}
              invalid={invalid.host}
            />
            <FormFeedback>Please fill out this field correctly.</FormFeedback>
          </Col>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <Col className="pe-2">
            <Label for="price">Price</Label>
            <InputGroup>
              <InputGroupText>$</InputGroupText>
              <Input
                id="price"
                aria-label="price"
                type="number"
                placeholder="Cost per practice?"
                onChange={e => setSpot({...spot, price: e.target.value})}
                value={spot.price}
              />
            </InputGroup>
          </Col>
          <Col className="ps-2">
            <Label for="waiver">Waiver</Label>
            <Input
              id="waiver"
              aria-label="waiver"
              type="select"
              // placeholder="How much does practice cost?"
              onChange={e => setSpot({...spot, waiver: e.target.value})}
              value={spot.waiver}
            >
              <option value={false}>not required</option>
              <option value={true}>required</option>
            </Input>
          </Col>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Hours save={setHours}/>
      </FormGroup>
    </Form>
  )
}

export default AddSpotForm