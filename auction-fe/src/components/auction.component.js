import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function SimpleDialog(props) {
    let auctionDetails;
    let bidForm;

    if (props.auction.winner) {
        auctionDetails = (
            <div>
                Winner: {props.auction.winner}
            </div>
        );


    } else {
        auctionDetails = (
            <div>
                <div>
                    Last bid: {props.auction.bid ? props.auction.bid + ' €' : '--'}
                </div>
                <div>
                    Deadline: {props.auction.deadline ? new Date(props.auction.deadline).toLocaleString() : '--'}
                </div>
            </div>
        );

        bidForm = (
            <div className="auction__container">
                <FormControl className="auction-input">
                    <OutlinedInput
                        name="bid"
                        onChange={props.handleChange}
                        label="Bid"
                        type="number"
                    />
                </FormControl>
                <Button variant="primary" className="auction-button" onClick={props.makeBid} >Bid</Button>
            </div>
        );
    }

    return (
        <Card className="auction-list__card">
            <Card.Body>
                <Card.Title>{props.auction.title}</Card.Title>
                <div>
                    {auctionDetails}
                </div>
                {bidForm}
            </Card.Body>
        </Card >
    );

}