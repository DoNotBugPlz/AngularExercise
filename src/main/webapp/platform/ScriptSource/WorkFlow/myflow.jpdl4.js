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
            img: { src: '../../ScriptSource/WorkFlow/img/48/start_event_empty.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        end: { showType: 'image', type: 'end',
            name: { text: '<<end>>' },
            text: { text: '结束' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/end_event_terminate.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        countersign: { showType: 'image', type: 'countersign',
            name: { text: '<<countersign>>' },
            text: { text: '会签' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/task_countersign.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        subprocess: { showType: 'image', type: 'subprocess',
            name: { text: '<<subprocess>>' },
            text: { text: '子流程' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/task_subprocess.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        /*state: { showType: 'text', type: 'state',
            name: { text: '<<state>>' },
            text: { text: '状态' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/task_empty.png', width: 48, height: 48 },
            props: {
                id: { value: '' }
            }
        },*/
        fork: { showType: 'image', type: 'fork',
            name: { text: '<<fork>>' },
            text: { text: '分支' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/gateway_exclusive.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        join: { showType: 'image', type: 'join',
            name: { text: '<<join>>' },
            text: { text: '合并' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/gateway_parallel.png', width: 48, height: 48 },
            attr: { width: 50, heigth: 50 },
            props: {
                id: { value: '' }
            }
        },
        task: { showType: 'text', type: 'task',
            name: { text: '<<task>>' },
            text: { text: '任务' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/task_empty.png', width: 48, height: 48 },
            props: {
                id: { value: '' }
            }
        },
        scan: { showType: 'image', type: 'scan',
            name: { text: '<<scan>>' },
            text: { text: '传阅' },
            img: { src: '../../ScriptSource/WorkFlow/img/48/task_scan.png', width: 48, height: 48 },
            props: {
                id: { value: '' }
            }
        }
    });
})(jQuery);