import React from 'react';
import { VERSION_INFO, COPYRIGHT_INFO, TECH_STACK, getCopyrightText, getVersionText } from '../utils/version';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <h4 className="footer-title">{COPYRIGHT_INFO.projectName}</h4>
            <p className="footer-description">
              {COPYRIGHT_INFO.description}
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">开源项目</h4>
            <div className="footer-links">
              <a 
                href={VERSION_INFO.repository} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                📦 GitHub 仓库
              </a>
              <a 
                href={`${VERSION_INFO.repository}/issues`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                🐛 问题反馈
              </a>
              <a 
                href={`${VERSION_INFO.repository}/blob/main/README.md`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                📖 使用文档
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">技术栈</h4>
            <div className="footer-tech">
              {TECH_STACK.map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              {getCopyrightText()}
            </p>
            <p className="footer-license">
              本项目基于 <a 
                href={`${VERSION_INFO.repository}/blob/main/LICENSE`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="license-link"
              >
                {VERSION_INFO.license} 许可证
              </a> 开源发布
            </p>
          </div>
          
          <div className="footer-meta">
            <span className="version-info">
              {getVersionText()}
            </span>
            <div className="footer-badges">
              <span className="status-badge status-production">生产就绪</span>
              <span className="status-badge status-opensource">开源项目</span>
            </div>
          </div>
        </div>
        
        <div className="footer-disclaimer">
          <p>
            <strong>免责声明：</strong>
            本软件按"原样"提供，不提供任何明示或暗示的保证。使用本软件的风险由用户自行承担。
            作者不对因使用本软件而导致的任何损失或损害承担责任。
          </p>
          <p>
            <strong>隐私说明：</strong>
            本应用完全在浏览器本地运行，不会收集、存储或传输任何用户数据到外部服务器。
            所有编辑内容仅保存在您的本地浏览器中。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;