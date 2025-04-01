import React from 'react';
import { Link } from 'wouter';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
  color?: 'primary' | 'accent' | 'secondary';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  linkText, 
  linkUrl,
  color = 'primary'
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    primary: {
      icon: 'bg-primary-dark/30 text-primary-light group-hover:bg-primary-dark/50',
      title: 'group-hover:text-primary-light',
      link: 'text-primary-light'
    },
    accent: {
      icon: 'bg-accent-dark/30 text-accent-light group-hover:bg-accent-dark/50',
      title: 'group-hover:text-accent-light',
      link: 'text-accent-light'
    },
    secondary: {
      icon: 'bg-secondary-dark/30 text-secondary-light group-hover:bg-secondary-dark/50',
      title: 'group-hover:text-secondary-light',
      link: 'text-secondary-light'
    }
  };

  return (
    <Link href={linkUrl}>
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-primary-light/50 transition group cursor-pointer">
        <div className={`h-16 w-16 rounded-full ${colorClasses[color].icon} flex items-center justify-center mb-6 transition shadow-lg`}>
          <div className="h-10 w-10">
            {icon}
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-3 ${colorClasses[color].title} transition`}>{title}</h3>
        
        <p className="text-gray-400 mb-4">
          {description}
        </p>
        
        <div className={`inline-flex items-center ${colorClasses[color].link} group-hover:translate-x-1 transition duration-300`}>
          <span>{linkText}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
