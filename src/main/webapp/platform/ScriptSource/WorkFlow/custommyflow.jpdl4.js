(function ($) {
    var myflow = $.myflow;

    $.extend(true, myflow.config.rect, {
        attr: {
            r: 8,
            fill: '#F6F7FF',
            stroke: '#03689A',
            "stroke-width": 2
        }
    });

    $.extend(true, myflow.config.tools.states, {
        start: {
            showType: 'image',
            type: 'start',
            name: { text: '<<start>>' },
            text: { text: '开始' },
            img: { src: '../../../ScriptSource/WorkFlow/img/48/start_event_empty.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            editable:false,
            iscurrentrect:false,
            props: {
                id: { value: '' }
            }
           
        },
        countersign: { showType: 'image', type: 'countersign',
            name: { text: '<<countersign>>' },
            text: { text: '会签' },
            img: { src: '../../../ScriptSource/WorkFlow/img/48/task_countersign.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            editable:true,
            iscurrentrect:false,
            props: {
                id: { value: '' }
            }
        },
        task: { showType: 'text', type: 'task',
            name: { text: '<<task>>' },
            text: { text: '任务' },
            img: { src: '../../../ScriptSource/WorkFlow/img/48/task_empty.png', width: 48, height: 48 },
            editable:true,
            iscurrentrect:false,
            props: {
                id: { value: '' }
            }
        }
    });
})(jQuery);