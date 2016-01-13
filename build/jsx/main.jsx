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
			url: '//svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=' + this.props.apiKey + '&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=button&itemFilter(0).name=Seller&itemFilter(0).value(0)=' + this.props.sellerId,
			dataType: 'jsonp'
		}).done((data) => {
			self.setState({
				items: data.findItemsAdvancedResponse[0].searchResult[0].item
			});
		});
	}
	render() {
		return (
			<div></div>
		);
	}
}

ReactDOM.render(<AuctionList sellerId="IDHERE" apiKey="KEYHERE" />, document.getElementById('result'));
