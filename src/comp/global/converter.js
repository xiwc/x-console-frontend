import 'jquery-format';

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
 * 时间格式化值转换器
 * doc: https://www.npmjs.com/package/jquery-format
 */
export class DateFormatValueConverter {
    toView(value, format='yyyy/MM/dd hh:mm:ss') {
        return $.format.date(new Date(), format);
    }
}

/**
 * 数值格式化值转换器
 * doc: https://www.npmjs.com/package/jquery-format
 */
export class numberFormatValueConverter {
    toView(value, format='#,##0.0#') {
        return $.format.number(value, format);
    }
}
