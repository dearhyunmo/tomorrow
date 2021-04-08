import React from 'react';
import axios from 'axios';
import moment from 'moment';

import 'moment/locale/ko';


import '../css/Product.css';

class Detail extends React.Component {
    constructor() {
        super();
        // // console.log(props.match);
        // const { location } = this.props;
        // // console.log(match);
        this.state = {
            loading: true,
            buyAmount: 1,
            saleState: false
        }
    }

    componentDidMount() {
        // const location = browserHistory.getCurrentLocation();
        const { location, history } = this.props;
        // console.log(location);
        var pay = location.state.price / 100 * (100 - location.state.discount_rate);
        var payString = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        this.setState({
            id: location.state.id,
            name: location.state.name,
            subname: location.state.subname,
            discount_rate: location.state.discount_rate,
            amount: location.state.amount,
            category: location.state.category,
            create_at: location.state.create_at,
            img1: location.state.img1,
            price: location.state.price,
            priceString: location.state.priceString,
            sell_amount: location.state.sell_amount,
            seller_id: location.state.seller_id,
            sale_money: location.state.sale_money,
            saleMoneyString: location.state.saleMoneyString,
            totPay: pay,
            totPayString: payString,
            Uid: sessionStorage.getItem('id')
        })

        var createYY = location.state.create_at.substring(0, 4);
        var createMM = location.state.create_at.substring(5, 7);
        var createDD = location.state.create_at.substring(8, 10);
        var createDate = moment([createYY, createMM - 1, createDD]);
        var nowDate = moment();

        if (createDate.diff(nowDate, 'days') < -3) {
            this.setState({
                newP: false
            })
        } else {
            this.setState({
                newP: true
            })
        }

        if (location.state.discount_rate > 0) {
            this.setState({
                saleState: true
            })
        }
        // // console.log(location.state.discount_rate);

        var no = location.state.id;

        axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/menu/gm/` + no
        ).then(res => {
            this.setState({
                loading: false,
                detail: res.data.detail
            })
            // // console.log(location.state.discount_rate);
        });
    }

    render() {
        const {
            detail,
            Uid
        } = this.state;
        var codes = detail;

        const downAmount = (e) => {
            var amounts = document.getElementById("amountCnt").value;
            var pay;
            if (this.state.buyAmount > 1) {
                amounts = Number(amounts) - 1;
                pay = amounts * this.state.sale_money;
                var payString = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                // // // console.log(payString);
                this.setState({
                    buyAmount: amounts,
                    totPay: pay,
                    totPayString: payString,
                })
            }
            else {
                alert('품목 개수는 1개부터 시작할 수 있습니다!!');
            }

        }
        const upAmount = (e) => {
            var amounts = document.getElementById("amountCnt").value;
            var pay;
            if (this.state.buyAmount < 9) {
                amounts = Number(amounts) + 1;
                pay = amounts * this.state.sale_money;
                var payString = pay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                // // // console.log(payString);
                this.setState({
                    buyAmount: amounts,
                    totPay: pay,
                    totPayString: payString,
                })
            }
            else {
                alert('한 품목당 10개 이상 구매하실 수 없습니다.\n대용량 구매는 문의 게시판을 이용해주세요!');
            }
        }

        const GoCart = (e) => {
            if (Uid === "") {
                alert('로그인하시면 장바구니를 이용하실 수 있습니다.');
                // location.href("/auth");
                document.location.href = "/auth";
            }
            else {
                // console.log(this.state.buyAmount);
                // console.log(this.state.totPay);
                axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/cart`, {
                    member_id: Uid,
                    menu_id: this.state.id,
                    name: this.state.name,
                    amount: this.state.buyAmount,
                    price: this.state.totPay
                }).then(res => {
                    if (res.data === "insert") {
                    }
                    // // console.log(res);
                    alert("장바구니에 등록되었습니다.");

                })
            }
        }

        return (
            <div id="sub" >
                <div className="inner view_inner size detail_view_inner">
                    <div className="view_wrap">
                        <div className="goods clear">
                            <div className="image">
                                <p className="detail_img" id="detail_img" style={{ backgroundImage: `url(${this.state.img1})`, borderRadius: `5px` }}>
                                    <img src="/img/view_pic_bg.png" />
                                </p>
                            </div>

                            <div className="info">
                                <p className="icon">
                                    {this.state.newP === true &&
                                        <img src="/img/new.png" />
                                    }
                                    {this.state.saleState === true &&
                                        <img src="/img/sale.png" />
                                    }
                                </p>
                                <div className="pro_txt">
                                    <b>
                                        {this.state.name}</b>
                                    {this.state.subname}</div>
                                <div className="item">
                                    <ul className="clear">
                                        <li className="price clear">
                                            <b>판매가</b>
                                            <div>
                                                {this.state.saleState === true &&
                                                    <p className="product_sale per">
                                                        <span className="sale_per">{this.state.discount_rate}<em>%</em></span>
                                                        <b>{this.state.saleMoneyString}</b>원
                                                            <span className="before_p">{this.state.priceString}원</span>
                                                    </p>
                                                }
                                                {this.state.saleState !== true &&
                                                    <p>
                                                        <span>{this.state.priceString}원</span>
                                                    </p>
                                                }

                                            </div>
                                        </li>
                                        <li className="clear">
                                            <b>제조사</b>
                                            <div><span>{this.state.seller_id}</span></div>
                                        </li>
                                        <li className="clear">
                                            <b>배송비</b>
                                            <div><span>2500</span>원 (30,000원 이상시 무료)</div>
                                        </li>
                                        <li className="amount clear">
                                            <b>주문수량</b>
                                            <div>
                                                <a className="amount_up" onClick={downAmount} ></a>
                                                <input type="text" className="amount txt amount_val" id="amountCnt" value={this.state.buyAmount} readOnly />
                                                <a className="amount_down" onClick={upAmount}></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="total_price">
                                    <b>총 금액(수량):</b>
                                    <span><b className="price_val">{this.state.totPayString}</b>원({this.state.buyAmount}개)</span>
                                </div>

                                <div className="submit_bt clear">
                                    <a className="addCartBtn" id="pop1" onClick={GoCart} >장바구니</a>
                                    {/* <a className="purchase" >바로구매</a> */}
                                </div>
                            </div>
                        </div>

                        {this.state.loading === true &&
                            <div className="multi_info">
                                <div id="detail1">
                                    <div className="tab">
                                        <ul className="clear">
                                            <li>
                                                <a href="#detail1" className="on">상품설명
                                                <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#detail2">유의사항 및
                                                <em className="mbr"> 구매안내</em>
                                                    <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="detail_con">

                                        <div className="loading_view">
                                            <div className="loader loader-7">
                                                <div className="line line1"></div>
                                                <div className="line line2"></div>
                                                <div className="line line3"></div>
                                                <span className="loader_text">Loading...</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                        {this.state.loading === false &&
                            <div className="multi_info">
                                <div id="detail1">
                                    <div className="tab">
                                        <ul className="clear">
                                            <li>
                                                <a href="#detail1" className="on">상품설명
                                                            <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#detail2">유의사항 및
                                                            <em className="mbr"> 구매안내</em>
                                                    <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="detail_con" dangerouslySetInnerHTML={{ __html: codes }}>
                                        {/* // {this.state.detail} */}
                                    </div>
                                </div>

                                <div id="detail2">
                                    <div className="tab">
                                        <ul className="clear">
                                            <li>
                                                <a href="#detail1">상품설명
                                                            <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#detail2" className="on">유의사항 및
                                                            <em className="mbr"> 구매안내</em>
                                                    <img src="/img/bbs_tab_arrow.png" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="detail_con second">
                                        <img alt="유의사항 안내" src="/img/product_notice.png" />
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;