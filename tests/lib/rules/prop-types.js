/**
 * @fileoverview Prevent missing props validation in a Inferno component definition
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prop-types');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

var settings = {
  inferno: {
    pragma: 'Foo'
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('prop-types', rule, {

  valid: [
    {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.string.isRequired',
        '  },',
        '  render: function() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.object.isRequired',
        '  },',
        '  render: function() {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>Hello World</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>Hello World {this.props.children}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{
        ignore: ['children']
      }],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    var props = this.props;',
        '    return <div>Hello World</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    var propName = "foo";',
        '    return <div>Hello World {this.props[propName]}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: externalPropTypes,',
        '  render: function() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: externalPropTypes.mySharedPropTypes,',
        '  render: function() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello World</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.firstname} {this.props.lastname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};',
        'Hello.propTypes.lastname = Inferno.PropTypes.string;'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.object.isRequired',
        '  },',
        '  render: function() {',
        '    var user = {',
        '      name: this.props.name',
        '    };',
        '    return <div>Hello {user.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello {',
        '  render() {',
        '    return \'Hello\' + this.props.name;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello {',
        '  method;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static get propTypes() {',
        '    return {',
        '      name: Inferno.PropTypes.string',
        '    };',
        '  }',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var { firstname, ...other } = this.props;',
        '    return <div>Hello {firstname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var {firstname, lastname} = this.state, something = this.props;',
        '    return <div>Hello {firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static propTypes = {',
        '    name: Inferno.PropTypes.string',
        '  };',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.firstname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  \'firstname\': Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    if (Object.prototype.hasOwnProperty.call(this.props, \'firstname\')) {',
        '      return <div>Hello {this.props.firstname}</div>;',
        '    }',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  \'firstname\': Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {};',
        'Hello.propTypes.a = Inferno.PropTypes.shape({',
        '  b: Inferno.PropTypes.string',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b.c;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.shape({',
        '    b: Inferno.PropTypes.shape({',
        '    })',
        '  })',
        '};',
        'Hello.propTypes.a.b.c = Inferno.PropTypes.number;'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b.c;',
        '    this.props.a.__.d.length;',
        '    this.props.a.anything.e[2];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.objectOf(',
        '    Inferno.PropTypes.shape({',
        '      c: Inferno.PropTypes.number,',
        '      d: Inferno.PropTypes.string,',
        '      e: Inferno.PropTypes.array',
        '    })',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var i = 3;',
        '    this.props.a[2].c;',
        '    this.props.a[i].d.length;',
        '    this.props.a[i + 2].e[2];',
        '    this.props.a.length;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.arrayOf(',
        '    Inferno.PropTypes.shape({',
        '      c: Inferno.PropTypes.number,',
        '      d: Inferno.PropTypes.string,',
        '      e: Inferno.PropTypes.array',
        '    })',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.length;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.oneOfType([',
        '    Inferno.PropTypes.array,',
        '    Inferno.PropTypes.string',
        '  ])',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.c;',
        '    this.props.a[2] === true;',
        '    this.props.a.e[2];',
        '    this.props.a.length;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.oneOfType([',
        '    Inferno.PropTypes.shape({',
        '      c: Inferno.PropTypes.number,',
        '      e: Inferno.PropTypes.array',
        '    }).isRequired,',
        '    Inferno.PropTypes.arrayOf(',
        '      Inferno.PropTypes.bool',
        '    )',
        '  ])',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.render;',
        '    this.props.a.c;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.instanceOf(Hello)',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.arr;',
        '    this.props.arr[3];',
        '    this.props.arr.length;',
        '    this.props.arr.push(3);',
        '    this.props.bo;',
        '    this.props.bo.toString();',
        '    this.props.fu;',
        '    this.props.fu.bind(this);',
        '    this.props.numb;',
        '    this.props.numb.toFixed();',
        '    this.props.stri;',
        '    this.props.stri.length();',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  arr: Inferno.PropTypes.array,',
        '  bo: Inferno.PropTypes.bool.isRequired,',
        '  fu: Inferno.PropTypes.func,',
        '  numb: Inferno.PropTypes.number,',
        '  stri: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var { ',
        '      propX,',
        '      "aria-controls": ariaControls, ',
        '      ...props } = this.props;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "propX": Inferno.PropTypes.string,',
        '  "aria-controls": Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["some.value"];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "some.value": Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["arr"][1];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "arr": Inferno.PropTypes.array',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["arr"][1]["some.value"];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "arr": Inferno.PropTypes.arrayOf(',
        '    Inferno.PropTypes.shape({"some.value": Inferno.PropTypes.string})',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var TestComp1 = Inferno.createClass({',
        '  propTypes: {',
        '    size: Inferno.PropTypes.string',
        '  },',
        '  render: function() {',
        '    var foo = {',
        '      baz: \'bar\'',
        '    };',
        '    var icons = foo[this.props.size].salut;',
        '    return <div>{icons}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>{this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      options: [{ignore: ['name']}]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    const {firstname, lastname} = this.props.name;',
        '    return <div>{firstname} {lastname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  name: PropTypes.shape({',
        '    firstname: PropTypes.string,',
        '    lastname: PropTypes.string',
        '  })',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    let {firstname} = this;',
        '    return <div>{firstname}</div>;',
        '  }',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    router: Inferno.PropTypes.func',
        '  },',
        '  render: function() {',
        '    var nextPath = this.props.router.getCurrentQuery().nextPath;',
        '    return <div>{nextPath}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    firstname: CustomValidator.string',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.firstname}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{customValidators: ['CustomValidator']}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    outer: CustomValidator.shape({',
        '      inner: CustomValidator.map',
        '    })',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.outer.inner}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{customValidators: ['CustomValidator']}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    outer: Inferno.PropTypes.shape({',
        '      inner: CustomValidator.string',
        '    })',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.outer.inner}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{customValidators: ['CustomValidator']}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    outer: CustomValidator.shape({',
        '      inner: Inferno.PropTypes.string',
        '    })',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.outer.inner}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{customValidators: ['CustomValidator']}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.string',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.name.get("test")}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{customValidators: ['CustomValidator']}],
      parserOptions: parserOptions
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return <span />;',
        '  }',
        '}',
        'Comp1.propTypes = {',
        '  prop1: PropTypes.number',
        '};',
        'class Comp2 extends Component {',
        '  render() {',
        '    return <span />;',
        '  }',
        '}',
        'Comp2.propTypes = {',
        '  prop2: PropTypes.arrayOf(Comp1.propTypes.prop1)',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'const SomeComponent = Inferno.createClass({',
        '  propTypes: SomeOtherComponent.propTypes',
        '});'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    let { a, ...b } = obj;',
        '    let c = { ...d };',
        '    return <div />;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static get propTypes() {}',
        '  render() {',
        '    return <div>Hello World</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static get propTypes() {}',
        '  render() {',
        '    var users = this.props.users.find(user => user.name === \'John\');',
        '    return <div>Hello you {users.length}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  users: Inferno.PropTypes.arrayOf(Inferno.PropTypes.object)',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    const {} = this.props;',
        '    return <div>Hello</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var foo = \'fullname\';',
        '    var { [foo]: firstname } = this.props;',
        '    return <div>Hello {firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: props.source.uri }',
        '  }',
        '  static propTypes = {',
        '    source: PropTypes.object',
        '  };',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: this.props.source.uri }',
        '  }',
        '  static propTypes = {',
        '    source: PropTypes.object',
        '  };',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Should not be detected as a component
      code: [
        'HelloJohn.prototype.render = function() {',
        '  return Inferno.createVNode(Hello, {',
        '    name: this.props.firstname',
        '  });',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'function HelloComponent() {',
        '  class Hello extends Inferno.Component {',
        '    render() {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  }',
        '  Hello.propTypes = { name: Inferno.PropTypes.string };',
        '  return Hello;',
        '}',
        'module.exports = HelloComponent();'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'function HelloComponent() {',
        '  var Hello = Inferno.createClass({',
        '    propTypes: { name: Inferno.PropTypes.string },',
        '    render: function() {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  });',
        '  return Hello;',
        '}',
        'module.exports = HelloComponent();'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class DynamicHello extends Component {',
        '  render() {',
        '    const {firstname} = this.props;',
        '    class Hello extends Component {',
        '      render() {',
        '        const {name} = this.props;',
        '        return <div>Hello {name}</div>;',
        '      }',
        '    }',
        '    Hello.propTypes = {',
        '      name: PropTypes.string',
        '    };',
        '    Hello = connectReduxForm({name: firstname})(Hello);',
        '    return <Hello />;',
        '  }',
        '}',
        'DynamicHello.propTypes = {',
        '  firstname: PropTypes.string,',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'const Hello = (props) => {',
        '  let team = props.names.map((name) => {',
        '      return <li>{name}, {props.company}</li>;',
        '    });',
        '  return <ul>{team}</ul>;',
        '};',
        'Hello.propTypes = {',
        '  names: Inferno.PropTypes.array,',
        '  company: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'export default {',
        '  renderHello() {',
        '    let {name} = this.props;',
        '    return <div>{name}</div>;',
        '  }',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Reassigned props are ignored
      code: [
        'export class Hello extends Component {',
        '  render() {',
        '    const props = this.props;',
        '    return <div>Hello {props.name.firstname} {props[\'name\'].lastname}</div>',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'export default function FooBar(props) {',
        '  const bar = props.bar;',
        '  return (<div bar={bar}><div {...props}/></div>);',
        '}',
        'if (process.env.NODE_ENV !== \'production\') {',
        '  FooBar.propTypes = {',
        '    bar: Inferno.PropTypes.string',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    var {...other} = this.props;',
        '    return (',
        '      <div {...other} />',
        '    );',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'const statelessComponent = (props) => {',
        '  const subRender = () => {',
        '    return <span>{props.someProp}</span>;',
        '  };',
        '  return <div>{subRender()}</div>;',
        '};',
        'statelessComponent.propTypes = {',
        '  someProp: PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'const statelessComponent = ({ someProp }) => {',
        '  const subRender = () => {',
        '    return <span>{someProp}</span>;',
        '  };',
        '  return <div>{subRender()}</div>;',
        '};',
        'statelessComponent.propTypes = {',
        '  someProp: PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'const statelessComponent = function({ someProp }) {',
        '  const subRender = () => {',
        '    return <span>{someProp}</span>;',
        '  };',
        '  return <div>{subRender()}</div>;',
        '};',
        'statelessComponent.propTypes = {',
        '  someProp: PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'function statelessComponent({ someProp }) {',
        '  const subRender = () => {',
        '    return <span>{someProp}</span>;',
        '  };',
        '  return <div>{subRender()}</div>;',
        '};',
        'statelessComponent.propTypes = {',
        '  someProp: PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'function notAComponent({ something }) {',
        '  return something + 1;',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'const notAComponent = function({ something }) {',
        '  return something + 1;',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'const notAComponent = ({ something }) => {',
        '  return something + 1;',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      // Validation is ignored on reassigned props object
      code: [
        'const statelessComponent = (props) => {',
        '  let newProps = props;',
        '  return <span>{newProps.someProp}</span>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {',
        '    name: string;',
        '  };',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {',
        '    name: Object;',
        '  };',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {name: Object;};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'import type Props from "fake";',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {',
        '    name: {',
        '      firstname: string;',
        '    }',
        '  };',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {name: {firstname: string;};};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {name: {firstname: string; lastname: string;};};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Person = {name: {firstname: string;}};',
        'class Hello extends Inferno.Component {',
        '  props: {people: Person[];};',
        '  render () {',
        '    var names = [];',
        '    for (var i = 0; i < this.props.people.length; i++) {',
        '      names.push(this.props.people[i].name.firstname);',
        '    }',
        '    return <div>Hello {names.join(', ')}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Person = {name: {firstname: string;}};',
        'type Props = {people: Person[];};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    var names = [];',
        '    for (var i = 0; i < this.props.people.length; i++) {',
        '      names.push(this.props.people[i].name.firstname);',
        '    }',
        '    return <div>Hello {names.join(', ')}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Person = {name: {firstname: string;}};',
        'type Props = {people: Person[]|Person;};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    var names = [];',
        '    if (Array.isArray(this.props.people)) {',
        '      for (var i = 0; i < this.props.people.length; i++) {',
        '        names.push(this.props.people[i].name.firstname);',
        '      }',
        '    } else {',
        '      names.push(this.props.people.name.firstname);',
        '    }',
        '    return <div>Hello {names.join(', ')}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {ok: string | boolean;};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.ok}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {result: {ok: string | boolean;}|{ok: number | Array}};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.result.ok}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {result?: {ok?: ?string | boolean;}|{ok?: ?number | Array}};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.result.ok}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props = {a: 123};',
        '  render () {',
        '    return <div>Hello</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Ignore component validation if propTypes are composed using spread
      code: [
        'class Hello extends Inferno.Component {',
        '    render() {',
        '        return  <div>Hello {this.props.firstName} {this.props.lastName}</div>;',
        '    }',
        '};',
        'const otherPropTypes = {',
        '    lastName: Inferno.PropTypes.string',
        '};',
        'Hello.propTypes = {',
        '    ...otherPropTypes,',
        '    firstName: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      // Ignore destructured function arguments
      code: [
        'class Hello extends Inferno.Component {',
        '  render () {',
        '    return ["string"].map(({length}) => <div>{length}</div>);',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      // Flow annotations on stateless components
      code: [
        'type Props = {',
        '  firstname: string;',
        '  lastname: string;',
        '};',
        'function Hello(props: Props): Inferno.Element {',
        '  const {firstname, lastname} = props;',
        '  return <div>Hello {firstname} {lastname}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {',
        '  firstname: string;',
        '  lastname: string;',
        '};',
        'const Hello = function(props: Props): Inferno.Element {',
        '  const {firstname, lastname} = props;',
        '  return <div>Hello {firstname} {lastname}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {',
        '  firstname: string;',
        '  lastname: string;',
        '};',
        'const Hello = (props: Props): Inferno.Element => {',
        '  const {firstname, lastname} = props;',
        '  return <div>Hello {firstname} {lastname}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'Card.propTypes = {',
        '  title: PropTypes.string.isRequired,',
        '  children: PropTypes.element.isRequired,',
        '  footer: PropTypes.node',
        '}',
        'function Card ({ title, children, footer }) {',
        '  return (',
        '    <div/>',
        '  )',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'function JobList(props) {',
        '  props',
        '  .jobs',
        '  .forEach(() => {});',
        '  return <div></div>;',
        '}',
        'JobList.propTypes = {',
        '  jobs: PropTypes.array',
        '};'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Props = {',
        '  firstname: ?string,',
        '};',
        'function Hello({firstname}: Props): Inferno$Element {',
        '  return <div>Hello {firstname}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'function Greetings() {',
        '  return <div>{({name}) => <Hello name={name} />}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'function Greetings() {',
        '  return <div>{function({name}) { return <Hello name={name} />; }}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Should stop at the class when searching for a parent component
      code: [
        'export default (ComposedComponent) => class Something extends SomeOtherComponent {',
        '  someMethod = ({width}) => {}',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Should stop at the decorator when searching for a parent component
      code: [
        '@asyncConnect([{',
        '  promise: ({dispatch}) => {}',
        '}])',
        'class Something extends Component {}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Should not find any used props
      code: [
        'function Hello(props) {',
        '  const {...rest} = props;',
        '  return <div>Hello</div>;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'let Greetings = class extends Inferno.Component {',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '};',
        'Greetings.propTypes = {',
        '  name: Inferno.PropTypes.string',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'let Greetings = {',
        '  Hello: class extends Inferno.Component {',
        '    render () {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  }',
        '}',
        'Greetings.Hello.propTypes = {',
        '  name: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'let Greetings = {};',
        'Greetings.Hello = class extends Inferno.Component {',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '};',
        'Greetings.Hello.propTypes = {',
        '  name: Inferno.PropTypes.string',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    }, {
      code: [
        'function Hello({names}) {',
        '  return names.map((name) => {',
        '    return <div>{name}</div>;',
        '  });',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'type Target = { target: EventTarget }',
        'class MyComponent extends Component {',
        '  static propTypes = {',
        '    children: PropTypes.any,',
        '  }',
        '  handler({ target }: Target) {}',
        '  render() {',
        '    return <div>{this.props.children}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Component {}',
        'Hello.Foo = ({foo}) => (',
        '  <div>Hello {foo}</div>',
        ')',
        'Hello.Foo.propTypes = {',
        '  foo: PropTypes.node',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>{this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>{this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>{this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.object.isRequired',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.object.isRequired',
        '  },',
        '  render: function() {',
        '    return <div>{this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: false}],
      parserOptions: parserOptions
    }, {
      // Async functions can't be components.
      code: [
        'var Hello = async function(props) {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Async functions can't be components.
      code: [
        'async function Hello(props) {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Async functions can't be components.
      code: [
        'var Hello = async (props) => {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      // Flow annotations with variance
      code: [
        'type Props = {',
        '  +firstname: string;',
        '  -lastname: string;',
        '};',
        'function Hello(props: Props): Inferno.Element {',
        '  const {firstname, lastname} = props;',
        '  return <div>Hello {firstname} {lastname}</div>',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  async onSelect({ name }) {',
        '    return null;',
        '  }',
        '  render() {',
        '    return <Greeting onSelect={this.onSelect} />;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
          jsx: true
        }
      }
    }, {
      code: [
        'export class Example extends Component {',
        '  static propTypes = {',
        '    onDelete: Inferno.PropTypes.func.isRequired',
        '  }',
        '  handleDeleteConfirm = () => {',
        '    this.props.onDelete();',
        '  };',
        '  handleSubmit = async ({certificate, key}) => {};',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }
  ],

  invalid: [
    {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return Inferno.createVNode("div", {}, this.props.name);',
        '  }',
        '});'
      ].join('\n'),
      ecmaFeatures: {
        jsx: false
      },
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 3,
        column: 54,
        type: 'Identifier'
      }]
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 3,
        column: 35,
        type: 'Identifier'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 3,
        column: 35,
        type: 'Identifier'
      }]
    }, {
      code: [
        '/** @extends Inferno.Component */',
        'class Hello extends ChildComponent {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 4,
        column: 35,
        type: 'Identifier'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.firstname} {this.props.lastname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'lastname\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  name: Inferno.PropTypes.string',
        '};',
        'class HelloBis extends Inferno.Component {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {',
        '    name: Inferno.PropTypes.string.isRequired',
        '  },',
        '  render: function() {',
        '    return <div>Hello {this.props.name} and {this.props.propWithoutTypeDefinition}</div>;',
        '  }',
        '});',
        'var Hello2 = Inferno.createClass({',
        '  render: function() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '});'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'propWithoutTypeDefinition\' is missing in props validation'
      }, {
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var { firstname, lastname } = this.props;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'lastname\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static propTypes: { ',
        '    firstname: Inferno.PropTypes.string',
        '  };',
        '  render() {',
        '    return <div>Hello {this.props.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.shape({',
        '  })',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'a.b\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b.c;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.shape({',
        '    b: Inferno.PropTypes.shape({',
        '    })',
        '  })',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'a.b.c\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.b.c;',
        '    this.props.a.__.d.length;',
        '    this.props.a.anything.e[2];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.objectOf(',
        '    Inferno.PropTypes.shape({',
        '    })',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'a.b.c\' is missing in props validation'},
        {message: '\'a.__.d\' is missing in props validation'},
        {message: '\'a.__.d.length\' is missing in props validation'},
        {message: '\'a.anything.e\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var i = 3;',
        '    this.props.a[2].c;',
        '    this.props.a[i].d.length;',
        '    this.props.a[i + 2].e[2];',
        '    this.props.a.length;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.arrayOf(',
        '    Inferno.PropTypes.shape({',
        '    })',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'a[].c\' is missing in props validation'},
        {message: '\'a[].d\' is missing in props validation'},
        {message: '\'a[].d.length\' is missing in props validation'},
        {message: '\'a[].e\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props.a.length;',
        '    this.props.a.b;',
        '    this.props.a.e.length;',
        '    this.props.a.e.anyProp;',
        '    this.props.a.c.toString();',
        '    this.props.a.c.someThingElse();',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  a: Inferno.PropTypes.oneOfType([',
        '    Inferno.PropTypes.shape({',
        '      c: Inferno.PropTypes.number,',
        '      e: Inferno.PropTypes.array',
        '    })',
        '  ])',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'a.length\' is missing in props validation'},
        {message: '\'a.b\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var { ',
        '      "aria-controls": ariaControls, ',
        '      propX,',
        '      ...props } = this.props;',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "aria-controls": Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'propX\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["some.value"];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'some.value\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["arr"][1];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'arr\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    this.props["arr"][1]["some.value"];',
        '    return <div>Hello</div>;',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  "arr": Inferno.PropTypes.arrayOf(',
        '    Inferno.PropTypes.shape({})',
        '  )',
        '};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'arr[].some.value\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var text;',
        '    text = \'Hello \';',
        '    let {props: {firstname}} = this;',
        '    return <div>{text} {firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var {\'props\': {firstname}} = this;',
        '    return <div>Hello {firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    if (true) {',
        '      return <span>{this.props.firstname}</span>',
        '    } else {',
        '      return <span>{this.props.lastname}</span>',
        '    }',
        '  }',
        '}',
        'Hello.propTypes = {',
        '  lastname: Inferno.PropTypes.string',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'var Hello = function(props) {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'function Hello(props) {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'var Hello = (props) => {',
        '  return <div>Hello {props.name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'var Hello = (props) => {',
        '  const {name} = props;',
        '  return <div>Hello {name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'function Hello({ name }) {',
        '  return <div>Hello {name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'const Hello = function({ name }) {',
        '  return <div>Hello {name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'const Hello = ({ name }) => {',
        '  return <div>Hello {name}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    var props = {firstname: \'John\'};',
        '    return <div>Hello {props.firstname} {this.props.lastname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: props.source }',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'source\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: props.source.uri }',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'source\' is missing in props validation'},
        {message: '\'source.uri\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: this.props.source }',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'source\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    this.state = { status: this.props.source.uri }',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'source\' is missing in props validation'},
        {message: '\'source.uri\' is missing in props validation'}
      ]
    }, {
      code: [
        'function HelloComponent() {',
        '  class Hello extends Inferno.Component {',
        '    render() {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  }',
        '  return Hello;',
        '}',
        'module.exports = HelloComponent();'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name\' is missing in props validation'}
      ]
    }, {
      code: [
        'function HelloComponent() {',
        '  var Hello = Inferno.createClass({',
        '    render: function() {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  });',
        '  return Hello;',
        '}',
        'module.exports = HelloComponent();'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name\' is missing in props validation'}
      ]
    }, {
      code: [
        'class DynamicHello extends Component {',
        '  render() {',
        '    const {firstname} = this.props;',
        '    class Hello extends Component {',
        '      render() {',
        '        const {name} = this.props;',
        '        return <div>Hello {name}</div>;',
        '      }',
        '    }',
        '    Hello = connectReduxForm({name: firstname})(Hello);',
        '    return <Hello />;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'},
        {message: '\'name\' is missing in props validation'}
      ]
    }, {
      code: [
        'const Hello = (props) => {',
        '  let team = props.names.map((name) => {',
        '      return <li>{name}, {props.company}</li>;',
        '    });',
        '  return <ul>{team}</ul>;',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'names\' is missing in props validation'},
        {message: '\'names.map\' is missing in props validation'},
        {message: '\'company\' is missing in props validation'}
      ]
    }, {
      code: [
        'const Annotation = props => (',
        '  <div>',
        '    {props.text}',
        '  </div>',
        ')'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'text\' is missing in props validation'}
      ]
    }, {
      code: [
        'for (var key in foo) {',
        '  var Hello = Inferno.createClass({',
        '    render: function() {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  });',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name\' is missing in props validation'}
      ]
    }, {
      code: [
        'var propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};',
        'class Test extends Inferno.Component {',
        '  render() {',
        '    return (',
        '      <div>{this.props.firstname} {this.props.lastname}</div>',
        '    );',
        '  }',
        '}',
        'Test.propTypes = propTypes;'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Test extends Foo.Component {',
        '  render() {',
        '    return (',
        '      <div>{this.props.firstname} {this.props.lastname}</div>',
        '    );',
        '  }',
        '}',
        'Test.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      settings: settings,
      errors: [
        {message: '\'lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        '/** @jsx Foo */',
        'class Test extends Foo.Component {',
        '  render() {',
        '    return (',
        '      <div>{this.props.firstname} {this.props.lastname}</div>',
        '    );',
        '  }',
        '}',
        'Test.propTypes = {',
        '  firstname: Inferno.PropTypes.string',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {};',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {',
        '    name: Object;',
        '  };',
        '  render () {',
        '    return <div>Hello {this.props.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Props = {name: Object;};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {',
        '    name: {',
        '      firstname: string;',
        '    }',
        '  };',
        '  render () {',
        '    return <div>Hello {this.props.name.lastname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Props = {name: {firstname: string;};};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.name.lastname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  props: {person: {name: {firstname: string;};};};',
        '  render () {',
        '    return <div>Hello {this.props.person.name.lastname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'person.name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Props = {person: {name: {firstname: string;};};};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.person.name.lastname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'person.name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Person = {name: {firstname: string;}};',
        'class Hello extends Inferno.Component {',
        '  props: {people: Person[];};',
        '  render () {',
        '    var names = [];',
        '    for (var i = 0; i < this.props.people.length; i++) {',
        '      names.push(this.props.people[i].name.lastname);',
        '    }',
        '    return <div>Hello {names.join(', ')}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'people[].name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Person = {name: {firstname: string;}};',
        'type Props = {people: Person[];};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    var names = [];',
        '    for (var i = 0; i < this.props.people.length; i++) {',
        '      names.push(this.props.people[i].name.lastname);',
        '    }',
        '    return <div>Hello {names.join(', ')}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'people[].name.lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'type Props = {result?: {ok: string | boolean;}|{ok: number | Array}};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.result.notok}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'result.notok\' is missing in props validation'}
      ]
    }, {
      code: [
        'let Greetings = class extends Inferno.Component {',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}',
        'Greetings.propTypes = {};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'let Greetings = {',
        '  Hello: class extends Inferno.Component {',
        '    render () {',
        '      return <div>Hello {this.props.name}</div>;',
        '    }',
        '  }',
        '}',
        'Greetings.Hello.propTypes = {};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'let Greetings = {};',
        'Greetings.Hello = class extends Inferno.Component {',
        '  render () {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}',
        'Greetings.Hello.propTypes = {};'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation'
      }]
    }, {
      code: [
        'function Greetings({names}) {',
        '  names = names.map(({firstname, lastname}) => <div>{firstname} {lastname}</div>);',
        '  return <Hello>{names}</Hello>;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'names\' is missing in props validation'
      }]
    }, {
      code: [
        'const MyComponent = props => (',
        '  <div onClick={() => props.toggle()}></div>',
        ')'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'toggle\' is missing in props validation'
      }]
    }, {
      code: [
        'const MyComponent = props => props.test ? <div /> : <span />'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'test\' is missing in props validation'
      }]
    }, {
      code: [
        'const TestComponent = props =>',
        '  <div onClick={() => props.test()} />',
        'const mapStateToProps = (_, props) => ({',
        '  otherProp: props.otherProp,',
        '})'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'test\' is missing in props validation'
      }]
    }, {
      code: [
        'type Props = {',
        '  firstname: ?string,',
        '};',
        'function Hello({firstname, lastname}: Props): Inferno$Element {',
        '  return <div>Hello {firstname} {lastname}</div>;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'lastname\' is missing in props validation'
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  constructor(props, context) {',
        '    super(props, context)',
        '    const firstname = props.firstname;',
        '    const {lastname} = props;',
        '    this.state = {',
        '      firstname,',
        '      lastname',
        '    }',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'},
        {message: '\'lastname\' is missing in props validation'}
      ]
    }, {
      code: [
        'function Hello(props) {',
        '  return <div>{props.name.constructor.firstname}</div>',
        '}',
        'Hello.propTypes = {',
        '  name: PropTypes.shape({',
        '    firstname: PropTypes.object',
        '  })',
        '};'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'name.constructor.firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'function SomeComponent({bar}) {',
        '  function f({foo}) {}',
        '  return <div className={f()}>{bar}</div>;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [
        {message: '\'bar\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.PureComponent {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 3,
        column: 35,
        type: 'Identifier'
      }]
    }, {
      code: [
        'class Hello extends PureComponent {',
        '  render() {',
        '    return <div>Hello {this.props.name}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parserOptions: parserOptions,
      errors: [{
        message: '\'name\' is missing in props validation',
        line: 3,
        column: 35,
        type: 'Identifier'
      }]
    }, {
      code: [
        'type MyComponentProps = {',
        '  a: number,',
        '};',
        'function MyComponent({ a, b }: MyComponentProps) {',
        '  return <div />;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'b\' is missing in props validation',
        line: 4,
        column: 27,
        type: 'Property'
      }]
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  propTypes: {},',
        '  render: function() {',
        '    return <div>{this.props.firstname}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation',
        line: 4,
        column: 29
      }]
    }, {
      code: [
        'var Hello = function(props) {',
        '  return <div>{props.firstname}</div>;',
        '};',
        'Hello.propTypes = {}'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation',
        line: 2,
        column: 22
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  static get propTypes() {',
        '    return {};',
        '  }',
        '  render() {',
        '    return <div>{this.props.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation',
        line: 6,
        column: 29
      }]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  render() {',
        '    return <div>{this.props.firstname}</div>;',
        '  }',
        '}',
        'Hello.propTypes = {};'
      ].join('\n'),
      options: [{skipUndeclared: true}],
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation',
        line: 3,
        column: 29
      }]
    }, {
      code: [
        'var Hello = Inferno.createClass({',
        '  render: function() {',
        '    return <div>{this.props.firstname}</div>;',
        '  }',
        '});'
      ].join('\n'),
      options: [{skipUndeclared: false}],
      parserOptions: parserOptions,
      errors: [{
        message: '\'firstname\' is missing in props validation',
        line: 3,
        column: 29
      }]
    }, {
      code: [
        'type MyComponentProps = {',
        '  +a: number,',
        '};',
        'function MyComponent({ a, b }: MyComponentProps) {',
        '  return <div />;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'b\' is missing in props validation',
        line: 4,
        column: 27,
        type: 'Property'
      }]
    }, {
      code: [
        'type MyComponentProps = {',
        '  -a: number,',
        '};',
        'function MyComponent({ a, b }: MyComponentProps) {',
        '  return <div />;',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{
        message: '\'b\' is missing in props validation',
        line: 4,
        column: 27,
        type: 'Property'
      }]
    }, {
      code: [
        'type Props = {+name: Object;};',
        'class Hello extends Inferno.Component {',
        '  props: Props;',
        '  render () {',
        '    return <div>Hello {this.props.firstname}</div>;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'firstname\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Inferno.Component {',
        '  onSelect = async ({ name }) => {',
        '    return this.props.foo;',
        '  }',
        '  render() {',
        '    return <Greeting onSelect={this.onSelect} />;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'foo\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Component {',
        '  static propTypes = {',
        '    bar: PropTypes.func',
        '  }',
        '  componentWillReceiveProps(nextProps) {',
        '    if (nextProps.foo) {',
        '      return;',
        '    }',
        '  }',
        '  render() {',
        '    return <div bar={this.props.bar} />;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'foo\' is missing in props validation'}
      ]
    }, {
      code: [
        'class Hello extends Component {',
        '  static propTypes = {',
        '    bar: PropTypes.func',
        '  }',
        '  componentWillReceiveProps(nextProps) {',
        '    const {foo} = nextProps;',
        '    if (foo) {',
        '      return;',
        '    }',
        '  }',
        '  render() {',
        '    return <div bar={this.props.bar} />;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [
        {message: '\'foo\' is missing in props validation'}
      ]
    }
  ]
});
