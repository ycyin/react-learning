import React, { useState, useEffect } from 'react';

/**
 * State和生命周期示例
 * 
 * React中的状态管理：
 * 1. 函数组件使用useState Hook管理状态
 *    - 类似Vue3的ref和reactive
 *    - 更简洁的状态声明方式
 *    - 可以有多个状态声明
 * 
 * 2. 类组件使用this.state管理状态
 *    - 类似Vue2的data选项
 *    - 必须使用setState更新
 *    - 状态更新可能是异步的
 * 
 * 生命周期对比：
 * Vue2/3            React类组件              React Hooks
 * beforeCreate  ->  constructor          ->  不需要
 * created       ->  constructor          ->  useState初始化
 * mounted       ->  componentDidMount    ->  useEffect(() => {}, [])
 * updated       ->  componentDidUpdate   ->  useEffect(() => {}, [deps])
 * unmounted     ->  componentWillUnmount ->  useEffect返回的清理函数
 */

/**
 * 函数组件示例：计数器
 * 展示useState和useEffect的基本用法
 */
const FunctionCounter: React.FC = () => {
  // 状态声明，类似Vue3的 ref
  const [count, setCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // 副作用，类似Vue的watch或mounted
  useEffect(() => {
    console.log('组件已挂载');
    // 返回清理函数，类似Vue的onUnmounted
    return () => {
      console.log('组件将卸载');
    };
  }, []); // 空依赖数组表示仅在挂载和卸载时执行

  // 监听count变化，类似Vue的watch
  useEffect(() => {
    setLastUpdate(new Date());
    console.log('count已更新');
  }, [count]); // 依赖数组包含count，表示count变化时执行

  return (
    <div className="counter">
      <h3>函数组件计数器</h3>
      <p>当前计数: {count}</p>
      <p>上次更新: {lastUpdate.toLocaleTimeString()}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

/**
 * 类组件示例：计时器
 * 展示类组件的状态管理和生命周期方法
 */
interface TimerState {
  time: Date;
  isRunning: boolean;
}

class ClassTimer extends React.Component<{}, TimerState> {
  // 定时器ID
  private timerID: NodeJS.Timeout | null = null;

  // 构造函数，类似Vue2的data
  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date(),
      isRunning: false
    };
  }

  // 组件挂载后，类似Vue的mounted
  componentDidMount() {
    console.log('Timer组件已挂载');
  }

  // 组件更新后，类似Vue的updated
  componentDidUpdate(prevProps: {}, prevState: TimerState) {
    console.log('Timer组件已更新');
    // 状态isRunning发生变化时
    if (prevState.isRunning !== this.state.isRunning) {
      if (this.state.isRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    }
  }

  // 组件卸载前，类似Vue的unmounted
  componentWillUnmount() {
    console.log('Timer组件将卸载');
    this.stopTimer();
  }

  // 启动计时器
  startTimer = () => {
    this.timerID = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 1000);
  };

  // 停止计时器
  stopTimer = () => {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  };

  // 切换计时器状态
  toggleTimer = () => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
  };

  render() {
    const { time, isRunning } = this.state;
    return (
      <div className="timer">
        <h3>类组件计时器</h3>
        <p>当前时间: {time.toLocaleTimeString()}</p>
        <button onClick={this.toggleTimer}>
          {isRunning ? '停止' : '开始'}
        </button>
      </div>
    );
  }
}

/**
 * 组合示例：展示不同类型组件的状态管理和生命周期
 */
const StateAndLifecycle: React.FC = () => {
  return (
    <div className="state-lifecycle-demo">
      <h2>State和生命周期示例</h2>
      
      <section>
        <h3>1. 函数组件中的状态管理</h3>
        <p className="section-desc">
          使用useState和useEffect管理状态和副作用，类似Vue3的组合式API
        </p>
        <FunctionCounter />
      </section>

      <section>
        <h3>2. 类组件中的状态管理</h3>
        <p className="section-desc">
          使用this.state和生命周期方法，类似Vue2的选项式API
        </p>
        <ClassTimer />
      </section>

      <section>
        <h3>3. React状态管理的特点</h3>
        <ul>
          <li>状态更新可能是异步的，不要依赖当前状态计算下一个状态</li>
          <li>状态更新会触发重新渲染</li>
          <li>React会将多个setState调用合并为一个更新</li>
          <li>不要直接修改状态，要使用setState或useState的更新函数</li>
        </ul>
      </section>

      <section>
        <h3>4. 与Vue的主要区别</h3>
        <ul>
          <li>React需要手动调用更新函数，Vue是自动响应式</li>
          <li>React的useEffect比Vue的watch更灵活但需要手动声明依赖</li>
          <li>React没有计算属性，但可以使用useMemo实现类似功能</li>
          <li>React的状态更新是浅合并，Vue是深合并</li>
        </ul>
      </section>
    </div>
  );
};

export default StateAndLifecycle;
