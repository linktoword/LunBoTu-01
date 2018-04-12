window.onload = function () {                                                     /*在页面加载完成后执行function（）*/
    var container = document.getElementsByClassName("container");                  /* 注意 element和elements id得到的是一个对象 用不带s的  */
    var list = document.getElementById("list");                                  /*其他选择器 得到的都是一个对象的集合 使用时加索引【0..】 */
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;                                                                 /*存储按钮位置  下方改变后 index 也被改变*/
    var animateStayus = false;/*存储 偏移函数状态  优化偏移函数执行中 点击转换不再执行函数 */
    var timer; /*存储定时器 自动播放 */
    
    function showButtons () {                                                      /*  按钮随转换函数  先遍历按钮class 如果有class等于On的 清除掉 后跳出遍历 */

        for ( var i = 0; i < buttons.length; i++) {                           /* 再将新按钮赋予class=“on”的属性  即转变按钮 */
            if (buttons[i].className == 'on') {  
                buttons[i].className = '';
                break;
            }
        }
        buttons[index-1].className = "on"; 

    }

    function animate(offset) {                                                        /*转换图片位置 */
        animateStayus = true;
        var newList  = parseInt(list.style.left) + offset;                           /*目标：所需要到达的偏移量 */
        var allTime = 300;                                                             /*偏移所用总时间 */
        var frequency = 10;                                                             /*偏移次数 */
        var extent = offset / ( allTime / frequency );                               /*每次位移偏移量 */
        function go () {                                                          /*先判断位移正负 和当前位移是否到达目标位移 */
            if ( (extent > 0 && parseInt(list.style.left) < newList) || (extent < 0 && parseInt(list.style.left) > newList )) {
                list.style.left = parseInt(list.style.left) + extent + "px";            /*当前位移加上位移量 赋给left  */
                setTimeout(go ,frequency);                                             /*setTimeout(要调用的函数 , 在执行代码前需等待的毫秒数) */
            }          
            else{
                animateStayus = false;  
                if(newList > -600){
                    list.style.left = "-3000px";
                }
                else if(newList < -3000){
                    list.style.left = "-600px";
                    }   
                             
            }
        }
        go(); 
            
    }

    next.onclick = function () {
        
        if (animateStayus == false) {
            if (index == 5) {
                index = 1;
            }
            else{
                index++;
            }
            animate(-600);
            showButtons();
        }      
    }

    prev.onclick = function() {
       
        if (animateStayus == false) {
            if (index == 1) {
                index = 5;
            }
            else{
                index--;
            }
            animate(600);
            showButtons();
        }        
    }


    for (var i = 0; i < buttons.length; i++ ) {                                         /*给每个按钮加上点击事件 */
        buttons[i].onclick = function () {
            if(this.className == 'on') {                                              /*优化程序 当点击图片所在位置时 下方程序不运行 */
                return;
            }
            var clickIndex = parseInt(this.getAttribute("index"));                    /*获取点击的按钮的位置 index是自己设置的属性 不能用‘ . ’方法获得值 
                                                                                        用getattribute方法  获得的为字符串*/
            var newOffset = -600 *( clickIndex -index);                                 /*index 为点击前位置  计算偏移量 */
            if (animateStayus == false) {
                animate(newOffset); 
                index =clickIndex;                                                           /*偏移后将新的位置 赋予给index */
                showButtons();                                                              /*将按钮显示在新图片位置 */
            }  
        }
    }



    /*自动播放设置 */
    function run () {  /*自动转换函数  每隔一段时间执行点击右键函数 */
        timer = setInterval (function (){
            next.onclick();
        }, 3000);
    }
    function stop () {
        clearTimeout(timer); /*停止自动转换函数  */
    }

    container[0].onmouseover = stop;  /*container 是用class选择获得的 获得值为对象的集合 所以用索引 */
    container[0].onmouseout  = run;
    run();
    
}
