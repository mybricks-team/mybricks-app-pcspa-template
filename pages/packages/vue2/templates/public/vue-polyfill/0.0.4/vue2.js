(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('vue'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['react', 'vue', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.React, global.Vue, global.ReactDOM));
})(this, (function (React, Vue, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$1(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread$1();
  }
  function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var originOptions = {
    react: {
      componentWrap: 'div',
      slotWrap: 'div',
      componentWrapAttrs: {
        __use_react_component_wrap: '',
        style: {
          all: 'unset'
        }
      },
      slotWrapAttrs: {
        __use_react_slot_wrap: '',
        style: {
          all: 'unset'
        }
      }
    },
    vue: {
      // 组件wrapper
      componentWrapHOC: function componentWrapHOC(VueComponentMountAt) {
        var nativeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        // 传入portals
        return function () {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$portals = _ref.portals,
            portals = _ref$portals === void 0 ? [] : _ref$portals;
          return /*#__PURE__*/React__default["default"].createElement("div", nativeProps, VueComponentMountAt, portals.map(function (_ref2) {
            var Portal = _ref2.Portal,
              key = _ref2.key;
            return /*#__PURE__*/React__default["default"].createElement(Portal, {
              key: key
            });
          }));
        };
      },
      componentWrapAttrs: {
        'data-use-vue-component-wrap': '',
        style: {
          all: 'unset'
        }
      },
      slotWrapAttrs: {
        'data-use-vue-slot-wrap': '',
        style: {
          all: 'unset'
        }
      }
    }
  };
  function setOptions() {
    var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      react: {},
      vue: {}
    };
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : originOptions;
    var clone = arguments.length > 2 ? arguments[2] : undefined;
    if (!newOptions.vue) {
      newOptions.vue = {};
    }
    if (!newOptions.react) {
      newOptions.react = {};
    }
    var params = [options, _objectSpread2(_objectSpread2({}, newOptions), {}, {
      react: _objectSpread2(_objectSpread2(_objectSpread2({}, options.react), newOptions.react), {}, {
        componentWrapAttrs: _objectSpread2(_objectSpread2({}, options.react.componentWrapAttrs), newOptions.react.componentWrapAttrs),
        slotWrapAttrs: _objectSpread2(_objectSpread2({}, options.react.slotWrapAttrs), newOptions.react.slotWrapAttrs)
      }),
      vue: _objectSpread2(_objectSpread2(_objectSpread2({}, options.vue), newOptions.vue), {}, {
        componentWrapAttrs: _objectSpread2(_objectSpread2({}, options.vue.componentWrapAttrs), newOptions.vue.componentWrapAttrs),
        slotWrapAttrs: _objectSpread2(_objectSpread2({}, options.vue.slotWrapAttrs), newOptions.vue.slotWrapAttrs)
      })
    })];
    if (clone) {
      params.unshift({});
    }
    return Object.assign.apply(this, params);
  }

  var vueRootInfo = {};

  var _excluded$1 = ["ref"],
    _excluded2$1 = ["style"],
    _excluded3$1 = ["key", "data-passed-props"],
    _excluded4$1 = ["data-passed-props", "hashList"],
    _excluded5$1 = ["style"],
    _excluded6$1 = ["on", "$slots", "$scopedSlots", "children"];
  var ReactMajorVersion = parseInt(React.version);
  var domMethods = ["getElementById", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "querySelector", "querySelectorAll"];
  var domTopObject = {
    Document: {},
    Element: {}
  };
  // 覆盖原生的查找dom对象的方法，为了确保react在销毁前都可以获取dom，而vue的beforeDestroy阶段已经将dom卸载的问题
  function overwriteDomMethods(refDom) {
    Object.keys(domTopObject).forEach(function (key) {
      domMethods.forEach(function (method) {
        var old = window[key].prototype[method];
        domTopObject[key][method] = old;
        window[key].prototype[method] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var oldResult = old.apply(this, args);
          if (oldResult && oldResult.constructor !== NodeList || oldResult && oldResult.constructor === NodeList && oldResult.length > 0) return oldResult;
          return Element.prototype[method].apply(refDom, args);
        };
      });
    });
  }
  // 恢复原生方法
  function recoverDomMethods() {
    Object.keys(domTopObject).forEach(function (key) {
      domMethods.forEach(function (method) {
        window[key].prototype[method] = domTopObject[key][method];
      });
    });
  }
  var FunctionComponentWrap = /*#__PURE__*/function (_React$Component) {
    _inherits(FunctionComponentWrap, _React$Component);
    var _super = _createSuper(FunctionComponentWrap);
    function FunctionComponentWrap(props) {
      _classCallCheck(this, FunctionComponentWrap);
      return _super.call(this, props);
    }
    _createClass(FunctionComponentWrap, [{
      key: "render",
      value: function render() {
        var Component = this.props.component;
        var _this$props$passedPro = this.props.passedProps;
          _this$props$passedPro.ref;
          var props = _objectWithoutProperties(_this$props$passedPro, _excluded$1);
        return /*#__PURE__*/React__default["default"].createElement(Component, props, this.props.children);
      }
    }]);
    return FunctionComponentWrap;
  }(React__default["default"].Component);
  var createReactContainer = function createReactContainer(Component, options, wrapInstance) {
    var _class;
    return _class = /*#__PURE__*/function (_React$Component2) {
      _inherits(applyReact, _React$Component2);
      var _super2 = _createSuper(applyReact);
      function applyReact(props) {
        var _this2;
        _classCallCheck(this, applyReact);
        _this2 = _super2.call(this, props);
        // 将所有的属性全部寄存在中间件的状态中，原理是通过一个有状态的React组件作为中间件，触发目标组件的props
        _this2.state = _objectSpread2(_objectSpread2({}, props), options.isSlots ? {
          children: Component
        } : {});
        _this2.setRef = _this2.setRef.bind(_assertThisInitialized(_this2));
        _this2.vueInReactCall = _this2.vueInReactCall.bind(_assertThisInitialized(_this2));
        _this2.vueWrapperRef = wrapInstance;
        return _this2;
      }

      // 对于插槽的处理仍然需要将VNode转换成React组件
      _createClass(applyReact, [{
        key: "setRef",
        value:
        // 使用静态方法申明是因为可以节省性能开销，因为内部没有调用到实例属性和方法
        function setRef(ref) {
          if (!ref) return;
          // 使用reactRef属性保存目标react组件的实例，可以被父组setRef件的实例获取到
          wrapInstance.reactRef = ref;
          // 将react实例的可枚举属性挂到vue实例中
          Object.keys(ref).forEach(function (key) {
            if (!wrapInstance[key]) {
              wrapInstance[key] = ref[key];
            }
          });
          Promise.resolve().then(function () {
            Object.keys(ref).forEach(function (key) {
              if (!wrapInstance[key]) {
                wrapInstance[key] = ref[key];
              }
            });
          });

          // 兼容接收useRef类型的参数
          this.setRef.current = ref;

          // 并且将vue的中间件实例保存在react组件的实例中
          // react组件可以通过这个属性来判断是否被包囊使用
          ref.vueWrapperRef = wrapInstance;
        }
      }, {
        key: "createSlot",
        value: function createSlot(children) {
          var _options$react$slotWr = options.react.slotWrapAttrs,
            style = _options$react$slotWr.style,
            attrs = _objectWithoutProperties(_options$react$slotWr, _excluded2$1);
          return {
            inheritAttrs: false,
            __fromReactSlot: true,
            render: function render(createElement) {
              var _children, _children$;
              if (children instanceof Function) {
                children = children(this);
              }
              // 有些react组件通过直接处理自身children的方式给children中的组件传递属性，会导致传递到包囊层中
              // 这里对包囊层属性进行透传，透传条件为children中只有一个vnode
              if (((_children = children) === null || _children === void 0 ? void 0 : _children.length) === 1 && (_children$ = children[0]) !== null && _children$ !== void 0 && _children$.data) {
                // 过滤掉内部属性
                var _this$$attrs = this.$attrs;
                  _this$$attrs.key;
                  _this$$attrs['data-passed-props'];
                  var otherAttrs = _objectWithoutProperties(_this$$attrs, _excluded3$1);
                children[0].data.attrs = _objectSpread2(_objectSpread2({}, otherAttrs), children[0].data.attrs);
              }
              return createElement(options.react.slotWrap, {
                attrs: attrs,
                style: style
              }, children);
            }
          };
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (!wrapInstance.reactRef) return;
          // 垃圾回收，但是保留属性名，借鉴vue的refs对于组件销毁保留属性名的模式
          wrapInstance.reactRef.vueWrapperRef = null;
          wrapInstance.reactRef = null;
        }
      }, {
        key: "vueInReactCall",
        value: function vueInReactCall(children) {
          var _this3 = this;
          var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var division = arguments.length > 2 ? arguments[2] : undefined;
          if (division) {
            if (children && children[0]) {
              return children.map(function (child, index) {
                var _child$data;
                return applyVueInReact(_this3.createSlot(child instanceof Function ? child : [child]), _objectSpread2(_objectSpread2(_objectSpread2({}, options), customOptions), {}, {
                  isSlots: true,
                  wrapInstance: wrapInstance
                })).render({
                  key: (child === null || child === void 0 || (_child$data = child.data) === null || _child$data === void 0 ? void 0 : _child$data.key) || index
                });
              });
            }
          }
          return applyVueInReact(this.createSlot(children), _objectSpread2(_objectSpread2(_objectSpread2({}, options), customOptions), {}, {
            isSlots: true,
            wrapInstance: wrapInstance
          })).render();
        }
      }, {
        key: "render",
        value: function render() {
          var _this4 = this,
            _props$children;
          var _this$state = this.state,
            __passedProps = _this$state["data-passed-props"],
            hashList = _this$state.hashList,
            props = _objectWithoutProperties(_this$state, _excluded4$1);
          var children;
          // 保留一份作用域和具名插槽，用于之后再透传给vue组件
          var $slots = {};
          var $scopedSlots = {};
          // 插槽的解析
          var _loop = function _loop(i) {
              if (!props.hasOwnProperty(i) || props[i] == null) return 0; // continue
              if (props[i].__slot) {
                if (!props[i].reactSlot) {
                  var vueSlot = props[i];
                  // 执行applyVueInReact方法将直接获得react组件对象，无需使用jsx
                  // props[i] = { ...applyVueInReact(this.createSlot(props[i]))() }
                  // 自定义插槽处理
                  if (options.defaultSlotsFormatter) {
                    var cloneChildren = function cloneChildren() {
                      if (props[i] instanceof Array) {
                        props[i] = _toConsumableArray$1(props[i]);
                        return;
                      }
                      if (["string", "number"].indexOf(_typeof$1(props[i])) > -1) {
                        props[i] = [props[i]];
                        return;
                      }
                      if (_typeof$1(props[i]) === "object") {
                        props[i] = _objectSpread2({}, props[i]);
                      }
                    };
                    props[i].__top__ = _this4.vueWrapperRef;
                    props[i] = options.defaultSlotsFormatter(props[i], _this4.vueInReactCall, hashList);
                    cloneChildren();
                  } else {
                    props[i] = _objectSpread2({}, applyVueInReact(_this4.createSlot(props[i]), _objectSpread2(_objectSpread2({}, options), {}, {
                      isSlots: true,
                      wrapInstance: wrapInstance
                    })).render());
                  }
                  props[i].vueSlot = vueSlot;
                } else {
                  props[i] = props[i].reactSlot;
                }
                $slots[i] = props[i];
                return 0; // continue
              }
              if (props[i].__scopedSlot) {
                // 作用域插槽是个纯函数，在react组件中需要传入作用域调用，然后再创建vue的插槽组件
                props[i] = props[i](_this4.createSlot);
                $scopedSlots[i] = props[i];
              }
            },
            _ret;
          for (var i in props) {
            _ret = _loop(i);
            if (_ret === 0) continue;
          }
          // 普通插槽
          if (!((_props$children = props.children) !== null && _props$children !== void 0 && _props$children.vueFunction)) {
            children = props.children;
          }
          $slots["default"] = children;
          // 封装透传属性
          __passedProps = _objectSpread2(_objectSpread2(_objectSpread2({}, __passedProps), {
            $slots: $slots,
            $scopedSlots: $scopedSlots
          }), {}, {
            children: children
          });
          var refInfo = {};
          refInfo.ref = this.setRef;
          if (options.isSlots) {
            return this.state.children || this.props.children;
          }
          var finalProps = props;
          // 自定义处理参数
          if (options.defaultPropsFormatter) {
            finalProps = options.defaultPropsFormatter(props, this.vueInReactCall, hashList);
          }
          var newProps = _objectSpread2(_objectSpread2({}, finalProps), {
            "data-passed-props": __passedProps
          });
          // 判断是否要通过一个class组件包装一下来获取ref
          // 通过判断Component的原型是否不是Function原型
          if (Object.getPrototypeOf(Component) !== Function.prototype && !(_typeof$1(Component) === "object" && !Component.render) || applyReact.catchVueRefs()) {
            return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, newProps, {
              "data-passed-props": __passedProps
            }, refInfo), children || newProps.children);
          }
          return /*#__PURE__*/React__default["default"].createElement(FunctionComponentWrap, _extends({
            passedProps: newProps,
            component: Component
          }, refInfo), children || newProps.children);
        }
      }], [{
        key: "catchVueRefs",
        value: function catchVueRefs() {
          if (!wrapInstance.$parent) return false;
          for (var ref in wrapInstance.$parent.$refs) {
            if (wrapInstance.$parent.$refs[ref] === wrapInstance) {
              return true;
            }
          }
          return false;
        }
      }]);
      return applyReact;
    }(React__default["default"].Component), _defineProperty(_class, "displayName", "useReact_".concat(Component.displayName || Component.name || "Component")), _class;
  };
  function applyReactInVue(component) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // 兼容esModule
    if (component.__esModule && component["default"]) {
      component = component["default"];
    }
    if (options.isSlots) {
      component = component();
    }
    // 处理附加参数
    options = setOptions(options, undefined, true);
    return {
      originReactComponent: component,
      data: function data() {
        return {
          portals: [],
          portalKeyPool: [],
          maxPortalCount: 0
        };
      },
      created: function created() {
        // this.vnodeData = this.$vnode.data
        this.cleanVnodeStyleClass();
        if (this.$root.$options.router) {
          vueRootInfo.router = this.$root.$options.router;
        }
        if (this.$root.$options.router) {
          vueRootInfo.store = this.$root.$options.store;
        }
      },
      props: ["dataPassedProps"],
      render: function render(createElement) {
        this.slotsInit();
        var _options$react$compon = options.react.componentWrapAttrs,
          style = _options$react$compon.style,
          attrs = _objectWithoutProperties(_options$react$compon, _excluded5$1);
        // return createElement(options.react.componentWrap, { ref: "react", attrs, style }, this.portals.map((Portal, index) => Portal(createElement, index)))
        return createElement(options.react.componentWrap, {
          ref: "react",
          attrs: attrs,
          style: style
        }, this.portals.map(function (_ref) {
          var Portal = _ref.Portal,
            key = _ref.key;
          return Portal(createElement, key);
        }));
      },
      methods: {
        pushVuePortal: function pushVuePortal(vuePortal) {
          var key = this.portalKeyPool.shift() || this.maxPortalCount++;
          this.portals.push({
            Portal: vuePortal,
            key: key
          });
        },
        removeVuePortal: function removeVuePortal(vuePortal) {
          var index;
          var portalData = this.portals.find(function (obj, i) {
            if (obj.Portal === vuePortal) {
              index = i;
              return true;
            }
          });
          this.portalKeyPool.push(portalData.key);
          this.portals.splice(index, 1);
        },
        // hack!!!! 一定要在render函数李触发，才能激活具名插槽
        slotsInit: function slotsInit(vnode) {
          var _this5 = this;
          // 针对pureTransformer类型的react组件进行兼容，解决具名插槽和作用域插槽不更新的问题
          if (vnode) {
            var _vnode$componentOptio, _vnode$componentOptio2, _vnode$data, _vnode$componentOptio3;
            if ((_vnode$componentOptio = vnode.componentOptions) !== null && _vnode$componentOptio !== void 0 && (_vnode$componentOptio = _vnode$componentOptio.Ctor) !== null && _vnode$componentOptio !== void 0 && _vnode$componentOptio.options && !((_vnode$componentOptio2 = vnode.componentOptions) !== null && _vnode$componentOptio2 !== void 0 && (_vnode$componentOptio2 = _vnode$componentOptio2.Ctor) !== null && _vnode$componentOptio2 !== void 0 && _vnode$componentOptio2.options.originReactComponent)) return;
            if ((_vnode$data = vnode.data) !== null && _vnode$data !== void 0 && _vnode$data.scopedSlots) {
              var _vnode$data2;
              Object.keys((_vnode$data2 = vnode.data) === null || _vnode$data2 === void 0 ? void 0 : _vnode$data2.scopedSlots).forEach(function (key) {
                if (typeof vnode.data.scopedSlots[key] === "function") {
                  try {
                    vnode.data.scopedSlots[key]();
                  } catch (e) {}
                }
              });
            }
            var children = vnode.children || ((_vnode$componentOptio3 = vnode.componentOptions) === null || _vnode$componentOptio3 === void 0 ? void 0 : _vnode$componentOptio3.children) || [];
            children.forEach(function (subVnode) {
              _this5.slotsInit(subVnode);
            });
            return;
          }
          Object.keys(this.$slots).forEach(function (key) {
            (_this5.$slots[key] || []).forEach(function (subVnode) {
              _this5.slotsInit(subVnode);
            });
          });
          Object.keys(this.$scopedSlots).forEach(function (key) {
            try {
              _this5.$scopedSlots[key]();
            } catch (e) {}
          });
        },
        updateLastVnodeData: function updateLastVnodeData(vnode) {
          this.lastVnodeData = {
            style: _objectSpread2(_objectSpread2({}, this.formatStyle(vnode.data.style)), this.formatStyle(vnode.data.staticStyle)),
            "class": Array.from(new Set([].concat(_toConsumableArray$1(this.formatClass(vnode.data["class"])), _toConsumableArray$1(this.formatClass(vnode.data.staticClass))))).join(" ")
          };
          Object.assign(vnode.data, {
            staticStyle: null,
            style: null,
            staticClass: null,
            "class": null
          });
          return vnode;
        },
        // 清除style和class，避免包囊层被污染
        cleanVnodeStyleClass: function cleanVnodeStyleClass() {
          var _this6 = this;
          var vnode = this.$vnode;
          this.updateLastVnodeData(vnode);
          // 每次$vnode被修改，将vnode.data中的style、staticStyle、class、staticClass记下来并且清除
          Object.defineProperty(this, "$vnode", {
            get: function get() {
              return vnode;
            },
            set: function set(val) {
              if (val === vnode) return vnode;
              vnode = _this6.updateLastVnodeData(val);
              return vnode;
            }
          });
        },
        toCamelCase: function toCamelCase(val) {
          var reg = /-(\w)/g;
          return val.replace(reg, function ($, $1) {
            return $1.toUpperCase();
          });
        },
        formatStyle: function formatStyle(val) {
          var _this7 = this;
          if (!val) return {};
          if (typeof val === "string") {
            val = val.trim();
            return val.split(/\s*;\s*/).reduce(function (prev, cur) {
              if (!cur) {
                return prev;
              }
              cur = cur.split(/\s*:\s*/);
              if (cur.length !== 2) return prev;
              Object.assign(prev, _defineProperty({}, _this7.toCamelCase(cur[0]), cur[1]));
              return prev;
            }, {});
          }
          if (_typeof$1(val) === "object") {
            var newVal = {};
            Object.keys(val).forEach(function (v) {
              newVal[_this7.toCamelCase(v)] = val[v];
            });
            return newVal;
          }
          return {};
        },
        formatClass: function formatClass(val) {
          if (!val) return [];
          if (val instanceof Array) return val;
          if (typeof val === "string") {
            val = val.trim();
            return val.split(/\s+/);
          }
          if (_typeof$1(val) === "object") {
            return Object.keys(val).map(function (v) {
              return val[v] ? val[v] : "";
            });
          }
          return [];
        },
        // 用多阶函数解决作用域插槽的传递问题
        getScopeSlot: function getScopeSlot(slotFunction, hashList, originSlotFunction) {
          var _this = this;
          function scopedSlotFunction(createReactSlot) {
            function getSlot() {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              if (slotFunction.reactFunction) {
                return slotFunction.reactFunction.apply(this, args);
              }
              if (options.defaultSlotsFormatter) {
                var scopeSlot = slotFunction.apply(this, args);
                scopeSlot.__top__ = _this;
                scopeSlot = options.defaultSlotsFormatter(scopeSlot, _this.vueInReactCall, hashList);
                if (scopeSlot instanceof Array || _typeof$1(scopeSlot).indexOf("string", "number") > -1) {
                  scopeSlot = _toConsumableArray$1(scopeSlot);
                } else if (_typeof$1(scopeSlot) === "object") {
                  scopeSlot = _objectSpread2({}, scopeSlot);
                }
                return scopeSlot;
              }
              return applyVueInReact(createReactSlot(slotFunction.apply(this, args)), _objectSpread2(_objectSpread2({}, options), {}, {
                isSlots: true,
                wrapInstance: _this
              })).render();
            }
            if (options.pureTransformer && originSlotFunction) {
              getSlot.vueFunction = originSlotFunction;
            } else {
              getSlot.vueFunction = slotFunction;
            }
            return getSlot;
          }
          scopedSlotFunction.__scopedSlot = true;
          return scopedSlotFunction;
        },
        __syncUpdateProps: function __syncUpdateProps(extraData) {
          // this.mountReactComponent(true, false, extraData)
          this.reactInstance && this.reactInstance.setState(extraData);
        },
        mountReactComponent: function mountReactComponent(update, updateType) {
          var _this$$vnode$context,
            _this8 = this;
          var extraData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          // 先提取透传属性
          var _ref2 = this.$props.dataPassedProps != null ? this.$props.dataPassedProps : {},
            __passedPropsOn = _ref2.on,
            __passedPropsSlots = _ref2.$slots,
            __passedPropsScopedSlots = _ref2.$scopedSlots,
            children = _ref2.children,
            __passedPropsRest = _objectWithoutProperties(_ref2, _excluded6$1);

          // 获取style scoped生成的hash
          var hashMap = {};
          var hashList = [];
          var scopedId = (_this$$vnode$context = this.$vnode.context) === null || _this$$vnode$context === void 0 || (_this$$vnode$context = _this$$vnode$context.$vnode) === null || _this$$vnode$context === void 0 || (_this$$vnode$context = _this$$vnode$context.componentOptions) === null || _this$$vnode$context === void 0 || (_this$$vnode$context = _this$$vnode$context.Ctor) === null || _this$$vnode$context === void 0 || (_this$$vnode$context = _this$$vnode$context.extendOptions) === null || _this$$vnode$context === void 0 ? void 0 : _this$$vnode$context._scopeId;
          if (scopedId) {
            hashMap[scopedId] = "";
            hashList.push(scopedId);
          }
          // for (let i in this.$el.dataset) {
          //   if (this.$el.dataset.hasOwnProperty(i) && (i.match(/v-[\da-z]+/) || i.match(/v[A-Z][\da-zA-Z]+/))) {
          //     // 尝试驼峰转中划线
          //     i = i.replace(/([A-Z])/g, "-$1").toLowerCase()
          //     hashMap[`data-${i}`] = ""
          //     hashList.push(`data-${i}`)
          //   }
          // }

          var normalSlots = {};
          var scopedSlots = {};
          if (!update || update && updateType !== null && updateType !== void 0 && updateType.slot) {
            // 处理具名插槽，将作为属性被传递

            var mergeSlots = _objectSpread2(_objectSpread2({}, __passedPropsSlots), this.$slots);
            // 对插槽类型的属性做标记
            for (var i in mergeSlots) {
              normalSlots[i] = mergeSlots[i];
              normalSlots[i].__slot = true;
            }
            // 对作用域插槽进行处理
            var mergeScopedSlots = _objectSpread2(_objectSpread2({}, __passedPropsScopedSlots), this.$scopedSlots);
            for (var _i in mergeScopedSlots) {
              var _this$$vnode;
              // 过滤普通插槽
              if (normalSlots[_i]) {
                // 并且做上标记，vue2.6之后，所有插槽都推荐用作用域，所以之后要转成普通插槽
                if (this.$scopedSlots[_i]) {
                  this.$scopedSlots[_i].__slot = true;
                }
                continue;
              }
              // 如果发现作用域插槽中有普通插槽的标记，就转成成普通插槽
              if (mergeScopedSlots[_i].__slot) {
                normalSlots[_i] = mergeScopedSlots[_i]();
                normalSlots[_i].__slot = true;
                continue;
              }
              scopedSlots[_i] = this.getScopeSlot(mergeScopedSlots[_i], hashList, (_this$$vnode = this.$vnode) === null || _this$$vnode === void 0 || (_this$$vnode = _this$$vnode.data) === null || _this$$vnode === void 0 || (_this$$vnode = _this$$vnode.scopedSlots) === null || _this$$vnode === void 0 ? void 0 : _this$$vnode[_i]);
            }
          }

          // 预生成react组件的透传属性
          var __passedProps = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, __passedPropsRest), _objectSpread2({}, this.$attrs)), !update || update && updateType !== null && updateType !== void 0 && updateType.slot ? {
            $slots: normalSlots,
            $scopedSlots: scopedSlots,
            children: children
          } : {}), {}, {
            on: _objectSpread2(_objectSpread2({}, __passedPropsOn), this.$listeners)
          });
          var lastNormalSlots;
          if (!update || update && updateType !== null && updateType !== void 0 && updateType.slot) {
            lastNormalSlots = _objectSpread2({}, normalSlots);
            children = lastNormalSlots["default"];
            delete lastNormalSlots["default"];
          }

          // 存上一次
          this.last = this.last || {};
          this.last.slot = this.last.slot || {};
          this.last.listeners = this.last.listeners || {};
          this.last.attrs = this.last.attrs || {};
          var compareLast = {
            slot: function slot() {
              _this8.last.slot = _objectSpread2(_objectSpread2(_objectSpread2({}, children ? {
                children: children
              } : {
                children: null
              }), lastNormalSlots), scopedSlots);
            },
            listeners: function listeners() {
              _this8.last.listeners = __passedProps.on;
            },
            attrs: function attrs() {
              _this8.last.attrs = _this8.$attrs;
            }
          };
          if (updateType) {
            Object.keys(updateType).forEach(function (key) {
              return compareLast[key]();
            });
          }
          // 如果不传入组件，就作为更新
          if (!update) {
            compareLast.slot();
            compareLast.listeners();
            compareLast.attrs();
            var Component = createReactContainer(component, options, this);
            var reactEvent = {};
            Object.keys(__passedProps.on).forEach(function (key) {
              reactEvent["on".concat(key.replace(/^(\w)/, function ($, $1) {
                return $1.toUpperCase();
              }))] = __passedProps.on[key];
            });
            var reactRootComponent = /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, __passedPropsRest, this.$attrs, reactEvent, {
              children: children
            }, lastNormalSlots, scopedSlots, {
              "data-passed-props": __passedProps
            }, this.lastVnodeData["class"] ? {
              className: this.lastVnodeData["class"]
            } : {}, hashMap, {
              hashList: hashList,
              style: this.lastVnodeData.style,
              ref: function ref(_ref3) {
                return _this8.reactInstance = _ref3;
              }
            }));
            // 必须通过ReactReduxContext连接context
            if (this.$redux && this.$redux.store && this.$redux.ReactReduxContext) {
              var ReduxContext = this.$redux.ReactReduxContext;
              reactRootComponent = /*#__PURE__*/React__default["default"].createElement(ReduxContext.Provider, {
                value: {
                  store: this.$redux.store
                }
              }, reactRootComponent);
            }
            // 必须异步，等待包囊层的react实例完毕
            // this.$nextTick(() => {
            var container = this.$refs.react;
            var reactWrapperRef = options.wrapInstance;
            if (!reactWrapperRef) {
              var parentInstance = this.$parent;
              // 向上查找react包囊层
              while (parentInstance) {
                if (parentInstance.parentReactWrapperRef) {
                  reactWrapperRef = parentInstance.parentReactWrapperRef;
                  break;
                }
                if (parentInstance.reactWrapperRef) {
                  reactWrapperRef = parentInstance.reactWrapperRef;
                  break;
                }
                parentInstance = parentInstance.$parent;
              }
            } else {
              reactWrapperRef = options.wrapInstance;
              reactWrapperRef.vueWrapperRef = this;
            }

            // 如果存在包囊层，则激活portal
            if (reactWrapperRef) {
              // 存储包囊层引用
              this.parentReactWrapperRef = reactWrapperRef;
              // 存储portal引用
              this.reactPortal = function () {
                return /*#__PURE__*/ReactDOM.createPortal(reactRootComponent, container);
              };
              reactWrapperRef.pushReactPortal(this.reactPortal);
              return;
            }
            if (ReactMajorVersion > 17) {
              // I'm not afraid of being fired
              if (ReactDOM__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED !== undefined) {
                ReactDOM__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;
              }
              this.__veauryReactApp__ = ReactDOM__default["default"].createRoot(container);
              this.__veauryReactApp__.render(reactRootComponent);
              return;
            }
            ReactDOM__default["default"].render(reactRootComponent, container);
            // })
          } else {
            var setReactState = function setReactState() {
              _this8.reactInstance && _this8.reactInstance.setState(function (prevState) {
                // 清除之前的state，阻止合并
                Object.keys(prevState).forEach(function (key) {
                  if (options.isSlots && key === 'children') return;
                  delete prevState[key];
                });
                return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, _this8.cache), !options.isSlots && _this8.last.slot), _this8.last.attrs), _reactEvent);
              });
              _this8.cache = null;
            };

            // 更新
            if (this.microTaskUpdate) {
              // Promise异步合并更新
              if (!this.cache) {
                this.$nextTick(function () {
                  // this.reactInstance && this.reactInstance.setState(this.cache)
                  setReactState();
                  _this8.microTaskUpdate = false;
                });
              }
            }

            // 宏任务合并更新
            if (this.macroTaskUpdate) {
              clearTimeout(this.updateTimer);
              this.updateTimer = setTimeout(function () {
                clearTimeout(_this8.updateTimer);
                // this.reactInstance && this.reactInstance.setState(this.cache)
                // this.cache = null
                setReactState();
                _this8.macroTaskUpdate = false;
              });
            }
            var _reactEvent = {};
            Object.keys(this.last.listeners).forEach(function (key) {
              _reactEvent["on".concat(key.replace(/^(\w)/, function ($, $1) {
                return $1.toUpperCase();
              }))] = _this8.$listeners[key];
            });
            this.cache = _objectSpread2(_objectSpread2({}, this.cache || {}), _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, __passedPropsRest), extraData), {
              "data-passed-props": __passedProps
            }), this.lastVnodeData["class"] ? {
              className: this.lastVnodeData["class"]
            } : {}), _objectSpread2({}, hashMap)), {}, {
              hashList: hashList,
              style: this.lastVnodeData.style
            }));

            // 同步更新
            if (!this.macroTaskUpdate && !this.microTaskUpdate) {
              // ...this.last.attrs,
              // ...reactEvent,
              // ...(update && updateType?.slot ? {...this.last.slot} : {}),
              // this.reactInstance && this.reactInstance.setState(this.cache)
              setReactState();
            }
          }
        }
      },
      mounted: function mounted() {
        clearTimeout(this.updateTimer);
        this.mountReactComponent();
      },
      beforeDestroy: function beforeDestroy() {
        clearTimeout(this.updateTimer);
        // 删除portal
        if (this.reactPortal) {
          // 骚操作，覆盖原生dom查找dom的一些方法，使react在vue组件销毁前仍然可以查到dom
          overwriteDomMethods(this.$refs.react);
          this.parentReactWrapperRef && this.parentReactWrapperRef.removeReactPortal(this.reactPortal);
          // 恢复原生方法
          recoverDomMethods();
          return;
        }
        // 删除根节点
        // 骚操作，覆盖原生dom查找dom的一些方法，使react在vue组件销毁前仍然可以查到dom
        overwriteDomMethods(this.$refs.react);
        if (ReactMajorVersion > 17) {
          this.__veauryReactApp__.unmount();
        } else {
          ReactDOM__default["default"].unmountComponentAtNode(this.$refs.react);
        }
        // 恢复原生方法
        recoverDomMethods();
      },
      updated: function updated() {
        // if (this.attrsUpdated) return
        this.mountReactComponent(true, {
          slot: true
        });
      },
      inheritAttrs: false,
      watch: {
        $attrs: {
          handler: function handler() {
            this.mountReactComponent(true, {
              attrs: true
            });
            // this.attrsUpdated = true
            // Promise.resolve().then(() => {
            //   this.attrsUpdated = false
            // })
          },

          deep: true
        },
        $listeners: {
          handler: function handler() {
            this.mountReactComponent(true, {
              listeners: true
            });
          },
          deep: true
        },
        "$props.dataPassedProps": {
          handler: function handler() {
            this.mountReactComponent(true, {
              passedProps: true
            });
          },
          deep: true
        }
      }
    };
  }

  var reactRouterInfo = {};
  function setReactRouterInVue(reactRouter) {
    if (reactRouterInfo.vueInstance) {
      updateReactRouterInVue(reactRouter);
      return;
    }
    reactRouterInfo.vueInstance = new Vue__default["default"]({
      data: _objectSpread2({}, reactRouter)
    });
    Vue__default["default"].prototype.$reactRouter = reactRouterInfo.vueInstance.$data;
  }
  function updateReactRouterInVue(reactRouter) {
    Object.assign(reactRouterInfo.vueInstance.$data, _objectSpread2({}, reactRouter));
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol") {
      _typeof = function _typeof(obj) {
        return _typeof$1(obj);
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
      };
    }
    return _typeof(obj);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    }
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  var inBrowser = typeof window !== 'undefined';
  function freeze(item) {
    if (Array.isArray(item) || _typeof(item) === 'object') {
      return Object.freeze(item);
    }
    return item;
  }
  function combinePassengers(transports) {
    var slotProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return transports.reduce(function (passengers, transport) {
      var temp = transport.passengers[0];
      var newPassengers = typeof temp === 'function' ? temp(slotProps) : transport.passengers;
      return passengers.concat(newPassengers);
    }, []);
  }
  function stableSort(array, compareFn) {
    return array.map(function (v, idx) {
      return [idx, v];
    }).sort(function (a, b) {
      return compareFn(a[1], b[1]) || a[0] - b[0];
    }).map(function (c) {
      return c[1];
    });
  }
  function pick(obj, keys) {
    return keys.reduce(function (acc, key) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  var transports = {};
  var targets = {};
  var sources = {};
  var Wormhole = Vue__default["default"].extend({
    data: function data() {
      return {
        transports: transports,
        targets: targets,
        sources: sources,
        trackInstances: inBrowser
      };
    },
    methods: {
      open: function open(transport) {
        if (!inBrowser) return;
        var to = transport.to,
          from = transport.from,
          passengers = transport.passengers,
          _transport$order = transport.order,
          order = _transport$order === void 0 ? Infinity : _transport$order;
        if (!to || !from || !passengers) return;
        var newTransport = {
          to: to,
          from: from,
          passengers: freeze(passengers),
          order: order
        };
        var keys = Object.keys(this.transports);
        if (keys.indexOf(to) === -1) {
          Vue__default["default"].set(this.transports, to, []);
        }
        var currentIndex = this.$_getTransportIndex(newTransport); // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays

        var newTransports = this.transports[to].slice(0);
        if (currentIndex === -1) {
          newTransports.push(newTransport);
        } else {
          newTransports[currentIndex] = newTransport;
        }
        this.transports[to] = stableSort(newTransports, function (a, b) {
          return a.order - b.order;
        });
      },
      close: function close(transport) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var to = transport.to,
          from = transport.from;
        if (!to || !from && force === false) return;
        if (!this.transports[to]) {
          return;
        }
        if (force) {
          this.transports[to] = [];
        } else {
          var index = this.$_getTransportIndex(transport);
          if (index >= 0) {
            // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
            var newTransports = this.transports[to].slice(0);
            newTransports.splice(index, 1);
            this.transports[to] = newTransports;
          }
        }
      },
      registerTarget: function registerTarget(target, vm, force) {
        if (!inBrowser) return;
        if (this.trackInstances && !force && this.targets[target]) {
          console.warn("[portal-vue]: Target ".concat(target, " already exists"));
        }
        this.$set(this.targets, target, Object.freeze([vm]));
      },
      unregisterTarget: function unregisterTarget(target) {
        this.$delete(this.targets, target);
      },
      registerSource: function registerSource(source, vm, force) {
        if (!inBrowser) return;
        if (this.trackInstances && !force && this.sources[source]) {
          console.warn("[portal-vue]: source ".concat(source, " already exists"));
        }
        this.$set(this.sources, source, Object.freeze([vm]));
      },
      unregisterSource: function unregisterSource(source) {
        this.$delete(this.sources, source);
      },
      hasTarget: function hasTarget(to) {
        return !!(this.targets[to] && this.targets[to][0]);
      },
      hasSource: function hasSource(to) {
        return !!(this.sources[to] && this.sources[to][0]);
      },
      hasContentFor: function hasContentFor(to) {
        return !!this.transports[to] && !!this.transports[to].length;
      },
      // Internal
      $_getTransportIndex: function $_getTransportIndex(_ref) {
        var to = _ref.to,
          from = _ref.from;
        for (var i in this.transports[to]) {
          if (this.transports[to][i].from === from) {
            return +i;
          }
        }
        return -1;
      }
    }
  });
  var wormhole = new Wormhole(transports);
  var _id = 1;
  var Portal = Vue__default["default"].extend({
    name: 'portal',
    props: {
      disabled: {
        type: Boolean
      },
      name: {
        type: String,
        "default": function _default() {
          return String(_id++);
        }
      },
      order: {
        type: Number,
        "default": 0
      },
      slim: {
        type: Boolean
      },
      slotProps: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        "default": 'DIV'
      },
      to: {
        type: String,
        "default": function _default() {
          return String(Math.round(Math.random() * 10000000));
        }
      }
    },
    created: function created() {
      var _this = this;
      this.$nextTick(function () {
        wormhole.registerSource(_this.name, _this);
      });
    },
    mounted: function mounted() {
      if (!this.disabled) {
        this.sendUpdate();
      }
    },
    updated: function updated() {
      if (this.disabled) {
        this.clear();
      } else {
        this.sendUpdate();
      }
    },
    beforeDestroy: function beforeDestroy() {
      wormhole.unregisterSource(this.name);
      this.clear();
    },
    watch: {
      to: function to(newValue, oldValue) {
        oldValue && oldValue !== newValue && this.clear(oldValue);
        this.sendUpdate();
      }
    },
    methods: {
      clear: function clear(target) {
        var closer = {
          from: this.name,
          to: target || this.to
        };
        wormhole.close(closer);
      },
      normalizeSlots: function normalizeSlots() {
        return this.$scopedSlots["default"] ? [this.$scopedSlots["default"]] : this.$slots["default"];
      },
      normalizeOwnChildren: function normalizeOwnChildren(children) {
        return typeof children === 'function' ? children(this.slotProps) : children;
      },
      sendUpdate: function sendUpdate() {
        var slotContent = this.normalizeSlots();
        if (slotContent) {
          var transport = {
            from: this.name,
            to: this.to,
            passengers: _toConsumableArray(slotContent),
            order: this.order
          };
          wormhole.open(transport);
        } else {
          this.clear();
        }
      }
    },
    render: function render(h) {
      var children = this.$slots["default"] || this.$scopedSlots["default"] || [];
      var Tag = this.tag;
      if (children && this.disabled) {
        return children.length <= 1 && this.slim ? this.normalizeOwnChildren(children)[0] : h(Tag, [this.normalizeOwnChildren(children)]);
      } else {
        return this.slim ? h() : h(Tag, {
          "class": {
            'v-portal': true
          },
          style: {
            display: 'none'
          },
          key: 'v-portal-placeholder'
        });
      }
    }
  });
  var PortalTarget = Vue__default["default"].extend({
    name: 'portalTarget',
    props: {
      multiple: {
        type: Boolean,
        "default": false
      },
      name: {
        type: String,
        required: true
      },
      slim: {
        type: Boolean,
        "default": false
      },
      slotProps: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        "default": 'div'
      },
      transition: {
        type: [String, Object, Function]
      }
    },
    data: function data() {
      return {
        transports: wormhole.transports,
        firstRender: true
      };
    },
    created: function created() {
      var _this = this;
      this.$nextTick(function () {
        wormhole.registerTarget(_this.name, _this);
      });
    },
    watch: {
      ownTransports: function ownTransports() {
        this.$emit('change', this.children().length > 0);
      },
      name: function name(newVal, oldVal) {
        /**
         * TODO
         * This should warn as well ...
         */
        wormhole.unregisterTarget(oldVal);
        wormhole.registerTarget(newVal, this);
      }
    },
    mounted: function mounted() {
      var _this2 = this;
      if (this.transition) {
        this.$nextTick(function () {
          // only when we have a transition, because it causes a re-render
          _this2.firstRender = false;
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      wormhole.unregisterTarget(this.name);
    },
    computed: {
      ownTransports: function ownTransports() {
        var transports = this.transports[this.name] || [];
        if (this.multiple) {
          return transports;
        }
        return transports.length === 0 ? [] : [transports[transports.length - 1]];
      },
      passengers: function passengers() {
        return combinePassengers(this.ownTransports, this.slotProps);
      }
    },
    methods: {
      // can't be a computed prop because it has to "react" to $slot changes.
      children: function children() {
        return this.passengers.length !== 0 ? this.passengers : this.$scopedSlots["default"] ? this.$scopedSlots["default"](this.slotProps) : this.$slots["default"] || [];
      },
      // can't be a computed prop because it has to "react" to this.children().
      noWrapper: function noWrapper() {
        var noWrapper = this.slim && !this.transition;
        if (noWrapper && this.children().length > 1) {
          console.warn('[portal-vue]: PortalTarget with `slim` option received more than one child element.');
        }
        return noWrapper;
      }
    },
    render: function render(h) {
      var noWrapper = this.noWrapper();
      var children = this.children();
      var Tag = this.transition || this.tag;
      return noWrapper ? children[0] : this.slim && !Tag ? h() : h(Tag, {
        props: {
          // if we have a transition component, pass the tag if it exists
          tag: this.transition && this.tag ? this.tag : undefined
        },
        "class": {
          'vue-portal-target': true
        }
      }, children);
    }
  });
  var _id$1 = 0;
  var portalProps = ['disabled', 'name', 'order', 'slim', 'slotProps', 'tag', 'to'];
  var targetProps = ['multiple', 'transition'];
  var MountingPortal = Vue__default["default"].extend({
    name: 'MountingPortal',
    inheritAttrs: false,
    props: {
      append: {
        type: [Boolean, String]
      },
      bail: {
        type: Boolean
      },
      mountTo: {
        type: String,
        required: true
      },
      // Portal
      disabled: {
        type: Boolean
      },
      // name for the portal
      name: {
        type: String,
        "default": function _default() {
          return 'mounted_' + String(_id$1++);
        }
      },
      order: {
        type: Number,
        "default": 0
      },
      slim: {
        type: Boolean
      },
      slotProps: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      tag: {
        type: String,
        "default": 'DIV'
      },
      // name for the target
      to: {
        type: String,
        "default": function _default() {
          return String(Math.round(Math.random() * 10000000));
        }
      },
      // Target
      multiple: {
        type: Boolean,
        "default": false
      },
      targetSlim: {
        type: Boolean
      },
      targetSlotProps: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      targetTag: {
        type: String,
        "default": 'div'
      },
      transition: {
        type: [String, Object, Function]
      }
    },
    created: function created() {
      if (typeof document === 'undefined') return;
      var el = document.querySelector(this.mountTo);
      if (!el) {
        console.error("[portal-vue]: Mount Point '".concat(this.mountTo, "' not found in document"));
        return;
      }
      var props = this.$props; // Target already exists

      if (wormhole.targets[props.name]) {
        if (props.bail) {
          console.warn("[portal-vue]: Target ".concat(props.name, " is already mounted.\n        Aborting because 'bail: true' is set"));
        } else {
          this.portalTarget = wormhole.targets[props.name];
        }
        return;
      }
      var append = props.append;
      if (append) {
        var type = typeof append === 'string' ? append : 'DIV';
        var mountEl = document.createElement(type);
        el.appendChild(mountEl);
        el = mountEl;
      } // get props for target from $props
      // we have to rename a few of them

      var _props = pick(this.$props, targetProps);
      _props.slim = this.targetSlim;
      _props.tag = this.targetTag;
      _props.slotProps = this.targetSlotProps;
      _props.name = this.to;
      this.portalTarget = new PortalTarget({
        el: el,
        parent: this.$parent || this,
        propsData: _props
      });
    },
    beforeDestroy: function beforeDestroy() {
      var target = this.portalTarget;
      if (this.append) {
        var el = target.$el;
        el.parentNode.removeChild(el);
      }
      target.$destroy();
    },
    render: function render(h) {
      if (!this.portalTarget) {
        console.warn("[portal-vue] Target wasn't mounted");
        return h();
      } // if there's no "manual" scoped slot, so we create a <Portal> ourselves

      if (!this.$scopedSlots.manual) {
        var props = pick(this.$props, portalProps);
        return h(Portal, {
          props: props,
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }, this.$slots["default"]);
      } // else, we render the scoped slot

      var content = this.$scopedSlots.manual({
        to: this.to
      }); // if user used <template> for the scoped slot
      // content will be an array

      if (Array.isArray(content)) {
        content = content[0];
      }
      if (!content) return h();
      return content;
    }
  });

  var REACT_ALL_HANDLERS = new Set(['onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onChange', 'onInput', 'onInvalid', 'onReset', 'onSubmit', 'onError', 'onLoad', 'onPointerDown', 'onPointerMove', 'onPointerUp', 'onPointerCancel', 'onGotPointerCapture', 'onLostPointerCapture', 'onPointerEnter', 'onPointerLeave', 'onPointerOver', 'onPointerOut', 'onSelect', 'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'onScroll', 'onWheel', 'onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting', 'onLoad', 'onError', 'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'onTransitionEnd', 'onToggle']);

  var _excluded = ["history", "match", "location"],
    _excluded2 = ["$model"],
    _excluded3 = ["$sync"],
    _excluded4 = ["$slots", "$scopedSlots", "children", "on"],
    _excluded5 = ["component", "on", "$slots", "$scopedSlots", "children", "class", "style", "data-passed-props"],
    _excluded6 = ["className", "classname"];
  var unsafePrefix = parseFloat(React.version) >= 17 ? 'UNSAFE_' : '';
  var optionsName = 'vuereact-combined-options';

  // 根据传入的是否是字符串，判断是否需要获取Vue的全局组件
  function filterVueComponent(component) {
    if (typeof component === 'string') {
      return Vue__default["default"].component(component);
    }
    return component;
  }
  // 获取组件选项对象
  function getOptions(Component) {
    if (typeof Component === 'function') {
      // return new (Component)().$options
      return Component.options;
    }
    return Component;
  }
  // 利用多阶组件来获取reactRouter
  var GetReactRouterPropsCom = /*#__PURE__*/function (_React$Component) {
    _inherits(GetReactRouterPropsCom, _React$Component);
    var _super = _createSuper(GetReactRouterPropsCom);
    function GetReactRouterPropsCom(props) {
      var _this;
      _classCallCheck(this, GetReactRouterPropsCom);
      _this = _super.call(this, props);
      var history = props.history,
        match = props.match,
        location = props.location;
      // 设置react router属性绑定倒所有的vue的原型上
      setReactRouterInVue({
        history: history,
        match: match,
        location: location
      });
      return _this;
    }
    _createClass(GetReactRouterPropsCom, [{
      key: "".concat(unsafePrefix, "componentWillReceiveProps"),
      value: function value(nextProps) {
        var history = nextProps.history,
          match = nextProps.match,
          location = nextProps.location;
        updateReactRouterInVue({
          history: history,
          match: match,
          location: location
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props;
          _this$props.history;
          _this$props.match;
          _this$props.location;
          var newProps = _objectWithoutProperties(_this$props, _excluded);
        return /*#__PURE__*/React__default["default"].createElement(VueComponentLoader, _extends({}, newProps, {
          ref: this.props.forwardRef
        }));
      }
    }]);
    return GetReactRouterPropsCom;
  }(React__default["default"].Component);
  var VueContainer = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
    var globalOptions = setOptions(props[optionsName] || {}, undefined, true);

    // 判断是否获取过reactRouter
    if (reactRouterInfo.withRouter) {
      if (!VueContainer.RouterTargetComponent) {
        VueContainer.RouterTargetComponent = reactRouterInfo.withRouter(GetReactRouterPropsCom);
      }
      // withRouter方法是通过wrappedComponentRef来传递ref的
      return /*#__PURE__*/React__default["default"].createElement(VueContainer.RouterTargetComponent, _extends({}, _objectSpread2(_objectSpread2({}, props), {}, _defineProperty({}, optionsName, globalOptions)), {
        forwardRef: ref
      }));
    } else {
      return /*#__PURE__*/React__default["default"].createElement(VueComponentLoader, _extends({}, _objectSpread2(_objectSpread2({}, props), {}, _defineProperty({}, optionsName, globalOptions)), {
        ref: ref
      }));
    }
  });
  var VueComponentLoader = /*#__PURE__*/function (_React$Component2) {
    _inherits(VueComponentLoader, _React$Component2);
    var _super2 = _createSuper(VueComponentLoader);
    function VueComponentLoader(props) {
      var _this2;
      _classCallCheck(this, VueComponentLoader);
      _this2 = _super2.call(this, props);
      _this2.state = {
        portals: []
      };
      _this2.portalKeyPool = [];
      _this2.maxPortalCount = 0;
      // 捕获vue组件
      _this2.currentVueComponent = filterVueComponent(props.component);
      _this2.createVueInstance = _this2.createVueInstance.bind(_assertThisInitialized(_this2));
      _this2.vueComponentContainer = _this2.createVueComponentContainer();
      return _this2;
    }
    _createClass(VueComponentLoader, [{
      key: "pushReactPortal",
      value: function pushReactPortal(reactPortal) {
        var portals = this.state.portals;
        var key = this.portalKeyPool.shift() || this.maxPortalCount++;
        portals.push({
          Portal: reactPortal,
          key: key
        });
        this.setState({
          portals: portals
        });
      }
    }, {
      key: "removeReactPortal",
      value: function removeReactPortal(reactPortal) {
        var portals = this.state.portals;
        var index;
        var portalData = portals.find(function (obj, i) {
          if (obj.Portal === reactPortal) {
            index = i;
            return true;
          }
        });
        this.portalKeyPool.push(portalData.key);
        portals.splice(index, 1);
        this.vueRef && this.setState({
          portals: portals
        });
      }

      // 这一步变的复杂是要判断插槽和组件的区别，如果是插槽则对wrapper传入原生事件和插槽相关的属性，如果是组件对wrapper不传入原生事件
    }, {
      key: "createVueComponentContainer",
      value: function createVueComponentContainer() {
        var _this3 = this;
        var nativeProps = {};
        var options = this.props[optionsName];
        if (options.isSlots) {
          Object.keys(this.props).forEach(function (keyName) {
            if (REACT_ALL_HANDLERS.has(keyName) && typeof _this3.props[keyName] === 'function') {
              nativeProps[keyName] = _this3.props[keyName];
            }
          });
          if (options.vue.slotWrapAttrs) {
            nativeProps = _objectSpread2(_objectSpread2({}, nativeProps), options.vue.slotWrapAttrs);
          }
        } else {
          if (options.vue.componentWrapAttrs) {
            nativeProps = _objectSpread2(_objectSpread2({}, nativeProps), options.vue.componentWrapAttrs);
          }
        }
        return options.vue.componentWrapHOC( /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.createVueInstance,
          key: null
        }), nativeProps);
      }
    }, {
      key: "".concat(unsafePrefix, "componentWillReceiveProps"),
      value: function value(nextProps) {
        var _this4 = this;
        var component = nextProps.component;
          nextProps[optionsName];
          var children = nextProps.children,
          $slots = nextProps.$slots,
          props = _objectWithoutProperties(nextProps, ["component", optionsName, "children", "$slots"].map(_toPropertyKey));
        component = filterVueComponent(component);
        if (this.currentVueComponent !== component) {
          this.updateVueComponent(component);
        }
        if (!this.vueInstance) return;
        children = this.transferChildren(children);
        $slots = this.transferSlots($slots);
        if (children) {
          props.children = children;
        }
        if ($slots) {
          props.$slots = $slots;
        }

        // 更改vue组件的data
        var newProps = this.doSync(this.doVModel(props));
        Object.keys(this.vueInstance.$data.reactProps).forEach(function (key) {
          if (!(key in newProps) && key !== 'data-passed-props') {
            _this4.vueInstance.$set(_this4.vueInstance.$data.reactProps, key, undefined);
          }
        });
        Object.keys(newProps).forEach(function (key) {
          _this4.vueInstance.$set(_this4.vueInstance.$data.reactProps, key, newProps[key]);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // 删除portal
        if (this.vuePortal) {
          this.parentVueWrapperRef.removeVuePortal(this.vuePortal);
          return;
        }
        this.vueInstance && this.vueInstance.$destroy();
      }

      // 处理v-model
    }, {
      key: "doVModel",
      value: function doVModel(props) {
        var $model = props.$model,
          newProps = _objectWithoutProperties(props, _excluded2);
        if ($model === undefined) return props;
        // 考虑到了自定义v-model
        var vueInstanceModelOption = _objectSpread2(_objectSpread2({}, {
          prop: 'value',
          event: 'input'
        }), getOptions(this.currentVueComponent).model);
        var modelProp = _defineProperty({}, vueInstanceModelOption.prop, $model.value);
        // 如果有绑定的事件和v-model事件相同，需合并两个绑定函数
        if (!newProps.on) newProps.on = {};
        if (newProps.on[vueInstanceModelOption.event]) {
          var oldFun = newProps.on[vueInstanceModelOption.event];
          newProps.on[vueInstanceModelOption.event] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            oldFun.apply(this, args);
            $model.setter && $model.setter.apply(this, args);
          };
        } else {
          newProps.on = _objectSpread2(_objectSpread2({}, newProps.on), _defineProperty({}, vueInstanceModelOption.event, $model.setter || function () {}));
        }
        return _objectSpread2(_objectSpread2({}, newProps), modelProp);
      }

      // 处理sync
    }, {
      key: "doSync",
      value: function doSync(props) {
        var $sync = props.$sync,
          newProps = _objectWithoutProperties(props, _excluded3);
        if ($sync === undefined) return props;
        var syncValues = {};
        var _loop = function _loop(i) {
          if (!$sync.hasOwnProperty(i) || !$sync[i] || $sync[i].value == null || $sync[i].setter == null) return 1; // continue
          syncValues[i] = $sync[i].value;
          var syncEvent = 'update:' + i;
          // 如果有绑定的事件和sync事件相同，需合并两个绑定函数
          if (!newProps.on) newProps.on = {};
          if (newProps.on[syncEvent]) {
            var oldFun = newProps.on[syncEvent];
            newProps.on[syncEvent] = function () {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              oldFun.apply(this, args);
              $sync[i].setter && $sync[i].setter.apply(this, args);
            };
          } else {
            newProps.on = _objectSpread2(_objectSpread2({}, newProps.on), _defineProperty({}, syncEvent, $sync[i].setter || function () {}));
          }
        };
        for (var i in $sync) {
          if (_loop(i)) continue;
        }
        return _objectSpread2(_objectSpread2({}, newProps), syncValues);
      }
    }, {
      key: "transferSlots",
      value: function transferSlots($slots) {
        // 将$slots中的内容处理成函数，防止被vue的data进行observer处理
        if ($slots) {
          Object.keys($slots).forEach(function (key) {
            var originSlot = $slots[key];
            $slots[key] = function () {
              return originSlot;
            };
          });
          return $slots;
        }
      }
    }, {
      key: "transferChildren",
      value: function transferChildren(children) {
        // 将children中的内容处理成函数，防止被vue的data进行observer处理
        if (children) {
          var originChildren = children;
          children = function children() {
            return originChildren;
          };
          return children;
        }
      }
      // 将通过react组件的ref回调方式接收组件的dom对象，并且在class的constructor中已经绑定了上下文
    }, {
      key: "createVueInstance",
      value: function createVueInstance(targetElement) {
        var _this5 = this;
        var VueContainerInstance = this;
        var _this$props2 = this.props,
          component = _this$props2.component,
          _this$props2$dataPas = _this$props2['data-passed-props'],
          __passedProps = _this$props2$dataPas === void 0 ? {} : _this$props2$dataPas,
          options = _this$props2[optionsName],
          children = _this$props2.children,
          $slots = _this$props2.$slots,
          props = _objectWithoutProperties(_this$props2, ["component", "data-passed-props", optionsName, "children", "$slots"].map(_toPropertyKey));
        children = this.transferChildren(children);
        $slots = this.transferSlots($slots);
        if (children) {
          props.children = children;
        }
        if ($slots) {
          props.$slots = $slots;
        }
        component = filterVueComponent(component);
        // 过滤vue组件实例化后的$attrs
        var filterAttrs = function filterAttrs(props) {
          // 对mixin进行合并
          var mixinsPropsArray = [];
          var mixinsPropsJson = {};
          // 这一步我暂时没有想到更好的方案
          var componentOptions = getOptions(_this5.currentVueComponent);
          if (componentOptions.mixins) {
            componentOptions.mixins.forEach(function (v) {
              if (v.props) {
                if (v.props instanceof Array) {
                  mixinsPropsArray = _toConsumableArray$1(v.props);
                } else {
                  mixinsPropsJson = _objectSpread2({}, v.props);
                }
              }
            });
          }
          var attrs = Object.assign({}, props);
          var optionProps = componentOptions.props;
          if (optionProps) {
            if (optionProps instanceof Array) {
              var tempArr = [].concat(_toConsumableArray$1(optionProps), _toConsumableArray$1(mixinsPropsArray));
              tempArr.forEach(function (v) {
                delete attrs[v];
              });
            } else {
              var tempJson = _objectSpread2(_objectSpread2({}, optionProps), mixinsPropsJson);
              for (var i in tempJson) {
                if (!tempJson.hasOwnProperty(i)) continue;
                delete attrs[i];
              }
            }
          }
          return attrs;
        };

        // 从作用域插槽中过滤具名插槽
        var filterNamedSlots = function filterNamedSlots(scopedSlots, slots) {
          if (!scopedSlots) return {};
          if (!slots) return scopedSlots;
          for (var i in scopedSlots) {
            if (!scopedSlots.hasOwnProperty(i)) continue;
            if (slots[i]) delete scopedSlots[i];
          }
          return scopedSlots;
        };
        function setVueInstance(instance) {
          if (!this.vueInstance) {
            this.vueInstance = instance;
          }
        }
        setVueInstance = setVueInstance.bind(this);
        // 将vue组件的inheritAttrs设置为false，以便组件可以顺利拿到任何类型的attrs
        // 这一步不确定是否多余，但是vue默认是true，导致属性如果是函数，又不在props中，会出警告，正常都需要在组件内部自己去设置false
        // component.inheritAttrs = false
        var vueOptionsData = _objectSpread2(_objectSpread2({}, this.doSync(this.doVModel(props))), {}, {
          'data-passed-props': __passedProps
        });
        var vueOptions = _objectSpread2(_objectSpread2({}, vueRootInfo), {}, {
          data: function data() {
            return {
              reactProps: vueOptionsData
            };
          },
          created: function created() {
            this.reactWrapperRef = VueContainerInstance;
            setVueInstance(this);
          },
          methods: {
            // 获取具名插槽
            // 将react组件传入的$slots属性逐个转成vue组件，但是透传的插槽不做处理
            getNamespaceSlots: function getNamespaceSlots(createElement, $slots) {
              var _this6 = this;
              if (!this.getNamespaceSlots.__namespaceSlots) {
                this.getNamespaceSlots.__namespaceSlots = {};
              }
              var tempSlots = Object.assign({}, $slots);
              var _loop2 = function _loop2(i) {
                if (!tempSlots.hasOwnProperty(i) || !tempSlots[i]) return 1; // continue
                if (typeof tempSlots[i] === 'function') tempSlots[i] = tempSlots[i]();
                tempSlots[i] = function (slot, slotName, _this6$getNamespaceSl) {
                  if (slot.vueSlot) {
                    return slot.vueSlot;
                  }
                  // 使用单例模式进行缓存，类似getChildren
                  var newSlot;
                  if (!((_this6$getNamespaceSl = _this6.getNamespaceSlots.__namespaceSlots[i]) !== null && _this6$getNamespaceSl !== void 0 && (_this6$getNamespaceSl = _this6$getNamespaceSl[0]) !== null && _this6$getNamespaceSl !== void 0 && (_this6$getNamespaceSl = _this6$getNamespaceSl.child) !== null && _this6$getNamespaceSl !== void 0 && _this6$getNamespaceSl.reactInstance)) {
                    newSlot = [createElement(applyReactInVue(function () {
                      return slot;
                    }, _objectSpread2(_objectSpread2({}, options), {}, {
                      isSlots: true,
                      wrapInstance: VueContainerInstance
                    })), {
                      slot: slotName
                    })];
                    _this6.getNamespaceSlots.__namespaceSlots[i] = newSlot;
                  } else {
                    newSlot = _this6.getNamespaceSlots.__namespaceSlots[i];
                    _this6.$nextTick(function () {
                      newSlot[0].child.reactInstance.setState({
                        children: slot
                      });
                    });
                  }
                  newSlot.reactSlot = slot;
                  return newSlot;
                }(tempSlots[i], i);
              };
              for (var i in tempSlots) {
                if (_loop2(i)) continue;
              }
              return tempSlots;
            },
            // 获取作用域插槽
            // 将react组件传入的$scopedSlots属性逐个转成vue组件
            getScopedSlots: function getScopedSlots(createElement, $scopedSlots) {
              var _this7 = this;
              if (!this.getScopedSlots.__scopeSlots) {
                this.getScopedSlots.__scopeSlots = {};
              }
              var tempScopedSlots = _objectSpread2({}, $scopedSlots);
              var _loop3 = function _loop3(i) {
                if (!tempScopedSlots.hasOwnProperty(i)) return 1; // continue
                var reactFunction = tempScopedSlots[i];
                tempScopedSlots[i] = function (scopedSlot) {
                  return function () {
                    var _this7$getScopedSlots;
                    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                      args[_key3] = arguments[_key3];
                    }
                    if (scopedSlot.vueFunction) {
                      return scopedSlot.vueFunction.apply(_this7, args);
                    }
                    // 使用单例模式进行缓存，类似getChildren
                    var newSlot;
                    if (!((_this7$getScopedSlots = _this7.getScopedSlots.__scopeSlots[i]) !== null && _this7$getScopedSlots !== void 0 && (_this7$getScopedSlots = _this7$getScopedSlots.child) !== null && _this7$getScopedSlots !== void 0 && _this7$getScopedSlots.reactInstance)) {
                      newSlot = createElement(applyReactInVue(function () {
                        return scopedSlot.apply(_this7, args);
                      }, _objectSpread2(_objectSpread2({}, options), {}, {
                        isSlots: true,
                        wrapInstance: VueContainerInstance
                      })));
                      _this7.getScopedSlots.__scopeSlots[i] = newSlot;
                    } else {
                      newSlot = _this7.getScopedSlots.__scopeSlots[i];
                      // 触发通信层更新fiberNode
                      _this7.$nextTick(function () {
                        newSlot.child.reactInstance.setState({
                          children: scopedSlot.apply(_this7, args)
                        });
                      });
                    }
                    return newSlot;
                  };
                }(reactFunction);
                tempScopedSlots[i].reactFunction = reactFunction;
              };
              for (var i in tempScopedSlots) {
                if (_loop3(i)) continue;
              }
              return tempScopedSlots;
            },
            // 获取插槽整体数据
            // children是react jsx的插槽，需要使用applyReactInVue转换成vue的组件选项对象
            // 转化规则是单例原则，转换的vnode是用于react插槽的，vnode只是作为容器存在，恒久不变，除非chidren为空就则不返回vnode，容器将销毁
            // vnode容器恒久保持只有一个子元素，children更新时，直接对子元素浅更新，（浅更新其实可以省略），因为真正操作react fiberNode更新是reactInstance.setState
            // 在applyReactInVue中的通信层react实力会保存react插槽的children到state，获取通信层更定为vnode.child.reactInstance
            getChildren: function getChildren(createElement, children) {
              // 这里要做判断，否则没有普通插槽传入，vue组件又设置了slot，会报错
              if (children != null) {
                var _this$getChildren$__v;
                if (typeof children === 'function') children = children();
                if (children.vueSlot) {
                  return children.vueSlot;
                }
                var newSlot;
                if (!((_this$getChildren$__v = this.getChildren.__vnode) !== null && _this$getChildren$__v !== void 0 && (_this$getChildren$__v = _this$getChildren$__v[0]) !== null && _this$getChildren$__v !== void 0 && (_this$getChildren$__v = _this$getChildren$__v.child) !== null && _this$getChildren$__v !== void 0 && _this$getChildren$__v.reactInstance)) {
                  newSlot = [createElement(applyReactInVue(function () {
                    return children;
                  }, _objectSpread2(_objectSpread2({}, options), {}, {
                    isSlots: true,
                    wrapInstance: VueContainerInstance
                  })))];
                  this.getChildren.__vnode = newSlot;
                } else {
                  // 此步vnode的浅更新可以省略
                  // Object.assign(this.getChildren.__vnode[0], createElement(applyReactInVue(() => children, {...options, isSlots: true})))
                  newSlot = this.getChildren.__vnode;
                  // 直接修改react的fiberNode，此过程vnode无感知，此方案只是临时
                  this.$nextTick(function () {
                    newSlot[0].child.reactInstance.setState({
                      children: children
                    });
                  });
                }
                newSlot.reactSlot = children;
                return newSlot;
              }
            }
          },
          mounted: function mounted() {
            // 在react包囊实例中，使用vueRef保存vue的目标组件实例
            VueContainerInstance.vueRef = this.$children[0];
            // 在vue的目标组件实例中，使用reactWrapperRef保存react包囊实例，vue组件可以通过这个属性来判断是否被包囊使用
            this.$children[0].reactWrapperRef = VueContainerInstance;
          },
          beforeDestroy: function beforeDestroy() {
            // 垃圾回收
            VueContainerInstance.vueRef = null;
            this.$children[0].reactWrapperRef = null;
          },
          render: function render(createElement) {
            // 这里很重要，将不是属性的内容过滤掉，并单独抽取
            var _this$$data$reactProp = this.$data.reactProps;
              _this$$data$reactProp.component;
              var on = _this$$data$reactProp.on,
              $slots = _this$$data$reactProp.$slots,
              $scopedSlots = _this$$data$reactProp.$scopedSlots;
              _this$$data$reactProp.children;
              var _this$$data$reactProp2 = _this$$data$reactProp['class'],
              className = _this$$data$reactProp2 === void 0 ? '' : _this$$data$reactProp2,
              _this$$data$reactProp3 = _this$$data$reactProp.style,
              style = _this$$data$reactProp3 === void 0 ? '' : _this$$data$reactProp3,
              _this$$data$reactProp4 = _this$$data$reactProp['data-passed-props'],
              __passedPropsSlots = _this$$data$reactProp4.$slots,
              __passedPropsScopedSlots = _this$$data$reactProp4.$scopedSlots,
              __passedPropsChildren = _this$$data$reactProp4.children,
              __passedPropsOn = _this$$data$reactProp4.on,
              __passedPropsRest = _objectWithoutProperties(_this$$data$reactProp4, _excluded4),
              props = _objectWithoutProperties(_this$$data$reactProp, _excluded5);
            filterNamedSlots(__passedPropsScopedSlots, __passedPropsSlots);
            // 作用域插槽的处理
            var scopedSlots = this.getScopedSlots(createElement, _objectSpread2(_objectSpread2({}, __passedPropsScopedSlots), $scopedSlots));
            var lastChildren = this.getChildren(createElement, this.reactProps.children || __passedPropsChildren);
            // 获取插槽数据（包含了具名插槽）
            var namedSlots = this.getNamespaceSlots(createElement, _objectSpread2(_objectSpread2({}, __passedPropsSlots), $slots));
            if (lastChildren) namedSlots["default"] = lastChildren;
            var lastSlots = [lastChildren || []].concat(_toConsumableArray$1(Object.keys(namedSlots).map(function (key) {
              if (key === 'default') {
                return;
              }
              return namedSlots[key];
            })));
            var lastOn = _objectSpread2(_objectSpread2({}, __passedPropsOn), on);
            var nativeOn = {};

            // 解决原生事件
            Object.keys(props).forEach(function (keyName) {
              if (REACT_ALL_HANDLERS.has(keyName) && typeof props[keyName] === 'function') {
                nativeOn[keyName.replace(/^on/, '').toLowerCase()] = props[keyName];
                delete props[keyName];
              }
            });
            var lastProps = _objectSpread2(_objectSpread2(_objectSpread2({}, __passedPropsRest), props), {}, {
              // 封装透传属性
              'data-passed-props': _objectSpread2(_objectSpread2(_objectSpread2({}, __passedPropsRest), props), {}, {
                on: lastOn,
                children: lastChildren,
                $slots: namedSlots,
                $scopedSlots: scopedSlots
              })
            });

            // 手动把props丛attrs中去除，
            // 这一步有点繁琐，但是又必须得处理
            var attrs = filterAttrs(_objectSpread2({}, lastProps));
            var newClassName = attrs.className,
              newClassName1 = attrs.classname,
              lastAttrs = _objectWithoutProperties(attrs, _excluded6);
            return createElement('use_vue_wrapper', {
              props: lastProps,
              on: lastOn,
              nativeOn: nativeOn,
              attrs: lastAttrs,
              'class': className || newClassName || newClassName1 || '',
              style: style,
              scopedSlots: _objectSpread2({}, scopedSlots)
            }, lastSlots);
          },
          components: {
            'use_vue_wrapper': component
          }
        });
        if (!targetElement) return;

        // Vue.nextTick(() => {
        var targetId = '__vue_wrapper_container_' + (Math.random() + '').substr(2);
        targetElement.id = targetId;
        // 获取react的fiber实例
        var vueWrapperRef = options.wrapInstance;
        if (!vueWrapperRef) {
          var fiberNode = this._reactInternals || this._reactInternalFiber;
          var parentInstance = fiberNode["return"];
          // 向上查找react包囊层
          while (parentInstance) {
            var _parentInstance$state, _parentInstance$state2;
            if ((_parentInstance$state = parentInstance.stateNode) !== null && _parentInstance$state !== void 0 && _parentInstance$state.parentVueWrapperRef) {
              vueWrapperRef = parentInstance.stateNode.parentVueWrapperRef;
              break;
            }
            if ((_parentInstance$state2 = parentInstance.stateNode) !== null && _parentInstance$state2 !== void 0 && _parentInstance$state2.vueWrapperRef) {
              vueWrapperRef = parentInstance.stateNode.vueWrapperRef;
              break;
            }
            parentInstance = parentInstance["return"];
          }
        } else {
          vueWrapperRef = options.wrapInstance;
          vueWrapperRef.reactWrapperRef = VueContainerInstance;
        }

        // 如果存在包囊层，则激活portal
        if (vueWrapperRef && document.getElementById(targetId)) {
          // 存储包囊层引用
          this.parentVueWrapperRef = vueWrapperRef;

          // 存储portal引用
          this.vuePortal = function (createElement, key) {
            return createElement(MountingPortal, {
              props: {
                mountTo: '#' + targetId,
                slim: true,
                targetSlim: true
              },
              key: targetId
            }, [createElement(Object.assign(vueOptions, {
              router: _this5._router
            }))]);
          };
          vueWrapperRef.pushVuePortal(this.vuePortal);
          return;
        }

        // 创建vue实例
        this.vueInstance = new Vue__default["default"](_objectSpread2(_objectSpread2({}, vueOptions), {}, {
          el: targetElement
        }));
        // })
      }
    }, {
      key: "updateVueComponent",
      value: function updateVueComponent(nextComponent) {
        this.currentVueComponent = nextComponent;
        if (!this.vueInstance) return;

        // 使用$forceUpdate强制重新渲染vue实例，因为此方法只会重新渲染当前实例和插槽，不会重新渲染子组件，所以不会造成性能问题
        // $options.components包含了vue实例中所对应的组件序列, $option是只读,但是确实可以修改components属性,依靠此实现了动态组件替换
        if (nextComponent.__fromReactSlot) {
          // 如果是来自react的slot，就强行通过修改vue组件构造器的use_vue_wrapper的缓存
          Object.assign(this.vueInstance.$options.components.use_vue_wrapper._Ctor[0].options, nextComponent);
        } else {
          // 如果是标准的vue组件，则整个替换use_vue_wrapper为新的组件
          this.vueInstance.$options.components.use_vue_wrapper = nextComponent;
        }
        this.vueInstance.$forceUpdate();
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React__default["default"].createElement(this.vueComponentContainer, {
          portals: this.state.portals
        });
      }
    }]);
    return VueComponentLoader;
  }(React__default["default"].Component);
  function applyVueInReact(component) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!component) {
      console.warn('Component must be passed in applyVueInReact!');
    }

    // 兼容esModule
    if (component.__esModule && component["default"]) {
      component = component["default"];
    }

    // // 使用React.forwardRef之后，组件不再是函数组件，如果使用applyVueInReact处理插槽vue的插槽，需要直接调用返回对象的render方法
    return /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
      return /*#__PURE__*/React__default["default"].createElement(VueContainer, _extends({}, props, {
        component: component,
        ref: ref
      }, _defineProperty({}, optionsName, options)));
    });
  }

  // if (window.Vue && window.veaury && window.Vue.use === undefined) {
  //   window.__VueUseComponents = window.__VueUseComponents || [];
  //   window.Vue.use = function(com) {
  //     if (window.__VueUseComponents.indexOf(com) === -1) {
  //       window.__VueUseComponents.push(com);
  //       window.veaury.setVeauryOptions({
  //         beforeVueAppMount: function(app) {
  //           for (var i = 0; i < window.__VueUseComponents.length; i++) {
  //             app.use(window.__VueUseComponents[i]);
  //           }
  //         }
  //       });
  //     }
  //   };
  // }

  var SlotRender = function SlotRender(_ref) {
    var _slots$name, _slots$name$render;
    var slots = _ref.slots,
      name = _ref.name,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params;
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, (_slots$name = slots[name]) === null || _slots$name === void 0 || (_slots$name$render = _slots$name.render) === null || _slots$name$render === void 0 ? void 0 : _slots$name$render.call(_slots$name, params));
  };
  var useHasStringObj = function useHasStringObj(obj) {
    var proxyObj = React.useMemo(function () {
      return new Proxy({}, {
        get: function get(target, key) {
          if (key === 'toString') {
            return function () {
              return '_';
            };
          }
          return obj[key];
        }
      });
    }, [obj]);
    return proxyObj;
  };
  function VUEHoc(com) {
    var Basic = applyVueInReact(com);
    return function (_ref2) {
      var data = _ref2.data,
        outputs = _ref2.outputs,
        inputs = _ref2.inputs,
        slots = _ref2.slots,
        style = _ref2.style,
        env = _ref2.env,
        logger = _ref2.logger;
      var vSlots = {};
      var _slots = {}; // slots不能直接丢进去，否则会触发bug
      var _loop = function _loop(key) {
        if (Object.prototype.hasOwnProperty.call(slots, key)) {
          vSlots[key] = function (params) {
            return /*#__PURE__*/React__default["default"].createElement(SlotRender, {
              slots: slots,
              name: key,
              params: params
            });
          };
          _slots[key] = slots[key];
        }
      };
      for (var key in slots) {
        _loop(key);
      }
      var inputsProxy = useHasStringObj(inputs);
      var outputsProxy = useHasStringObj(outputs);
      return /*#__PURE__*/React__default["default"].createElement(Basic
      // style={style}
      , {
        config: {
          style: style
        },
        env: env,
        logger: logger,
        data: _objectSpread2({}, data),
        outputs: outputsProxy,
        inputs: inputsProxy,
        slots: _slots,
        $scopedSlots: vSlots
        // v-slots={vSlots}
      });
    };
  }

  window.VUEHoc = VUEHoc;

}));
