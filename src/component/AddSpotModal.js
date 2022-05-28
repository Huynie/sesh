import * as React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import AddSpotForm from './AddSpotForm';

const AddSpotModal = ({isOpen, toggle, submit, setAutocomplete}) => {
  const [hours, setHours] = React.useState({});
  const [spot, setSpot] = React.useState({
    name: "",
    address: "",
    phone: "",
    host: "",
    price: "",
    waiver: false
  })

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
       />
      </ModalBody>
      <ModalFooter>
        <Button 
          color={"add"}
          size="sm"
          onClick={() => submit(spot, hours)}
        >Add
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default AddSpotModal;
