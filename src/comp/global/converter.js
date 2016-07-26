import dateFormat from 'date-format';

/**
 * 该文件用于定义值的过滤转换器
 *
 */
// ============================================================
/**
 * 转换为大写形式
 * eg: <p>${name | upper}</p>
 */
export class UpperValueConverter {
    toView(value) {
        return value && value.toUpperCase();
    }
}

/**
 * 转换为小写形式
 * eg: <p>${name | lower}</p>
 */
export class LowerValueConverter {
    toView(value) {
        return value && value.toLowerCase();
    }
}

/**
 * 限制字符串的最大显示长度
 * eg: <p>${name | abbreviate:5}</p>
 * 1234 --> 1234
 * 12345 -->12345
 * 123456 -->12345..
 */
export class AbbreviateValueConverter {
    toView(value, maxLen, defaultValue) {

        if ((value == null || typeof(value) == "undefined") && defaultValue) {
            return defaultValue;
        }

        return nsHelper.abbreviate(value, maxLen);
    }
}

/**
 * 限制字符串的最大显示长度
 * eg: <p>${name | abbreviateexact:5}</p>
 * 1234 --> 1234
 * 12345 -->12345
 * 123456 -->1234...
 */
export class AbbreviateexactValueConverter {
    toView(value, maxLen, defaultValue) {

        if ((value == null || typeof(value) == "undefined") && defaultValue) {
            return defaultValue;
        }

        return _.abbreviateexact(value, maxLen);
    }
}

/**
 * raoenhui
 * 限制字符串的最大显示长度
 * eg: <p>${attachment.fileOrgName | abbreviatefile:54:3}</p>
 * ext:后几位
 */
export class AbbreviatefileValueConverter {
    toView(value, maxLen, ext) {
        if (value) {
            let valueMain = value.substring(0, value.length - ext);
            let valueExtension = value.substring(value.length - ext);
            let valueMainAbbr = nsHelper.abbreviate(valueMain, maxLen);
            return valueMainAbbr + valueExtension;
        } else {
            return '';
        }
    }
}

/**
 * raoenhui
 * 限制字符串的最大显示长度
 * eg: <p>${attachment.fileOrgName | abbreviatefileName:54}</p>
 * ext:后几位
 */
export class AbbreviatefileNameValueConverter {
    toView(value, maxLen) {
        if (value) {
            let li = value.lastIndexOf('.');
            let subfix = value.substring(li);

            let valueMain = value.substring(0, li);
            let valueMainAbbr = nsHelper.abbreviate(valueMain, maxLen - subfix.length);
            return valueMainAbbr + subfix;
        } else {
            return '';
        }
    }
}

/**
 * 时间格式化值转换器
 * doc: https://www.npmjs.com/package/date-format
 */
export class DateFormatValueConverter {
    toView(value, format='yyyy/MM/dd hh:mm:ss') {
        // console.log(dateFormat);
        return dateFormat.asString(format, new Date(value));
    }
}
