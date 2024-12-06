import React, { useState } from 'react';
import './App.css';
import JSXExample from './tutorials/week1/JSXExample';
import ComponentsAndProps from './tutorials/week1/ComponentsAndProps';
import StateAndLifecycle from './tutorials/week1/StateAndLifecycle';
import EventHandling from './tutorials/week1/EventHandling';
import RenderingLogic from './tutorials/week1/RenderingLogic';

function App() {
  const [isWeek1Open, setIsWeek1Open] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>('jsx');

  const toggleWeek1 = () => {
    setIsWeek1Open(!isWeek1Open);
  };

  const switchSubMenu = (menu: string) => {
    setActiveSubMenu(menu === activeSubMenu ? null : menu);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React 学习项目</h1>
        <p>从 Vue 到 React 的学习之旅</p>
      </header>
      
      <main>
        <div className="menu-section">
          <div className={`menu-week ${isWeek1Open ? 'open' : ''}`}>
            <div className="menu-week-header" onClick={toggleWeek1}>
              <h2>第1周：React 基础</h2>
              <span className="arrow">{isWeek1Open ? '▼' : '▶'}</span>
            </div>
            
            {isWeek1Open && (
              <div className="submenu-container">
                <div 
                  className={`submenu-item ${activeSubMenu === 'jsx' ? 'active' : ''}`}
                  onClick={() => switchSubMenu('jsx')}
                >
                  <h3>JSX语法</h3>
                  <span className="arrow">{activeSubMenu === 'jsx' ? '▼' : '▶'}</span>
                </div>
                {activeSubMenu === 'jsx' && (
                  <div className="content-section">
                    <p className="section-desc">
                      学习 React 中的 JSX 语法，理解它与 Vue 模板语法的区别
                    </p>
                    <JSXExample />
                  </div>
                )}

                <div 
                  className={`submenu-item ${activeSubMenu === 'props' ? 'active' : ''}`}
                  onClick={() => switchSubMenu('props')}
                >
                  <h3>组件和Props</h3>
                  <span className="arrow">{activeSubMenu === 'props' ? '▼' : '▶'}</span>
                </div>
                {activeSubMenu === 'props' && (
                  <div className="content-section">
                    <p className="section-desc">
                      了解 React 组件的创建方式和属性传递机制
                    </p>
                    <ComponentsAndProps />
                  </div>
                )}

                <div 
                  className={`submenu-item ${activeSubMenu === 'state' ? 'active' : ''}`}
                  onClick={() => switchSubMenu('state')}
                >
                  <h3>State和生命周期</h3>
                  <span className="arrow">{activeSubMenu === 'state' ? '▼' : '▶'}</span>
                </div>
                {activeSubMenu === 'state' && (
                  <div className="content-section">
                    <p className="section-desc">
                      学习 React 的状态管理和生命周期，对比 Vue 的响应式系统和生命周期钩子
                    </p>
                    <StateAndLifecycle />
                  </div>
                )}

                <div 
                  className={`submenu-item ${activeSubMenu === 'events' ? 'active' : ''}`}
                  onClick={() => switchSubMenu('events')}
                >
                  <h3>事件处理</h3>
                  <span className="arrow">{activeSubMenu === 'events' ? '▼' : '▶'}</span>
                </div>
                {activeSubMenu === 'events' && (
                  <div className="content-section">
                    <p className="section-desc">
                      学习 React 的事件处理机制，了解与 Vue 事件处理的区别
                    </p>
                    <EventHandling />
                  </div>
                )}

                <div 
                  className={`submenu-item ${activeSubMenu === 'rendering' ? 'active' : ''}`}
                  onClick={() => switchSubMenu('rendering')}
                >
                  <h3>条件和列表渲染</h3>
                  <span className="arrow">{activeSubMenu === 'rendering' ? '▼' : '▶'}</span>
                </div>
                {activeSubMenu === 'rendering' && (
                  <div className="content-section">
                    <p className="section-desc">
                      学习 React 中的条件渲染和列表渲染，对比 Vue 的 v-if 和 v-for
                    </p>
                    <RenderingLogic />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
