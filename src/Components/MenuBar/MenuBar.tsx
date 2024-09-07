import React from 'react';
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
      {menuItems.map((item, index) => (
        <div key={index} className="menuItem" onClick={item.onClick}>
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default MenuBar;
