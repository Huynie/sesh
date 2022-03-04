import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Col
} from 'reactstrap';
import Hours from './Hours';

const AddSpotForm = ({spot, setSpot, setHours, setAutocomplete}) => {
  const addressRef = React.useRef();

  React.useEffect(()=>{
    if(addressRef.current){
      const handlePlaceSelect = () => () => {
        setSpot({...spot, address: addressRef.current.value});
      };
      setAutocomplete('address', addressRef, handlePlaceSelect);
    }
  }, [addressRef, setAutocomplete]);

  return (
    <Form>
      <FormGroup>
        <Label>Name</Label>
        <Input
          id="name"
          aria-label="name"
          type="text"
          placeholder="What is the Name?"
          onChange={e => setSpot({ ...spot, name: e.target.value })}
          value={spot.name}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input
          innerRef={addressRef}
          id="address"
          aria-label="address"
          type="text"
          placeholder="Where is this spot at?"
          onChange={e => setSpot({ ...spot, address: e.target.value })}
          value={spot.address}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          id="phone"
          aria-label="phone number input"
          type="phone"
          placeholder="Enter An phone number"
          onChange={e => setSpot({...spot, phone: e.target.value})}
          value={spot.phone}
          maxLength={80}
        />
      </FormGroup>
      <FormGroup>
        <Label>Host</Label>
        <Input
          id="host"
          aria-label="host"
          type="text"
          placeholder="Who is the host of this spot"
          onChange={e => setSpot({...spot, host: e.target.value})}
          value={spot.host}
        />
      </FormGroup>
      <FormGroup>
        <Hours save={setHours}/>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <Col className="px-2">
            <Label for="price">Price</Label>
            <Input
              id="price"
              aria-label="price"
              type="text"
              placeholder="How much does practice cost?"
              onChange={e => setSpot({...spot, price: e.target.value})}
              value={spot.price}
            />
          </Col>
          <Col className="px-2">
            <Label for="waiver">Waiver</Label>
            <Input
              id="waiver"
              aria-label="waiver"
              type="select"
              placeholder="How much does practice cost?"
              onChange={e => setSpot({...spot, waiver: e.target.value})}
              value={spot.waiver}
            >
              <option value={false}>not required</option>
              <option value={true}>required</option>
            </Input>
          </Col>
        </InputGroup>
      </FormGroup>
    </Form>
  )
}

export default AddSpotForm