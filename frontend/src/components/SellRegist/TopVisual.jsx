import React, { useEffect } from 'react';

const TopVisual = () => {

    useEffect(() => {
        document.getElementById("pcBanner").setAttribute("style", "background-image:url(/img/sellRegist_banner.png)");
    }, [])

    return (
        <div className="top_visual">
            <p id="pcBanner">
                <img src="/img/sale_banner.png" />
            </p>
        </div>
    )
}
export default TopVisual;