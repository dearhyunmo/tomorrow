import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Auth.css";

import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie';

class Auth extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            token: cookies.get('token') || ""
        }
    };

    state = {
        id: "",
        pw: "",
        pwconfirm: "",
        name: "",
        nickname: "",
        mobile: "",
        email: "",
        address: "",
        seller: 0,
        cert: null,
        tab: 0,
        signupsection: 0,
        findidcheck: false,
        findpwcheck: false,
    }

    componentDidMount() {
        this.stateClear();
    };


    idChange = (e) => this.setState({ id: e.target.value });
    pwChange = (e) => this.setState({ pw: e.target.value });
    pwConfirmChange = (e) => this.setState({ pwconfirm: e.target.value });
    nameChange = (e) => this.setState({ name: e.target.value });
    nicknameChange = (e) => this.setState({ nickname: e.target.value });
    mobileChange = (e) => this.setState({ mobile: e.target.value });
    emailChange = (e) => this.setState({ email: e.target.value });
    addressChange = (e) => this.setState({ address: e.target.value });
    typeSeller = (e) => this.setState({ seller: 1 });
    typeBuyer = (e) => this.setState({ seller: 0 });
    certChange = (e) => this.setState({ cert: e.target.value });

    stateClear = (e) => {
        this.setState({
            id: "",
            pw: "",
            name: "",
            nickname: "",
            mobile: "",
            email: "",
            address: "",
            seller: 0,
            cert: null,
            findidcheck: false,
            findpwcheck: false,
        });
    }

    signIn = (e) => {
        axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/member/login`, {
            id: this.state.id,
            pw: this.state.pw
        }).then(res => {
            // // // console.log(res.data);
            var id = this.state.id;

            if (res.data.message === "SUCCESS") {
                // sessionStorage.setItem("token", res.data.token);
                // sessionStorage.setItem("id", this.state.id);
                // if (res.data.isseller === "seller") {
                //     this.state = {
                //         seller: 1
                //     }
                // } else {
                //     this.state = {
                //         seller: 0
                //     }
                // }
                // var isseller = this.state.seller;
                // // sessionStorage.setItem("seller", isseller);
                // sessionStorage.setItem("id", id);
                // sessionStorage.setItem("token", res.data.token);
                this.saveCookies(res.data.token);
                window.location.replace("/");
            } else {
                alert("???????????? ??????????????? ??????????????????.");
            }
        })
    };

    saveCookies = (token) => {
        const { cookies } = this.props;
        cookies.set("token", token);
        // cookies.set("nickname", nickname);
    }

    signInKeyPress = (e) => {
        if (e.key === "Enter") { this.signIn(); }
    };



    // signUp = (e) => {
    //     e.preventDefault();
    //     // // console.log(this.state);
    //     // // // console.log((this.state.seller === 1 && this.state.nickname === true && this.state.cert === true) || !this.state.seller)
    //     if ((this.state.seller === 1) || !this.state.seller) {
    //         axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/member/join`, {
    //             id: this.state.id,
    //             pw: this.state.pw,
    //             name: this.state.name,
    //             nickname: this.state.nickname,
    //             mobile: this.state.mobile,
    //             email: this.state.email,
    //             address: this.state.address,
    //             seller: this.state.seller,
    //             cert: this.state.cert,
    //         }).then(res => {
    //             // // console.log(res);
    //             if (res.data === "SUCCESS") {
    //                 alert('???????????? ??????! ????????? ????????? ??????????????????.')
    //                 this.tabZero();
    //             } else {
    //                 alert('????????? ????????????')
    //             }
    //         }).catch(err => {
    //             // // console.log(err);
    //         });
    //     };
    // }

    render() {
        return (
            <div id="sub">
                <div className="inner_wrap login">
                    <div className="size">
                        <form name="board" id="board" className="login_form">
                            <fieldset>
                                <div className="login_txt">
                                    <h4>?????????</h4>
                                    <p>
                                        ???????????? ????????? ???????????? <em className="mbr">??????????????? ??????????????????.</em>
                                    </p>
                                </div>
                                <div className="login_box">
                                    <p>
                                        <img src="/img/login_id.png" />
                                        <input id="signInID" className="realInput valid" type="text" placeholder="?????????" onChange={this.idChange} />
                                    </p>
                                    <p>
                                        <img src="/img/login_pw.png" />
                                        <input id="signInPW" className="realInput valid" type="password" placeholder="????????????" onChange={this.pwChange} onKeyPress={this.signInKeyPress} />
                                    </p>
                                </div>
                                <div className="login_btn">
                                    <input type="button" onClick={this.signIn} value="?????????" />
                                </div>
                                <div className="login_util clear">
                                    <ul className="clear">
                                        <li>
                                            <Link
                                                to={{
                                                    pathname: `/findid`
                                                }}
                                            >????????? ??????</Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={{
                                                    pathname: `/findpw`
                                                }}
                                            >???????????? ??????</Link></li>
                                        <li><Link
                                            to={{
                                                pathname: `/join`
                                            }}>????????????</Link></li>
                                    </ul>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
            // <div className="background">
            //     <div className="signInBlock">
            //         <div className="signInTitle">
            //             <img className="logo" src="../../img/logo.png" alt="" />
            //         </div>
            //         <div className="signInBody">
            //             {!this.state.tab &&
            //                 <Fragment>
            //                     <div className="authInput login_box">
            //                         <p>
            //                             <img src="/img/login_id.png" />
            //                             <input id="signInID" className="realInput valid" type="text" placeholder="?????????" onChange={this.idChange} />
            //                         </p>
            //                         <p>
            //                             <img src="/img/login_pw.png" />
            //                             <input id="signInPW" className="realInput valid" type="password" placeholder="????????????" onChange={this.pwChange} onKeyPress={this.signInKeyPress} />
            //                         </p>
            //                     </div>
            //                     <div className="authInput">
            //                         <div className="signInBtn" onClick={this.signIn}>
            //                             ?????????
            //                     </div>
            //                     </div>
            //                     <hr />
            //                     <div className="signInFooter">
            //                         <p onClick={this.tabOne}>????????? ??????</p>
            //                         <p onClick={this.tabTwo}>???????????? ??????</p>
            //                         <p onClick={this.tabThree}>????????????</p>
            //                     </div>
            //                 </Fragment>
            //             }
            //             {this.state.tab === 1 &&
            //                 <Fragment>
            //                     <div className="authInput login_box">
            //                         <p>
            //                             <img src="/img/login_id.png" />
            //                             <input id="signInName" className="realInput valid" type="text" placeholder="??????" onChange={this.nameChange} />
            //                         </p>
            //                         <p>
            //                             <img src="/img/login_pw.png" />
            //                             <input id="signInEmail" className="realInput valid" type="text" placeholder="?????????" onChange={this.emailChange} />
            //                         </p>
            //                     </div>
            //                     <div className="authInput">
            //                         <div className="signInBtn" onClick={this.findID}>
            //                             ????????? ??????
            //                     </div>
            //                     </div>
            //                     <hr />
            //                     <div className="signInFooter">
            //                         <p onClick={this.tabZero}>????????? ?????????</p>
            //                         <p onClick={this.tabOne}>????????? ??????</p>
            //                         <p onClick={this.tabThree}>????????????</p>
            //                     </div>
            //                 </Fragment>
            //             }
            //             {this.state.tab === 2 &&
            //                 <Fragment>
            //                     <div className="authInput login_box">
            //                         <p>
            //                             <img src="/img/login_id.png" />
            //                             <input id="signInName" className="realInput valid" type="text" placeholder="??????" onChange={this.nameChange} />
            //                         </p>
            //                         <p>
            //                             <img src="/img/login_pw.png" />
            //                             <input id="signInID" className="realInput valid" type="text" placeholder="?????????" onChange={this.idChange} />
            //                         </p>
            //                         <p>
            //                             <img src="/img/login_pw.png" />
            //                             <input id="signInEmail" className="realInput valid" type="text" placeholder="?????????" onChange={this.emailChange} />
            //                         </p>
            //                     </div>
            //                     <div className="authInput">
            //                         <div className="signInBtn" onClick={this.findPW}>
            //                             ???????????? ??????
            //                     </div>
            //                     </div>
            //                     <hr />
            //                     <div className="signInFooter">
            //                         <p onClick={this.tabZero}>????????? ?????????</p>
            //                         <p onClick={this.tabThree}>????????????</p>
            //                     </div>
            //                 </Fragment>
            //             }
            //             {this.state.tab === 3 &&
            //                 <Fragment>
            //                     {this.state.signupsection === 0 &&
            //                         <div className="radioDiv">
            //                             <input id="buyer" className="signUpRadio" type="radio" name="sellerGroup" value="0" onChange={this.typeBuyer} />
            //                             <label htmlFor="buyer" defaultChecked>????????????</label>
            //                             <input id="seller" className="signUpRadio" type="radio" name="sellerGroup" value="1" onChange={this.typeSeller} />
            //                             <label htmlFor="seller">????????????</label>
            //                         </div>
            //                     }
            //                     {this.state.signupsection !== 0 ? null : (this.state.seller === 1 &&
            //                         <div>
            //                             <div className="authInput">
            //                                 <input id="signUpNickname" className="realInput" type="text" placeholder="?????????" onChange={this.nicknameChange} defaultValue={this.state.nickname} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpCert" className="realInput" type="text" placeholder="?????????????????????" onChange={this.certChange} defaultValue={this.state.cert} />
            //                             </div>
            //                         </div>
            //                     )}
            //                     {this.state.signupsection === 0 &&
            //                         <div className="signUpBtnDiv">
            //                             <div></div>
            //                             <div className="signUpBtn" onClick={this.signUpSectionOne}>
            //                                 ??????
            //                         </div>
            //                         </div>
            //                     }
            //                     {this.state.signupsection === 1 &&
            //                         <div>
            //                             <div className="authInput">
            //                                 <input id="signUpID" className="realInput" type="text" placeholder="?????????" onChange={this.idChange} defaultValue={this.state.id} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpPW" className="realInput" type="password" placeholder="????????????" onChange={this.pwChange} defaultValue={this.state.pw} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpPWConfirm" className="realInput" type="password" placeholder="???????????? ??????" onChange={this.pwConfirmChange} defaultValue={this.state.pwconfirm} />
            //                             </div>
            //                             <div className="signUpBtnDiv">
            //                                 <div className="signUpBtn" onClick={this.signUpSectionZero}>
            //                                     ??????
            //                         </div>
            //                                 <div className="signUpBtn" onClick={this.signUpSectionTwo}>
            //                                     ??????
            //                         </div>
            //                             </div>
            //                         </div>
            //                     }
            //                     {this.state.signupsection === 2 &&
            //                         <div>
            //                             <div className="authInput">
            //                                 <input id="signUpName" className="realInput" type="text" placeholder="??????" onChange={this.nameChange} defaultValue={this.state.name} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpEmail" className="realInput" type="text" placeholder="?????????" onChange={this.emailChange} defaultValue={this.state.email} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpAddress" className="realInput" type="text" placeholder="??????" onChange={this.addressChange} defaultValue={this.state.address} />
            //                             </div>
            //                             <div className="authInput">
            //                                 <input id="signUpMobile" className="realInput" type="text" placeholder="????????????" onChange={this.mobileChange} defaultValue={this.state.mobile} />
            //                             </div>
            //                             <div className="signUpBtnDiv">
            //                                 <div className="signUpBtn" onClick={this.signUpSectionOne}>
            //                                     ??????
            //                         </div>
            //                                 <div className="signUpBtn" onClick={this.signUp}>
            //                                     ????????????
            //                         </div>
            //                             </div>
            //                         </div>
            //                     }
            //                     <hr />
            //                     <div className="signInFooter">
            //                         <p onClick={this.tabZero}>????????? ?????????</p>
            //                         <p onClick={this.tabOne}>????????? ??????</p>
            //                         <p onClick={this.tabTwo}>???????????? ??????</p>
            //                     </div>
            //                 </Fragment>
            //             }
            //         </div>
            //     </div>
            // </div>
        )
    }
}
export default withCookies(Auth);
