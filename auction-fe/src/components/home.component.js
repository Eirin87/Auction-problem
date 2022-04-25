import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import AuctionService from "../services/auction.service";
import AuthService from '../services/auth.service';
import Auction from './auction.component';
import SimpleDialog from './simple.dialog.component';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      auctionsList: [],
      open: false,
    };
  }

  componentDidMount() {
    this.loadData();
    let intervalId = setInterval(async () => this.loadData(), 3600000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  async loadData() {
    try {
      const res = await AuctionService.getAll();
      const auctionsList = res.data.data.map(element => {
        let winner = undefined;
        console.log(element.deadline)
        console.log(new Date().getTime())
        if (new Date(element.deadline) < new Date()) {
          winner = element.email ? element.email : '--'
        }

        return {
          ...element,
          winner
        }
      })

      this.setState({
        auctionsList
      });
    } catch (error) {
      console.log(error)
    }


  }

  newAuction() {
    this.setState({ open: true });
  };


  handleClose() {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeOnDate(event) {
    this.setState({ deadline: event.getTime() });
  }

  async addAuction() {
    this.handleClose();
    await AuctionService.addAuction(this.state.title, this.state.deadline, this.state.currentUser.id);
    await this.loadData()
  }

  async makeBid(auction) {

    try {
      await AuctionService.makeBid(auction.id, this.state.bid, this.state.currentUser.id);
      const clone = [...this.state.auctionsList];
      clone.find(element => element.id === auction.id).bid = this.state.bid;
      this.setState({ auctionsList: [...clone] });
    } catch (err) {

      console.log(err);
    }

  }


  render() {
    const auctionsList = this.state.auctionsList.map(element => <Auction key={element.id.toString()
    } auction={element} handleChange={(event) => this.handleChange(event)} makeBid={() => { this.makeBid(element) }} />);

    return (

      <Container className="home__container">
        <Row>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>Awsome Bids!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
          </Navbar>
        </Row>
        <Row className="new-auction__button">
          <Button variant="primary" onClick={() => this.newAuction()}>
            New Auction
          </Button>
          <SimpleDialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            handleChangeOnDate={(event) => this.handleChangeOnDate(event)}
            handleChange={(event) => this.handleChange(event)}
            addAuction={() => { this.addAuction() }}
          />
        </Row>
        <Row>
          <ul className="auction-list__ul">{auctionsList}</ul>
        </Row>
      </Container>
    );
  }
}
