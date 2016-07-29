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
        '1': {
            zh: 'Linux'
        },
        '2': {
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
            zh: '可用'
        },
        '2': {
            zh: '不可用'
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
