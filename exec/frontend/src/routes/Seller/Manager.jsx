import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class SellPage extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            id: props.Uid,
            isSeller: props.isseller,
            posts: [],
            loading: false,
        }
    }
    componentDidMount() {
        if (this.state.id === "") {
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/count`, {
                params: {
                    seller_id: sessionStorage.getItem('id')
                }
            }).then(res => {
                this.setState({
                    Sready: res.data.one,
                    Sgoing: res.data.two,
                    Send: res.data.three
                })
            });
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/menu/seller/`, {
                params: {
                    seller_id: sessionStorage.getItem('id')
                }
            }).then(res => {
                this.setState({
                    Cnt: res.data.length
                })
            })
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/all1`, {
                params: {
                    seller_id: sessionStorage.getItem('id')
                }
            }).then(res => {
                this.setState({
                    posts: res.data
                })
                // console.log(res.data);
            })
        }
        else {
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/count`, {
                params: {
                    seller_id: this.state.id
                }
            }).then(res => {
                this.setState({
                    Sready: res.data.one,
                    Sgoing: res.data.two,
                    Send: res.data.three
                })
            });
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/menu/seller/`, {
                params: {
                    seller_id: this.state.id
                }
            }).then(res => {
                console.log(res.data.length);
                this.setState({
                    Cnt: res.data.length
                })
            })
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/all1`, {
                params: {
                    seller_id: this.state.id
                }
            }).then(res => {
                this.setState({
                    posts: res.data
                })
            }).catch(err => {

            })
        }
    }

    render() {
        const {
            id,
            isSeller,
            posts,
            Sready,
            Sgoing,
            Send,
            Cnt
        } = this.state
        return (
            <div id="sub" className="sellManage" >
                <div className="inner_wrap mypage">
                    <div className="size sub_page">
                        <div className="cs_tab">
                            <div className="sub">
                                <ul className="clear" id="sellerMenu">

                                    <li className="itemList3">
                                        <Link
                                            to={{
                                                pathname: `/mypage`,
                                                state: {
                                                    id: id,
                                                    isSeller: isSeller
                                                }
                                            }}
                                        >
                                            ????????? ??????
                                    <img src="/img/bbs_tab_arrow.png" />
                                        </Link>
                                    </li>
                                    <li className="itemList3">
                                        <Link
                                            to={{
                                                pathname: `/sellpage/manage`,
                                                state: {
                                                    id: this.state.id,
                                                    isSeller: this.state.isSeller
                                                }
                                            }}
                                            className="on"
                                        >
                                            ?????? ??????
                                    <img src="/img/bbs_tab_arrow.png" />
                                        </Link>
                                    </li>
                                    <li className="itemList3">
                                        <Link
                                            to={{
                                                pathname: `/sellpage/list`,
                                                state: {
                                                    id: this.state.id,
                                                    isSeller: this.state.isSeller
                                                }
                                            }}
                                        >
                                            ?????? ??????
                                    <img src="/img/bbs_tab_arrow.png" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h4 className="cs_title">?????? ??????</h4>
                        <form name="board" id="board">
                            <div className="member bbs">
                                <table className="write mt30 join">
                                    <caption className="display">
                                        ????????????
                                    </caption>
                                    <colgroup>
                                        <col width="20%" />
                                        <col width="25%" />
                                        <col width="15%" />
                                        <col width="25%" />
                                        <col width="15%" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th className="tit">
                                                <img src="/img/sell_img1.png" />?????? ??????</th>
                                            <th className="subtit">?????? ??? ??????</th>
                                            <td><span className="greenTxt">{Cnt}</span>???</td>
                                            <th className="subtit"></th>
                                            <td></td>
                                        </tr>
                                        <tr className="topLine">
                                            <th rowSpan="2" className="tit">
                                                <img src="/img/sell_img3.png" />?????? ??????
                                                </th>
                                            <th className="subtit">?????? ??????</th>
                                            <td><span className="greenTxt">{Sready}</span>???</td>
                                            <th rowSpan="2" className="subtit">?????? ??????</th>
                                            <td rowSpan="2"><span className="greenTxt">{Send}</span>???</td>
                                        </tr>
                                        <tr>
                                            <th className="subtit">?????? ???</th>
                                            <td><span className="greenTxt">{Sgoing}</span>???</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="product_list">
                                    <table>
                                        <colgroup>
                                            <col width="*" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>????????????</th>
                                                <th>?????????</th>
                                                <th>????????????</th>
                                                <th>????????????</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.posts.map((post, idx) => {
                                                    // console.log(post);
                                                    var statusString = "";
                                                    if (post.status === 1) {
                                                        statusString = "?????? ?????? ???";
                                                    } else if (post.status === 2) {
                                                        statusString = "?????? ???";
                                                    } else {
                                                        statusString = "?????? ??????";
                                                    }
                                                    const changeSIng = (e) => {
                                                        e.preventDefault();
                                                        axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/`, {
                                                            status: 2,
                                                            id: post.id
                                                        }).then(res => {
                                                            console.log(res);
                                                        });
                                                        alert('?????? ?????????????????????.');
                                                        window.location.replace('/sellpage/manage');
                                                    }
                                                    const changeSEnd = (e) => {
                                                        e.preventDefault();
                                                        console.log(post.id);
                                                        axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/shipping/`, {
                                                            status: 3,
                                                            id: post.id
                                                        }).then(res => {
                                                            console.log(res);
                                                        });
                                                        ///sellpage/manage/:id
                                                        alert('?????? ?????????????????????.');
                                                        window.location.replace('/sellpage/manage');
                                                    }
                                                    return (
                                                        <tr key={idx}>
                                                            <td className="pro_info"><Link to={{
                                                                pathname: `/sellpage/manage/${post.id}`,
                                                                state: {
                                                                    post: post
                                                                }
                                                            }}>
                                                                <p style={{ marginLeft: `50px` }}>
                                                                    <img src={post.img1} />
                                                                    {post.menu_name}
                                                                </p></Link>
                                                            </td>
                                                            <td>{post.name}</td>
                                                            <td className="m_info">{statusString}
                                                            </td>
                                                            <td className="m_info">
                                                                <button onClick={changeSIng} className="ManagerBtns goIng">?????? ???</button><br />
                                                                <button onClick={changeSEnd} className="ManagerBtns goEnd">?????? ??????</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default SellPage;