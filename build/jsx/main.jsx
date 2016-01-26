// eBay Auctions List

class AuctionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ''
		};
	}
	componentDidMount() {
		let self = this;
		$.ajax({
			url: '//svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=' + this.props.apiKey + '&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + encodeURI(this.props.keywords) + '&itemFilter(0).name=Seller&itemFilter(0).value(0)=' + this.props.sellerId,
			dataType: 'jsonp'
		}).done((data) => {
			self.setState({
				items: data.findItemsAdvancedResponse[0].searchResult[0].item
			});
		});
	}
	render() {
		let items = this.state.items;
		if (items.length > 1) items = items.map((item, i) => <AuctionItem key={i} item={item} />);
		return (
			<ul>{items}</ul>
		);
	}
}

class AuctionItem extends React.Component {
	render() {
		let price = (<span className="price">{'$' + parseFloat(this.props.item.sellingStatus[0].currentPrice[0].__value__).toFixed(2)}</span>);
		return (
			<li><a href={this.props.item.viewItemURL} target="_blank"><img src={this.props.item.galleryURL} alt={this.props.item.title} /><h3>{this.props.item.title}</h3> {price}</a></li>
		);
	}
}

ReactDOM.render(<AuctionList sellerId="SELLERID" apiKey="APIKEY" keywords="KEYWORDS"/>, document.getElementById('result'));
