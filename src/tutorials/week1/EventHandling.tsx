import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import './EventHandling.css';

/**
 * React事件处理示例
 * 
 * React vs Vue 事件处理对比：
 * 
 * 1. 事件命名：
 *    Vue: @click="handleClick"
 *    React: onClick={handleClick}
 * 
 * 2. 事件传参：
 *    Vue: @click="handleClick(param, $event)"
 *    React: onClick={(e) => handleClick(param, e)}
 * 
 * 3. 修饰符：
 *    Vue: @click.stop="handleClick"
 *    React: onClick={(e) => { e.stopPropagation(); handleClick(e); }}
 * 
 * 4. v-model 等价实现：
 *    Vue: <input v-model="text">
 *    React: <input value={text} onChange={(e) => setText(e.target.value)}>
 */
const EventHandling: React.FC = () => {
  // 状态管理
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [inputText, setInputText] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  
  // 使用 ref 获取 DOM 元素
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 1. 基础点击事件
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(prev => prev + 1);
    console.log('点击事件对象：', e);
  };

  // 2. 带参数的事件处理
  const handleParamClick = (param: string, e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('参数：', param);
    console.log('事件对象：', e);
  };

  // 3. 鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // 4. 表单输入处理
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // 5. 表单提交
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认表单提交
    console.log('表单数据：', formData);
  };

  // 6. 事件冒泡示例
  const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('父元素被点击');
  };

  const handleChildClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 等同于 Vue 的 @click.stop
    console.log('子元素被点击');
  };

  // 7. 键盘事件
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('按下回车键');
    }
  };

  // 8. 复杂表单处理
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="event-handling">
      <h2>React 事件处理示例</h2>

      {/* 1. 基础点击事件 */}
      <section className="example-section">
        <h3>基础点击事件</h3>
        <button onClick={handleClick} ref={buttonRef}>
          点击次数: {clickCount}
        </button>
      </section>

      {/* 2. 带参数的事件 */}
      <section className="example-section">
        <h3>带参数的事件</h3>
        <button onClick={(e) => handleParamClick('测试参数', e)}>
          带参数的按钮
        </button>
      </section>

      {/* 3. 鼠标事件 */}
      <section className="example-section">
        <h3>鼠标事件</h3>
        <div 
          className="mouse-area" 
          onMouseMove={handleMouseMove}
        >
          移动鼠标查看坐标
          <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
        </div>
      </section>

      {/* 4. 表单输入 */}
      <section className="example-section">
        <h3>表单输入</h3>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="输入内容..."
        />
        <p>输入的内容: {inputText}</p>
      </section>

      {/* 5. 事件冒泡 */}
      <section className="example-section">
        <h3>事件冒泡</h3>
        <div className="bubble-container" onClick={handleParentClick}>
          父元素
          <button onClick={handleChildClick}>
            子元素 (阻止冒泡)
          </button>
        </div>
      </section>

      {/* 6. 表单提交 */}
      <section className="example-section">
        <h3>表单提交</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              placeholder="用户名"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="邮箱"
            />
          </div>
          <button type="submit">提交表单</button>
        </form>
      </section>

      {/* 7. 最佳实践说明 */}
      <section className="example-section">
        <h3>React事件处理最佳实践</h3>
        <ul>
          <li>使用驼峰命名法命名事件（onClick, onSubmit）</li>
          <li>直接传递函数引用，而不是字符串</li>
          <li>需要传参时使用箭头函数包装</li>
          <li>使用 TypeScript 时为事件对象添加正确的类型</li>
          <li>表单处理时记得阻止默认行为</li>
          <li>合理使用事件委托优化性能</li>
        </ul>
      </section>
    </div>
  );
};

export default EventHandling;
