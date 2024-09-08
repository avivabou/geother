import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, MenuLogoItem } from '../../Types/siteActions';
import './MenuBar.css';

type MenuBarProps = {
  menuItems: MenuItem[];
  menuLogoItem?: MenuLogoItem;
};

function MenuBar({ menuItems, menuLogoItem }: MenuBarProps) {
  return (
    <div className="menuBar">
      {menuLogoItem && (
        <div className="menuLogoItem" onClick={menuLogoItem.onClick}>
          <img
            src={menuLogoItem.logoUrl}
            alt="Menu Logo"
            style={{
              height: '40px',
              cursor: menuLogoItem.onClick ? 'pointer' : 'default',
            }}
          />
        </div>
      )}
      <nav className="menubar-items-comntainer">
        {menuItems.map((item, index) => (
          <Link to={item.path} className="menuItem">
            <div key={index}>{item.title}</div>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default MenuBar;
