function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import crypto from "crypto";
export var EncryptDecryptService = /*#__PURE__*/ function() {
    "use strict";
    function EncryptDecryptService() {
        _class_call_check(this, EncryptDecryptService);
        _define_property(this, "algorithm", void 0);
        _define_property(this, "key", void 0);
        _define_property(this, "ivLength", void 0);
        this.algorithm = "aes-256-cbc";
        this.key = crypto.scryptSync("your-secret-key", "salt", 32);
        this.ivLength = 16;
    }
    _create_class(EncryptDecryptService, [
        {
            key: "encrypt",
            value: function encrypt(text) {
                var iv = crypto.randomBytes(this.ivLength);
                var cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
                var encrypted = cipher.update(text, "utf8", "hex");
                encrypted += cipher.final("hex");
                return iv.toString("hex") + ":" + encrypted;
            }
        },
        {
            key: "decrypt",
            value: function decrypt(text) {
                var _text_split = _sliced_to_array(text.split(":"), 2), ivHex = _text_split[0], encryptedText = _text_split[1];
                var iv = Buffer.from(ivHex, "hex");
                var decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
                var decrypted = decipher.update(encryptedText, "hex", "utf8");
                decrypted += decipher.final("utf8");
                return decrypted;
            }
        }
    ]);
    return EncryptDecryptService;
}();
