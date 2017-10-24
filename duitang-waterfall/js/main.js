$(function() {
    const url = './data/duitang_flow.json',
        itemWidth = 246,
        item_margin = 10;
    var recommend_item = '',
        minHeight = 0,
        itemDom = $('.recommend'),
        height = [],
        Data = '';

    $.ajax({
        type: "get",
        url: url,
        success: function(data) {
            var html = '',
                itemHtml = '',
                itemImg = '',
                itemContent = '',
                itemMsg = '',
                itemBar = '',
                itemBar_price = '';
            itemBar_author = '',
                itemBar_avatar = '',
                itemBar_username = '',
                collectionName = '',
                data_list = [],
                album = [],
                newHeight = 0,
                index = 0;
            if (data.status === 1) {
                item_list = data.data.data_list;

                //获取内容并设置布局
                for (let i = 0; i < item_list.length; i++) {
                    album = item_list[i].album;
                    itemImg = '<div class="recommend-icon"><img src="' + album.covers + '"></div>';
                    itemMsg = '<p class="recommend-item-title">' + album.msg + '</p>';
                    itemBar_price = album.price === undefined ? '' : '</span><span class="price float-r">￥' + album.price + '</span>';
                    itemBar = '<div class="bar"><span class="star float-l"><i><img src="' + './images/star.png' + '" /></i><em class="star-num">' + album.favorite_count + '</em>' + itemBar_price + '</div>';
                    itemBar_avatar = '<div class="author float-l"><img src="' + album.sender.avatar + '" alt="" /></div>';
                    itemBar_username = album.sender.username;
                    collectionName = album.name;
                    itemBar_author = '<div class="bar-author">' + itemBar_avatar + '<p class="msg float-l"><span><a class="nickname">' + itemBar_username + '</a></span><span class="collection">收集到：<a href="#">' + collectionName + '</a></span></p></div>';
                    itemContent = '<div class="recommend-bottom">' + itemMsg + itemBar + itemBar_author + '</div>'
                    itemHtml = '<div class="box absolute"><div class="recommend-item  bd-box">' + itemImg + itemContent + '</div></div>';
                    itemDom.append(itemHtml);
                }

                //处理盒子的定位
                var Doms = itemDom.children(),
                    boxDom = '',
                    domImg = $(Doms).find('.recommend-icon img');
                console.log(domImg)
                domImg.each(function(imgIndex, ele) {
                    console.log('索引值：' + imgIndex)

                    $(this).load(function() {

                        //当前加载完的图片，其所在的盒子显示
                        boxDom = $(this).parents(".box");
                        console.log('图片的索引')
                        console.log(imgIndex)
                        if (imgIndex < 4) {
                            //获取盒子和高度
                            height.push(getRealHeight(boxDom));
                            //设置定位                                           
                            boxDom.css({
                                top: 0,
                                left: imgIndex * (itemWidth) + 'px'
                            })
                            console.log('1-4 height:');
                            console.log(height)
                        } else {
                            //获取最小高度，放置下个盒子
                            minHeight = getMinArray(height).minHeight;
                            index = getMinArray(height).index;
                            newHeight = getRealHeight(boxDom) + minHeight;
                            height[index] = newHeight;
                            boxDom.css({
                                top: minHeight + 'px',
                                left: index * (itemWidth) + 'px'
                            })
                            console.log(' height:');
                            console.log(height)
                        }
                    })
                })
            }
        }
    })
    //获取数组中最小元素和索引
    function getMinArray(array) {
        var minNum = Math.min.apply(null, array),
            index = array.indexOf(minNum);
        return {
            minHeight: minNum,
            index: index
        }
    }
    //获取dom元素的真实高度
    function getRealHeight(element) {
        return element.height() + 2 * (parseInt(element.css('padding'), 10) + parseInt(element.css('margin'), 10));
    }
})