import React, { useState, useEffect } from 'react';
import axios from "axios";

import TopVisual from '../../../components/Product/TopVisual/TopVisualKor';
import Posts from '../../../components/Product/Posts';
import Pagination from '../../../components/common/Pagination';

const ProductList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/menu/gmbc`, {
                params: {
                    keyword: '1'
                }
            });

            setPosts(res.data.list);
            // // console.log(res);
            setLoading(false);

        }
        fetchPosts();
        document.getElementById('check1').setAttribute("checked", "true");
        return () => setLoading(false);
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //change page
    const paginate = (pageNumber) => {
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
    }

    return (
        <div id="sub">
            <div className="inner sub_menu all_menu">
                <TopVisual />

                <div className="size">
                    <div className="bbs_tab">
                        <ul className="clear itemList5">
                            <li><a href="/goods">전체 상품<img src="/img/bbs_tab_arrow.png" /></a></li>
                            <li><a href="/goods/1" className="on">한식 밀키트<img src="/img/bbs_tab_arrow.png" /></a></li>
                            <li><a href="/goods/2">양식 밀키트<img src="/img/bbs_tab_arrow.png" /></a></li>
                            <li><a href="/goods/3">중식/일식 밀키트<img src="/img/bbs_tab_arrow.png" /></a></li>
                            <li><a href="/goods/4">동남아 밀키트<img src="/img/bbs_tab_arrow.png" /></a></li>
                            <li><a href="/goods/5">샐러드 밀키트<img src="/img/bbs_tab_arrow.png" /></a></li>
                        </ul>
                    </div>
                    <div className="radio_bt">
                        <input type="radio" name="check" value="0" id="check1" />
                        <label htmlFor="check1" className="first"><span>신상품</span></label>
                        <input type="radio" name="check" value="1" id="check2" />
                        <label htmlFor="check2"><span>낮은가격</span></label>
                        <input type="radio" name="check" value="2" id="check3" />
                        <label htmlFor="check3"><span>높은가격</span></label>
                    </div>
                    <Posts posts={currentPosts} loading={loading} />
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    loading={loading}
                />
            </div>
        </div>
    )
}
export default ProductList;