import axios from 'axios';
import authHeader from './auth-header';

class AuctionService {
    getAll() {
        return axios.get(process.env.REACT_APP_API_URL + 'auctions/all', { headers: authHeader() });
    }

    makeBid(id, bid, bidderId) {
        return axios.post(process.env.REACT_APP_API_URL + 'auctions/bid', {
            id,
            bid,
            bidder_id: bidderId,
        }, {
            headers: authHeader()
        }
        );
    }

    addAuction(title, deadline, ownerId) {
        return axios.post(process.env.REACT_APP_API_URL + 'auctions/create', {
            title,
            deadline,
            owner_id: ownerId,
        }, {
            headers: authHeader()
        }
        );
    }
}
export default new AuctionService();