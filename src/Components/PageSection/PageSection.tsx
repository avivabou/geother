import React from 'react';
import './PageSection.css';

type SectionProps = {
  backgroundUrl: string;
  children?: React.ReactNode;
};

function PageSection({ backgroundUrl, children }: SectionProps) {
  return children ? (
    <div
      className="section"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="section-content">{children}</div>
    </div>
  ) : null;
}

export default PageSection;
