import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import '../css/User.css';

class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.Uid,
            isSeller: props.isseller,
            posts: [],
            sendposts: [],
            amount: 1,
            sendpay: 2500,
            pays: 0,
            totpay: 0,
            totpayString: '',
            sendpayString: '',
            paysString: '',
            change: ''
        }
    }

    componentDidMount() {
        // if (this.state.id === "") {
        //     this.setState({
        //         id: sessionStorage.getItem('id'),
        //         isseller: sessionStorage.getItem('isSeller')
        //     })
        // }
        // var Uid = sessionStorage.getItem('id');
        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/cart`, {
            params: {
                id: sessionStorage.getItem('id')
            }
        }).then(res => {
            this.setState({
                posts: res.data
            })

            var totPrices = 0;
            var sendprice = 0;

            if (totPrices > 30000) {
                sendprice = 0;
            } else {
                sendprice = 2500;
            }
            this.setState({
                pays: totPrices,
                paysString: totPrices.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                sendpay: sendprice,
                sendpayString: sendprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                totpay: totPrices + sendprice,
                totpayString: (totPrices + sendprice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            })
            // setPays(totPrices);
            // setPaysString(totPrices.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

            // setSendPay(sendprice);
            // setSendPayString(sendprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

            // setTotPay(totPrices + sendprice);
            // setTotPayString((totPrices + sendprice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
        })
    }

    render() {
        const {
            id,
            isSeller,
            posts,
            sendposts,
            amount,
            sendpay,
            pays,
            totpay,
            totpayString,
            sendpayString,
            paysString
        } = this.state

        const goBack = () => {
            window.location.replace('/goods');
        };

        const checkAll = (e) => {
            var checkall = document.getElementById("check_all");
            var checkboxes = document.getElementsByClassName("session_check");
            // session_check
            var Pays = 0, sendpays = 0;
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = checkall.checked;
            }

            if (checkall.checked) {
                posts.map((post, idx) => {
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

                    Pays += (realPrice * post.amount);
                })
            } else {
                Pays = 0;
                sendpays = 2500;
            }
            if (Pays >= 30000)
                sendpays = 0;
            else {
                sendpays = 2500;
            }

            var totpayStrings = (Pays + sendpays).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            this.setState({
                pays: Pays,
                paysString: Pays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),

                totpay: Pays + sendpays,
                sendpay: sendpays,
                totpayString: totpayStrings,
                sendpayString: sendpays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            })

            var j = posts.length;

            var checkboxes = document.getElementsByClassName("session_check");
            // session_check

            var List = new Object();

            var arrnowpayHistory = new Array();

            for (var i = 0; i < j; i++) {
                var realPrice = posts[i].price;
                var date = new Date().getDate();
                // // console.log(date);
                if (date < 10)
                    date = '0' + date;

                var days = posts[i].todaysale;
                days = days.substr(days.length - 2, 2);
                // // console.log(days);
                if (date === days)
                    realPrice = posts[i].price / 100 * (100 - posts[i].tdr);
                else if (posts[i].discount_rate > 0)
                    realPrice = posts[i].price / 100 * (100 - posts[i].discount_rate);

                var thisPrice = realPrice * posts[i].amount;

                // var itemID = "nowpay" + i;
                var nowpay = new Object();
                nowpay.amount = posts[i].amount;
                nowpay.cart_id = posts[i].cart_id;
                nowpay.category = posts[i].category;
                nowpay.create_at = posts[i].create_at;
                nowpay.discount_rate = posts[i].discount_rate
                nowpay.id = posts[i].id;
                nowpay.img1 = posts[i].img1;
                nowpay.img2 = posts[i].img2;
                nowpay.menu_id = posts[i].menu_id;
                nowpay.name = posts[i].name;
                nowpay.price = posts[i].price;
                nowpay.seller_id = posts[i].seller_id;
                nowpay.subname = posts[i].subname;
                nowpay.tdr = posts[i].tdr;
                nowpay.todaysale = posts[i].todaysale;

                arrnowpayHistory.push(nowpay);
            }
            List = arrnowpayHistory;

            this.setState({
                sendposts: List
            })
        }

        const deleteCart = (e) => {
            var checkboxes = document.getElementsByClassName("session_check");

            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked === true) {
                    var cartId = checkboxes[i].value;
                    // console.log(cartId);
                    axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/cart`, {
                        params: {
                            id: cartId
                        }
                    }).then(res => {
                        alert('?????????????????????.');
                    })
                }
            }
        }

        const selectPost = (e) => {

            var j = posts.length;

            var checkboxes = document.getElementsByClassName("session_check");
            // session_check

            var List = new Object();

            var arrnowpayHistory = new Array();

            for (var i = 0; i < j; i++) {
                if (checkboxes[i].checked === true) {
                    var realPrice = posts[i].price;
                    var date = new Date().getDate();
                    // // console.log(date);
                    if (date < 10)
                        date = '0' + date;

                    var days = posts[i].todaysale;
                    days = days.substr(days.length - 2, 2);
                    // // console.log(days);
                    if (date === days)
                        realPrice = posts[i].price / 100 * (100 - posts[i].tdr);
                    else if (posts[i].discount_rate > 0)
                        realPrice = posts[i].price / 100 * (100 - posts[i].discount_rate);

                    var thisPrice = realPrice * posts[i].amount;

                    // var itemID = "nowpay" + i;
                    var nowpay = new Object();
                    nowpay.amount = posts[i].amount;
                    nowpay.cart_id = posts[i].cart_id;
                    nowpay.category = posts[i].category;
                    nowpay.create_at = posts[i].create_at;
                    nowpay.discount_rate = posts[i].discount_rate
                    nowpay.id = posts[i].id;
                    nowpay.img1 = posts[i].img1;
                    nowpay.img2 = posts[i].img2;
                    nowpay.menu_id = posts[i].menu_id;
                    nowpay.name = posts[i].name;
                    nowpay.price = posts[i].price;
                    nowpay.seller_id = posts[i].seller_id;
                    nowpay.subname = posts[i].subname;
                    nowpay.tdr = posts[i].tdr;
                    nowpay.todaysale = posts[i].todaysale;

                    arrnowpayHistory.push(nowpay);
                }
            }
            List = arrnowpayHistory;

            this.setState({
                sendposts: List
            })
        }

        return (
            <div id="sub">
                <div className="size basket">
                    <div className="sequence">
                        <ul className="clear">
                            <li>
                                <div className="order on">
                                    <div className="tb">
                                        <div className="tbc">
                                            <img src="/img/sequence1.png" />
                                            <div className="txt">
                                                <em>STEP01</em>
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
                                            <img src="/img/sequence2.png" />
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
                                            <img src="/img/sequence3.png" />
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
                                            <img src="/img/sequence4.png" />
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
                    <form name="cartFrm" id="frm">
                        <div className="product_list">
                            <table>
                                <colgroup>
                                    <col width="5%" />
                                    <col width="60%" />
                                    <col width="10%" />
                                    <col width="15%" />
                                    <col width="10%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="pro_check" id="check_all" onChange={checkAll} />
                                            <label htmlFor="check_all"></label>
                                        </th>
                                        <th>????????????</th>
                                        <th>?????????</th>
                                        <th>??????</th>
                                        <th>??????</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        posts.map((post, idx) => {
                                            // // console.log(post);
                                            var realPrice = post.price;
                                            var date = new Date().getDate();
                                            // // console.log(date);
                                            if (date < 10)
                                                date = '0' + date;

                                            if (post.todaysale !== null) {
                                                var days = post.todaysale;
                                                days = days.substr(days.length - 2, 2);
                                                // // console.log(days);
                                                if (date === days)
                                                    realPrice = post.price / 100 * (100 - post.tdr);
                                                else if (post.discount_rate > 0)
                                                    realPrice = post.price / 100 * (100 - post.discount_rate);
                                            }

                                            var eachpay = post.amount * realPrice;
                                            var eachpayString = eachpay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                            var checkBoxid = "pro" + (idx + 1);
                                            var pImgId = "pro" + (idx + 1) + "_img";
                                            var amountCntId = "amountCnt" + (idx + 1);
                                            var upAmountCntId = "1amountCnt" + (idx + 1);
                                            var downAmountCntId = "2amountCnt" + (idx + 1);
                                            var priceString = realPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                            var payId = "eachtotal" + (idx + 1);

                                            const upAmount = (e) => {
                                                var amounts = document.getElementById(amountCntId).value;
                                                var checkboxes = document.getElementById(checkBoxid);

                                                if (post.amount < 9) {
                                                    amounts = Number(amounts) + 1;
                                                    eachpay = amounts * realPrice;
                                                    post.amount = amounts;
                                                    eachpayString = eachpay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                                    document.getElementById(amountCntId).value = post.amount;
                                                    document.getElementById(payId).innerText = eachpayString;
                                                    axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/plus/` + this.state.id + `/` + post.menu_id, {
                                                    }).then(res => {
                                                        // console.log("???????????? ?????? ?????????");
                                                    })
                                                    if (checkboxes.checked === true) {
                                                        var totpays = pays - (realPrice * (amounts - 1));
                                                        var sendpays = sendpay;
                                                        if ((totpays + eachpay) >= 30000) {
                                                            sendpays = 0;
                                                        }
                                                        else {
                                                            sendpays = 2500;
                                                        }
                                                        var totpayStrings = (totpays + eachpay + sendpays).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                                        this.setState({
                                                            pays: totpays + eachpay,
                                                            paysString: (totpays + eachpay).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                                                            sendpay: sendpays,
                                                            totpay: (totpays + eachpay + sendpays),
                                                            totpayString: totpayStrings,
                                                            sendpayString: sendpays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                                        })
                                                    }
                                                }
                                            }

                                            const downAmount = (e) => {
                                                var amounts = document.getElementById(amountCntId).value;
                                                var checkboxes = document.getElementById(checkBoxid);

                                                if (post.amount > 1) {
                                                    amounts = Number(amounts) - 1;
                                                    eachpay = amounts * realPrice;
                                                    post.amount = amounts;
                                                    eachpayString = eachpay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                                    document.getElementById(amountCntId).value = post.amount;
                                                    document.getElementById(payId).innerText = eachpayString;
                                                    axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/minus/` + this.state.id + `/` + post.menu_id, {
                                                    }).then(res => {
                                                        // console.log("???????????? ?????? ??????");
                                                    })
                                                    if (checkboxes.checked === true) {
                                                        var totpays = pays - (realPrice * (amounts + 1));
                                                        var sendpays = sendpay;
                                                        if ((totpays + eachpay) >= 30000) {
                                                            sendpays = 0;
                                                        }
                                                        else {
                                                            sendpays = 2500;
                                                        }

                                                        var totpayStrings = (totpays + eachpay + sendpays).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                                        this.setState({
                                                            pays: totpays + eachpay,
                                                            paysString: (totpays + eachpay).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
                                                            sendpay: sendpays,
                                                            totpay: (totpays + eachpay + sendpays),
                                                            totpayString: totpayStrings,
                                                            sendpayString: sendpays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                                        })
                                                    }
                                                }

                                            }

                                            const handleChange = (e) => {
                                                if (e.target.checked) {
                                                    var Pays = pays + eachpay;
                                                    // // console.log(totpay + " : " + eachpay);
                                                    var sendpays = sendpay;
                                                    if (Pays >= 30000) {
                                                        sendpays = 0;
                                                    }
                                                    else {
                                                        sendpays = 2500;
                                                    }

                                                }
                                                else {
                                                    var Pays = pays - eachpay;
                                                    // // console.log(totpay + " : " + eachpay);
                                                    var sendpays = sendpay;
                                                    if (Pays >= 30000) {
                                                        sendpays = 0;
                                                    }
                                                    else {
                                                        sendpays = 2500;
                                                    }
                                                }
                                                var totpayStrings = (Pays + sendpays).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                                                this.setState({
                                                    pays: Pays,
                                                    paysString: Pays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),

                                                    totpay: Pays + sendpays,
                                                    sendpay: sendpays,
                                                    totpayString: totpayStrings,
                                                    sendpayString: sendpays.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                                                })
                                                selectPost();
                                            }

                                            return (
                                                <tr className="se1" key={idx}>
                                                    {/* idx, amount, member_id, menu_id, name, price  */}
                                                    <td className="check">
                                                        <input type="checkbox" className="menu_id" value={post.menu_id} />
                                                        <input type="checkbox" className="moneycheck" value={realPrice} />
                                                        <input type="checkbox" className="amountcheck" value={post.amount} />
                                                        <input type="checkbox" className="session_check" onChange={handleChange} value={post.cart_id} name={checkBoxid} id={checkBoxid} />
                                                        <label htmlFor={checkBoxid}></label>
                                                    </td>
                                                    <td className="pro_info">
                                                        <a>
                                                            <div>
                                                                <p id={pImgId} style={{ backgroundImage: `url(${post.img1})`, borderRadius: '5px' }}>
                                                                    <img src="/img/product_bg.png" />
                                                                </p>
                                                                <span>{post.name}</span>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <em className="m_block">????????? : </em>
                                                        <span className="each_price">
                                                            {priceString} ???
        </span></td>
                                                    <td className="amount">
                                                        <div className="a_wrap">
                                                            <a className="amount_down" onClick={downAmount} id={downAmountCntId} ></a>
                                                            <input type="text" className="amount txt amount_val" id={amountCntId} value={post.amount} readOnly />
                                                            <a className="amount_up" onClick={upAmount} id={upAmountCntId}></a>
                                                        </div>
                                                    </td>
                                                    <td className="total">
                                                        <em className="m_block">?????? : </em>
                                                        <span className="eachtotal" id={payId} >{eachpayString}</span>???
                                                            <input type="hidden" name="eachtotal[]" className="eachtotal_val" value={eachpay} />
                                                    </td>
                                                </tr>

                                            )
                                        }
                                        )}

                                </tbody>
                            </table>
                        </div>
                        <div className="price_result clear">
                            <span>?????? ????????????
                <input type="hidden" name="myTotalPrice" value={pays} id="mytotalprice_val" />
                                <b id="totalprice"> {paysString}</b>

                    ???	+ ?????????
                                        <b id="deliveryprice"> {sendpayString}</b>
                                        ??? <em className="mbr">= ??? ?????? <b className="result">
                                    <input type="hidden" name="delivery" value="0" />
                                    <span id="resultVal">{totpayString}</span><span>???</span></b></em></span>
                        </div>

                        <div className="util_bt">
                            <a onClick={deleteCart}><img src="/img/pro_delete.png" />??????????????????</a>
                            <a onClick={goBack}><img src="/img/pro_back.png" />?????? ????????????</a>
                        </div>

                        <div className="last_bt">
                            <Link
                                to={{
                                    pathname: `/selorder`,
                                    state: {
                                        sendposts
                                    }
                                }}>?????? ?????? ??????
                                </Link>
                            <Link
                                to={{
                                    pathname: `/order`,
                                    state: {
                                        posts
                                    }
                                }}
                            >
                                ?????? ?????? ??????
                            </Link>
                        </div>
                    </form>
                </div>
            </div >
        )
    }



}
export default Cart;