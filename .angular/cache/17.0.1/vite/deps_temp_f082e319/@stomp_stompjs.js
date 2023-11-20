import {
  __commonJS
} from "./chunk-OXCW2X5T.js";

// node_modules/@stomp/stompjs/bundles/stomp.umd.js
var require_stomp_umd = __commonJS({
  "node_modules/@stomp/stompjs/bundles/stomp.umd.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define("StompJs", [], factory);
      else if (typeof exports === "object")
        exports["StompJs"] = factory();
      else
        root["StompJs"] = factory();
    })(window, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__.t = function(value, mode) {
            if (mode & 1)
              value = __webpack_require__(value);
            if (mode & 8)
              return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule)
              return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string")
              for (var key in value)
                __webpack_require__.d(ns, key, (function(key2) {
                  return value[key2];
                }).bind(null, key));
            return ns;
          };
          __webpack_require__.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 0);
        }({
          /***/
          "./src/byte.ts": (
            /*!*********************!*\
              !*** ./src/byte.ts ***!
              \*********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.Byte = {
                // LINEFEED byte (octet 10)
                LF: "\n",
                // NULL byte (octet 0)
                NULL: "\0"
              };
            }
          ),
          /***/
          "./src/client.ts": (
            /*!***********************!*\
              !*** ./src/client.ts ***!
              \***********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var stomp_handler_1 = __webpack_require__(
                /*! ./stomp-handler */
                "./src/stomp-handler.ts"
              );
              var versions_1 = __webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              );
              var Client = (
                /** @class */
                function() {
                  function Client2(conf) {
                    if (conf === void 0) {
                      conf = {};
                    }
                    this.stompVersions = versions_1.Versions.default;
                    this.reconnectDelay = 5e3;
                    this.heartbeatIncoming = 1e4;
                    this.heartbeatOutgoing = 1e4;
                    this._active = false;
                    var noOp = function() {
                    };
                    this.debug = noOp;
                    this.beforeConnect = noOp;
                    this.onConnect = noOp;
                    this.onDisconnect = noOp;
                    this.onUnhandledMessage = noOp;
                    this.onUnhandledReceipt = noOp;
                    this.onUnhandledFrame = noOp;
                    this.onStompError = noOp;
                    this.onWebSocketClose = noOp;
                    this.connectHeaders = {};
                    this.disconnectHeaders = {};
                    this.configure(conf);
                  }
                  Object.defineProperty(Client2.prototype, "webSocket", {
                    /**
                     * Underlying WebSocket instance, READONLY.
                     */
                    get: function() {
                      return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "connected", {
                    /**
                     * `true` if there is a active connection with STOMP Broker
                     */
                    get: function() {
                      return !!this._stompHandler && this._stompHandler.connected;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "connectedVersion", {
                    /**
                     * version of STOMP protocol negotiated with the server, READONLY
                     */
                    get: function() {
                      return this._stompHandler ? this._stompHandler.connectedVersion : void 0;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Client2.prototype, "active", {
                    /**
                     * if the client is active (connected or going to reconnect)
                     */
                    get: function() {
                      return this._active;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Client2.prototype.configure = function(conf) {
                    Object.assign(this, conf);
                  };
                  Client2.prototype.activate = function() {
                    this._active = true;
                    this._connect();
                  };
                  Client2.prototype._connect = function() {
                    var _this = this;
                    if (this.connected) {
                      this.debug("STOMP: already connected, nothing to do");
                      return;
                    }
                    this.beforeConnect();
                    if (!this._active) {
                      this.debug("Client has been marked inactive, will not attempt to connect");
                      return;
                    }
                    this.debug("Opening Web Socket...");
                    this._webSocket = this._createWebSocket();
                    this._stompHandler = new stomp_handler_1.StompHandler(this, this._webSocket, {
                      debug: this.debug,
                      stompVersions: this.stompVersions,
                      connectHeaders: this.connectHeaders,
                      disconnectHeaders: this.disconnectHeaders,
                      heartbeatIncoming: this.heartbeatIncoming,
                      heartbeatOutgoing: this.heartbeatOutgoing,
                      onConnect: function(frame) {
                        if (!_this._active) {
                          _this.debug("STOMP got connected while deactivate was issued, will disconnect now");
                          _this._disposeStompHandler();
                          return;
                        }
                        _this.onConnect(frame);
                      },
                      onDisconnect: function(frame) {
                        _this.onDisconnect(frame);
                      },
                      onStompError: function(frame) {
                        _this.onStompError(frame);
                      },
                      onWebSocketClose: function(evt) {
                        _this.onWebSocketClose(evt);
                        if (_this._active) {
                          _this._schedule_reconnect();
                        }
                      },
                      onUnhandledMessage: function(message) {
                        _this.onUnhandledMessage(message);
                      },
                      onUnhandledReceipt: function(frame) {
                        _this.onUnhandledReceipt(frame);
                      },
                      onUnhandledFrame: function(frame) {
                        _this.onUnhandledFrame(frame);
                      }
                    });
                    this._stompHandler.start();
                  };
                  Client2.prototype._createWebSocket = function() {
                    var webSocket;
                    if (this.webSocketFactory) {
                      webSocket = this.webSocketFactory();
                    } else {
                      webSocket = new WebSocket(this.brokerURL, this.stompVersions.protocolVersions());
                    }
                    webSocket.binaryType = "arraybuffer";
                    return webSocket;
                  };
                  Client2.prototype._schedule_reconnect = function() {
                    var _this = this;
                    if (this.reconnectDelay > 0) {
                      this.debug("STOMP: scheduling reconnection in " + this.reconnectDelay + "ms");
                      this._reconnector = setTimeout(function() {
                        _this._connect();
                      }, this.reconnectDelay);
                    }
                  };
                  Client2.prototype.deactivate = function() {
                    this._active = false;
                    if (this._reconnector) {
                      clearTimeout(this._reconnector);
                    }
                    this._disposeStompHandler();
                  };
                  Client2.prototype.forceDisconnect = function() {
                    if (this._webSocket) {
                      if (this._webSocket.readyState === WebSocket.CONNECTING || this._webSocket.readyState === WebSocket.OPEN) {
                        this._webSocket.close();
                      }
                    }
                  };
                  Client2.prototype._disposeStompHandler = function() {
                    if (this._stompHandler) {
                      this._stompHandler.dispose();
                      this._stompHandler = null;
                    }
                  };
                  Client2.prototype.publish = function(params) {
                    this._stompHandler.publish(params);
                  };
                  Client2.prototype.watchForReceipt = function(receiptId, callback) {
                    this._stompHandler.watchForReceipt(receiptId, callback);
                  };
                  Client2.prototype.subscribe = function(destination, callback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    return this._stompHandler.subscribe(destination, callback, headers);
                  };
                  Client2.prototype.unsubscribe = function(id, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.unsubscribe(id, headers);
                  };
                  Client2.prototype.begin = function(transactionId) {
                    return this._stompHandler.begin(transactionId);
                  };
                  Client2.prototype.commit = function(transactionId) {
                    this._stompHandler.commit(transactionId);
                  };
                  Client2.prototype.abort = function(transactionId) {
                    this._stompHandler.abort(transactionId);
                  };
                  Client2.prototype.ack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.ack(messageId, subscriptionId, headers);
                  };
                  Client2.prototype.nack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    this._stompHandler.nack(messageId, subscriptionId, headers);
                  };
                  return Client2;
                }()
              );
              exports2.Client = Client;
            }
          ),
          /***/
          "./src/compatibility/compat-client.ts": (
            /*!********************************************!*\
              !*** ./src/compatibility/compat-client.ts ***!
              \********************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              var __extends = this && this.__extends || function() {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
                  d.__proto__ = b;
                } || function(d, b) {
                  for (var p in b)
                    if (b.hasOwnProperty(p))
                      d[p] = b[p];
                };
                return function(d, b) {
                  extendStatics(d, b);
                  function __() {
                    this.constructor = d;
                  }
                  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
              }();
              Object.defineProperty(exports2, "__esModule", { value: true });
              var client_1 = __webpack_require__(
                /*! ../client */
                "./src/client.ts"
              );
              var CompatClient = (
                /** @class */
                function(_super) {
                  __extends(CompatClient2, _super);
                  function CompatClient2(webSocketFactory) {
                    var _this = _super.call(this) || this;
                    _this.maxWebSocketFrameSize = 16 * 1024;
                    _this._heartbeatInfo = new HeartbeatInfo(_this);
                    _this.reconnect_delay = 0;
                    _this.webSocketFactory = webSocketFactory;
                    _this.debug = function() {
                      var message = [];
                      for (var _i = 0; _i < arguments.length; _i++) {
                        message[_i] = arguments[_i];
                      }
                      console.log.apply(console, message);
                    };
                    return _this;
                  }
                  CompatClient2.prototype._parseConnect = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    var closeEventCallback, connectCallback, errorCallback;
                    var headers = {};
                    if (args.length < 2) {
                      throw "Connect requires at least 2 arguments";
                    }
                    if (typeof args[1] === "function") {
                      headers = args[0], connectCallback = args[1], errorCallback = args[2], closeEventCallback = args[3];
                    } else {
                      switch (args.length) {
                        case 6:
                          headers["login"] = args[0], headers["passcode"] = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4], headers["host"] = args[5];
                          break;
                        default:
                          headers["login"] = args[0], headers["passcode"] = args[1], connectCallback = args[2], errorCallback = args[3], closeEventCallback = args[4];
                      }
                    }
                    return [headers, connectCallback, errorCallback, closeEventCallback];
                  };
                  CompatClient2.prototype.connect = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    var out = this._parseConnect.apply(this, args);
                    if (out[0]) {
                      this.connectHeaders = out[0];
                    }
                    if (out[1]) {
                      this.onConnect = out[1];
                    }
                    if (out[2]) {
                      this.onStompError = out[2];
                    }
                    if (out[3]) {
                      this.onWebSocketClose = out[3];
                    }
                    _super.prototype.activate.call(this);
                  };
                  CompatClient2.prototype.disconnect = function(disconnectCallback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    if (disconnectCallback) {
                      this.onDisconnect = disconnectCallback;
                    }
                    this.disconnectHeaders = headers;
                    _super.prototype.deactivate.call(this);
                  };
                  CompatClient2.prototype.send = function(destination, headers, body) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    if (body === void 0) {
                      body = "";
                    }
                    headers = Object.assign({}, headers);
                    var skipContentLengthHeader = headers["content-length"] === false;
                    if (skipContentLengthHeader) {
                      delete headers["content-length"];
                    }
                    this.publish({
                      destination,
                      headers,
                      body,
                      skipContentLengthHeader
                    });
                  };
                  Object.defineProperty(CompatClient2.prototype, "reconnect_delay", {
                    /**
                     * Available for backward compatibility, renamed to [Client#reconnectDelay]{@link Client#reconnectDelay}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.reconnectDelay = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "ws", {
                    /**
                     * Available for backward compatibility, renamed to [Client#webSocket]{@link Client#webSocket}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this._webSocket;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "version", {
                    /**
                     * Available for backward compatibility, renamed to [Client#connectedVersion]{@link Client#connectedVersion}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "onreceive", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.onUnhandledMessage;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledMessage]{@link Client#onUnhandledMessage}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.onUnhandledMessage = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "onreceipt", {
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     * Prefer using [Client#watchForReceipt]{@link Client#watchForReceipt}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this.onUnhandledReceipt;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#onUnhandledReceipt]{@link Client#onUnhandledReceipt}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.onUnhandledReceipt = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(CompatClient2.prototype, "heartbeat", {
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    get: function() {
                      return this._heartbeatInfo;
                    },
                    /**
                     * Available for backward compatibility, renamed to [Client#heartbeatIncoming]{@link Client#heartbeatIncoming}
                     * [Client#heartbeatOutgoing]{@link Client#heartbeatOutgoing}.
                     *
                     * **Deprecated**
                     */
                    set: function(value) {
                      this.heartbeatIncoming = value.incoming;
                      this.heartbeatOutgoing = value.outgoing;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  return CompatClient2;
                }(client_1.Client)
              );
              exports2.CompatClient = CompatClient;
              var HeartbeatInfo = (
                /** @class */
                function() {
                  function HeartbeatInfo2(client) {
                    this.client = client;
                  }
                  Object.defineProperty(HeartbeatInfo2.prototype, "outgoing", {
                    get: function() {
                      return this.client.heartbeatOutgoing;
                    },
                    set: function(value) {
                      this.client.heartbeatOutgoing = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(HeartbeatInfo2.prototype, "incoming", {
                    get: function() {
                      return this.client.heartbeatIncoming;
                    },
                    set: function(value) {
                      this.client.heartbeatIncoming = value;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  return HeartbeatInfo2;
                }()
              );
            }
          ),
          /***/
          "./src/compatibility/stomp.ts": (
            /*!************************************!*\
              !*** ./src/compatibility/stomp.ts ***!
              \************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var versions_1 = __webpack_require__(
                /*! ../versions */
                "./src/versions.ts"
              );
              var compat_client_1 = __webpack_require__(
                /*! ./compat-client */
                "./src/compatibility/compat-client.ts"
              );
              var Stomp = (
                /** @class */
                function() {
                  function Stomp2() {
                  }
                  Stomp2.client = function(url, protocols) {
                    if (protocols == null) {
                      protocols = versions_1.Versions.default.protocolVersions();
                    }
                    var ws_fn = function() {
                      var klass = Stomp2.WebSocketClass || WebSocket;
                      return new klass(url, protocols);
                    };
                    return new compat_client_1.CompatClient(ws_fn);
                  };
                  Stomp2.over = function(ws) {
                    var ws_fn = typeof ws === "function" ? ws : function() {
                      return ws;
                    };
                    return new compat_client_1.CompatClient(ws_fn);
                  };
                  Stomp2.WebSocketClass = null;
                  return Stomp2;
                }()
              );
              exports2.Stomp = Stomp;
            }
          ),
          /***/
          "./src/frame.ts": (
            /*!**********************!*\
              !*** ./src/frame.ts ***!
              \**********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var byte_1 = __webpack_require__(
                /*! ./byte */
                "./src/byte.ts"
              );
              var Frame = (
                /** @class */
                function() {
                  function Frame2(params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, escapeHeaderValues = params.escapeHeaderValues, skipContentLengthHeader = params.skipContentLengthHeader;
                    this.command = command;
                    this.headers = Object.assign({}, headers || {});
                    if (binaryBody) {
                      this._binaryBody = binaryBody;
                      this.isBinaryBody = true;
                    } else {
                      this._body = body || "";
                      this.isBinaryBody = false;
                    }
                    this.escapeHeaderValues = escapeHeaderValues || false;
                    this.skipContentLengthHeader = skipContentLengthHeader || false;
                  }
                  Object.defineProperty(Frame2.prototype, "body", {
                    /**
                     * body of the frame
                     */
                    get: function() {
                      if (!this._body && this.isBinaryBody) {
                        this._body = new TextDecoder().decode(this._binaryBody);
                      }
                      return this._body;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(Frame2.prototype, "binaryBody", {
                    /**
                     * body as Uint8Array
                     */
                    get: function() {
                      if (!this._binaryBody && !this.isBinaryBody) {
                        this._binaryBody = new TextEncoder().encode(this._body);
                      }
                      return this._binaryBody;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Frame2.fromRawFrame = function(rawFrame, escapeHeaderValues) {
                    var headers = {};
                    var trim = function(str) {
                      return str.replace(/^\s+|\s+$/g, "");
                    };
                    for (var _i = 0, _a = rawFrame.headers.reverse(); _i < _a.length; _i++) {
                      var header = _a[_i];
                      var idx = header.indexOf(":");
                      var key = trim(header[0]);
                      var value = trim(header[1]);
                      if (escapeHeaderValues && rawFrame.command !== "CONNECT" && rawFrame.command !== "CONNECTED") {
                        value = Frame2.hdrValueUnEscape(value);
                      }
                      headers[key] = value;
                    }
                    return new Frame2({
                      command: rawFrame.command,
                      headers,
                      binaryBody: rawFrame.binaryBody,
                      escapeHeaderValues
                    });
                  };
                  Frame2.prototype.toString = function() {
                    return this.serializeCmdAndHeaders();
                  };
                  Frame2.prototype.serialize = function() {
                    var cmdAndHeaders = this.serializeCmdAndHeaders();
                    if (this.isBinaryBody) {
                      return Frame2.toUnit8Array(cmdAndHeaders, this._binaryBody).buffer;
                    } else {
                      return cmdAndHeaders + this._body + byte_1.Byte.NULL;
                    }
                  };
                  Frame2.prototype.serializeCmdAndHeaders = function() {
                    var lines = [this.command];
                    if (this.skipContentLengthHeader) {
                      delete this.headers["content-length"];
                    }
                    for (var _i = 0, _a = Object.keys(this.headers || {}); _i < _a.length; _i++) {
                      var name_1 = _a[_i];
                      var value = this.headers[name_1];
                      if (this.escapeHeaderValues && this.command !== "CONNECT" && this.command !== "CONNECTED") {
                        lines.push(name_1 + ":" + Frame2.hdrValueEscape("" + value));
                      } else {
                        lines.push(name_1 + ":" + value);
                      }
                    }
                    if (this.isBinaryBody || !this.isBodyEmpty() && !this.skipContentLengthHeader) {
                      lines.push("content-length:" + this.bodyLength());
                    }
                    return lines.join(byte_1.Byte.LF) + byte_1.Byte.LF + byte_1.Byte.LF;
                  };
                  Frame2.prototype.isBodyEmpty = function() {
                    return this.bodyLength() === 0;
                  };
                  Frame2.prototype.bodyLength = function() {
                    var binaryBody = this.binaryBody;
                    return binaryBody ? binaryBody.length : 0;
                  };
                  Frame2.sizeOfUTF8 = function(s) {
                    return s ? new TextEncoder().encode(s).length : 0;
                  };
                  Frame2.toUnit8Array = function(cmdAndHeaders, binaryBody) {
                    var uint8CmdAndHeaders = new TextEncoder().encode(cmdAndHeaders);
                    var nullTerminator = new Uint8Array([0]);
                    var uint8Frame = new Uint8Array(uint8CmdAndHeaders.length + binaryBody.length + nullTerminator.length);
                    uint8Frame.set(uint8CmdAndHeaders);
                    uint8Frame.set(binaryBody, uint8CmdAndHeaders.length);
                    uint8Frame.set(nullTerminator, uint8CmdAndHeaders.length + binaryBody.length);
                    return uint8Frame;
                  };
                  Frame2.marshall = function(params) {
                    var frame = new Frame2(params);
                    return frame.serialize();
                  };
                  Frame2.hdrValueEscape = function(str) {
                    return str.replace(/\\/g, "\\\\").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/:/g, "\\c");
                  };
                  Frame2.hdrValueUnEscape = function(str) {
                    return str.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\c/g, ":").replace(/\\\\/g, "\\");
                  };
                  return Frame2;
                }()
              );
              exports2.Frame = Frame;
            }
          ),
          /***/
          "./src/index.ts": (
            /*!**********************!*\
              !*** ./src/index.ts ***!
              \**********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              function __export(m) {
                for (var p in m)
                  if (!exports2.hasOwnProperty(p))
                    exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export(__webpack_require__(
                /*! ./client */
                "./src/client.ts"
              ));
              __export(__webpack_require__(
                /*! ./frame */
                "./src/frame.ts"
              ));
              __export(__webpack_require__(
                /*! ./parser */
                "./src/parser.ts"
              ));
              __export(__webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              ));
              __export(__webpack_require__(
                /*! ./compatibility/compat-client */
                "./src/compatibility/compat-client.ts"
              ));
              __export(__webpack_require__(
                /*! ./compatibility/stomp */
                "./src/compatibility/stomp.ts"
              ));
            }
          ),
          /***/
          "./src/parser.ts": (
            /*!***********************!*\
              !*** ./src/parser.ts ***!
              \***********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var NULL = 0;
              var LF = 10;
              var CR = 13;
              var COLON = 58;
              var Parser = (
                /** @class */
                function() {
                  function Parser2(onFrame, onIncomingPing) {
                    this.onFrame = onFrame;
                    this.onIncomingPing = onIncomingPing;
                    this._encoder = new TextEncoder();
                    this._decoder = new TextDecoder();
                    this._token = [];
                    this._initState();
                  }
                  Parser2.prototype.parseChunk = function(segment) {
                    var chunk;
                    if (segment instanceof ArrayBuffer) {
                      chunk = new Uint8Array(segment);
                    } else {
                      chunk = this._encoder.encode(segment);
                    }
                    for (var i = 0; i < chunk.length; i++) {
                      var byte = chunk[i];
                      this._onByte(byte);
                    }
                  };
                  Parser2.prototype._collectFrame = function(byte) {
                    if (byte === NULL) {
                      return;
                    }
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this.onIncomingPing();
                      return;
                    }
                    this._onByte = this._collectCommand;
                    this._reinjectByte(byte);
                  };
                  Parser2.prototype._collectCommand = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._results.command = this._consumeTokenAsUTF8();
                      this._onByte = this._collectHeaders;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectHeaders = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._setupCollectBody();
                      return;
                    }
                    this._onByte = this._collectHeaderKey;
                    this._reinjectByte(byte);
                  };
                  Parser2.prototype._reinjectByte = function(byte) {
                    this._onByte(byte);
                  };
                  Parser2.prototype._collectHeaderKey = function(byte) {
                    if (byte === COLON) {
                      this._headerKey = this._consumeTokenAsUTF8();
                      this._onByte = this._collectHeaderValue;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectHeaderValue = function(byte) {
                    if (byte === CR) {
                      return;
                    }
                    if (byte === LF) {
                      this._results.headers.push([this._headerKey, this._consumeTokenAsUTF8()]);
                      this._headerKey = void 0;
                      this._onByte = this._collectHeaders;
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._setupCollectBody = function() {
                    var contentLengthHeader = this._results.headers.filter(function(header) {
                      return header[0] === "content-length";
                    })[0];
                    if (contentLengthHeader) {
                      this._bodyBytesRemaining = parseInt(contentLengthHeader[1]);
                      this._onByte = this._collectBodyFixedSize;
                    } else {
                      this._onByte = this._collectBodyNullTerminated;
                    }
                  };
                  Parser2.prototype._collectBodyNullTerminated = function(byte) {
                    if (byte === NULL) {
                      this._retrievedBody();
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._collectBodyFixedSize = function(byte) {
                    if (this._bodyBytesRemaining-- === 0) {
                      this._retrievedBody();
                      return;
                    }
                    this._consumeByte(byte);
                  };
                  Parser2.prototype._retrievedBody = function() {
                    this._results.binaryBody = this._consumeTokenAsRaw();
                    this.onFrame(this._results);
                    this._initState();
                  };
                  Parser2.prototype._consumeByte = function(byte) {
                    this._token.push(byte);
                  };
                  Parser2.prototype._consumeTokenAsUTF8 = function() {
                    return this._decoder.decode(this._consumeTokenAsRaw());
                  };
                  Parser2.prototype._consumeTokenAsRaw = function() {
                    var rawResult = new Uint8Array(this._token);
                    this._token = [];
                    return rawResult;
                  };
                  Parser2.prototype._initState = function() {
                    this._results = {
                      command: void 0,
                      headers: [],
                      binaryBody: void 0
                    };
                    this._token = [];
                    this._headerKey = void 0;
                    this._onByte = this._collectFrame;
                  };
                  return Parser2;
                }()
              );
              exports2.Parser = Parser;
            }
          ),
          /***/
          "./src/stomp-handler.ts": (
            /*!******************************!*\
              !*** ./src/stomp-handler.ts ***!
              \******************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var byte_1 = __webpack_require__(
                /*! ./byte */
                "./src/byte.ts"
              );
              var versions_1 = __webpack_require__(
                /*! ./versions */
                "./src/versions.ts"
              );
              var frame_1 = __webpack_require__(
                /*! ./frame */
                "./src/frame.ts"
              );
              var parser_1 = __webpack_require__(
                /*! ./parser */
                "./src/parser.ts"
              );
              var StompHandler = (
                /** @class */
                function() {
                  function StompHandler2(_client, _webSocket, config) {
                    if (config === void 0) {
                      config = {};
                    }
                    var _this = this;
                    this._client = _client;
                    this._webSocket = _webSocket;
                    this._serverFrameHandlers = {
                      // [CONNECTED Frame](http://stomp.github.com/stomp-specification-1.2.html#CONNECTED_Frame)
                      "CONNECTED": function(frame) {
                        _this.debug("connected to server " + frame.headers.server);
                        _this._connected = true;
                        _this._connectedVersion = frame.headers.version;
                        if (_this._connectedVersion === versions_1.Versions.V1_2) {
                          _this._escapeHeaderValues = true;
                        }
                        _this._setupHeartbeat(frame.headers);
                        _this.onConnect(frame);
                      },
                      // [MESSAGE Frame](http://stomp.github.com/stomp-specification-1.2.html#MESSAGE)
                      "MESSAGE": function(frame) {
                        var subscription = frame.headers.subscription;
                        var onReceive = _this._subscriptions[subscription] || _this.onUnhandledMessage;
                        var message = frame;
                        var client = _this;
                        var messageId = _this._connectedVersion === versions_1.Versions.V1_2 ? message.headers["ack"] : message.headers["message-id"];
                        message.ack = function(headers) {
                          if (headers === void 0) {
                            headers = {};
                          }
                          return client.ack(messageId, subscription, headers);
                        };
                        message.nack = function(headers) {
                          if (headers === void 0) {
                            headers = {};
                          }
                          return client.nack(messageId, subscription, headers);
                        };
                        onReceive(message);
                      },
                      // [RECEIPT Frame](http://stomp.github.com/stomp-specification-1.2.html#RECEIPT)
                      "RECEIPT": function(frame) {
                        var callback = _this._receiptWatchers[frame.headers["receipt-id"]];
                        if (callback) {
                          callback(frame);
                          delete _this._receiptWatchers[frame.headers["receipt-id"]];
                        } else {
                          _this.onUnhandledReceipt(frame);
                        }
                      },
                      // [ERROR Frame](http://stomp.github.com/stomp-specification-1.2.html#ERROR)
                      "ERROR": function(frame) {
                        _this.onStompError(frame);
                      }
                    };
                    this._counter = 0;
                    this._subscriptions = {};
                    this._receiptWatchers = {};
                    this._partialData = "";
                    this._escapeHeaderValues = false;
                    this._lastServerActivityTS = Date.now();
                    this.configure(config);
                  }
                  Object.defineProperty(StompHandler2.prototype, "connectedVersion", {
                    get: function() {
                      return this._connectedVersion;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  Object.defineProperty(StompHandler2.prototype, "connected", {
                    get: function() {
                      return this._connected;
                    },
                    enumerable: true,
                    configurable: true
                  });
                  StompHandler2.prototype.configure = function(conf) {
                    Object.assign(this, conf);
                  };
                  StompHandler2.prototype.start = function() {
                    var _this = this;
                    var parser = new parser_1.Parser(
                      // On Frame
                      function(rawFrame) {
                        var frame = frame_1.Frame.fromRawFrame(rawFrame, _this._escapeHeaderValues);
                        _this.debug("<<< " + frame);
                        var serverFrameHandler = _this._serverFrameHandlers[frame.command] || _this.onUnhandledFrame;
                        serverFrameHandler(frame);
                      },
                      // On Incoming Ping
                      function() {
                        _this.debug("<<< PONG");
                      }
                    );
                    this._webSocket.onmessage = function(evt) {
                      _this.debug("Received data");
                      _this._lastServerActivityTS = Date.now();
                      parser.parseChunk(evt.data);
                    };
                    this._webSocket.onclose = function(closeEvent) {
                      _this.debug("Connection closed to " + _this._webSocket.url);
                      _this.onWebSocketClose(closeEvent);
                      _this._cleanUp();
                    };
                    this._webSocket.onopen = function() {
                      _this.debug("Web Socket Opened...");
                      _this.connectHeaders["accept-version"] = _this.stompVersions.supportedVersions();
                      _this.connectHeaders["heart-beat"] = [_this.heartbeatOutgoing, _this.heartbeatIncoming].join(",");
                      _this._transmit({ command: "CONNECT", headers: _this.connectHeaders });
                    };
                  };
                  StompHandler2.prototype._setupHeartbeat = function(headers) {
                    var _this = this;
                    if (headers.version !== versions_1.Versions.V1_1 && headers.version !== versions_1.Versions.V1_2) {
                      return;
                    }
                    var _a = headers["heart-beat"].split(",").map(function(v) {
                      return parseInt(v);
                    }), serverOutgoing = _a[0], serverIncoming = _a[1];
                    if (this.heartbeatOutgoing !== 0 && serverIncoming !== 0) {
                      var ttl = Math.max(this.heartbeatOutgoing, serverIncoming);
                      this.debug("send PING every " + ttl + "ms");
                      this._pinger = setInterval(function() {
                        _this._webSocket.send(byte_1.Byte.LF);
                        _this.debug(">>> PING");
                      }, ttl);
                    }
                    if (this.heartbeatIncoming !== 0 && serverOutgoing !== 0) {
                      var ttl_1 = Math.max(this.heartbeatIncoming, serverOutgoing);
                      this.debug("check PONG every " + ttl_1 + "ms");
                      this._ponger = setInterval(function() {
                        var delta = Date.now() - _this._lastServerActivityTS;
                        if (delta > ttl_1 * 2) {
                          _this.debug("did not receive server activity for the last " + delta + "ms");
                          _this._webSocket.close();
                        }
                      }, ttl_1);
                    }
                  };
                  StompHandler2.prototype._transmit = function(params) {
                    var command = params.command, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    var frame = new frame_1.Frame({
                      command,
                      headers,
                      body,
                      binaryBody,
                      escapeHeaderValues: this._escapeHeaderValues,
                      skipContentLengthHeader
                    });
                    this.debug(">>> " + frame);
                    this._webSocket.send(frame.serialize());
                  };
                  StompHandler2.prototype.dispose = function() {
                    var _this = this;
                    if (this.connected) {
                      try {
                        if (!this.disconnectHeaders["receipt"]) {
                          this.disconnectHeaders["receipt"] = "close-" + this._counter++;
                        }
                        this.watchForReceipt(this.disconnectHeaders["receipt"], function(frame) {
                          _this._webSocket.close();
                          _this._cleanUp();
                          _this.onDisconnect(frame);
                        });
                        this._transmit({ command: "DISCONNECT", headers: this.disconnectHeaders });
                      } catch (error) {
                        this.debug("Ignoring error during disconnect " + error);
                      }
                    } else {
                      if (this._webSocket.readyState === WebSocket.CONNECTING || this._webSocket.readyState === WebSocket.OPEN) {
                        this._webSocket.close();
                      }
                    }
                  };
                  StompHandler2.prototype._cleanUp = function() {
                    this._connected = false;
                    if (this._pinger) {
                      clearInterval(this._pinger);
                    }
                    if (this._ponger) {
                      clearInterval(this._ponger);
                    }
                  };
                  StompHandler2.prototype.publish = function(params) {
                    var destination = params.destination, headers = params.headers, body = params.body, binaryBody = params.binaryBody, skipContentLengthHeader = params.skipContentLengthHeader;
                    headers = Object.assign({ destination }, headers);
                    this._transmit({
                      command: "SEND",
                      headers,
                      body,
                      binaryBody,
                      skipContentLengthHeader
                    });
                  };
                  StompHandler2.prototype.watchForReceipt = function(receiptId, callback) {
                    this._receiptWatchers[receiptId] = callback;
                  };
                  StompHandler2.prototype.subscribe = function(destination, callback, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (!headers.id) {
                      headers.id = "sub-" + this._counter++;
                    }
                    headers.destination = destination;
                    this._subscriptions[headers.id] = callback;
                    this._transmit({ command: "SUBSCRIBE", headers });
                    var client = this;
                    return {
                      id: headers.id,
                      unsubscribe: function(hdrs) {
                        return client.unsubscribe(headers.id, hdrs);
                      }
                    };
                  };
                  StompHandler2.prototype.unsubscribe = function(id, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    delete this._subscriptions[id];
                    headers.id = id;
                    this._transmit({ command: "UNSUBSCRIBE", headers });
                  };
                  StompHandler2.prototype.begin = function(transactionId) {
                    var txId = transactionId || "tx-" + this._counter++;
                    this._transmit({
                      command: "BEGIN",
                      headers: {
                        transaction: txId
                      }
                    });
                    var client = this;
                    return {
                      id: txId,
                      commit: function() {
                        client.commit(txId);
                      },
                      abort: function() {
                        client.abort(txId);
                      }
                    };
                  };
                  StompHandler2.prototype.commit = function(transactionId) {
                    this._transmit({
                      command: "COMMIT",
                      headers: {
                        transaction: transactionId
                      }
                    });
                  };
                  StompHandler2.prototype.abort = function(transactionId) {
                    this._transmit({
                      command: "ABORT",
                      headers: {
                        transaction: transactionId
                      }
                    });
                  };
                  StompHandler2.prototype.ack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                      headers["id"] = messageId;
                    } else {
                      headers["message-id"] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    this._transmit({ command: "ACK", headers });
                  };
                  StompHandler2.prototype.nack = function(messageId, subscriptionId, headers) {
                    if (headers === void 0) {
                      headers = {};
                    }
                    headers = Object.assign({}, headers);
                    if (this._connectedVersion === versions_1.Versions.V1_2) {
                      headers["id"] = messageId;
                    } else {
                      headers["message-id"] = messageId;
                    }
                    headers.subscription = subscriptionId;
                    return this._transmit({ command: "NACK", headers });
                  };
                  return StompHandler2;
                }()
              );
              exports2.StompHandler = StompHandler;
            }
          ),
          /***/
          "./src/versions.ts": (
            /*!*************************!*\
              !*** ./src/versions.ts ***!
              \*************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              var Versions = (
                /** @class */
                function() {
                  function Versions2(versions) {
                    this.versions = versions;
                  }
                  Versions2.prototype.supportedVersions = function() {
                    return this.versions.join(",");
                  };
                  Versions2.prototype.protocolVersions = function() {
                    return this.versions.map(function(x) {
                      return "v" + x.replace(".", "") + ".stomp";
                    });
                  };
                  Versions2.V1_0 = "1.0";
                  Versions2.V1_1 = "1.1";
                  Versions2.V1_2 = "1.2";
                  Versions2.default = new Versions2([Versions2.V1_0, Versions2.V1_1, Versions2.V1_2]);
                  return Versions2;
                }()
              );
              exports2.Versions = Versions;
            }
          ),
          /***/
          0: (
            /*!****************************!*\
              !*** multi ./src/index.ts ***!
              \****************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__) {
              module2.exports = __webpack_require__(
                /*! /Users/kdeepak/MyWork/Tech/stomp/stompjs/src/index.ts */
                "./src/index.ts"
              );
            }
          )
          /******/
        })
      );
    });
  }
});
export default require_stomp_umd();
//# sourceMappingURL=@stomp_stompjs.js.map
