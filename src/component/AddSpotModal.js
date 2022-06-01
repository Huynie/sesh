import * as React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import AddSpotForm from './AddSpotForm';

const AddSpotModal = ({isOpen, toggle, submit, setAutocomplete}) => {
  const [hours, setHours] = React.useState({});
  const [spot, setSpot] = React.useState({
    name: "",
    address: "",
    phone: "",
    host: "",
    price: 0,
    waiver: false
  });

  const [invalid, setInvalid] = React.useState({
    name: false,
    address: false,
    phone: false,
    host: false,
  });

  const validate = () => {
    const emptyFields = Object.keys(spot).filter(key => spot[key] === "");
    if(emptyFields.length > 1) {
      let invalidFields = {};
      emptyFields.forEach(field => {
        invalidFields[field] = true;
      })
      setInvalid(invalidFields);
      throw new Error("all required fields must be filled out correctly.");
    }
  }

  return (
    <Modal isOpen={isOpen} zIndex={900} centered>
      <ModalHeader toggle={() => toggle(!isOpen)}>
        Add Spot
      </ModalHeader>
      <ModalBody>
       <AddSpotForm
        spot={spot}
        setSpot={setSpot}
        setHours={setHours}
        setAutocomplete={setAutocomplete}
        invalid={invalid}
       />
      </ModalBody>
      <ModalFooter>
        <Button 
          color={"add"}
          size="sm"
          onClick={() => submit(spot, hours, validate)}
        >Add
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default AddSpotModal;
