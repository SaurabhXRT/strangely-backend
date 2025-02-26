function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { Chats } from "../models/Chats/Chats.js";
import { Character } from "../models/Character/Character.js";
import logger from "../logger/logger.js";
import { MistralService } from "./AIService/MistralService.js";
import { EncryptDecryptService } from "./EncryptDecryptService.js";
var airesponseservice = new MistralService();
var encryptdecryptservice = new EncryptDecryptService();
var encrypt = encryptdecryptservice.encrypt;
var decrypt = encryptdecryptservice.decrypt;
export var ChatService = /*#__PURE__*/ function() {
    "use strict";
    function ChatService() {
        _class_call_check(this, ChatService);
    }
    _create_class(ChatService, [
        {
            key: "createChat",
            value: function createChat(data) {
                return _async_to_generator(function() {
                    var user_id, character_id, message, character, chatHistory, messages, response, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    5,
                                    ,
                                    6
                                ]);
                                user_id = data.user_id, character_id = data.character_id, message = data.message;
                                return [
                                    4,
                                    Character.findByPk(character_id)
                                ];
                            case 1:
                                character = _state.sent();
                                if (!character) {
                                    logger.error("Character not found");
                                    return [
                                        2,
                                        "AI character not found"
                                    ];
                                }
                                return [
                                    4,
                                    Chats.findAll({
                                        where: {
                                            user_id: user_id,
                                            character_id: character_id
                                        },
                                        order: [
                                            [
                                                "createdAt",
                                                "DESC"
                                            ]
                                        ],
                                        limit: 10
                                    })
                                ];
                            case 2:
                                chatHistory = _state.sent();
                                messages = [
                                    {
                                        role: "system",
                                        content: "You are ".concat(character.name, ". Your personality: ").concat(character.character_bio)
                                    }
                                ];
                                chatHistory.reverse().forEach(function(chat) {
                                    messages.push({
                                        role: "user",
                                        content: decrypt(chat.user_message)
                                    });
                                    messages.push({
                                        role: "assistant",
                                        content: decrypt(chat.character_response)
                                    });
                                });
                                messages.push({
                                    role: "user",
                                    content: message
                                });
                                return [
                                    4,
                                    airesponseservice.getMistralResponse(messages)
                                ];
                            case 3:
                                response = _state.sent();
                                return [
                                    4,
                                    Chats.create({
                                        user_id: user_id,
                                        character_id: character_id,
                                        user_message: encrypt(message),
                                        character_response: encrypt(response)
                                    })
                                ];
                            case 4:
                                _state.sent();
                                return [
                                    2,
                                    response
                                ];
                            case 5:
                                error = _state.sent();
                                logger.log(error);
                                return [
                                    2,
                                    "something went wrong"
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getChatHistory",
            value: function getChatHistory(user_id, character_id) {
                return _async_to_generator(function() {
                    var chatHistory, response, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    Chats.findAll({
                                        where: {
                                            user_id: user_id,
                                            character_id: character_id
                                        }
                                    })
                                ];
                            case 1:
                                chatHistory = _state.sent();
                                response = chatHistory.map(function(it) {
                                    return _object_spread_props(_object_spread({}, it.toJSON()), {
                                        user_message: decrypt(it.user_message),
                                        character_response: decrypt(it.character_response)
                                    });
                                });
                                return [
                                    2,
                                    response
                                ];
                            case 2:
                                error = _state.sent();
                                logger.log(error);
                                return [
                                    2,
                                    []
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getUserAllChat",
            value: function getUserAllChat(user_id) {
                return _async_to_generator(function() {
                    var chatData, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    Chats.findAll({
                                        where: {
                                            user_id: user_id
                                        },
                                        attributes: [
                                            "character_id",
                                            "character_response",
                                            "createdAt"
                                        ],
                                        include: [
                                            {
                                                model: Character,
                                                as: "character",
                                                attributes: [
                                                    "name",
                                                    "character_image"
                                                ]
                                            }
                                        ],
                                        order: [
                                            [
                                                "createdAt",
                                                "DESC"
                                            ]
                                        ],
                                        group: [
                                            "character_id"
                                        ]
                                    })
                                ];
                            case 1:
                                chatData = _state.sent();
                                return [
                                    2,
                                    chatData.map(function(chat) {
                                        var _chat_character, _chat_character1;
                                        return {
                                            character_id: chat.character_id,
                                            name: ((_chat_character = chat.character) === null || _chat_character === void 0 ? void 0 : _chat_character.name) || "Unknown",
                                            character_image: ((_chat_character1 = chat.character) === null || _chat_character1 === void 0 ? void 0 : _chat_character1.character_image) || "",
                                            last_message: chat.character_response,
                                            last_message_time: chat.createdAt
                                        };
                                    })
                                ];
                            case 2:
                                error = _state.sent();
                                logger.log(error);
                                return [
                                    2,
                                    []
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteUserChat",
            value: function deleteUserChat(character_id, user_id) {
                return _async_to_generator(function() {
                    var chat, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    Chats.destroy({
                                        where: {
                                            character_id: character_id,
                                            user_id: user_id
                                        }
                                    })
                                ];
                            case 1:
                                chat = _state.sent();
                                if (chat > 0) {
                                    return [
                                        2,
                                        true
                                    ];
                                }
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                logger.log(error);
                                return [
                                    2,
                                    false
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return ChatService;
}();
