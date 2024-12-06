import React from 'react';

/**
 * React组件和Props示例
 * 
 * React中的组件类型：
 * 1. 函数组件（Function Components）：
 *    - 更简单，更容易理解
 *    - 没有生命周期，使用Hooks代替
 *    - 性能更好，bundle size更小
 *    - 推荐在新项目中使用
 *    - 类似Vue3的组合式API风格
 * 
 * 2. 类组件（Class Components）：
 *    - 提供完整的生命周期方法
 *    - 可以使用this
 *    - 更面向对象的方式
 *    - 类似Vue2的选项式API风格
 *    - 在老项目中比较常见
 * 
 * 3. 高阶组件（HOC）：
 *    - 用于组件逻辑复用
 *    - 接收组件作为参数并返回新组件
 *    - 类似Vue中的混入(mixins)，但更强大
 * 
 * 4. 纯组件（Pure Components）：
 *    - 类组件的特殊版本
 *    - 自动实现shouldComponentUpdate
 *    - 用于性能优化
 *    - Vue中没有直接对应的概念
 * 
 * 对Vue开发者的说明：
 * 1. React中的Props相当于Vue中的props选项
 * 2. React没有类似Vue的emits选项，事件处理直接通过props传递函数
 * 3. React中所有的props都是单向数据流，没有.sync修饰符
 * 4. TypeScript中使用interface定义props类型，类似Vue3的defineProps
 */

// 定义Props接口
interface WelcomeProps {
  name: string;        // 必传属性，类似Vue中的 required: true
  role?: string;       // 可选属性，类似Vue中的 required: false
}

/**
 * 函数组件示例
 * 
 * 特点：
 * 1. 简洁直观，易于测试和维护
 * 2. 使用React Hooks管理状态和副作用
 * 3. 没有this的困扰
 * 4. 更好的性能优化机会
 * 
 * Vue开发者注意：
 * 1. 这相当于Vue3中的setup函数组件
 * 2. props解构赋值类似Vue3的defineProps
 * 3. 默认值使用ES6解构默认值，而不是Vue中的default选项
 * 4. React.FC是TypeScript类型，表示Function Component
 */
const Welcome: React.FC<WelcomeProps> = ({ name, role = '访客' }) => {
  return (
    <div className="welcome">
      <h3>欢迎, {name}!</h3>
      <p>您的角色是: {role}</p>
    </div>
  );
};

/**
 * 类组件示例
 * 
 * 特点：
 * 1. 完整的生命周期方法
 * 2. 内部状态管理（this.state）
 * 3. 可以使用React.PureComponent优化性能
 * 4. 方法自动绑定（使用箭头函数）
 * 
 * 生命周期对比Vue：
 * - constructor           -> Vue的beforeCreate
 * - componentDidMount     -> Vue的mounted
 * - componentDidUpdate    -> Vue的updated
 * - componentWillUnmount  -> Vue的unmounted
 * 
 * Vue开发者注意：
 * 1. 这相当于Vue2的选项式API写法
 * 2. React类组件继承React.Component
 * 3. props通过this.props访问，而不是Vue中的this直接访问
 * 4. 没有Vue中的data选项，使用state代替（下周学习）
 */
interface UserCardProps {
  username: string;
  email: string;
  avatar?: string;     // 可选的头像URL
}

class UserCard extends React.Component<UserCardProps> {
  render() {
    // 从this.props解构，类似Vue中的props
    const { username, email, avatar } = this.props;
    return (
      <div className="user-card">
        {/* 条件渲染：React使用&&运算符，Vue使用v-if */}
        {avatar && <img src={avatar} alt={username} className="avatar" />}
        <div className="user-info">
          <h4>{username}</h4>
          <p>{email}</p>
        </div>
      </div>
    );
  }
}

/**
 * 组合组件示例
 * 
 * 组件组合方式：
 * 1. 属性传递：通过props传递数据和回调
 * 2. 组件嵌套：类似Vue的slot
 * 3. 组件引用：使用React.forwardRef
 * 4. 高阶组件：用于逻辑复用
 * 
 * Vue开发者注意：
 * 1. React中组件组合更加自由，没有Vue中的template限制
 * 2. Props传递类似Vue，但使用驼峰命名（userName而不是user-name）
 * 3. React中没有Vue的v-bind语法，直接使用属性赋值
 * 4. TypeScript类型检查类似Vue3的类型系统
 */
const ComponentsAndProps: React.FC = () => {
  return (
    <div className="components-demo">
      <h2>组件和Props示例</h2>
      
      <section>
        <h3>1. 函数组件</h3>
        {/* Props传递示例，类似Vue的 :name="张三" */}
        <Welcome name="张三" />
        <Welcome name="李四" role="管理员" />
      </section>

      <section>
        <h3>2. 类组件</h3>
        {/* 
          传递多个props示例
          Vue: <user-card :username="王五" :email="..." />
          React: <UserCard username="王五" email="..." />
        */}
        <UserCard 
          username="王五"
          email="wangwu@example.com"
          avatar="https://via.placeholder.com/50"
        />
        <UserCard 
          username="赵六"
          email="zhaoliu@example.com"
        />
      </section>

      <section>
        <h3>3. Props的特点</h3>
        <ul>
          <li>Props是只读的，组件不能修改自己的props（Vue也是如此）</li>
          <li>Props可以设置默认值（类似Vue的default选项）</li>
          <li>Props可以是可选的（类似Vue的required: false）</li>
          <li>使用TypeScript可以像Vue3一样获得完整的类型支持</li>
          <li>没有Vue中的props验证选项，但可以用TypeScript实现类似功能</li>
        </ul>
      </section>

      <section>
        <h3>4. 组件类型的使用场景</h3>
        <ul>
          <li>函数组件：适用于简单的UI渲染和Hooks使用场景</li>
          <li>类组件：适用于需要完整生命周期的复杂组件</li>
          <li>高阶组件：适用于组件逻辑复用</li>
          <li>纯组件：适用于性能优化场景</li>
        </ul>
      </section>
    </div>
  );
};

export default ComponentsAndProps;
