import React, { useEffect } from 'react';

const List = () => {
    useEffect(() => {
        document.getElementById("sale1").setAttribute("style", "background-image:url('/img/best_sample1.png')");
        document.getElementById("sale1_hover").setAttribute("style", "background-image:url('/img/best_sample2.png')");
        document.getElementById("sale2").setAttribute("style", "background-image:url('/img/best_sample3.png')");
        document.getElementById("sale2_hover").setAttribute("style", "background-image:url('/img/best_sample4.png')");
        document.getElementById("sale3").setAttribute("style", "background-image:url('/img/best_sample5.png')");
        document.getElementById("sale3_hover").setAttribute("style", "background-image:url('/img/best_sample6.png')");
        document.getElementById("sale4").setAttribute("style", "background-image:url('/img/best_sample7.png')");
        document.getElementById("sale4_hover").setAttribute("style", "background-image:url('/img/best_sample8.png')");
        document.getElementById("sale5").setAttribute("style", "background-image:url('/img/best_sample9.png')");
        document.getElementById("sale5_hover").setAttribute("style", "background-image:url('/img/best_sample10.png')");
        document.getElementById("sale6").setAttribute("style", "background-image:url('/img/best_sample11.png')");
        document.getElementById("sale6_hover").setAttribute("style", "background-image:url('/img/best_sample12.png')");
        document.getElementById("sale7").setAttribute("style", "background-image:url('/img/best_sample13.png')");
        document.getElementById("sale7_hover").setAttribute("style", "background-image:url('/img/best_sample14.png')");
        document.getElementById("sale8").setAttribute("style", "background-image:url('/img/best_sample15.png')");
        document.getElementById("sale8_hover").setAttribute("style", "background-image:url('/img/best_sample16.png')");
        document.getElementById("sale9").setAttribute("style", "background-image:url('/img/best_sample17.png')");
        document.getElementById("sale9_hover").setAttribute("style", "background-image:url('/img/best_sample18.png')");
    }, [])

    return (
        <div className="size">
            <div className="cs_tab">
                <div className="sub">
                    <ul className="clear">
                        <li className="itemList4">
                            <a href="/sellpage">
                                ????????? ??????
                                        <img src="/img/bbs_tab_arrow.png" />
                            </a>
                        </li>
                        <li className="itemList4">
                            <a href="/sellpage/manage">
                                ?????? ??????
                                        <img src="/img/bbs_tab_arrow.png" />
                            </a>
                        </li>
                        <li className="itemList4">
                            <a href="/sellpage/order/">
                                ?????? ??????
                                        <img src="/img/bbs_tab_arrow.png" />
                            </a>
                        </li>
                        <li className="itemList4">
                            <a href="/sellpage/list/" className="on">
                                ?????? ??????
                                        <img src="/img/bbs_tab_arrow.png" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="product_list new_list">
                <div className="product_wrap">
                    <ul className="clear">
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale1">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale1_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale2">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale2_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale3">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale3_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale4">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale4_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale5">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale5_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale6">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale6_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale7">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale7_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale8">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale8_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className="pic">
                                    <p className="pro_img" id="sale9">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                    <p className="info_icon">
                                        <img src="/img/sale.png" />
                                        <img src="/img/new.png" />
                                    </p>
                                    <p className="pic_hover" id="sale9_hover">
                                        <img src="/img/best_img_sample.png" />
                                    </p>
                                </div>
                                <div className="pro_txt">
                                    <p>
                                        <b className="p_name">
                                            ????????? ??????
                                        </b>
                                        <span className="sub_title">????????? ??????</span>
                                    </p>
                                    <span className="product_sale per">
                                        <span className="before_p">32,900???</span>
                                        <b>26,900</b>???
                                        <span className="sale_per">19%</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default List;