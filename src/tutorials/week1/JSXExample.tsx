import React from 'react';
import './JSXExample.css'; // 导入CSS文件

/**
 * JSX语法示例组件
 * 
 * 对于Vue开发者的说明：
 * - JSX是React中的模板语法，类似于Vue的template
 * - 与Vue不同，React直接在JavaScript/TypeScript中编写HTML结构
 * - React使用className而不是class来添加CSS类（因为class是JS关键字）
 * - React中没有v-if、v-for等指令，而是使用JavaScript原生语法
 * 
 * CSS类名使用说明：
 * Vue 中：<div class="example">
 * React 中：<div className="example">
 * 
 * 动态类名：
 * Vue 中：<div :class="{ active: isActive }">
 * React 中：<div className={`base-class ${isActive ? 'active' : ''}`}>
 * 
 * 多个类名：
 * Vue 中：<div :class="['class1', 'class2']">
 * React 中：<div className={['class1', 'class2'].join(' ')}>
 */
const JSXExample: React.FC = () => {
  // 1. 变量声明
  // 在React中，我们直接在组件函数内声明变量
  // 不像Vue需要在data()或setup()中定义
  const name = 'React学习者';
  const element = <h1>你好, {name}</h1>; // JSX中使用{}插值，类似Vue的{{ }}
  
  // 2. 表达式
  // React中的表达式可以直接在{}中使用，比Vue更加自由
  const number = 42;
  const showMessage = true;
  
  // 3. 样式相关
  const isActive = true;
  const baseClass = 'list-container';
  const conditionalClass = isActive ? 'active' : '';

  // 4. 内联样式（对比 Vue 的 :style）
  const buttonStyle = {
    backgroundColor: 'blue', // Vue中是 'background-color'
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px', // Vue中是 'border-radius'
    cursor: 'pointer'
  };

  return (
    <div className="jsx-example">
      {/* 1. 基本JSX语法 */}
      {/* 在React中，变量直接用{}包裹，而Vue中用{{ }} */}
      {element}
      
      {/* 2. 表达式用法 */}
      {/* React中可以在{}内进行任何JavaScript运算 */}
      <p>数字加法: {2 + 2}</p>
      <p>变量使用: {number}</p>
      
      {/* 3. 条件渲染 */}
      {/* 
        条件渲染：
        Vue: v-if="showMessage"
        React: {showMessage && <p>...</p>}
        或使用三元运算符: {showMessage ? <p>...</p> : null}
      */}
      {showMessage && (
        <p className="conditional-message">
          这是一条条件显示的消息
        </p>
      )}
      
      {/* 4. 类名使用示例 */}
      <div className={`${baseClass} ${conditionalClass}`}>
        <h2>类名使用示例</h2>
        <ul>
          <li>基本类名: className="example"</li>
          <li>动态类名: className={`base ${isActive ? 'active' : ''}`}</li>
          <li>多个类名: className={['class1', 'class2'].join(' ')}</li>
        </ul>
      </div>
      
      {/* 5. 样式使用对比 */}
      <div>
        <h3>样式使用对比</h3>
        {/* 内联样式 */}
        <button style={buttonStyle}>
          内联样式按钮
        </button>
        {/* CSS类样式 */}
        <button className="styled-button">
          CSS类样式按钮
        </button>
      </div>
      
      {/* 6. 列表渲染 */}
      {/* 
        列表渲染：
        Vue中使用v-for指令
        React中通常使用map()方法
        这里是静态列表示例，动态列表见其他示例
      */}
      <div className="list-container">
        <h2>列表示例</h2>
        <ul>
          <li>第一项</li>
          <li>第二项</li>
          <li>第三项</li>
        </ul>
      </div>
      
      {/* 6. JSX注释写法示例 */}
      {/* 
        注释的区别：
        Vue template中: <!-- 注释内容 -->
        React JSX中: {/* 注释内容 *\/}
      */}
    </div>
  );
};

export default JSXExample;
