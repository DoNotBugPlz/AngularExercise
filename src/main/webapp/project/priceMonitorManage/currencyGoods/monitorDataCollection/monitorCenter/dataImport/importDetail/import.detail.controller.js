(function () {
    'use strict';

    angular
        .module('app.dataImport')
        .controller('ImportDetailCtrl', ImportDetailCtrl);

    ImportDetailCtrl.$inject = ['$scope', 'BackDetailService', 'ngDialog', 'coreService','pageInfDefault'];

    /* @ngInject */
    function ImportDetailCtrl($scope, BackDetailService, ngDialog, coreService,pageInfDefault) {
        var vm = this;
        vm.cancelDialog  = cancelDialog;
        vm.source_param  = $scope.ngDialogData;
        vm.currentPageInf = {
            pageNumber:pageInfDefault.pageNumberDefault,
            pageSize:pageInfDefault.pageSizeDefault
        };
        function activate() {
            vm.signList = [
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"}
            ];
            vm.signListPage = {pageTurn:"getList",pagenum:1,total:2,
                rows:[
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"},
                    {chinaname:'大豆',site_name:"浦口区苏果超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"80.00",is_pub:"1"},
                    {chinaname:'玉米',site_name:"羽山路大润发超市",col_datetime:'桶装一级压榨',actual_sign_nums:'元/500g',is_pub_text:"75.00",is_pub:"0"}
                ]
            }
        }
        activate();
        function cancelDialog() {
            ngDialog.close($scope.ngDialogId);
        }
    }
})();

