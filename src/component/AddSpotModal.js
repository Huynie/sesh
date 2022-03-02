import React from 'react';
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
} from 'reactstrap';
import Hours from './Hours';

const AddSpotModal = ({isOpen, toggle, submit}) => {
  const [spot, setSpot] = React.useState({
    name: "",
    address: "",
    phone: "",
    host: "",
    price: "",
    waiver: false
  })
  const [hours, setHours] = React.useState({});

  return (
    <Modal isOpen={isOpen} centered>
      <ModalHeader toggle={() => toggle()}>
        Add Spot
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input
              id="name"
              aria-label="name"
              type="text"
              placeholder="What is this spot called?"
              onChange={e => setSpot({...spot, name: e.target.value})}
              value={spot.name}
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              id="address"
              aria-label="address"
              type="text"
              placeholder="Where is this spot at?"
              onChange={e => setSpot({...spot, address: e.target.value})}
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
      </ModalBody>
      <ModalFooter>
        <Button 
          color={"primary"}
          size="sm"
          onClick={() => submit(spot, hours)}
        >Add
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default AddSpotModal;
