var todoModule = (function() {
    var taskList =[];
    var $taskList, $addBtn, $itemContent, $detailSaveBtn, $itemDetail, $detailContent, $detailDesc,
    $detailTime, $clearBtn, $leaveBtn, $shade;
    var index;
    // 初始化jq对象
    var initJq = function() {
        $taskList = $('.task-list');
        $addBtn = $('.add-btn');
        $clearBtn = $('.clear-btn');
        $leaveBtn = $('.leave-btn')
        $itemContent = $('.item-content');
        $detailSaveBtn = $('.detail-btn');
        $itemDetail = $('.item-detail');
        $detailContent = $('.detail-content');
        $detailDesc= $('.detail-desc');
        $detailTime = $('.detail-time');
        $shade = $('.shade');
    }

    // 初始化store
    var initStore = function() {
        if (store.get('taskList') === undefined) {
            store.set('taskList', []);
        }
    }

    // 清空store与列表
    var clearList = function() {
        store.clear();
        $taskList.html('');
        initStore();
        initList();
    }

    // 初始化todo列表
    var initList = function() {
        $taskList.html('');
        taskList = store.get('taskList');
        for (let i = 0; i < taskList.length; i++) {
            addItem(taskList[i]);
        }
    }

    // 添加列表项目
    var addItem = function(item) {
        var itemHtml = ''
                     + '<div class="task-item">'
                     +     '<input type="checkbox">'
                     +     '<span>'
                     +         item.content
                     +     '</span>'
                     +     '<span class="fr">'
                     +         '<span class="active detail">详情</span>'
                     +         '<span class="active delete">删除</span>'
                     +     '</span>'
                     + '</div>';
        $(itemHtml).prependTo($taskList);
        addDetail();
        deleteItem();
    }

    // 监听提交按钮
    var listenBtn = function() {
        $addBtn.on('click', function(e) {
            e.preventDefault();
            var newContent = {};
            newContent.content = $itemContent.val();
            taskList.push(newContent);//更新数组操作
            store.set('taskList',taskList);
            addItem(newContent);
            $itemContent.val('');
        });
    }

    // 添加item详情事件
    var addDetail = function() {
        $('.detail').click(function(e) {
            index = taskList.length - 1 - $(this).parent().parent().index();
            $itemDetail.show();
            $shade.show();
            $detailContent.val(taskList[index].content);
            $detailDesc.val(taskList[index].desc);
            $detailTime.val(taskList[index].time);
        });
    }

    // 提交并存储详情
    var detailSave = function() {
        $detailSaveBtn.on('click', function() {
            var dataDetail = {};
            dataDetail.content = $detailContent.val();
            dataDetail.desc = $detailDesc.val();
            dataDetail.time = $detailTime.val();
            taskList[index] = $.extend(taskList[index],dataDetail);
            store.set('taskList',taskList);
            $detailContent.val('');
            $detailDesc.val('');
            $detailTime.val('');
            $itemDetail.hide();
            $shade.hide();
            initList();
        });
    }

    // 离开详情页面
    var leave = function() {
        // $(document).mouseup(function(e){
        //     if(!$itemDetail.is(e.target) && $itemDetail.has(e.target).length === 0){ // Mark 1
        //         $itemDetail.hide();
        //     }
        // });
        // $leaveBtn.click(function() {
        //     $itemDetail.hide();
        // })
        ($leaveBtn).click(function() {
            $shade.hide();
            $itemDetail.hide();
        });
        ($shade).click(function() {
            $shade.hide();
            $itemDetail.hide();
        });
    }
    // 添加清空列表监听事件
    var clearItem = function() {
        $clearBtn.on('click', function(e) {
            var result;
            var length =$taskList.children().length;
            e.preventDefault();
            if (length !== 0) {
                result = window.confirm('确定要清空列表吗？');
                if (result) {
                    clearList();
                }
            } else {
                alert('列表空空如也，无需清空。');
            }
        });
    }

    // 删除列表项目
    var deleteItem = function() {
        $('.delete').off('click').click(function(){  // off() 解决事件多次绑定的bug
            var result = window.confirm('确定要删除吗？');
            index = taskList.length - 1 - $(this).parent().parent().index();
            if (result) {
                $(this).parent().parent().remove();
                taskList.splice(index,1);
                store.set('taskList',taskList);
            }
        });
    }

    // 初始化模块
    var initModule = function() {//store.clear();
        initJq();
        initStore();
        initList();
        clearItem();
        listenBtn();
        $detailTime.datetimepicker();
        addDetail();
        detailSave();
        deleteItem();
        leave();
        
    }

    return {
        initModule: initModule
    }
})();

$(function(){
	todoModule.initModule();
});
