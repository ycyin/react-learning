import React, { useState } from 'react';
import './RenderingLogic.css';

/**
 * 条件渲染和列表渲染示例
 * 
 * Vue vs React 渲染逻辑对比：
 * 
 * 1. 条件渲染：
 *    Vue:  v-if="condition"
 *          v-show="condition"
 *    React: {condition && <Component/>}
 *           {condition ? <A/> : <B/>}
 * 
 * 2. 列表渲染：
 *    Vue:  v-for="item in items"
 *    React: {items.map(item => <Component key={item.id}/>)}
 */

// 定义列表项的类型
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const RenderingLogic: React.FC = () => {
  // 状态定义
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '学习 JSX', completed: true },
    { id: 2, text: '理解组件和 Props', completed: true },
    { id: 3, text: '掌握 State 和生命周期', completed: false },
    { id: 4, text: '学习事件处理', completed: false },
    { id: 5, text: '练习条件和列表渲染', completed: false },
  ]);

  // 1. 条件渲染示例
  const renderAuthSection = () => {
    // if-else 条件渲染
    if (isLoggedIn) {
      return (
        <div className="auth-section">
          <h4>欢迎回来！</h4>
          <button onClick={() => setIsLoggedIn(false)}>登出</button>
        </div>
      );
    } else {
      return (
        <div className="auth-section">
          <h4>请登录</h4>
          <button onClick={() => setIsLoggedIn(true)}>登录</button>
        </div>
      );
    }
  };

  // 2. 列表过滤逻辑
  const getFilteredTodos = () => {
    switch (selectedTab) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // 3. 切换待办项状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 4. 添加新待办项
  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="rendering-logic">
      <h2>条件渲染和列表渲染示例</h2>

      {/* 1. 条件渲染示例区域 */}
      <section className="example-section">
        <h3>条件渲染</h3>
        
        {/* 1.1 if-else 条件渲染 */}
        {renderAuthSection()}

        {/* 1.2 三元运算符条件渲染 */}
        <div className="toggle-section">
          <button onClick={() => setShowContent(!showContent)}>
            {showContent ? '隐藏' : '显示'}内容
          </button>
          {showContent ? (
            <p>这是一些内容，点击按钮可以切换显示状态</p>
          ) : (
            <p>内容已隐藏</p>
          )}
        </div>

        {/* 1.3 短路逻辑条件渲染 */}
        {isLoggedIn && (
          <p className="welcome-message">
            你可以看到这条消息是因为你已登录
          </p>
        )}
      </section>

      {/* 2. 列表渲染示例区域 */}
      <section className="example-section">
        <h3>列表渲染</h3>
        
        {/* 2.1 选项卡 */}
        <div className="tabs">
          <button 
            className={selectedTab === 'all' ? 'active' : ''} 
            onClick={() => setSelectedTab('all')}
          >
            全部
          </button>
          <button 
            className={selectedTab === 'active' ? 'active' : ''} 
            onClick={() => setSelectedTab('active')}
          >
            未完成
          </button>
          <button 
            className={selectedTab === 'completed' ? 'active' : ''} 
            onClick={() => setSelectedTab('completed')}
          >
            已完成
          </button>
        </div>

        {/* 2.2 待办事项列表 */}
        <ul className="todo-list">
          {getFilteredTodos().map(todo => (
            // 使用 key 属性帮助 React 优化渲染
            <li 
              key={todo.id} 
              className={todo.completed ? 'completed' : ''}
              onClick={() => toggleTodo(todo.id)}
            >
              <input 
                type="checkbox" 
                checked={todo.completed}
                readOnly
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>

        {/* 2.3 空列表提示 */}
        {getFilteredTodos().length === 0 && (
          <p className="empty-message">
            没有{selectedTab === 'completed' ? '已完成' : '未完成'}的待办事项
          </p>
        )}
      </section>

      {/* 3. 最佳实践说明 */}
      <section className="example-section">
        <h3>渲染逻辑最佳实践</h3>
        <ul className="best-practices">
          <li>
            <strong>条件渲染：</strong>
            <ul>
              <li>简单条件使用 && 运算符</li>
              <li>二选一条件使用三元运算符</li>
              <li>复杂条件使用函数或变量存储JSX</li>
            </ul>
          </li>
          <li>
            <strong>列表渲染：</strong>
            <ul>
              <li>始终提供唯一的 key 属性</li>
              <li>避免使用索引作为 key</li>
              <li>列表过滤和转换使用数组方法</li>
            </ul>
          </li>
          <li>
            <strong>性能优化：</strong>
            <ul>
              <li>大列表考虑虚拟滚动</li>
              <li>条件渲染可能影响性能时使用 CSS 显示隐藏</li>
              <li>复杂计算结果使用 useMemo 缓存</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default RenderingLogic;
