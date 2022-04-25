import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




export default function SimpleDialog(props) {


    /*handleClose() {
        props.onClose(this.state.selectedValue);
    };

    handleListItemClick(value) {
        props.onClose(value);
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeOnDate(event) {
        this.setState({ deadline: event.getTime() });
    }

    async createAuction() {
        debugger;
        await AuctionService.addAuction(this.state.title, this.state.deadline, this.props.currentUser.id);
        console.log(this.state)
    }*/


    return (
        <Modal show={props.open} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Auction</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={props.handleChange} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="datetime-local" name="deadline" onChange={props.handleChange} />
                </Form.Group>
            </Form></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClose={props.onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.addAuction}>
                    Create Auction
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
