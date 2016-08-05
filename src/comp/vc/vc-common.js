export class MappingValueConverter {

    networkType = {
        '1': {
            zh: '经典网络'
        },
        '2': {
            zh: '私有网络'
        }
    };

    mirrorStatus = {
        '1': {
            zh: '可用'
        },
        '2': {
            zh: '不可用'
        }
    };

    mirrorPlatform = {
        'linux': {
            zh: 'Linux'
        },
        'windows': {
            zh: 'Windows'
        }
    };

    mirrorScope = {
        '1': {
            zh: '可见'
        },
        '2': {
            zh: '不可见'
        }
    };

    diskType = {
        '1': {
            zh: '性能型'
        },
        '2': {
            zh: '容量型'
        }
    };

    diskStatus = {
        '1': {
            zh: '未使用'
        },
        '2': {
            zh: '使用中'
        }
    };

    routerType = {
        "1": {
            zh: '中小型'
        },
        "2": {
            zh: '大型'
        }
    };

    privateHostType = {
        "1": {
            zh: '主机'
        },
        "2": {
            zh: "负载均衡"
        }
    };

    publicIpStatus = {
        "1": {
            zh: "可用"
        },
        "2": {
            zh: "已分配"
        }
    };

    chargeMode = {
        "1": {
            zh: "按带宽计费"
        },
        "2": {
            zh: "按流量计费"
        }
    };

    lineMode = {
        "1": {
            zh: "联通"
        },
        "2": {
            zh: "电信"
        },
        "3": {
            zh: "BGP线路"
        }
    };

    hostStatus = {
        '1': {
            zh: '运行中'
        },
        '2': {
            zh: '正在启动'
        },
        '3': {
            zh: '已停止'
        },
        '4': {
            zh: '停止中'
        },
        '5': {
            zh: '重启中'
        }
    };

    hostType = {
        '1': {
            zh: '性能型'
        },
        '2': {
            zh: '经济适用型'
        }
    };

    sshType = {
        '1': {
            zh: 'RSA'
        },
        '2': {
            zh: 'DSA'
        },
        '3': {
            zh: 'ECDSA'
        }
    };

    sshKeyType = {
        '1': {
            zh: '新密钥对'
        },
        '2': {
            zh: '已有公钥'
        }
    };

    toView(value, name) {

        if (this.hasOwnProperty(name)) {
            let mapping = this[name];
            if (mapping.hasOwnProperty(value)) {
                return mapping[value]['zh'];
            }
        }

        return '';
    }
}
