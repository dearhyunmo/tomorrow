import React from 'react';
import axios from 'axios';
import DaumPostCode from 'react-daum-postcode';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            posts: [],
            usePoint: 0,
            buyername: '',
            mobile: '',
            addr: '',
            etc: ''
        };
    }

    componentDidMount() {
        const { location } = this.props;
        // console.log(location.state.sendposts);
        this.setState({
            posts: location.state.sendposts
        })

        var totPrices = 0;
        var sendprice = 0;
        for (var i = 0; i < location.state.sendposts.length; i++) {
            var realPrice = location.state.sendposts[i].price;
            var date = new Date().getDate();
            // // console.log(date);
            if (date < 10)
                date = '0' + date;

            var days = location.state.sendposts[i].todaysale;
            days = days.substr(days.length - 2, 2);
            // // console.log(days);
            if (date === days)
                realPrice = location.state.sendposts[i].price / 100 * (100 - location.state.sendposts[i].tdr);
            else if (location.state.sendposts[i].discount_rate > 0)
                realPrice = location.state.sendposts[i].price / 100 * (100 - location.state.sendposts[i].discount_rate);

            var thisPrice = realPrice * location.state.sendposts[i].amount;
            totPrices = totPrices + thisPrice;
            // // console.log(totPrices);
        }
        if (totPrices > 30000) {
            sendprice = 0;
        } else {
            sendprice = 2500;
        }
        this.setState({
            productPrice: totPrices,
            productPriceString: totPrices.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
            sendPay: sendprice,
            sendPayString: sendprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
            totPay: totPrices + sendprice,
            totPayString: (totPrices + sendprice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
            PaymentString: (totPrices + sendprice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        })

        var Uid = sessionStorage.getItem('id');

        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/member/` + Uid
        ).then(res => {
            // // console.log(res.data);

            this.setState({
                name: res.data.name,
                email: res.data.email,
                points: res.data.points,
                mobile: res.data.mobile,
                addr: res.data.address
            })

            document.getElementById('order_name').value = this.state.name;
            document.getElementById('order_phone').value = this.state.mobile;
            document.getElementById('order_email').value = this.state.email;

            var points = this.state.points;
            var pointsString = points.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

            this.setState({
                pointsString: pointsString
            })

            var addrs = this.state.addr;
            // // // console.log(addrs);
            var addrArray = addrs.split(' / ');
            this.setState({
                zoneCode: addrArray[0],
                fullAddress: addrArray[1],
                addr2: addrArray[2]
            })

        });

        document.getElementById("usepoint").value = "0"
    }

    handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = '';
        let zoneCodes = data.zonecode;

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState({
            deliverAddr1: AllAddress,
            deliverAddr0: zoneCodes,
            addr1B: true,
            modalOpen: false
        })
        // document.getElementById('zipcode').value = AllAddress;
        // // console.log(zoneCodes);
        // // console.log(AllAddress);
    }
    openModal = () => {
        // // // console.log("?????????");
        this.setState({
            modalOpen: true
        })
    }
    closeModal = () => {
        // // // console.log("?????????");
        this.setState({
            modalOpen: false
        })
    }

    goBack = () => {
        this.props.history.goBack();
    };

    getOrderInfo = (e) => {
        // console.log(e.target.checked);
        if (e.target.checked) {
            document.getElementById("delivery_name").value = this.state.name;
            document.getElementById("delivery_name").readOnly = true;
            document.getElementById("delivery_p").value = this.state.mobile;
            document.getElementById("delivery_p").readOnly = true;
            document.getElementById("zipcode").value = this.state.zoneCode;
            document.getElementById("zipcode").readOnly = true;
            document.getElementById("addr1").value = this.state.fullAddress;
            document.getElementById("addr1").readOnly = true;
            document.getElementById("addr2").value = this.state.addr2;
            document.getElementById("addr2").readOnly = true;
        } else {
            document.getElementById("delivery_name").value = '';
            document.getElementById("delivery_name").readOnly = false;
            document.getElementById("delivery_p").value = '';
            document.getElementById("delivery_p").readOnly = false;
            document.getElementById("zipcode").value = '';
            document.getElementById("zipcode").readOnly = false;
            document.getElementById("addr1").value = '';
            document.getElementById("addr1").readOnly = false;
            document.getElementById("addr2").value = '';
            document.getElementById("addr2").readOnly = false;
        }
    }

    usePoints = (e) => {
        var usingPoint = 0;
        if (this.state.points > this.state.totPay) {
            usingPoint = this.state.totPay;
        } else {
            usingPoint = this.state.points;
        }
        var totPayStrings = (this.state.totPay - usingPoint).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        this.setState({
            usePoint: usingPoint,
            totPay: this.state.totPay - usingPoint,
            PaymentString: totPayStrings
        })
        document.getElementById('usepoint').value = usingPoint;
    }
    inputUsePoints = (e) => {
        var usingPoint = e.target.value;
        var totpay = (Number(this.state.totPay) + Number(this.state.usePoint)) - usingPoint;
        // // console.log("totPay : " + Number(this.state.totPay));
        // // console.log("usePoint : " + Number(this.state.usePoint));
        // // console.log(e.target.value);
        // // console.log("totPay + usePoint : " + (Number(this.state.totPay) + Number(this.state.usePoint)));
        var totPayStrings = totpay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        this.setState({
            usePoint: usingPoint,
            totPay: totpay,
            PaymentString: totPayStrings
        })
        document.getElementById('usepoint').value = usingPoint;

    }
    cDelivername = (e) => {
        this.setState({
            deliverName: e.target.value
        })
    }
    cDeliverP = (e) => {
        this.setState({
            deliverMobile: e.target.value
        })
    }
    cDeliveraddr0 = (e) => {
        this.setState({
            deliverAddr0: e.target.value
        })
    }
    cDeliveraddr1 = (e) => {
        this.setState({
            deliverAddr1: e.target.value
        })
    }
    cDeliveraddr2 = (e) => {
        this.setState({
            deliverAddr2: e.target.value,
            addr2B: true,
        })
    }
    changeetc = (e) => {
        this.setState({
            etc: e.target.value
        })
    }

    payStart = (e) => {
        var Uid = sessionStorage.getItem('id');

        var deliverName = document.getElementById("delivery_name").value;
        var deliverMobile = document.getElementById("delivery_p").value;
        var deliverAddr0 = document.getElementById("zipcode").value;
        var deliverAddr1 = document.getElementById("addr1").value;
        var deliverAddr2 = document.getElementById("addr2").value;

        var j = this.state.posts.length;
        var List = new Object();

        var arrnowpayHistory = new Array();
        for (var i = 0; i < j; i++) {
            var realPrice = this.state.posts[i].price;
            var date = new Date().getDate();
            // // console.log(date);
            if (date < 10)
                date = '0' + date;

            var days = this.state.posts[i].todaysale;
            days = days.substr(days.length - 2, 2);
            // // console.log(days);
            if (date === days)
                realPrice = this.state.posts[i].price / 100 * (100 - this.state.posts[i].tdr);
            else if (this.state.posts[i].discount_rate > 0)
                realPrice = this.state.posts[i].price / 100 * (100 - this.state.posts[i].discount_rate);

            var thisPrice = realPrice * this.state.posts[i].amount;

            // var itemID = "nowpay" + i;
            var nowpay = new Object();
            nowpay.item_name = this.state.posts[i].name;
            nowpay.item_code = this.state.posts[i].menu_id;
            nowpay.quantity = this.state.posts[i].amount;
            nowpay.total_mount = thisPrice;
            nowpay.tax_free_amount = 0;
            nowpay.point = Number(this.state.usePoint);
            nowpay.name = deliverName;
            nowpay.mobile = deliverMobile;
            nowpay.addr = deliverAddr0 + " / " + deliverAddr1 + " / " + deliverAddr2;
            nowpay.etc = this.state.etc;
            nowpay.uppoint = this.state.productPrice / 100 * 3;
            nowpay.total_amount = this.state.totPay;
            // console.log(this.state.deliverName);


            arrnowpayHistory.push(nowpay);
        }
        List = arrnowpayHistory;

        axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/pay/kakaoPay/` + Uid, JSON.stringify(List), {
            headers: {
                "Content-Type": `application/json`,
                "Access-Control-Allow-Origin": "*"
            },
            // params: {
            //     nowpay: List
            // }
        }).then(res => {
            // console.log(res);
            // console.log('data is ' + res.data);
            const url = res.data;
            window.location.replace(url);
            // if (res.data === "FAIL") {
            //     alert("???????????? ????????? ????????????.");
            // }
            // else {
            //     alert("???????????? ???????????? : " + res.data + " ?????????.");
            // }
        })
        // console.log(List);
    }

    render() {
        const {
            modalOpen
        } = this.state;

        const width = 595;
        const height = 450;
        const modalStyle = {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
            border: "1px solid #000000",
            overflow: "hidden"
        }
        return (
            <div id="sub">
                <div className="size order_page">
                    <div className="sequence">
                        <ul className="clear">
                            <li>
                                <div className="order">
                                    <div className="tb">
                                        <div className="tbc">
                                            <img src="/img/sequence1.png" alt="????????????" />
                                            <div className="txt">
                                                <em>STEP01</em>
                                                <span>????????????</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="order on">
                                    <div className="tb">
                                        <div className="tbc">
                                            <img src="/img/sequence2.png" alt="????????????" />
                                            <div className="txt">
                                                <em>STEP02</em>
                                                <span>????????????</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="order">
                                    <div className="tb">
                                        <div className="tbc">
                                            <img src="/img/sequence3.png" alt="????????????" />
                                            <div className="txt">
                                                <em>STEP03</em>
                                                <span>????????????</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="order last">
                                    <div className="tb">
                                        <div className="tbc">
                                            <img src="/img/sequence4.png" alt="????????????" />
                                            <div className="txt">
                                                <em>STEP04</em>
                                                <span>????????????</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="product_list">
                        <table>
                            <colgroup>
                                <col width="*" />
                                <col width="15%" />
                                <col width="5%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>????????????</th>
                                    <th>?????????</th>
                                    <th>??????</th>
                                    <th>??????</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    this.state.posts.map((post, idx) => {
                                        // // console.log(post);
                                        var realPrice = post.price;
                                        var date = new Date().getDate();
                                        // // console.log(date);
                                        if (date < 10)
                                            date = '0' + date;

                                        var days = post.todaysale;
                                        days = days.substr(days.length - 2, 2);
                                        // // console.log(days);
                                        if (date === days)
                                            realPrice = post.price / 100 * (100 - post.tdr);
                                        else if (post.discount_rate > 0)
                                            realPrice = post.price / 100 * (100 - post.discount_rate);

                                        var realPriceString = realPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                        var eachpay = post.amount * realPrice;
                                        var eachpayString = eachpay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                        var checkBoxid = "pro" + (idx + 1);
                                        var pImgId = "pro" + (idx + 1) + "_img";
                                        var amountCntId = "amountCnt" + (idx + 1);
                                        var upAmountCntId = "1amountCnt" + (idx + 1);
                                        var downAmountCntId = "2amountCnt" + (idx + 1);
                                        var priceString = realPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                        var payId = "eachtotal" + (idx + 1);

                                        return (
                                            <tr key={idx}>
                                                <td className="pro_info">
                                                    <a style={{ cursor: `default` }}>
                                                        <div>
                                                            <p id="pro1_img" style={{ backgroundImage: `url(${post.img1})`, borderRadius: '5px' }}>
                                                                <img src="/img/product_bg.png" />
                                                            </p>
                                                            <span>{post.name}</span>
                                                        </div>
                                                    </a>
                                                </td>
                                                <td className="m_info">
                                                    <em className="m_block">????????? :</em> {realPriceString}???
                                    </td>
                                                <td className="m_info">
                                                    <em className="m_block">?????? :</em> {post.amount} </td>
                                                <td className="m_info bottom">
                                                    <em className="m_block">?????? :</em> {eachpayString}???
                                    </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>

                    <div className="price_result clear">
                        <span>?????? ???????????? <b>{this.state.productPrice}</b>???	+ ????????? <b>{this.state.sendPay}</b>??? <em className="mbr">= ??? ?????? <b className="result">{this.state.totPayString}<span>???</span></b></em></span>
                    </div>

                    <div className="util_bt">
                        <a onClick={this.goBack}><img src="/img/pro_back.png" />?????? ?????????</a>
                    </div>

                    <div className="order_info">
                        <h3>????????? ??????</h3>
                        <table className="write">
                            <colgroup>
                                <col width="13%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th className="first"><span>??????????????? ??? <em className="essential">*</em></span></th>
                                    <td className="order_n first">
                                        <input type="text" id="order_name" name="ordername" readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>??????????????? <em className="essential">*</em></span></th>
                                    <td className="order_p">
                                        <input type="text" id="order_phone" name="orderhp" readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="last"><span>????????? ?????? <em className="essential">*</em></span></th>
                                    <td className="order_e last">
                                        <input type="text" id="order_email" name="orderemail" readOnly />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>????????? ??????</h3>
                        <table className="write">
                            <colgroup>
                                <col width="13%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th className="first"><span>????????? ??????</span></th>
                                    <td className="delivery_check first">
                                        <input type="checkbox" id="delivery_same" onChange={this.getOrderInfo} />
                                        <label htmlFor="delivery_same">????????? ????????? ??????</label>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>???????????? ???<em className="essential">*</em></span></th>
                                    <td className="delivery_n">
                                        <input type="text" id="delivery_name" name="receiptname" onChange={this.cDelivername} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>??????????????? <em className="essential">*</em></span></th>
                                    <td className="delivery_p">
                                        <input type="text" id="delivery_p" name="receipthp" onChange={this.cDeliverP} />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="addr_th"><span>?????? <em className="essential">*</em></span></th>
                                    <td colSpan="3" className="addr">
                                        <p className="clear">
                                            <a onClick={this.openModal}><input type="text" name="zipcode" onChange={this.cDeliveraddr0} id="zipcode" className="wid200" readOnly /></a>
                                            <a onClick={this.openModal} id="gopost">????????????</a>
                                            {/* ???????????? api */}
                                        </p>
                                        <p className="inline">
                                            <input type="text" name="receiptaddr1" id="addr1" onChange={this.cDeliveraddr1} readOnly placeholder="????????????" />
                                        </p>
                                        <p className="inline">
                                            <input type="text" name="receiptaddr2" id="addr2" placeholder="???????????????" onChange={this.cDeliveraddr2} />
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="last"><span>????????? ??????</span></th>
                                    <td className="last">
                                        <input type="text" id="comment" name="memo" onChange={this.changeetc} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* ???????????? */}

                        <h3>?????? ??????</h3>
                        <table className="write">
                            <colgroup>
                                <col width="13%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th className="first"><span>?????? ????????????</span></th>
                                    <td className="first">
                                        {this.state.productPriceString}???
                                    </td>
                                </tr>
                                <tr>
                                    <th><span>?????????</span></th>
                                    <td>
                                        {this.state.sendPayString}???
                                    </td>
                                </tr>
                                <tr>
                                    <th className="point_th"><span>?????? ?????????</span></th>
                                    <td className="point">
                                        <input type="number" min="0" name="usepoint" onChange={this.inputUsePoints} id="usepoint" />
                                        <a onClick={this.usePoints}>????????????</a> <span>??????????????? : <em id="nowpoint">{this.state.pointsString}</em></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="point_th"><span>?????? ????????????</span></th>
                                    <td className="point">
                                        <span className="getPoint">{this.state.productPrice / 100 * 3}</span>???
                                    </td>
                                </tr>
                                <tr>
                                    <th className="last"><span>??? ?????? ??????</span></th>
                                    <td className="total last">
                                        <span id="resultprice">{this.state.PaymentString}</span>???
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="last_check">
                        <input type="checkbox" id="last_ck" name="order_agree" />
                        <label htmlFor="last_ck">???????????? ????????? ??????????????? ??????????????????, <em className="mbr">??????????????? ???????????????.</em></label>

                        <div className="bt">
                            <a onClick={this.payStart}>????????????</a>
                            {/* ????????? ?????? ?????? */}
                        </div>
                    </div>
                </div>
                <div className={modalOpen ? 'openModal modal' : 'modal'} >
                    <a onClick={this.closeModal} className="modalBack">
                        {modalOpen ? (
                            <div className="modalRow">
                                <div className="modalCell">
                                    <DaumPostCode
                                        onComplete={this.handleAddress}
                                        autoClose
                                        width={width}
                                        height={height}
                                        style={modalStyle}
                                        theme={null}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </a>
                </div>
            </div>
        )
    }


}
export default Order;
