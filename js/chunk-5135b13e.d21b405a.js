(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5135b13e"],{"0a65":function(t,a,s){"use strict";var e=s("5608"),r=s.n(e);r.a},1110:function(t,a,s){},"16bf":function(t,a,s){},"43c4":function(t,a,s){"use strict";var e=s("1110"),r=s.n(e);r.a},"4d8b":function(t,a,s){},5608:function(t,a,s){},"709b":function(t,a,s){"use strict";var e=s("4d8b"),r=s.n(e);r.a},"8bd6":function(t,a,s){"use strict";var e=s("16bf"),r=s.n(e);r.a},a99b:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("SuccessMessage"),s("nav",{staticClass:"navbar navbar-expand-lg navbar-light fixed-top topnav"},[s("div",{staticClass:"container"},[t._m(0),s("router-link",{attrs:{to:"/"}},[s("img",{staticClass:"logoImg",attrs:{src:"https://github.com/andrew-HuangHaoChe/image/blob/master/keyboardlogo.png?raw=true"}})]),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav ml-auto py-1 home-nav-icon align-items-start"},[s("li",{staticClass:"nav-item pr-4 d-flex justify-content-start"},[s("router-link",{attrs:{to:{path:"/"},"active-class":"routerActive"}},[s("i",{staticClass:"fas fa-home fa-2x d-flex justify-content-center"}),s("div",{staticClass:"d-flex justify-content-center homeFont"},[t._v("首頁")])])],1),s("li",{staticClass:"nav-item pr-4 d-flex justify-content-start"},[s("router-link",{attrs:{to:{path:"/shopping"},"active-class":"routerActive"}},[s("i",{staticClass:"fas fa-shopping-bag fa-2x d-flex justify-content-center"}),s("div",{staticClass:"d-flex justify-content-center homeFont"},[t._v("商品")])])],1),s("li",{staticClass:"nav-item pr-4 d-flex justify-content-start"},[s("router-link",{attrs:{to:{path:"/promotion"},"active-class":"routerActive"}},[s("i",{staticClass:"fas fa-ticket-alt fa-2x d-flex justify-content-center"}),s("div",{staticClass:"d-flex justify-content-center icon"},[t._v("優惠")])])],1),s("li",{staticClass:"nav-item pr-4 d-flex justify-content-start"},[s("router-link",{attrs:{to:{path:"/login"},"active-class":"routerActive"}},[s("i",{staticClass:"far fa-user fa-2x d-flex justify-content-center"}),s("div",{staticClass:"d-flex justify-content-center icon"},[t._v("登入")])])],1),s("li",{staticClass:"nav-item pr-4 d-flex justify-content-start"},[s("div",{staticClass:"btn-group"},[s("div",{staticClass:"btn-group dropleft favIcon",attrs:{role:"group"}},[t._m(1),s("div",{staticClass:"dropdown-menu favorite-dropdown-menu"},t._l(t.navbarFavorite,(function(a){return s("div",{key:a.id,staticClass:"row drop-item-f px-4 py-1 favoriteList"},[s("div",{staticClass:"col-8 drop-item pl-1"},[t._v(t._s(a.title))]),s("div",{staticClass:"col-1 drop-item"},[s("i",{staticClass:"fas fa-shopping-cart",on:{click:function(s){return t.addtoCart(a.id)}}})])])})),0),0!==t.navbarFavorite.length?s("p",{staticClass:"favLength"},[s("span",{staticClass:"d-flex justify-content-center"},[t._v(t._s(t.navbarFavorite.length))])]):t._e()])])])])])],1)])],1)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"navbar-toggler showMenu",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[s("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"d-flex flex-column align-items-start p-0 border-0 btn dropdown-toggle dropdown-toggle-split favBtn",attrs:{type:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[s("i",{staticClass:"fas fa-heartbeat heartIcon"}),s("div",{staticClass:"homeFont"},[t._v("最愛")])])}],i=(s("99af"),s("4de4"),s("4160"),s("c975"),s("a434"),s("159b"),s("e956")),n={components:{SuccessMessage:i["a"]},data:function(){return{isrouActive:!1,navbarFavorite:[],favList:[]}},methods:{addtoCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,s=this;s.$store.dispatch("cartsModules/addtoCart",{id:t,qty:a}),s.navbarFavorite.forEach((function(a,e){t===a.id&&(s.sliceIndex=e)})),s.navbarFavorite.splice(s.sliceIndex,1),localStorage.setItem("favlistinStorage",JSON.stringify(this.navbarFavorite))},getFavtitle:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("andrewhaoche","/products/all");t.$http.get(a).then((function(a){var s=a.data.products;s.filter((function(a){return-1!==t.navbarFavorite.indexOf(a.id)&&t.favList.push(a.title),a}))}))}},mounted:function(){this.getFavtitle()},created:function(){var t=this;t.$bus.$on("favorite",(function(a){t.navbarFavorite=a}))}},o=n,c=(s("0a65"),s("2877")),l=Object(c["a"])(o,e,r,!1,null,"c640c53c",null);a["a"]=l.exports},bf75:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("HomeNav",{staticClass:"mb-5 pb-5"}),s("progressbar",{staticClass:"py-5",attrs:{status:t.status}}),s("div",{staticClass:"container"},[s("div",{staticClass:"my-5 row justify-content-center"},[s("form",{staticClass:"col-md-6",on:{submit:function(a){return a.preventDefault(),t.payOrder(a)}}},[s("h1",{staticClass:"h3 mt-3"},[t._v("購買資訊")]),s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.order.products,(function(a){return s("tr",{key:a.id},[s("td",{staticClass:"align-middle"},[t._v(t._s(a.product.title))]),s("td",{staticClass:"align-middle"},[t._v(t._s(a.qty)+"/"+t._s(a.product.unit))]),s("td",{staticClass:"text-right"},[s("del",[t._v(t._s(t._f("currency")(a.total)))]),s("br"),s("span",{staticClass:"text-success"},[t._v(t._s(t._f("currency")(a.final_total)))])])])})),0),s("tfoot",[s("tr",[s("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("總計: ")]),s("td",{staticClass:"text-right text-success"},[t._v(t._s(t._f("currency")(t.order.total)))])])])]),s("p",{staticClass:"h3"},[t._v("個人資料")]),s("table",{staticClass:"table"},[s("tbody",[s("tr",[s("th",{attrs:{width:"100"}},[t._v("Email")]),s("td",[t._v(t._s(t.order.user.email))])]),s("tr",[s("th",[t._v("姓名")]),s("td",[t._v(t._s(t.order.user.name))])]),s("tr",[s("th",[t._v("收件人電話")]),s("td",[t._v(t._s(t.order.user.tel))])]),s("tr",[s("th",[t._v("收件人地址")]),s("td",[t._v(t._s(t.order.user.address))])]),s("tr",[s("th",[t._v("付款狀態")]),s("td",[t.order.is_paid?s("span",{staticClass:"text-success"},[t._v("付款完成")]):s("span",[t._v("尚未付款")])])])])]),!1===t.order.is_paid?s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-danger"},[t._v("確認付款去")])]):t._e(),!0===t.order.is_paid?s("div",{staticClass:"text-right"},[s("router-link",{attrs:{to:"/shopping"}},[s("button",{staticClass:"btn btn-primary"},[t._v("繼續購物")])])],1):t._e()])])]),s("Footer")],1)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("th",[t._v("品名")]),s("th",[t._v("數量")]),s("th",{staticClass:"text-right",attrs:{width:"100"}},[t._v("單價")])])}],i=(s("99af"),s("a99b")),n=s("c27d"),o=s("cc26"),c={components:{HomeNav:i["a"],Footer:n["a"],progressbar:o["a"]},data:function(){return{orderId:"",order:{user:{}},status:2}},methods:{getOrder:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("andrewhaoche","/order/").concat(t.orderId);t.$store.dispatch("updateLoading",!0),t.$http.get(a).then((function(a){t.order=a.data.order,t.$store.dispatch("updateLoading",!1)}))},payOrder:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("andrewhaoche","/pay/").concat(t.orderId);t.$store.dispatch("updateLoading",!0),t.$http.post(a).then((function(a){a.data.success&&(t.getOrder(),t.status=3),t.$store.dispatch("updateLoading",!1)}))}},created:function(){var t=this;t.orderId=this.$route.params.orderId,t.getOrder()}},l=c,u=s("2877"),d=Object(u["a"])(l,e,r,!1,null,null,null);a["default"]=d.exports},c27d:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("footer",{staticClass:"footer py-3 footerNav"},[s("div",{staticClass:"py-5 footerNav"},[s("ul",{staticClass:"d-flex justify-content-center list-unstyled"},[s("li",[s("i",{staticClass:"fab fa-facebook footerIcon px-2"})]),s("li",[s("i",{staticClass:"fab fa-github footerIcon px-2"})]),s("li",[s("i",{staticClass:"fab fa-instagram footerIcon px-2"})]),s("li",[s("i",{staticClass:"far fa-envelope footerIcon px-2"})])]),s("span",{staticClass:"d-flex justify-content-center text-primary"},[t._v("©Copright 2020 Hao Che")]),s("span",{staticClass:"d-flex justify-content-center text-primary"},[t._v("網頁內素材皆做為學習用途，無任何商業行為")])])])])}],i=(s("8bd6"),s("2877")),n={},o=Object(i["a"])(n,e,r,!1,null,"92341054",null);a["a"]=o.exports},c975:function(t,a,s){"use strict";var e=s("23e7"),r=s("4d64").indexOf,i=s("a640"),n=s("ae40"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),u=n("indexOf",{ACCESSORS:!0,1:0});e({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(t){return c?o.apply(this,arguments)||0:r(this,t,arguments.length>1?arguments[1]:void 0)}})},cc26:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"status"},[s("ul",[s("li",{class:{"bg-primary":t.status>=1,"text-light":t.status>=1}},[s("p",[t._v("輸入訂單資料")])]),s("li",{class:{"bg-primary":t.status>=2,"text-light":t.status>=2}},[s("p",[t._v("確認付款")])]),s("li",{class:{"bg-primary":t.status>=3,"text-light":t.status>=3}},[s("p",[t._v("完成購物")])])])])},r=[],i={props:["status"]},n=i,o=(s("709b"),s("2877")),c=Object(o["a"])(n,e,r,!1,null,"e7688410",null);a["a"]=c.exports},e956:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"message-alert"},t._l(t.messages,(function(a,e){return s("div",{key:e,staticClass:"alert alert-dismissible-success",class:"alert-"+a.status},[t._v(" "+t._s(a.message)+" "),s("button",{staticClass:"success-close",attrs:{type:"button","aria-label":"Close"},on:{click:function(a){return t.removeMessage(e)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]),s("div",{staticClass:"tickBlock d-flex justify-content-center align-items-center mt-2"},[s("svg",{attrs:{width:"50",height:"50"}},[s("circle",{staticClass:"circle",attrs:{fill:"none",stroke:"#68E534","stroke-width":"5",cx:"25",cy:"25",r:"21","stroke-linecap":"round",transform:"rotate(-20 30 30)"}}),s("polyline",{staticClass:"tick",attrs:{fill:"none",stroke:"#68E534","stroke-width":"5",points:"11,26,21,35,38,17","stroke-linecap":"round","stroke-linejoin":"round"}})])])])})),0)},r=[],i={name:"Navbar",data:function(){return{}},methods:{removeMessage:function(t){this.$store.dispatch("removeMessage",t)}},computed:{messages:function(){return this.$store.state.messages}}},n=i,o=(s("43c4"),s("2877")),c=Object(o["a"])(n,e,r,!1,null,null,null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-5135b13e.d21b405a.js.map