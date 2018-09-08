/**
 * Created by chencl on 2018/8/30
 * 待填报列表
 */
(function () {
    'use strict';

    angular
        .module('app.dataView')
        .controller('DataViewCtrl', DataViewCtrl);
    DataViewCtrl.$inject = ['$scope','$stateParams','dataViewService','pageInfDefault','coreService','ngDialog'];

    /* @ngInject */
    function DataViewCtrl($scope,$stateParams,dataViewService,pageInfDefault,coreService,ngDialog) {
        var vm =this;
        vm.condition ={};
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        vm.changeType = changeType;
        vm.clearAll = clearAll;
        vm.getList  = getList;

        var myChart = echarts.init(document.getElementById('main'));
        activate();
        function activate() {
            changeType(1)
        }

        function getList(pageNumber,pageSize) {
            var pageInfo = {
                pageNumber:pageNumber||vm.currentPageInf.pageNumber,
                pageSize:pageSize||vm.currentPageInf.pageSize
            };
            var params = angular.extend(pageInfo,vm.condition);
            vm.currentPageInf = angular.extend(vm.currentPageInf,pageInfo);
            return dataViewService.getList(params).then(setList);
        }
        function setList(response,pageNum) {
            var result = response.data;
            vm.signList = result.rows;
            vm.signListPage = angular.extend({pageTurn: 'getList',pagenum:pageNum}, result);
        }

        function changeType(type) {
            var option = {};
            if(type == 1){
                // 基于准备好的dom，初始化echarts图表
                option = {
                    title : {
                        text: '药品监测'
                        // subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['论坛','网站','微博','微信','全部']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['9月1号','9月2号','9月3号','9月4号','9月5号','9月6号','9月7号']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'论坛',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10]
                        },
                        {
                            name:'网站',
                            type:'line',
                            data:[11, 21, 12, 15, 23, 12, 10]
                        },
                        {
                            name:'微博',
                            type:'line',
                            data:[13, 13, 11, 5, 3, 14, 10]
                        },
                        {
                            name:'微信',
                            type:'line',
                            data:[11, 12, 12, 15, 13, 9, 10]
                        },
                        {
                            name:'全部',
                            type:'line',
                            data:[11, 12, 9, 15, 13, 15, 5]
                        }
                    ]
                };
            }else if(type == 2){
                option = {
                    title : {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:['论坛','网站','微博','微信','其他']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'论坛'},
                                {value:310, name:'网站'},
                                {value:234, name:'微博'},
                                {value:135, name:'微信'},
                                {value:1548, name:'其他'}
                            ]
                        }
                    ]
                };
            }else if(type == 3){
                var cityProper = {
                    '常州市': './lib/echarts/3.5.4/map/changzhou.json',
                    '淮安市': './lib/echarts/3.5.4/map/huaian.json',
                    '连云港市': './lib/echarts/3.5.4/map/lianyungang.json',
                    '南京市': './lib/echarts/3.5.4/map/nanjing.json',
                    '南通市': './lib/echarts/3.5.4/map/nantong.json',
                    '宿迁市': './lib/echarts/3.5.4/map/suqian.json',
                    '苏州市': './lib/echarts/3.5.4/map/suzhou.json',
                    '泰州市': './lib/echarts/3.5.4/map/taizhou.json',
                    '无锡市': './lib/echarts/3.5.4/map/wuxi.json',
                    '徐州市': './lib/echarts/3.5.4/map/xuzhou.json',
                    '盐城市': './lib/echarts/3.5.4/map/yancheng.json',
                    '扬州市': './lib/echarts/3.5.4/map/yangzhou.json',
                    '镇江市': './lib/echarts/3.5.4/map/zhenjiang.json'
                };
                var data = [{
                    name: '常州市',value:33
                }, {
                    name: '淮安市',value:111
                }, {
                    name: '连云港市',value:222
                }, {
                    name: '南京市',value:333
                }, {
                    name: '南通市',value:444
                }, {
                    name: '宿迁市',value:555
                }, {
                    name: '苏州市',value:666
                }, {
                    name: '泰州市',value:777
                }, {
                    name: '无锡市',value:888
                }, {
                    name: '徐州市',value:999
                }, {
                    name: '盐城市',value:1000
                }, {
                    name: '扬州市',value:1200
                }, {
                    name: '镇江市',value:1300
                }];

                //获取青岛地图数据。
                $.get("./lib/echarts/3.5.4/map/jiangsu.json", function(getJSON) {
                    echarts.registerMap("江苏省",getJSON);
                    option = {
                        grid: {
                            left: '5%',
                            right: '4%',
                            top:'0%',
                            bottom: '0%',
                            width:'100%',
                            containLabel: true
                        },
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false
                                }
                            }
                        },
                        dataRange: {
                            min: 0,
                            max: 1000,
                            color: ['#FF5050', '#DAAB66', '#ACFF78', '#5DEC64', '#78DAFF'],
                            text: ['高', '低'],           // 文本，默认为数值文本
                            itemHeight: 225,
                            itemWidth: 25,
                            textStyle: { color: 'black',fontSize:10 },
                            calculable: true
                        },
                        series: [{
                            tooltip: {
                                trigger: 'item'
                            },
                            name: '选择器',
                            type: 'map',
                            mapType: '江苏省',
                            left: '30%',
                            top: '10%',
                            roam: true,
                            selectedMode: 'single',
                            textFixed:{"徐州市":[100,-10]},
                            // heatmap:{blurSize:30,gradientColors:['blue', 'cyan', 'lime', 'yellow', 'red'],minAlpha:0.05, valueScale:1,opacity:1},
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: data
                        }],
                        animation: false
                    };
                    myChart.setOption(option, true);
                    myChart.off("click");
                    myChart.on("click", mapClick);
                })

            }else if(type == 4){
                option = {
                    title: {
                        text: 'Google Trends',
                        link: 'http://www.google.com/trends/hottrends'
                    },
                    tooltip: {
                        show: true
                    },
                    series: [{
                        name: 'Google Trends',
                        type: 'wordCloud',
                        // shape:'circle',
                        size: ['80%', '80%'],
                        textRotation : [0, 45, 90, -45],
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        data: [
                            {
                                name: "Sam S Club",
                                value: 10000,
                                textStyle: {
                                    normal: {
                                        color: 'black'
                                    }
                                }
                            },
                            {
                                name: "Macys",
                                value: 6181,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Amy Schumer",
                                value: 4386,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Jurassic World",
                                value: 4055,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Charter Communications",
                                value: 2467,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Chick Fil A",
                                value: 2244,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Planet Fitness",
                                value: 1898,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Pitch Perfect",
                                value: 1484,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Express",
                                value: 1112,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Home",
                                value: 965,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Johnny Depp",
                                value: 847,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Lena Dunham",
                                value: 582,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Lewis Hamilton",
                                value: 555,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "KXAN",
                                value: 550,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Mary Ellen Mark",
                                value: 462,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Farrah Abraham",
                                value: 366,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Rita Ora",
                                value: 360,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Serena Williams",
                                value: 282,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "NCAA baseball tournament",
                                value: 273,
                                textStyle: createRandomItemStyle()
                            },
                            {
                                name: "Point Break",
                                value: 265,
                                textStyle: createRandomItemStyle()
                            }
                        ]
                    }]
                };
                myChart.off("click");       // 去掉点击事件
                myChart.on("click",wordCloudClick);
            }

            function createRandomItemStyle() {
                return {
                    normal: {
                        color: 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')'
                    }
                };
            }

            /**点击地图事件**/
            function mapClick(param){
                myChart.setOption(option, false);
                var selectedPro = param.name;
                if (!cityProper[selectedPro]) {
                    option.series.splice(1);
                    option.legend = null;
                    option.visualMap = null;
                    myChart.setOption(option, true);
                    return;
                }
                //获取点击区域数据
                $.get(cityProper[selectedPro], function(geojson) {
                    echarts.registerMap(selectedPro, geojson);
                    //根据需求，如果要替换青岛地图，series参数为[0]，不替换为[1],其中left、top自己设置。

                    /**
                     * 处理各个区县的数据
                     **/
                    var quxian_data = [{
                        name: '滨海县',value:33
                    }, {
                        name: "大丰市",value:111
                    }, {
                        name: "东台市",value:222
                    }];

                    option.series[0] = {
                        name: '选择器',
                        type: 'map',
                        mapType: selectedPro,
                        left: '35%',
                        top: '10%',
                        width: '30%',
                        roam: true,
                        selectedMode: 'single',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data:quxian_data        //
                    };
                    myChart.setOption(option, true);
                })

            };

            /**点击词云事件**/
            function wordCloudClick(param){
                console.log(param)
            };

            // 为echarts对象加载数据
            myChart.clear();
            if(type ==3) return;
            myChart.setOption(option);
            window.onresize = myChart.resize;// 图表随屏幕大小自适应
        }

        function clearAll() {
            vm.condition = {}
        }
    }
})();

